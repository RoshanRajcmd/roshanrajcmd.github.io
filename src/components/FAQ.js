import React from 'react';
import Dropdown from './Dropdown';

const FAQ = ({ darkMode, soundOn }) => (
    <div>
        <h2 className="justify-center text-4xl font-bold mb-4">FAQ</h2>
        <div className="max-w-2xl mx-auto mt-8">
            {[
                {
                    question: "Can I contact you for freelance or full-time opportunities?",
                    answer: "Absolutely! I'm open to both freelance and full-time roles. Please use the emailid to contact me."
                },
                {
                    question: "How can i contact you?",
                    answer: (
                        <>
                            The easiest way to contact me is through my email. Please feel free to{" "}
                            <a
                                href="mailto:roshanraj5121999@gmail.com"
                                className="text-blue-500 underline"
                            >
                                mail me
                            </a>
                        </>
                    )
                },
                {
                    question: "How quickly do you respond to recruitment inquiries?",
                    answer: "I usually respond within 24-48 hours. If you have an urgent request, please mention it in your message."
                },
                {
                    question: "Will you be able to work unfamiliar technologies?",
                    answer: "Yes, I see it as an opportunity to learn and adapt to different tech stack. I believe in continuous learning and growth."
                },
                {
                    question: "Will you be able to work in my timezone?",
                    answer: "Yes, I am flexible with my working hours and can adjust to different time zones as needed."
                },
                {
                    question: "Whats your Hobbies and Free time activities?",
                    answer: "3D printing, Book reading, gaming, and exploring new technologies are some of my hobbies. I also enjoy contributing to open-source projects in my free time."
                },
                {
                    question: "Where are you currently located?",
                    answer: "📍Chennai, India."
                },
                {
                    question: "What other languages you can speak?",
                    answer: "I am fluent in English, Hindi, and Tamil. I also N5 certified in Japanese."
                },
                {
                    question: "Chai or Coffee?",
                    answer: "☕️ Coffee :)"
                }
            ].map((item, idx) => (
                <Dropdown key={idx} question={item.question} answer={item.answer} darkMode={darkMode} soundOn={soundOn} />
            ))}
        </div>
    </div>
);

export default FAQ;
