
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://tasks-1njw.onrender.com/api/' }),
  endpoints: builder => ({
    fetchTasks: builder.query({
      query: () => 'tasks',
    }),
  }),
});

export const { useFetchTasksQuery } = tasksApi;
