import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { FC, useState, useEffect } from "react";
import toast from "react-hot-toast";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  console.log(courseInfo);
  const [dragging, setDragging] = useState(false);
  const { data, error } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });

  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, error]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleChange = (e: any) => {
    if (e.target.name === "thumbnail") {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (reader.readyState === 2) {
            setCourseInfo({ ...courseInfo, thumbnail: reader.result });
          }
        };
        reader.readAsDataURL(file);
      }
    } else {
      setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value });
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-24 mb-20">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="name" className={styles.label}>
            Course Name
          </label>
          <input
            type="text"
            name="name"
            value={courseInfo.name}
            onChange={handleChange}
            id="name"
            placeholder="MERN stack project"
            className={styles.input}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description" className={styles.label}>
            Course Description
          </label>
          <textarea
            name="description"
            id="description"
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !p-2`}
            value={courseInfo.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full flex justify-between mb-5">
          <div className="w-[45%]">
            <label htmlFor="price" className={styles.label}>
              Course Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              inputMode="numeric"
              placeholder="1000"
              value={courseInfo.price}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="estimatedPrice" className={styles.label}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name="estimatedPrice"
              id="estimatedPrice"
              inputMode="numeric"
              placeholder="5000"
              value={courseInfo.estimatedPrice}
              onChange={handleChange}
              className={styles.input}
            />
          </div>
        </div>
        <div className="w-full flex justify-between mb-5">
          <div className="w-[45%]">
            <label htmlFor="tags" className={styles.label}>
              Course Tags
            </label>
            <input
              type="text"
              name="tags"
              id="tags"
              value={courseInfo.tags}
              onChange={handleChange}
              placeholder="MERN, Next 13,Socket IO,Tailwind CSS,GraphQL,Docker"
              className={styles.input}
              required
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="demoUrl" className={styles.label}>
              Course Categories
            </label>
            <select
              className={styles.input}
              name="categories"
              value={courseInfo.categories}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map((category: any) => (
                <option
                  value={category.title}
                  key={category._id}
                  className=" text-black dark:text-white dark:bg-blue-900 "
                >
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full flex justify-between mb-5">
          <div className="w-[45%]">
            <label htmlFor="level" className={styles.label}>
              Course Level
            </label>
            <input
              type="text"
              name="level"
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              value={courseInfo.level}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className="w-[45%]">
            <label htmlFor="demoUrl" className={styles.label}>
              Demo Url
            </label>
            <input
              type="text"
              name="demoUrl"
              id="demoUrl"
              placeholder="euc822f"
              value={courseInfo.demoUrl}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            name="thumbnail"
            className="hidden"
            onChange={handleChange}
            required={!courseInfo?.thumbnail}
          />
          <label
            htmlFor="file"
            className={`cursor-pointer hover:bg-gray-100 dark:hover:bg-blue-950 transition w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center  ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {" "}
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo.thumbnail}
                alt="thumbnail"
                width={500}
                height={300}
                className="max-h-full w-full object-cover aspect-video"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}{" "}
          </label>
        </div>
        <input
          type="submit"
          value="Next"
          className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded mt-8 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CourseInformation;
