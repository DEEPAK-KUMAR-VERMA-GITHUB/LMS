"use client";

import { useState } from "react";
import Header from "./components/Header";
import Heading from "./utils/Heading";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState<string>("Login");

  return (
    <div>
      <Heading
        title="LMS"
        description="LMS is a platform for student to learn and get help from the peers."
        keywords="Programming, MERN, Redux, Data Science, Machine Learning, Development"
      />

      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        route={route}
        setRoute={setRoute}
      />

      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default HomePage;
