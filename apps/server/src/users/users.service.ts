import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FindOrCreateDto } from './dto/find-or-create.dto';

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
}
