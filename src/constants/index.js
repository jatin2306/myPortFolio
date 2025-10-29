import { meta, shopify, starbucks, tesla, logo, nuvamawealth, deopersindia } from "../assets/images";
import {
    bitbucket,
    bootstrap,
    car,
    chart,
    codesplitting,
    confluence,
    contact,
    css,
    docker,
    estate,
    express,
    git,
    github,
    gitlab,
    graphql,
    html,
    imageopt,
    javascript,
    jest,
    jira,
    jwt,
    Kubernetes,
    lazyloading,
    linkedin,
    mongodb,
    motion,
    mui,
    mysql,
    nextjs,
    nodejs,
    oauth,
    pricewise,
    react,
    reacttesting,
    redux,
    restfulapi,
    sass,
    snapgram,
    summiz,
    supabase,
    superset,
    tailwindcss,
    threads,
    typescript
} from "../assets/icons";

export const skills = [
  // Frontend
  { imageUrl: html, name: "HTML", type: "Frontend" },
  { imageUrl: css, name: "CSS", type: "Frontend" },
  { imageUrl: javascript, name: "JavaScript (ES6)", type: "Frontend" },
  { imageUrl: typescript, name: "TypeScript", type: "Frontend" },
  { imageUrl: react, name: "React.js", type: "Frontend" },
  { imageUrl: nextjs, name: "Next.js", type: "Frontend" },
  { imageUrl: redux, name: "Redux (Flux)", type: "State Management" },
  { imageUrl: mui, name: "Material-UI", type: "Frontend" },
  { imageUrl: tailwindcss, name: "Tailwind CSS", type: "Frontend" },
  { imageUrl: bootstrap, name: "Bootstrap", type: "Frontend" },
  { imageUrl: sass, name: "Sass", type: "Frontend" },
  { imageUrl: motion, name: "Framer Motion", type: "Animation" },

  // Backend
  { imageUrl: nodejs, name: "Node.js", type: "Backend" },
  { imageUrl: express, name: "Express.js", type: "Backend" },

  // Database
  { imageUrl: mysql, name: "MySQL", type: "Database" },
  { imageUrl: mongodb, name: "MongoDB", type: "Database" },
  { imageUrl: supabase, name: "Supabase", type: "Database" },

  // Data Visualization
  { imageUrl: superset, name: "Apache Superset", type: "Data Visualization" },
  { imageUrl: chart, name: "Chart.js", type: "Data Visualization" },

  // Version Control / Collaboration
  { imageUrl: git, name: "Git", type: "Version Control" },
  { imageUrl: github, name: "GitHub", type: "Version Control" },
  { imageUrl: bitbucket, name: "Bitbucket", type: "Version Control" },
  { imageUrl: jira, name: "Jira", type: "Project Management" },
  { imageUrl: confluence, name: "Confluence", type: "Project Management" },

  // APIs & Auth
  { imageUrl: restfulapi, name: "RESTful APIs", type: "API" },
  { imageUrl: graphql, name: "GraphQL", type: "API" },
  { imageUrl: jwt, name: "JWT", type: "Authentication" },
  { imageUrl: oauth, name: "OAuth", type: "Authentication" },

  // Testing
  { imageUrl: jest, name: "Jest", type: "Testing" },
  { imageUrl: reacttesting, name: "React Testing Library", type: "Testing" },

  // DevOps / Deployment
  { imageUrl: docker, name: "Docker", type: "DevOps" },
  { imageUrl: Kubernetes, name: "Kubernetes", type: "DevOps" },
  { imageUrl: gitlab, name: "GitLab CI/CD", type: "DevOps" },

  // Performance
  { imageUrl: codesplitting, name: "Code Splitting", type: "Performance" },
  { imageUrl: lazyloading, name: "Lazy Loading", type: "Performance" },
  { imageUrl: imageopt, name: "Image Optimization", type: "Performance" }
];

export const experiences = [
    {
        title: "Software Developer (Payroll through - MoonStack)",
        company_name: "Nuvama Wealth",
        icon: nuvamawealth,
        iconBg: "#9333ea",
        date: "06/2025 - Present | Remote",
        points: [
            "Developing and maintaining the Order Book module, ensuring high performance and seamless integration.",
            "Building and extending a React-based library for Apache Superset for dynamic, reusable, and scalable dashboard components.",
            "Designing and implementing configurable dashboards in Superset based on Figma prototypes, ensuring UI consistency and improved user experience.",
            "Collaborating with product managers, designers, and data teams to gather requirements, improve data visualization, and streamline analytics workflows.",
            "Optimizing dashboard performance by implementing query caching, reducing load times by up to 40%.",
            "Integrating role-based access controls for secure and personalized data views.",
        ],
    },
    {
        title: "Software Engineer",
        company_name: "Deopersindia",
        icon: deopersindia,
        iconBg: "#10b981",
        date: "2022 - 2025 | Noida, India",
        points: [
            "Designed and developed a fully responsive web application for IDFC First Bank using React.js, Tailwind CSS, and Bootstrap, achieving 100% mobile compatibility and seamless performance.",
            "Created 20+ reusable UI components, increasing development speed by 35% and ensuring consistent design.",
            "Improved page load speed by 80% through optimization techniques including lazy loading, intelligent caching, and minimizing redundant API calls.",
            "Boosted application stability by implementing advanced error handling strategies using React Error Boundaries and custom hooks, reducing crash incidents by 60% in production.",
            "Collaborated with cross-functional teams (Product, UX, QA) to launch critical features 2 weeks ahead of schedule, increasing stakeholder satisfaction and team efficiency.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/jatin2306',
    }
];

export const projects = [
    {
        iconUrl: pricewise,
        theme: 'btn-back-red',
        name: 'Amazon Price Tracker',
        description: 'Developed a web application that tracks and notifies users of price changes for products on Amazon, helping users find the best deals.',
        link: 'https://github.com/adrianhajdin/pricewise',
    },
    {
        iconUrl: threads,
        theme: 'btn-back-green',
        name: 'Full Stack Threads Clone',
        description: 'Created a full-stack replica of the popular discussion platform "Threads," enabling users to post and engage in threaded conversations.',
        link: 'https://github.com/adrianhajdin/threads',
    },
    {
        iconUrl: car,
        theme: 'btn-back-blue',
        name: 'Car Finding App',
        description: 'Designed and built a mobile app for finding and comparing cars on the market, streamlining the car-buying process.',
        link: 'https://github.com/adrianhajdin/project_next13_car_showcase',
    },
    {
        iconUrl: snapgram,
        theme: 'btn-back-pink',
        name: 'Full Stack Instagram Clone',
        description: 'Built a complete clone of Instagram, allowing users to share photos and connect with friends in a familiar social media environment.',
        link: 'https://github.com/adrianhajdin/social_media_app',
    },
    {
        iconUrl: estate,
        theme: 'btn-back-black',
        name: 'Real-Estate Application',
        description: 'Developed a web application for real estate listings, facilitating property searches and connecting buyers with sellers.',
        link: 'https://github.com/adrianhajdin/projects_realestate',
    },
    {
        iconUrl: summiz,
        theme: 'btn-back-yellow',
        name: 'AI Summarizer Application',
        description: 'App that leverages AI to automatically generate concise & informative summaries from lengthy text content, or blogs.',
        link: 'https://github.com/adrianhajdin/project_ai_summarizer',
    }
];