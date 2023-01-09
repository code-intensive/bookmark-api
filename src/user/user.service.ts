import { Injectable } from '@nestjs/common';
import { UserInDBDto } from '../auth/dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async me(): Promise<UserInDBDto> {
    let user = await this.prismaService.user.findFirst();
    delete user.password;
    return user;
  }

  async getAll(): Promise<UserInDBDto[]> {
    let users = await this.prismaService.user.findMany();
    users.forEach((user) => delete user.password);
    return users;
  }
}
