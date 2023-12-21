import { Prisma, Users } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const serverApi = createApi({
  reducerPath: 'serverApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  endpoints: (builder) => ({
    findOrCreateUser: builder.mutation<
      Users,
      Pick<Prisma.UsersCreateInput, 'clerkUserId'>
    >({
      query: (body) => ({ url: 'users/find-or-create', body, method: 'POST' }),
    }),
  }),
});

export const { useFindOrCreateUserMutation } = serverApi;
