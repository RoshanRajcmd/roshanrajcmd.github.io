import React from 'react';
import Dropdown from './Dropdown';
import { FAQS } from './Constants';

const FAQ = ({ darkMode, soundOn }) => (
    <div>
        <h2 className="justify-center text-center text-4xl font-bold mb-4">FAQ</h2>
        <div className="max-w-2xl mx-auto mt-8">
            {FAQS.map((item, idx) => (
                <Dropdown
                    key={idx}
                    question={item.question}
                    answer={
                        item.link ? (
                            <>
                                {item.answer}{" "}
                                <a href={item.link.url} className="text-blue-500 underline">
                                    {item.link.label}
                                </a>
                            </>
                        ) : (
                            item.answer
                        )
                    }
                    darkMode={darkMode}
                    soundOn={soundOn}
                />
            ))}
        </div>
    </div>
);

export default FAQ;
