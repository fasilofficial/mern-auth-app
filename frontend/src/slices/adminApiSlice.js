import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    adminRegister: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/logout`,
        method: "POST",
      }),
    }),
    getUsers: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/users`,
        method: "GET",
      }),
    }),
    addUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/add-user`,
        method: "POST",
        body: data,
      }),
    }),
    blockUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/block-user`,
        method: "POST",
        body: data,
      }),
    }),
    editUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/edit-user`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/delete-user`,
        method: "DELETE",
        body: data,
      }),
    }),
    searchUsers: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/search`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAdminRegisterMutation,
  useGetUsersMutation,
  useAddUserMutation,
  useBlockUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useSearchUsersMutation,
} = adminApiSlice;
