"use client";

import { FC, useState } from "react";
import Header from "./components/Header";
import Heading from "./utils/Heading";

const HomePage: FC = () => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
      <Heading
        title="LMS"
        description="LMS is a platform for student to learn and get help from the peers."
        keywords="Programming, MERN, Redux, Data Science, Machine Learning, Development"
      />

      <Header open={open} setOpen={setOpen} activeItem={activeItem} />
    </div>
  );
};

export default HomePage;
