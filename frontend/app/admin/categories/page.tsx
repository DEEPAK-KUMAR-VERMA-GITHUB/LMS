"use client";

import EditCategories from "@/app/components/Admin/Customization/EditCategories";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

const Page = () => {
  return (
    <AdminProtected>
      <Heading
        title="Admin || LMS"
        description="LMS is a platform for students to learn and get help from teachers."
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex h-screen ">
        <div className="2xl:w-[15%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHero />
          <EditCategories />
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
