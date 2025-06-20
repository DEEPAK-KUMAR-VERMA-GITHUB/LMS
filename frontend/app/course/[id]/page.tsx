"use client";

import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage";
import { useParams } from "next/navigation";
import {} from "react";

const Page = () => {
  const { id } = useParams();

  return (
    <div>
      <CourseDetailsPage id={id} />
    </div>
  );
};

export default Page;
