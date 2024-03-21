import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}
  async getMessages(params: { senderId: string; receiverId: string }) {
    const messages = await this.prisma.messages.findMany({
      //   where: { ...params },
      where: {
        OR: [
          { senderId: params.receiverId, receiverId: params.senderId },
          params,
        ],
      },
    });

    return messages;
  }

  async sendMessage(sendMessageDto: SendMessageDto) {
    const message = await this.prisma.messages.create({
      data: sendMessageDto,
    });

    return message;
  }
}
