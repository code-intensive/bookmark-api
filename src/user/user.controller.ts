import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserInDBDto } from '../auth/dto';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator/auth.getuser';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('me')
    me(@GetUser() user: User){
        return user;
    }

    @Get()
    getAll(): Promise<UserInDBDto[]>{
        return this.userService.getAll();
    }
}
