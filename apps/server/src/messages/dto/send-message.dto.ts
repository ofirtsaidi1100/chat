import { Prisma } from '@prisma/client';

export interface SendMessageDto extends Prisma.MessagesCreateManyInput {}
