"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";



const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name}'s profile || LMS`}
          description="LMS is a platform for student to learn and get help from the teachers."
          keywords="Programming, MERN, Redux, Data Science, Machine Learning, Development"
        />
        <Header
          open={open}
          activeItem={activeItem}
          setOpen={setOpen}
          route={route}
          setRoute={setRoute}
        />
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
