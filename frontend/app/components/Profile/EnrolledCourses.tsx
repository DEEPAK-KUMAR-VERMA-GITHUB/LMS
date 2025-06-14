import React from "react";
import CourseCard from "../Course/CourseCard";

type Props = {
  courses: any[];
};

const EnrolledCourses = ({ courses }: Props) => {
  return (
    <>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0">
          {courses.map((course: any, index: number) => (
            <CourseCard key={index} course={course} isProfile={true} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center">
          <h1 className="text-[18px] font-Poppins text-gray-600">
            You don&apos;t have any purchased courses yet!
          </h1>
        </div>
      )}
    </>
  );
};

export default EnrolledCourses;
