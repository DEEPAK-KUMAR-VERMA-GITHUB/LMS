import { useGetCourseContentQuery } from "@/redux/features/courses/courseApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import Header from "../Header";
import CourseContentList from "./CourseContentList";

type Props = {
  courseId: string;
  user?: object;
};

const CourseContent = ({ courseId, user }: Props) => {
  const {
    isLoading,
    data: contentData,
    refetch,
  } = useGetCourseContentQuery(courseId, {
    refetchOnMountOrArgChange: true,
  });
  const [data, setData] = useState([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");

  useEffect(() => {
    if (contentData) {
      setData(contentData.content);
    }
  }, [contentData]);

  return isLoading || !data ? (
    <Loader />
  ) : (
    <>
      <Header
        activeItem={1}
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
      />
      <div className="w-full grid md:grid-cols-10">
        <Heading
          title={data[activeVideo]?.title}
          description={data[activeVideo]?.description}
          keywords={data[activeVideo]?.tags}
        />
        <div className="col-span-7">
          <CourseContentMedia
            data={data}
            id={courseId}
            activeVideo={activeVideo}
            setActiveVideo={setActiveVideo}
            user={user}
            refetch={refetch}
            content={contentData}
          />
        </div>
        <div className="hidden md:block md:col-span-3">
          <CourseContentList
            setActiveVideo={setActiveVideo}
            data={data}
            activeVideo={activeVideo}
          />
        </div>
      </div>
    </>
  );
};

export default CourseContent;
