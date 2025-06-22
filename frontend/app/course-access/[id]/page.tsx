"use client";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import React, { useEffect } from "react";
import { redirect, useParams } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";
import CourseContent from "@/app/components/Course/CourseContent";
import Footer from "@/app/components/Footer";

const Page = () => {
  const params = useParams();
  const id = params?.id as string;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.includes(id);

      if (!isPurchased || isPurchased === -1) {
        redirect("/");
      }
    }

    if (error) {
      redirect("/");
    }
  }, [data, error, id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <CourseContent courseId={id} user={data.user} />
      <Footer />
    </div>
  );
};

export default Page;
