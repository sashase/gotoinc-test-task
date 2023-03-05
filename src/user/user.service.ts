import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types/token.type';
import { LogoutResponse } from './types/logoutResponse.type';
import { User } from './user.model';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwt: JwtService,
  ) {}

  async getTokens(id: number, username: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 60 * 15,
        },
      ),
      this.jwt.signAsync(
        {
          sub: id,
          username,
        },
        {
          secret: process.env.RT_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async saveRt(id: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.userRepository.update({ rtHash: hash }, { where: { id } });
  }

  async signUp(dto: AuthDto): Promise<Tokens> {
    try {
      const hash = await argon.hash(dto.password);
      const user = await this.userRepository.create({
        username: dto.username,
        hash,
      });
      console.log(user);

      const tokens = await this.getTokens(user.id, user.username);
      await this.saveRt(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error.errors[0].message)
        throw new UnprocessableEntityException(error?.errors[0].message);
      throw new UnprocessableEntityException();
    }
  }

  async login(dto: AuthDto): Promise<Tokens> {
    const user = await this.userRepository.findOne({
      where: { username: dto.username },
    });
    if (!user) throw new UnauthorizedException('Credentials incorrect');

    const pwMatches = await argon.verify(user.hash, dto.password);
    if (!pwMatches) throw new UnauthorizedException('Credentials incorrect');

    const tokens = await this.getTokens(user.id, user.username);
    await this.saveRt(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number): Promise<LogoutResponse> {
    await this.userRepository.update(
      { rtHash: null },
      {
        where: { id: userId },
      },
    );
    return { statusCode: 200, message: 'Successfully logged out' };
  }

  async refresh(userId: number, rt: string): Promise<Tokens> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user || !user.rtHash) throw new UnauthorizedException();

    const rtMatches = argon.verify(user.rtHash, rt);
    if (!rtMatches) throw new UnauthorizedException();

    const tokens = await this.getTokens(user.id, user.username);
    await this.saveRt(user.id, rt);

    return tokens;
  }
}
