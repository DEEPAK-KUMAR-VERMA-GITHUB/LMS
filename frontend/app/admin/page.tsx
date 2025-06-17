"use client";

import React, { FC } from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";

const Page: FC = () => {
  return (
    <AdminProtected>
      <Heading
        title="Admin || LMS"
        description="LMS is a platform for students to learn and get help from teachers."
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex h-[200vh] ">
        <div className="2xl:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero isDashboard={true} />
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
