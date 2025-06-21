import { useGetCoursesQuery } from "@/redux/features/courses/courseApi";
import { useState, useEffect } from "react";
import CourseCard from "../Course/CourseCard";
import { styles } from "@/app/styles/style";

const Courses = () => {
  const { data } = useGetCoursesQuery(undefined);

  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (data) setCourses(data?.courses.slice(0, 3));
  }, [data]);

  return (
    <div className="w-[90%] md:w-[80%] m-auto">
      <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white text-black md:!leading-[60px] font-700 tracking-tight mb-5">
        Expand Your Career <span className={styles.gradient}>Opportunity</span>
        <br />
        Opportunity With Our Courses
      </h1>

      <div className="grid justify-center grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] mb-12 border-0  ">
        {courses &&
          courses.map((course: any, index: number) => (
            <CourseCard key={index} course={course} />
          ))}
      </div>
    </div>
  );
};

export default Courses;
