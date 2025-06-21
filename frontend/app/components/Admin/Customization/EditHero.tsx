import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import Loader from "../../Loader/Loader";

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, isLoading, error, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error: editError }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data.layout?.banner.title);
      setSubTitle(data.layout?.banner.subTitle);
      setImage(data.layout?.banner?.image?.url);
    }

    if (error) {
      if ("data" in error) {
        const errMsg = error as any;
        toast.error(errMsg.data.message);
      }
    }
    if (editError) {
      if ("data" in editError) {
        const errMsg = editError as any;
        toast.error(errMsg.data.message);
      }
    }
    if (isSuccess) {
      refetch();
      toast.success("Banner updated successfully!");
    }
  }, [data, editError, error, isSuccess, refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="w-full lg:flex items-center">
      <div className="absolute top-[100px] lg:top-[unset] 2xl:h-[700px] 2xl:w-[700px] xl:h-[600px] xl:w-[600px] h-[50vh] w-[50vh] hero_animation rounded-[50%] xl:left-[18rem] 2xl:left-[21rem] "></div>
      <div className=" lg:w-[40%] flex lg:min-h-screen items-center justify-end pt-[70px] lg:pt-0 z-10 ">
        <div className="relative flex items-center justify-end">
          <Image
            src={image}
            alt="banner"
            width={1000}
            height={1000}
            className="object-contain xl:max-w-[90%] w-[90%] 2xl:max-w-[85%] h-auto z-10"
          />
          <input
            type="file"
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />

          <label
            htmlFor="banner"
            className="absolute -bottom-25 right-10 z-20 hover:bg-blue-200 cursor-pointer p-3 rounded-2xl "
          >
            <AiOutlineCamera
              size={30}
              className="dark:text-white text-gray-500 text-[18px]  "
            />
          </label>
        </div>
      </div>
      <div className=" lg:w-[60%] flex flex-col lg:mt-0 text-center lg:text-left mt-[150px] ">
        <textarea
          cols={30}
          rows={4}
          placeholder={title || "Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="dark:text-white text-[#000000c7] text-[30px] resize-none px-3 w-full lg:text-[60px] 2xl:text-[70px] font-[600] font-Poppins mb-2 bg-transparent focus:outline-0 "
        ></textarea>
        <textarea
          cols={30}
          rows={4}
          placeholder={subTitle || "Sub Title"}
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          className="dark:text-[#edfff4] text-[#000000ac] text-[18px] resize-none px-3 w-full xl:!w-[74%] 2xl:!w-[55%] font-[600] font-Josefin mb-6 bg-transparent focus:outline-0"
        ></textarea>

        <div
          className={`${
            styles.button
          } !w-[100px] !min-h-[40px] dark:text-white text-black bg-[#cccccc34] 
                ${
                  data?.layout?.banner?.title !== title ||
                  data?.layout?.banner?.subTitle !== subTitle ||
                  data?.layout?.banner?.image?.url !== image
                    ? "!cursor-pointer !bg-[#42d383]"
                    : "!cursor-not-allowed"
                }
                !rounded absolute bottom-12 right-12

            `}
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? handleEdit
              : () => null
          }
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default EditHero;
