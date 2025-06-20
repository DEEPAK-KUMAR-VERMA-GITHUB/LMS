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
          <p className={styles.label}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
            similique unde reprehenderit doloribus explicabo iusto quam eos
            error, animi ad, voluptatum, pariatur maxime provident. Assumenda
            laudantium laboriosam cumque, voluptatibus corrupti dolorem neque
            sequi distinctio impedit modi hic ducimus quasi inventore alias rem
            nam vero nobis excepturi. Blanditiis nulla reprehenderit ex.
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
