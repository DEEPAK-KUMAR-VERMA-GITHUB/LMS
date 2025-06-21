import { styles } from "@/app/styles/style";
import Image from "next/image";
import ReviewCard from "../Review/ReviewCard";
import DefaultImage from "../../../public/assets/avatar.png";

export type Review = {
  name: string;
  avatar: string;
  profession: string;
  comment: string;
  ratings: number;
};

export const reviews: Review[] = [
  {
    name: "Rajesh Kumar",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    profession: "Full Stack Developer",
    comment:
      "The comprehensive curriculum helped me transition from a backend role to full stack development. The practical projects and mentor support were invaluable for my growth.",
    ratings: 5,
  },
  {
    name: "Priya Patel",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    profession: "Data Engineer",
    comment:
      "As someone from a non-CS background, this platform made learning data engineering concepts very approachable. The hands-on labs and real-world datasets were excellent.",
    ratings: 4.8,
  },
  {
    name: "Amit Singh",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    profession: "Cloud Architect",
    comment:
      "The cloud computing courses are top-notch. I especially loved the AWS certification preparation track. It helped me secure a great position at a leading tech company.",
    ratings: 4.9,
  },
  {
    name: "Meera Reddy",
    avatar: "https://randomuser.me/api/portraits/women/95.jpg",
    profession: "DevOps Engineer",
    comment:
      "The DevOps course content is industry-relevant and regularly updated. The CI/CD pipeline projects gave me practical experience that I use daily in my work.",
    ratings: 4.7,
  },
];

const Reviews = () => {
  return (
    <div className="w-[90%] md:w-[85%] m-auto">
      <div className="w-full md:flex items-center mb-5">
        <div className="md:w-[50%] w-full">
          <Image src={DefaultImage} alt="reviews" width={700} height={700} />
        </div>

        <div className="md:w-[50%] w-full">
          <h3 className={`${styles.title} md:!text-[40px] `}>
            Our Students Are{" "}
            <span className={styles.gradient}>Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={`${styles.label} text-justify  `}>
            Our learning platform has empowered thousands of students to achieve
            their career goals through industry-relevant courses, expert
            mentorship, and hands-on projects. We take pride in our community of
            learners who consistently demonstrate exceptional growth and success
            in their professional journeys. From beginners taking their first
            steps in tech to experienced professionals looking to upskill, our
            platform provides personalized learning paths that adapt to
            individual needs and career aspirations. Our success stories span
            across diverse backgrounds, industries, and skill levels, proving
            that quality education combined with dedicated support can transform
            careers and open new opportunities. The feedback from our students
            reflects not just the quality of our content, but the strength of
            our community and the commitment of our instructors. Every review
            represents a journey of growth, achievement, and transformation that
            inspires us to continue improving and expanding our educational
            offerings.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(6)]:!mt-[-40px]">
        {reviews &&
          reviews.map((review: any, index: number) => (
            <ReviewCard key={index} review={review} />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
