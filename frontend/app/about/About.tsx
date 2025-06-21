import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-black dark:text-white">
      <h1 className={`${styles.title} md:!text-[45px] mb-2`}>
        What is <span className={styles.gradient}>LMS ?</span>
      </h1>
      <div className="w-[95%] md:w-[85%] m-auto">
        <p className="text-[18px] font-Poppins">
          Welcome to LMS, a cutting-edge learning management system designed to empower 
          aspiring programmers on their journey to professional excellence. Our enterprise-grade 
          platform represents the intersection of quality education and accessibility in the 
          programming world, backed by industry-leading technologies and methodologies.
          <br />
          <br />
          As a comprehensive learning ecosystem, LMS was developed with a clear vision: 
          to democratize programming education and make high-quality technical training 
          accessible to everyone. Our platform combines structured learning paths with 
          practical, industry-relevant content to ensure our students develop robust 
          programming skills aligned with current market demands and enterprise standards.
          <br />
          <br />
          Our extensive content library features carefully curated video tutorials, 
          ranging from fundamental programming concepts to advanced development 
          techniques. Each course is meticulously designed by industry experts with decades
          of experience at Fortune 500 companies to provide you with practical, real-world 
          skills that leading employers actively seek.
          <br />
          <br />
          We pride ourselves on maintaining competitive pricing without compromising 
          on quality. Our commitment to affordability ensures that financial 
          constraints never stand between motivated learners and their professional 
          aspirations in the technology sector. Our flexible payment plans and corporate
          partnerships make professional development accessible to individuals and teams alike.
          <br />
          <br />
          The LMS community is our greatest strength. We&apos;ve cultivated an engaging, 
          collaborative environment where students can connect, share experiences, 
          and grow together. Our mentors and community leaders, including senior developers
          and tech leads from prominent companies, are always available to provide guidance 
          and support throughout your learning journey.
          <br />
          <br />
          Through our comprehensive curriculum, hands-on projects, and industry-aligned 
          training, we equip you with the skills and confidence needed to excel in 
          today&apos;s competitive tech landscape. Our success is measured by your growth 
          and achievement in the programming field, evidenced by our graduates working
          at leading technology companies worldwide.
          <br />
          <br />
          Take the first step toward your professional development in programming. 
          Join LMS today and become part of a thriving community dedicated to 
          excellence in technology education. Your journey to becoming a proficient 
          programmer starts here, supported by our enterprise-grade learning platform
          and industry-recognized certification programs.
        </p>
        <br />
        <br />
        <span className="font-Cursive text-[22px]">Deepak Kumar Verma</span>
        <h5 className="text-[18px] font-Poppins mb-6">
          Founder and CEO of LMS
        </h5>
      </div>
    </div>
  );
};

export default About;
