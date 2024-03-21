import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  async getMessages(
    @Query('senderId') senderId: string,
    @Query('receiverId') receiverId: string
  ) {
    return this.messagesService.getMessages({ senderId, receiverId });
  }

  @Post('send')
  async sendMessages(@Body() sendMessageDto: SendMessageDto) {
    return this.messagesService.sendMessage(sendMessageDto);
  }
}
