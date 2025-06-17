import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "courses/create-course",
        method: "POST",
        body: data,
        credientials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/delete-course/${id}`,
        method: "DELETE",
        credientials: "include" as const,
      }),
    }),
    getCourse: builder.query({
      query: (courseId) => ({
        url: `courses/get-course/${courseId}`,
        method: "GET",
        credientials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `courses/edit-course/${courseId}`,
        method: "PUT",
        body: data,
        credientials: "include" as const,
      }),
    }),
    getCourses: builder.query({
      query: () => ({
        url: "courses/get-courses",
        method: "GET",
        credientials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `courses/get-course/${id}`,
        method: "GET",
        credientials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `courses/get-course-content/${id}`,
        method: "GET",
        credientials: "include" as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: `courses/add-question`,
        method: "PUT",
        body: { question, courseId, contentId },
        credientials: "include" as const,
      }),
    }),
    addAnswerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: `courses/add-answer`,
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credientials: "include" as const,
      }),
    }),
    addReviewInCourse: builder.mutation({
      query: ({ courseId, review, rating }) => ({
        url: `courses/add-review/${courseId}`,
        method: "PUT",
        body: { review, rating },
        credientials: "include" as const,
      }),
    }),
    addReplyInReview: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: `courses/add-reply/${reviewId}`,
        method: "PUT",
        body: { comment, courseId, reviewId },
        credientials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "courses/get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useGetCourseQuery,
  useEditCourseMutation,
  useGetCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,
} = courseApi;
