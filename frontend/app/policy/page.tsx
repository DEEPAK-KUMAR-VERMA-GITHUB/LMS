"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import Policy from "./Policy";



const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(3);
  const [route, setRoute] = useState<string>("Login");

  return (
    <div>
      <Heading
        title="Policy || LMS"
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
      <Policy />
      <Footer />
    </div>
  );
};

export default Page;
