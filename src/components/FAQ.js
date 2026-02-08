import React from 'react';
import Dropdown from './Dropdown';

const FAQ = ({ darkMode, soundOn }) => (
    <div>
        <h2 className="justify-center text-center text-4xl font-bold mb-4">FAQ</h2>
        <div className="max-w-2xl mx-auto mt-8">
            {[
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
                    answer: "I have some flexibility in my working hours and can adjust to different time zones when required, subject to prior discussion."
                },
                {
                    question: "Whats your Hobbies and Free time activities?",
                    answer: "3D printing, Book reading, gaming, and exploring new technologies or even some new hobbies. I also enjoy contributing to open-source projects in my free time."
                },
                {
                    question: "Where are you currently located?",
                    answer: "📍Bangalore, India."
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
