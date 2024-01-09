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

    findAllOtherUsers: build.query<Users[], string>({
      query: (id) => ({
        url: 'users/find-all-other-users',
        params: { id },
        method: 'GET',
      }),
    }),
  }),
});

export const { useFindOrCreateUserMutation } = usersApi;
