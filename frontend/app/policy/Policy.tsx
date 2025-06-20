import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="text-black dark:text-white">
      <div className="w-[95%] md:w-[92%] m-auto py-2">
        <h1 className={`${styles.title} !text-start pt-2`}>
          LMS Platform Terms and Conditions
        </h1>
        <ul className="list-none ml-[15px]">
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Welcome to our LMS Platform. By accessing and using this platform, you agree to be bound by these Terms and Conditions. Please read them carefully before proceeding with registration or using any of our services.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            1. User Registration
            Users must provide accurate and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            2. Course Access and Usage
            Upon successful enrollment, users gain access to course materials for the duration specified. Course materials are for personal use only and may not be shared, copied, or distributed without explicit permission.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            3. Payment and Refunds
            Course fees must be paid in full before accessing content. Refund requests are considered within 7 days of purchase, provided no more than 20% of the course has been accessed.
          </p>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            4. Intellectual Property
            All course content, including videos, documents, and assessments, is protected by copyright law. Unauthorized reproduction or distribution is strictly prohibited.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            5. User Conduct
            Users must behave professionally and respectfully in all platform interactions. Harassment, spam, or disruptive behavior will result in immediate account termination.
          </p>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            6. Platform Availability
            While we strive for 99.9% uptime, we cannot guarantee uninterrupted access to the platform. Maintenance windows will be communicated in advance whenever possible.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            7. Privacy and Data Protection
            We collect and process personal data in accordance with our Privacy Policy. User data is handled securely and in compliance with applicable data protection regulations.
          </p>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            8. Modifications to Terms
            We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use of the platform constitutes acceptance of modified terms.
          </p>
          <br />
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            For any questions or concerns regarding these terms, please contact our support team at support@elearning.com. Last updated: January 2024.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Policy;
