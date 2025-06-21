import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-black dark:text-white text-center ">
      <h1 className={`${styles.title} md:!text-[45px] mb-2`}>
        What is <span className={styles.gradient}>LMS ?</span>
      </h1>
      <div className="w-[95%] md:w-[85%] m-auto">
        <div className="space-y-8">
          <p className="text-[18px] font-Poppins leading-relaxed">
            Welcome to LMS, a comprehensive learning management system that
            represents the pinnacle of modern educational technology. Founded
            with a mission to bridge the gap between traditional education and
            industry demands, our platform has evolved into a sophisticated
            ecosystem that empowers learners worldwide to achieve their
            professional aspirations in technology.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`${styles.gradient} text-xl font-semibold mb-4`}>
                Our Mission
              </h3>
              <p className="text-[16px] font-Poppins leading-relaxed">
                To democratize high-quality programming education by providing
                accessible, industry-aligned learning experiences that transform
                careers and drive innovation in the technology sector.
              </p>
            </div>
            <div>
              <h3 className={`${styles.gradient} text-xl font-semibold mb-4`}>
                Our Vision
              </h3>
              <p className="text-[16px] font-Poppins leading-relaxed">
                To become the global leader in technology education, fostering a
                community where every individual has the opportunity to excel in
                programming and contribute to the digital transformation of our
                world.
              </p>
            </div>
          </div>

          <div>
            <h3 className={`${styles.gradient} text-xl font-semibold mb-4`}>
              What Sets Us Apart
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Industry-Expert Instructors
                </h4>
                <p className="text-[14px] text-gray-600 dark:text-gray-300">
                  Our curriculum is crafted by senior developers and tech leads
                  from Fortune 500 companies, ensuring content relevance and
                  practical applicability.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">
                  Comprehensive Learning Paths
                </h4>
                <p className="text-[14px] text-gray-600 dark:text-gray-300">
                  Structured progression from fundamentals to advanced concepts,
                  with hands-on projects that mirror real-world development
                  scenarios.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="font-semibold mb-2">Community-Driven Growth</h4>
                <p className="text-[14px] text-gray-600 dark:text-gray-300">
                  A vibrant ecosystem where learners collaborate, share
                  knowledge, and build professional networks that extend beyond
                  the classroom.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className={`${styles.gradient} text-xl font-semibold mb-4`}>
              Our Educational Philosophy
            </h3>
            <p className="text-[18px] font-Poppins leading-relaxed">
              At LMS, we believe that effective learning transcends traditional
              boundaries. Our approach combines cutting-edge technology with
              proven pedagogical methods to create an immersive learning
              experience. We emphasize practical application over theoretical
              knowledge, ensuring that every concept learned translates directly
              into marketable skills.
            </p>
          </div>

          <div>
            <h3 className={`${styles.gradient} text-xl font-semibold mb-4`}>
              Quality Assurance & Standards
            </h3>
            <p className="text-[18px] font-Poppins leading-relaxed">
              Our commitment to excellence is reflected in our rigorous quality
              control processes. Each course undergoes multiple review cycles,
              including peer assessments and industry validation. We maintain
              partnerships with leading technology companies to ensure our
              curriculum remains aligned with current industry standards and
              emerging trends.
            </p>
          </div>

          <div>
            <h3 className={`${styles.gradient} text-xl font-semibold mb-4`}>
              Accessibility & Inclusivity
            </h3>
            <p className="text-[18px] font-Poppins leading-relaxed">
              We are committed to making quality education accessible to all.
              Our platform features adaptive learning technologies, multilingual
              support, and flexible scheduling options. We offer various pricing
              models, including scholarships and corporate partnerships, to
              ensure financial barriers never impede learning opportunities.
            </p>
          </div>

          <div>
            <h3 className={`${styles.gradient} text-xl font-semibold mb-4`}>
              Success Metrics & Impact
            </h3>
            <p className="text-[18px] font-Poppins leading-relaxed">
              Our success is measured by the achievements of our learners. With
              over 10,000+ graduates placed in leading technology companies
              worldwide, our platform has demonstrated consistent results in
              career transformation. We maintain a 95% satisfaction rate and
              continuously track employment outcomes to validate our educational
              effectiveness.
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-lg">
            <h3 className={`${styles.gradient} text-xl font-semibold mb-4`}>
              Join Our Community
            </h3>
            <p className="text-[18px] font-Poppins leading-relaxed">
              Embark on your journey toward programming excellence with LMS.
              Whether you're a complete beginner or an experienced developer
              looking to upskill, our platform provides the resources, support,
              and community you need to succeed. Start your transformation today
              and become part of a global network of successful technology
              professionals.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <span className="font-Cursive text-[22px] text-gray-600 dark:text-gray-300">
              Deepak Kumar Verma
            </span>
            <h5 className="text-[18px] font-Poppins mb-2">
              Founder and Chief Executive Officer
            </h5>
            <p className="text-[14px] text-gray-500 dark:text-gray-400">
              LMS Learning Management System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
