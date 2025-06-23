import React from 'react';
import Dropdown from './Dropdown';

const FAQ = ({ darkMode }) => (
    <div>
        <h2 className="justify-center text-4xl font-bold mb-4">FAQ</h2>
        <div className="max-w-2xl mx-auto mt-8">
            {[
                {
                    question: "Can I contact you for freelance or full-time opportunities?",
                    answer: "Absolutely! I'm open to both freelance and full-time roles. Please use the emailid to contact me."
                },
                {
                    question: "What technologies do you specialize in?",
                    answer: "I specialize in Java, SpringBoot, React, AWS and modern web development tools. Check my About section for more details."
                },
                {
                    question: "How quickly do you respond to recruitment inquiries?",
                    answer: "I usually respond within 24-48 hours. If you have an urgent request, please mention it in your message."
                }
            ].map((item, idx) => (
                <Dropdown key={idx} question={item.question} answer={item.answer} darkMode={darkMode} />
            ))}
        </div>
    </div>
);

export default FAQ;
