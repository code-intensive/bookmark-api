import { Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, AccessTokenDto, UserInDBDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() credentials: SignInDto): Promise<AccessTokenDto> {
    return this.authService.signIn(credentials);
  }

  @Post('sign-up')
  async signUp(@Body() credentials: SignUpDto): Promise<UserInDBDto> {
    return await this.authService.signUp(credentials);
  }
}
