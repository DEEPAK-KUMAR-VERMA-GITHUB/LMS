"use client";

import EditCourse from "@/app/components/Admin/Course/EditCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import { useParams } from "next/navigation";
import React, { FC } from "react";

const Page: FC = () => {
  const { id } = useParams();

  return (
    <div>
      <Heading
        title="Admin || LMS"
        description="LMS is a platform for student to learn and get help from the teachers."
        keywords="Programming, MERN, Redux, Data Science, Machine Learning, Development"
      />

      <div className="flex">
        <div className="2xl:w-[15%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
