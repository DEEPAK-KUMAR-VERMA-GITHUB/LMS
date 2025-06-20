"use client";

import { useState } from "react";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";
import About from "./About";
import Footer from "../components/Footer";

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(2);
  const [route, setRoute] = useState<string>("Login");

  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Heading
        title="About Us || LMS"
        description="LMS is a learning management platform for programmers to boost up their skills"
        keywords="programming,mern,react,nodejs,javascript,dsa,machine learning,express,mongodb,sql"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />
      <About />
      <Footer />
    </div>
  );
};

export default Page;
