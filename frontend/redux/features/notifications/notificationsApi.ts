import { apiSlice } from "../api/apiSlice";

export const notificationsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: () => ({
        url: "notifications/get-all-notifications",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updatedNotificationStatus: builder.mutation({
      query: (id) => ({
        url: `notifications/update-notification/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useUpdatedNotificationStatusMutation,
} = notificationsApi;
