// File renamed from constants.js to Constants.js for consistency
// This file will be deleted after renaming. Please manually delete constants.js and use Constants.js instead.

import Project2 from '../assets/Project2.jpg';
import Project3 from '../assets/Project3.png';
import Project4 from '../assets/Project4.png';
import Project5 from '../assets/Project5.png';
import OtherProject1 from '../assets/OtherProject1.png';
import OtherProject2 from '../assets/OtherProject2.png';
import OtherProject3 from '../assets/OtherProject3.jpg';
import LoadingImage from '../assets/Loading.png';
import { getYearsAndMonthsSinceInWords } from './Utility';

export const CAREER_EXPERIENCE_START_DATE = "2021-09-07"; // yyyy-mm-dd
export const CURRENT_EXPERIENCE_JOIN_DATE = "2025-09-08";

// Skills for About section
export const SKILLS = [
    "Java",
    "SpringBoot",
    "REST APIs",
    "React.js",
    "Python",
    "Flask",
    "Docker & K8",
    "AWS",
    "PL/SQL",
    "Git",
    "Selenium",
    "ORM/JPA - Hibernate",
    "CI/CD tools",
    "SOAP APIs",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Jenkins",
    "Linux/UNIX",
    "Elastic Stack",
    "Redux",
    "Spark",
    "Terraform",
    "Jfrog",
    "Maven",
    "Gradle",
    "GraphQL",
    "Webpack",
    "Vite",
    "TDD",
    "BDD",
    "SonarQube",
    "SonarLint",
    "TMUX"
];

// Initial visible count for About section
export const INITIAL_VISIBLE_SKILLS = 12;

// URLs and other shared constants
export const BLOG_URL = 'https://medium.com/@roshanrajpersonal55';
export const GITHUB_URL = "https://github.com/roshanrajcmd";
export const LINKEDIN_URL = "https://www.linkedin.com/in/roshanraj1999/";
export const BEHANCE_URL = "https://www.behance.net/RoshanRaj512";
export const EMAIL_URL = "mailto:roshanraj5121999@gmail.com";

// Add more shared constants as needed

export const SECTIONS = ['Work', 'About', 'FAQ'];

// Chat / AI related constants
export const ROLE_AI = 'ai';
export const ROLE_USER = 'user';
export const MLC_MODEL_ID = 'Llama-3.2-3B-Instruct-q4f16_1-MLC';

export const EMAIL_ADDRESS = 'roshanraj5121999@gmail.com';

