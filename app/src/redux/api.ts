
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: builder => ({
    fetchTasks: builder.query({
      query: () => 'tasks',
    }),
  }),
});

export const { useFetchTasksQuery } = tasksApi;
