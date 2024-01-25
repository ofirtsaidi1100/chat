import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FindOrCreateDto } from './dto/find-or-create.dto';
import clerkClient from '@clerk/clerk-sdk-node';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async findOrCreate({ clerkUserId }: FindOrCreateDto) {
    const user = await this.prisma.users.upsert({
      where: { clerkUserId },
      create: { clerkUserId },
      update: {},
    });

    return user;
  }

  async findAllOtherUsers(id: string) {
    if (id === '') {
      return [];
    }

    const users = await this.prisma.users.findMany({ where: { NOT: { id } } });

    const clerkUsers = await Promise.all(
      users.map((user) => {
        return clerkClient.users.getUser(user.clerkUserId);
      })
    );

    return clerkUsers;
  }
}
