"use client";

import { useState } from "react";

import { LiaPlusSolid, LiaMinusSolid } from "react-icons/lia";

// interface FAQ {
//   question: string;
//   answer: string;
// }

// interface FAQItemProps {
//   faq: FAQ;
//   isOpen: boolean;
//   onToggle: () => void;
// }

const faqs = [
  {
    question: "What is the purpose of this portal?",
    answer:
      "This job portal connects job seekers with employers, allowing users to discover job opportunities and apply for them easily.",
  },
  {
    question: "How can I create an account?",
    answer:
      "You can create an account by clicking on the 'Sign Up' button and filling in the required information.",
  },
  {
    question: "Is there a fee to use the portal?",
    answer: "No, the job portal is completely free for job seekers to use.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "To reset your password, click on 'Forgot Password' on the login page and follow the instructions sent to your email.",
  },
  {
    question: "Can I apply for multiple jobs?",
    answer:
      "Yes, you can apply for multiple jobs in a day, but be sure to customize your application for each position.",
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function FAQItem({ faq, isOpen, onToggle }: any) {
  return (
    <div className="border-b border-slate-300">
      <div className="flex w-full items-center justify-between py-4 text-left transition">
        <button
          className="flex w-full items-center justify-between hover:underline"
          onClick={onToggle}
        >
          <h3 className="font-medium">{faq.question}</h3>
          <span className="ml-6 flex-shrink-0 transition-transform duration-200">
            {isOpen ? (
              <LiaMinusSolid className="h-5 w-5" />
            ) : (
              <LiaPlusSolid className="h-5 w-5" />
            )}
          </span>
        </button>
      </div>
      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-slate-800">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-5xl w-full py-[2rem] md:py-[4rem] px-4">
      <div className="">
        <h2 className="text-xl font-bold mb-4">Frequently asked questions</h2>
        <div className="divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