// FAQ entries — shared by the FAQ section and the terminal's /faq command.
// `link` is optional and renders as an anchor after the answer text.
export const FAQS = [
    {
        question: "How can i contact you?",
        answer: "The easiest way to contact me is through my email. Please feel free to",
        link: { label: "mail me", url: EMAIL_URL }
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
];

// Tabs for About section
export const ONLINE = "Online";
export const OFFLINE = "Offline";

// Life away from the keyboard, rendered in the About "Offline" tab
export const OFFLINE_CARDS = [
    {
        title: "3D Printing",
        subtitle: "Modelling and printing my own parts, from functional fixes to desk toys."
    },
    {
        title: "Book Reading",
        subtitle: "Mostly non-fiction and tech; I track everything I read in MyReads."
    },
    {
        title: "Gaming",
        subtitle: "Unwinding with story-driven titles and the occasional competitive run."
    }
];

// Projects data for Work section
export const DEVELOPMENT = "Development";
export const OTHERS = "Others";
export const PROJECTS = [
    {
        tag: "Lifestyle",
        title: "MyReads",
        subtitle:
            "A web application that allows users to track and manage their book readings.",
        image: Project4,
        techStack: ["React", "Spring Boot", "MySQL", "Docker", "NGINX"],
        url: GITHUB_URL + "/myreads-web-app",
        category: DEVELOPMENT,
    },
    {
        tag: "Desktop",
        title: "PyBrowser",
        subtitle:
            "A custom web browser built with Python and PyQt, featuring a sleek design and essential functionalities.",
        image: Project5,
        techStack: ["Python", "PyQt5", "json-parsing"],
        url: GITHUB_URL + "/py-browser",
        category: DEVELOPMENT,
    },
    {
        tag: "Lifestyle",
        title: "E-commerce Platform",
        subtitle: "A full-featured e-commerce platform built with React, Node.js, and a SQL database.",
        image: Project3,
        techStack: ["MEAN", "MongoDB", "Angular", "Nodejs", "Docker"],
        url: GITHUB_URL + "/ecom-web-app",
        category: DEVELOPMENT,
    },
    {
        tag: "Analytics",
        title: "Tweezy",
        subtitle:
            "A Python-based ML application that collects tweets, analyzes their sentiment.",
        image: Project2,
        techStack: ["React", "Python", "ML", "Docker"],
        url: GITHUB_URL + "/tweezy",
        category: DEVELOPMENT,
    },
    {
        tag: "AI",
        title: "Lumi AI",
        subtitle:
            "An AI-powered personal assistant that helps users manage tasks, provide personalized recommendations and preset persona using open-sourced and custom MCP servers with text and voice interactions.",
        image: LoadingImage,
        techStack: ["React", "Flask", "MCP servers", "Docker", "Local LLMs"],
        url: "https://github.com/RoshanRajcmd/ai-comp",
        category: DEVELOPMENT,
    },
    {
        tag: "Desktop",
        title: "EcoType",
        subtitle: "A vocalized typing practice application that helps users improve their typing skills through audio prompts and real-time feedback.",
        image: LoadingImage,
        techStack: ["React", "Spring Boot", "Vite", "Electron"],
        url: "https://github.com/RoshanRajcmd/echotype",
        category: DEVELOPMENT,
    },
    {
        tag: "3D",
        title: "Taketori Armchair",
        subtitle:
            "A modern armchair inspired by Japanese folklore, featuring a minimalist aesthetic and natural materials.",
        image: OtherProject1,
        techStack: ["Blender", "Autodesk", "SketchBook"],
        url: "https://www.behance.net/gallery/206110383/Taketori-Armchair",
        category: OTHERS,
    },
    {
        tag: "3D",
        title: "BAMBOU Desk Lamp",
        subtitle:
            "A desk lamp inspired by the natural beauty of bamboo, featuring a minimalist design and sustainable materials.",
        image: OtherProject2,
        techStack: ["SolidWorks", "Solidworks Visualize"],
        url: "https://www.behance.net/gallery/200061883/BAMBOU-Desk-Lamp",
        category: OTHERS,
    },
    {
        tag: "3D",
        title: "Miscellaneous Works",
        subtitle:
            "A collection of miscellaneous design works to showcase my creativity",
        image: OtherProject3,
        techStack: ["Blender", "Inkscape", "SolidWorks", "Sketchbook"],
        url: "https://www.behance.net/gallery/202752327/Miscellaneous-Works",
        category: OTHERS,
    },
];

// Testimonials for About section
export const TESTIMONIALS = [
    {
        text: "Roshan is a highly skilled developer who always delivers quality work on time. His attention to detail and problem-solving skills are exceptional.",
        author: "Sudha Desigan ",
        role: "Team Lead",
        company: "Ford GTBC"
    },
    {
        text: "Working with Roshan was a pleasure. He brings creativity and dedication to every project.",
        author: "Saravanan",
        role: "Software Developer",
        company: "HCL Technologies"
    },
    {
        text: "Roshan’s technical expertise and collaborative spirit make him an asset to any team.",
        author: "Varun Kumar",
        role: "Software Engineer",
        company: "Renault RNTBCI"
    }
];

// About Me cards for carousel
export const ABOUT_CARDS = [
    {
        title: "♠️ A Jack of All Trades",
        description: "I am a software developer with 4+ years of experience in building web and desktop applications. I specialize in full-stack development and have a strong understanding of software engineering principles. My goal is to create impactful and user-friendly applications that solve real-world problems."
    },
    {
        title: "🪓 Clarity Before Code",
        description: "I believe in sharpening the axe before swinging. That means asking questions, gaining clarity, and learning fast when I don’t know something. My approach ensures I tackle problems with precision, not just speed."
    },
    {
        title: "🤝 Built for Collaboration",
        description: "I work best in teams where ideas flow freely. From pair programming to cross-functional planning, I thrive in collaborative environments where empathy, communication, and shared ownership lead to stronger outcomes—and stronger teams."
    },
    {
        title: "🧩 Fluent in Tech Transitions",
        description: "I adapt quickly to new tools, stacks, and project needs. Whether joining an existing codebase or pioneering a greenfield build, I stay flexible—choosing technologies based on context, not comfort. This allows me to contribute meaningfully across varied technical environments."
    }
];

// Experience Cards
export const EXPERIENCES = [
    {
        compName: "Amazon India",
        role: "SDE 1",
        clientCompName: "",
        timePeriod: "2025",
        duration: getYearsAndMonthsSinceInWords(CURRENT_EXPERIENCE_JOIN_DATE, true),
        current: true
    },
    {
        compName: "Quess Corp",
        role: "Software Engineer",
        clientCompName: "Client - Renault RNTBCI",
        timePeriod: "2024 - 2025",
        duration: "11m",
        current: false
    },
    {
        compName: "HCL Technologies",
        role: "Software Developer",
        clientCompName: "Client - Ford GTBC",
        timePeriod: "2021 - 2024",
        duration: "2y 11m",
        current: false
    }
]

// Certificates Cards
export const CERTIFICATES = [
    {
        certifiName: "AWS Cloud Computing",
        time: "Apr 2025",
        url: "https://www.credly.com/badges/01d0e5e8-b1fb-4c38-b19f-f0e8b836e636/public_url",
    },
    {
        certifiName: "Google Cloud Badges",
        time: "Aug 2025",
        url: "https://www.cloudskillsboost.google/public_profiles/2ea0e69d-29bd-45d1-8945-bc77a9f33c2d",
    },
    {
        certifiName: "Microsoft Learn Trophies",
        time: "Aug 2025",
        url: "https://learn.microsoft.com/en-us/users/me/achievements?tab=tab-modules#trophies-section",
    },
    // {
    //     certifiName: "UX - User Experience",
    //     time: "Sep 2024",
    //     url: "https://www.interaction-design.org/members/roshan-raj/certificate/course/06bddf21-631f-4ac6-9c36-cd97455f2266",
    // },
    // {
    //     certifiName: "UI - Interaction Design",
    //     time: "May 2025",
    //     url: "https://www.interaction-design.org/members/roshan-raj/certificate/course/c7ae43d6-c084-4369-a7bd-9f44d5db7bd9",
    // },
    // {
    //     certifiName: "UI - Accessibility Design",
    //     time: "Oct 2024",
    //     url: "https://www.interaction-design.org/members/roshan-raj/certificate/course/31652279-8d80-498b-929f-9f701984a40d",
    // },
    // {
    //     certifiName: "AWS Cloud Practitioner",
    //     time: "Aug 2025",
    //     url: "",
    // },
    // {
    //     certifiName: "HashiCorp Teraform",
    //     time: "Aug 2025",
    //     url: "",
    // }
]