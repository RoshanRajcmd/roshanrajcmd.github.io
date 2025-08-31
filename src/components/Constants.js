// File renamed from constants.js to Constants.js for consistency
// This file will be deleted after renaming. Please manually delete constants.js and use Constants.js instead.

import Project2 from '../assets/Project2.jpg';
import Project3 from '../assets/Project3.png';
import Project4 from '../assets/Project4.png';
import Project5 from '../assets/Project5.png';
import LoadingImage from '../assets/Loading.png';

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

// Projects data for Work section
export const PROJECTS = [
    {
        tag: "Lifestyle",
        title: "MyReads",
        subtitle:
            "A web application that allows users to track and manage their book readings.",
        image: Project4,
        techStack: ["React", "Spring Boot", "MySQL", "Docker", "NGINX",], //Max 5 is permitted
        url: GITHUB_URL + "/myreads-web-app",
    },
    {
        tag: "Desktop",
        title: "PyBrowser",
        subtitle:
            "A custom web browser built with Python and PyQt, featuring a sleek design and essential functionalities.",
        image: Project5,
        techStack: ["Python", "PyQt5", "json-parsing"],
        url: GITHUB_URL + "/py-browser",
    },
    {
        tag: "Lifestyle",
        title: "E-commerce Platform",
        subtitle: "A full-featured e-commerce platform built with React, Node.js, and a SQL database.",
        image: Project3,
        techStack: ["MEAN", "MongoDB", "Angular", "Nodejs", "Docker"],
        url: GITHUB_URL + "/ecom-web-app",
    },
    {
        tag: "Analytics",
        title: "Tweezy",
        subtitle:
            "A Python-based ML application that collects tweets, analyzes their sentiment.",
        image: Project2,
        techStack: ["React", "Python", "ML", "Docker"],
        url: GITHUB_URL + "/tweezy",
    },
    {
        tag: "Desktop",
        title: "EcoType",
        subtitle: "A vocalized typing practice application that helps users improve their typing skills through audio prompts and real-time feedback.",
        image: LoadingImage,
        techStack: ["React", "Spring Boot", "Vite", "Electron"],
        url: "",
    },
    {
        tag: "Fitness",
        title: "Buffit",
        subtitle:
            "A customizable fitness tracking application that helps users monitor their workouts, nutrition, and progress.",
        image: LoadingImage,
        techStack: ["React", "Spring Boot", "TailwindCss"],
        url: "",
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
        description: "I am a software developer with 3+ years of experience in building web and desktop applications. I specialize in full-stack development and have a strong understanding of software engineering principles. My goal is to create impactful and user-friendly applications that solve real-world problems."
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
        compName: "Quess Corp",
        role: "Software Engineer",
        clientCompName: "Client - Renault RNTBCI",
        timePeriod: "2024 - 2025",
        duration: "11m",
        current: true
    },
    {
        compName: "HCL Technologies",
        role: "Software Developer",
        clientCompName: "Client - Ford GTBC",
        timePeriod: "2020 - 2021",
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