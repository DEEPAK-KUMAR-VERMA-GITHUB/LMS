import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import { styles } from "@/app/styles/style";
import { HiMinus, HiPlus } from "react-icons/hi";

const FAQ = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout?.faq);
    }
  }, [data]);

  const toggleQuestion = (id: any) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className=" w-[90%] md:w-[80%] m-auto">
      <h1 className={`${styles.title} md:text-[40px]`}>
        Frequently Asked Questions
      </h1>

      <div className="mt-12">
        <dl className="space-y-8 mb-8">
          {questions?.map((q: any) => (
            <div
              key={q._id}
              className={`${
                q._id !== questions[0]?._id && "border-t"
              } border-gray-200 pt-6`}
            >
              <dt className="text-lg">
                <button
                  className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                  onClick={() => toggleQuestion(q._id)}
                  aria-expanded={activeQuestion === q._id}
                  aria-controls={`faq-answer-${q._id}`}
                >
                  <span className="font-medium text-black dark:text-white">
                    {q.question}
                  </span>

                  <span className="ml-6 flex-shrink-0">
                    {activeQuestion === q._id ? (
                      <HiMinus className="h-6 w-6" />
                    ) : (
                      <HiPlus className="h-6 w-6" />
                    )}
                  </span>
                </button>
              </dt>
              {activeQuestion === q._id && (
                <dd className="mt-2 pr-12">
                  <p className="text-base font-Poppins text-black dark:text-white">
                    {q.answer}
                  </p>
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default FAQ;
