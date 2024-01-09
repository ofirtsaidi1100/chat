import { Prisma, Users } from '@prisma/client';
import { serverApi } from './server.api';

const usersApi = serverApi.injectEndpoints({
  endpoints: (build) => ({
    findOrCreateUser: build.mutation<
      Users,
      Pick<Prisma.UsersCreateInput, 'clerkUserId'>
    >({
      query: (body) => ({ url: 'users/find-or-create', body, method: 'POST' }),
    }),
  }),
});

export const { useFindOrCreateUserMutation } = usersApi;
