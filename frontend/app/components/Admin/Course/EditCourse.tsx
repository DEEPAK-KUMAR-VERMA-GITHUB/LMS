"use client";

import {
  useEditCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/courseApi";
import { redirect } from "next/navigation";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";
import CourseContent from "./CourseContent";
import CourseData from "./CourseData";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CoursePreview from "./CoursePreview";

type Props = {
  id: string;
};

interface CourseInfo {
  name: string;
  description: string;
  categories: string;
  price: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: string;
}

interface Benefit {
  title: string;
}

interface Prerequisite {
  title: string;
}

interface CourseContent {
  videoUrl: string;
  title: string;
  description: string;
  videoLength: number;
  videoSection: string;
  links: {
    title: string;
    url: string;
  }[];
  suggestion: string;
}

interface Course {
  _id: string;
  name: string;
  description: string;
  price: string;
  categories: string;
  estimatedPrice: string;
  tags: string;
  level: string;
  demoUrl: string;
  thumbnail: {
    url: string;
  };
  benefits: Benefit[];
  prerequisites: Prerequisite[];
  courseData: CourseContent[];
}

const EditCourse: FC<Props> = ({ id }) => {
  const {
    isLoading,
    data: allCoursesData,
    error,
    refetch,
    isSuccess,
  } = useGetAllCoursesQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [
    editCourse,
    { isSuccess: editSuccess, error: editError, isLoading: editLoading },
  ] = useEditCourseMutation();

  useEffect(() => {
    if (isSuccess) {
      const data = allCoursesData?.courses.find((i: Course) => i._id === id);

      if (data) {
        const {
          name,
          description,
          price,
          categories,
          estimatedPrice,
          tags,
          level,
          demoUrl,
          thumbnail,
        } = data;
        setCourseInfo({
          name,
          description,
          categories,
          price,
          estimatedPrice,
          tags,
          level,
          demoUrl,
          thumbnail: thumbnail?.url,
        });
        // Create new objects for benefits and prerequisites
        setBenefits(data.benefits.map((benefit: Benefit) => ({ ...benefit })));
        setPrerequisites(
          data.prerequisites.map((prerequisite: Prerequisite) => ({
            ...prerequisite,
          }))
        );
        // Create new objects for course content data
        setCourseContentData(
          data.courseData.map((content: CourseContent) => ({
            ...content,
            links: content.links.map((link) => ({ ...link })),
          }))
        );
      }
    }

    if (error) {
      if ("data" in error) {
        const errMsg = error as any;
        toast.error(errMsg.data.message);
      }
    }
  }, [allCoursesData, error, isSuccess, id]);

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    categories: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState<Benefit[]>([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([
    { title: "" },
  ]);
  const [courseData, setCourseData] = useState<Partial<Course>>({});
  const [courseContentData, setCourseContentData] = useState<CourseContent[]>([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);

  const handleSubmit = async () => {
    // format benefits array
    const formattedBenefits = benefits.map((benefit: Benefit) => ({
      title: benefit.title,
    }));
    // format prerequisites array
    const fromattedPrerequisites = prerequisites.map(
      (prerequisite: Prerequisite) => ({
        title: prerequisite.title,
      })
    );

    // format course content array
    const formattedCourseContentData = courseContentData.map(
      (courseContent: CourseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoLength: courseContent.videoLength,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    // prepare course data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories: courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: fromattedPrerequisites,
      courseContent: formattedCourseContentData,
    };

    // Only include thumbnail if it has been changed
    if (
      courseInfo.thumbnail &&
      courseInfo.thumbnail !==
        allCoursesData?.courses.find((i: Course) => i._id === id)?.thumbnail
          ?.url
    ) {
      data.thumbnail = courseInfo.thumbnail;
    }

    setCourseData(data);
  };

  const handleEditCourse = async () => {
    const data = courseData;
    await editCourse({ id, data });
  };

  useEffect(() => {
    if (editSuccess) {
      refetch();
      toast.success("Course updated successfully!");
      redirect("/admin/all-courses");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }

    if (editError) {
      if ("data" in editError) {
        const errorData = editError as any;
        toast.error(errorData.data.message);
      }
    }
  }, [editError, error, isSuccess, refetch, editSuccess]);

  if (isLoading || editLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}

        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleEditCourse}
            isEdit={true}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
