import Link from "next/link";
import { AiFillGithub, AiFillInstagram, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="py-5">
      <div className="border border-[#0000000e] dark:border-[#ffffff1e] "></div>
      <br />
      <div className="w-[95%] md:w-full md:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8 ">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 ">
          <div className="space-y-3">
            <h3 className=" text-[20px] font-[600] text-black dark:text-white ">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white "
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/policy"
                  className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white "
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white "
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className=" text-[20px] font-[600] text-black dark:text-white ">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white "
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white "
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className=" text-[20px] font-[600] text-black dark:text-white ">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="https://www.youtube.com"
                  className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white flex flex-row gap-2 items-center"
                  rel="noopener noreferrer"
                >
                  <AiFillYoutube
                    size={20}
                    className="dark:text-white text-black"
                  />
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/deepak-kumar-verma-ramgarh"
                  className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white flex flex-row gap-2 items-center "
                  rel="noopener noreferrer"
                >
                  <AiFillLinkedin
                    size={20}
                    className="dark:text-white text-black"
                  />
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/DEEPAK-KUMAR-VERMA-GITHUB"
                  className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white flex flex-row gap-2 items-center "
                  rel="noopener noreferrer"
                >
                  <AiFillGithub
                    size={20}
                    className="dark:text-white text-black"
                  />
                  GitHub
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className=" text-[20px] font-[600] text-black dark:text-white ">
              Contact Info
            </h3>
            <p className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white pb-2">
              Call Us: +91 754-1802-720
            </p>
            <p className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white pb-2">
              Address: 55, Ramgarh, Kaimur, Bihar, India, 821110
            </p>
            <p className="text-base text-black  hover:text-orange-500 dark:text-gray-300 dark:hover:text-white pb-2">
              Mail Us: boostyourselfup@gmail.com
            </p>
          </div>
        </div>
        <p className="text-center text-black dark:text-white mt-2">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <span className="">LMS</span> || All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
