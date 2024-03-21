import { Prisma, Messages } from '@prisma/client';
import { serverApi } from './server.api';

export const messagesApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    getMessages: build.query<
      Messages[],
      Pick<Prisma.MessagesCreateManyInput, 'receiverId' | 'senderId'>
    >({
      query: (params) => ({ url: 'messages', method: 'GET', params }),
      providesTags: ['messages'],
    }),
    sendMessage: build.mutation<Messages, Prisma.MessagesCreateManyInput>({
      query: (body) => ({ url: 'messages/send', method: 'POST', body }),
      invalidatesTags: ['messages'],
    }),
  }),
});

export const { useLazyGetMessagesQuery, useSendMessageMutation } = messagesApi;
