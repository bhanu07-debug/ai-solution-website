

export type Service = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageHint: string;
};

export type Project = {
    id: string;
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    imageHint: string;
};

export type Article = {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    imageUrl: string;
    imageHint: string;
};

export type GalleryItem = {
    id:string;
    src: string;
    alt: string;
    hint: string;
};

export type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
};

export type Career = {
    id: string;
    title: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
    description: string;
}


export const MOCK_SERVICES: Omit<Service, 'id'>[] = [
    {
        title: "AI-Powered Automation",
        description: "Streamline your business processes with intelligent automation solutions that reduce costs and improve efficiency.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "abstract robot"
    },
    {
        title: "Predictive Analytics",
        description: "Leverage your data to forecast trends, understand customer behavior, and make smarter business decisions.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "data charts"
    },
    {
        title: "Natural Language Processing",
        description: "Build powerful applications that understand and process human language, from chatbots to sentiment analysis.",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "speech bubbles"
    }
];

export const MOCK_PROJECTS: Omit<Project, 'id'>[] = [
    {
        title: "E-commerce Rec Engine",
        description: "A personalized recommendation engine that increased customer engagement and sales by 25% for a major online retailer.",
        technologies: ["Python", "TensorFlow", "Next.js"],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "online shopping"
    },
    {
        title: "Healthcare Chatbot",
        description: "An AI-powered chatbot that provides instant, reliable answers to patient inquiries, reducing support ticket volume by 40%.",
        technologies: ["Genkit", "React", "Firestore"],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "medical interface"
    },
    {
        title: "Financial Fraud Detection",
        description: "A real-time fraud detection system that analyzes transaction patterns to prevent fraudulent activity for a fintech company.",
        technologies: ["Scala", "Spark", "PostgreSQL"],
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "secure data"
    }
];

export const MOCK_ARTICLES: Omit<Article, 'id'>[] = [
    {
        title: "The Rise of Generative AI",
        excerpt: "Exploring the impact of generative models on creative industries and beyond. What does the future hold?",
        date: "October 26, 2023",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "abstract art"
    },
    {
        title: "Ethical Considerations in AI",
        excerpt: "A deep dive into the ethical frameworks required to build responsible and fair artificial intelligence systems.",
        date: "October 15, 2023",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "balanced scales"
    },
    {
        title: "Getting Started with Machine Learning",
        excerpt: "A beginner's guide to the fundamental concepts of machine learning, with practical tips and resources.",
        date: "October 1, 2023",
        imageUrl: "https://placehold.co/600x400.png",
        imageHint: "code terminal"
    }
];

export const MOCK_GALLERY_ITEMS: Omit<GalleryItem, 'id'>[] = [
    { src: 'https://placehold.co/600x800.png', alt: 'AI concept art 1', hint: 'futuristic city' },
    { src: 'https://placehold.co/600x600.png', alt: 'AI concept art 2', hint: 'glowing forest' },
    { src: 'https://placehold.co/800x600.png', alt: 'AI concept art 3', hint: 'cybernetic animal' },
    { src: 'https://placehold.co/600x700.png', alt: 'AI concept art 4', hint: 'abstract shapes' },
    { src: 'https://placehold.co/700x600.png', alt: 'AI concept art 5', hint: 'underwater world' },
    { src: 'https://placehold.co/600x600.png', alt: 'AI concept art 6', hint: 'space nebula' }
];

export const MOCK_EVENTS: Omit<Event, 'id'>[] = [
    {
        title: "Global AI Summit 2024",
        date: "November 12-14, 2024",
        location: "San Francisco, CA",
        description: "Join us at the world's leading AI conference to explore the latest trends and network with industry experts."
    },
    {
        title: "Webinar: The Future of Work with AI",
        date: "December 5, 2024",
        location: "Virtual",
        description: "A live webinar discussing how AI is transforming workplaces and what it means for your career."
    }
];

export const MOCK_CAREERS: Omit<Career, 'id'>[] = [
    {
        title: "Senior AI Engineer",
        location: "San Francisco, CA (Hybrid)",
        type: "Full-time",
        description: "We are seeking an experienced AI Engineer to lead the development of our next-generation machine learning models. You will be responsible for designing, building, and deploying scalable AI solutions that solve real-world problems."
    },
    {
        title: "Frontend Developer (React)",
        location: "Remote",
        type: "Full-time",
        description: "Join our talented frontend team to build beautiful and intuitive user interfaces for our AI-powered applications. You should have a strong command of React, Next.js, and modern web technologies."
    },
    {
        title: "Data Science Intern",
        location: "New York, NY",
        type: "Internship",
        description: "This is an exciting opportunity for a current student or recent graduate to gain hands-on experience in data science. You will work alongside our team of experts on challenging projects, from data analysis to model building."
    }
];
