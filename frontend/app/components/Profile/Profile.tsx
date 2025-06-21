"use client";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import {
  useGetCoursesQuery
} from "@/redux/features/courses/courseApi";
import { signOut } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChangePassword from "./ChangePassword";
import EnrolledCourses from "./EnrolledCourses";
import ProfileInfo from "./ProfileInfo";
import SideBarProfile from "./SideBarProfile";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const { data, isSuccess } = useGetCoursesQuery(undefined, {});
  const [courses, setCourses] = useState<any[]>([]);

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
    toast.success("Logout Successfully");
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) setScroll(true);
      else setScroll(false);
    });
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(user);
      setCourses(
        data.courses.filter((course: any) =>
          user?.courses?.includes(course._id)
        )
      );
    }
  }, [data, user, isSuccess]);

  return (
    <div className="w-[85%] flex mx-auto items-center ">
      <div
        className={`w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border dark:border-[#ffffff1d] border-[#b9b5b5b0] rounded-[5px] shadow-sm mt-[80] mb-[80px] sticky bg-white ${
          scroll ? "top-[120px]" : " top-[30px]"
        } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          setActive={setActive}
          avatar={avatar}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ProfileInfo user={user} avatar={avatar} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent mt-[80px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl-7 px-2 md:px-10 md:pl-8">
          <EnrolledCourses courses={courses} />
        </div>
      )}
    </div>
  );
};
export default Profile;
