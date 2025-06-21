"use client";

import CreateCourse from "@/app/components/Admin/Course/CreateCourse";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import Heading from "@/app/utils/Heading";
import { useState } from "react";

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
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
          <DashboardHeader open={open} setOpen={setOpen} />
          <CreateCourse />
        </div>
      </div>
    </div>
  );
};

export default Page;
