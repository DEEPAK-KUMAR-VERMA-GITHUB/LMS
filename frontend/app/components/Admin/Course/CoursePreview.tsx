import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import React, { FC } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdit,
}) => {
  const discountPercentage = (
    ((courseData?.estimatedPrice - courseData?.price) * 100) /
    courseData?.estimatedPrice
  ).toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = () => {
    handleCourseCreate();
  };

  return (
    <div className="w-[90%] m-auto py-5 mb-5 text-black dark:text-white">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : "Rs. " + courseData?.price}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {" "}
            {courseData?.estimatedPrice}{" "}
          </h5>
          <h4 className="pl-5 pt-4 text-[22px] text-green-700 ">
            {discountPercentage}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed `}
          >
            Buy Now Rs. {courseData?.price}
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code..."
            className={`${styles.input}  2xl:!w-[50%] lg:!w-[60%] ml-3 !mt-0`}
          />
          <div
            className={`${styles.button}  !w-[120px] my-3 font-Poppins ml-4 cursor-pointer`}
          >
            Apply
          </div>
        </div>
        <p className="pb-1">• Source code included </p>
        <p className="pb-1">• Lifetime Access </p>
        <p className="pb-1">• Certificate of completion </p>
        <p className="pb-1">• Premium Support </p>
      </div>
      <div className="w-full">
        <div className="w-full md:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between mb-5">
            <Ratings rating={0} />
            <h5>0 Students</h5>
          </div>
          <h1 className="text-[25px] font-Poppins font-[600]">
            What you will learn from this course ?
          </h1>
          {courseData?.benefits?.map((item: any, index: number) => (
            <div className="w-full flex md:items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item?.title}</p>
            </div>
          ))}
          <br />
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            What are the prerequisites for starting this course ?
          </h1>
          {courseData?.prerequisites?.map((item: any, index: number) => (
            <div className="w-full flex md:items-center py-2 " key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item?.title}</p>
            </div>
          ))}
          <br />
          <br />
          {/* course description */}
          <div className="w-full mb-8">
            <h1 className="text-[25px] font-Poppins font-[600]">
              Course Details
            </h1>
            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
              {courseData?.description}
            </p>
          </div>
        </div>

        <div className="w-full flex items-center justify-between mb-10">
          <div
            className="w-full flex items-center justify-center md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
            onClick={prevButton}
          >
            Prev
          </div>
          <div
            className="w-full flex items-center justify-center md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
            onClick={createCourse}
          >
            {isEdit ? "Update" : "Create"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
