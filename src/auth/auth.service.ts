import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccessTokenDto, SignInDto, SignUpDto, UserInDBDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  protected readonly EMAIL_UNAVAILABLE = 'Email address unavailable';
  protected readonly INVALID_SIGNIN_MESSAGE = 'Username or password incorrect';

  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signIn(credentials: SignInDto): Promise<AccessTokenDto> {
    const user = await this.prismaService.user.findFirst({
      where: { email: credentials.email },
      select: { id: true, email: true, password: true },
    });

    if (!user) throw new BadRequestException(this.INVALID_SIGNIN_MESSAGE);

    if (!this.authenticate(user.password, credentials.password)){
      throw new BadRequestException(this.INVALID_SIGNIN_MESSAGE);
    }

    const access_token = await this.generateAccessToken(user.id, user.email);
    return {access_token}
  }

  async signUp(credentials: SignUpDto): Promise<UserInDBDto> {
    const userExists = await this.prismaService.user.findFirst({
      where: { email: credentials.email },
    });

    if (userExists !== null)
      throw new BadRequestException(this.EMAIL_UNAVAILABLE);

    const password = await argon.hash(credentials.password);
    const user = await this.prismaService.user.create({
      data: {
        password,
        email: credentials.email,
        lastName: credentials.lastName,
        firstName: credentials.firstName,
      },
    });
    delete user.password;
    return user;
  }

  private generateAccessToken(
    id: number,
    email: string,
  ): Promise<string> {
    const payload = { sub: id, email };
    const JwtSignOptions = {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRES_IN'),
    };
    return this.jwtService.signAsync(
      payload,
      JwtSignOptions,
    );
  }

  private async authenticate(plainPassword:string, hash: string): Promise<boolean>{
    return await argon.verify(
      hash,
      plainPassword,
    );
  }
}
