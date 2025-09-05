

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
        imageUrl: "https://picsum.photos/seed/automation/600/400",
        imageHint: "abstract robot"
    },
    {
        title: "Predictive Analytics",
        description: "Leverage your data to forecast trends, understand customer behavior, and make smarter business decisions.",
        imageUrl: "https://picsum.photos/seed/analytics/600/400",
        imageHint: "data charts"
    },
    {
        title: "Natural Language Processing",
        description: "Build powerful applications that understand and process human language, from chatbots to sentiment analysis.",
        imageUrl: "https://picsum.photos/seed/language/600/400",
        imageHint: "speech bubbles"
    }
];

export const MOCK_PROJECTS: Omit<Project, 'id'>[] = [
    {
        title: "E-commerce Rec Engine",
        description: "A personalized recommendation engine that increased customer engagement and sales by 25% for a major online retailer.",
        technologies: ["Python", "TensorFlow", "Next.js"],
        imageUrl: "https://picsum.photos/seed/ecommerce/600/400",
        imageHint: "online shopping"
    },
    {
        title: "Healthcare Chatbot",
        description: "An AI-powered chatbot that provides instant, reliable answers to patient inquiries, reducing support ticket volume by 40%.",
        technologies: ["Genkit", "React", "Firestore"],
        imageUrl: "https://picsum.photos/seed/healthcare/600/400",
        imageHint: "medical interface"
    },
    {
        title: "Financial Fraud Detection",
        description: "A real-time fraud detection system that analyzes transaction patterns to prevent fraudulent activity for a fintech company.",
        technologies: ["Scala", "Spark", "PostgreSQL"],
        imageUrl: "https://picsum.photos/seed/finance/600/400",
        imageHint: "secure data"
    }
];

export const MOCK_ARTICLES: Omit<Article, 'id'>[] = [
    {
        title: "The Rise of Generative AI",
        excerpt: "Exploring the impact of generative models on creative industries and beyond. What does the future hold?",
        date: "October 26, 2023",
        imageUrl: "https://picsum.photos/seed/genai/600/400",
        imageHint: "abstract art"
    },
    {
        title: "Ethical Considerations in AI",
        excerpt: "A deep dive into the ethical frameworks required to build responsible and fair artificial intelligence systems.",
        date: "October 15, 2023",
        imageUrl: "https://picsum.photos/seed/ethics/600/400",
        imageHint: "balanced scales"
    },
    {
        title: "Getting Started with Machine Learning",
        excerpt: "A beginner's guide to the fundamental concepts of machine learning, with practical tips and resources.",
        date: "October 1, 2023",
        imageUrl: "https://picsum.photos/seed/ml/600/400",
        imageHint: "code terminal"
    }
];

export const MOCK_GALLERY_ITEMS: Omit<GalleryItem, 'id'>[] = [
    { src: 'https://picsum.photos/seed/gallery1/600/800', alt: 'AI concept art 1', hint: 'futuristic city' },
    { src: 'https://picsum.photos/seed/gallery2/600/600', alt: 'AI concept art 2', hint: 'glowing forest' },
    { src: 'https://picsum.photos/seed/gallery3/800/600', alt: 'AI concept art 3', hint: 'cybernetic animal' },
    { src: 'https://picsum.photos/seed/gallery4/600/700', alt: 'AI concept art 4', hint: 'abstract shapes' },
    { src: 'https://picsum.photos/seed/gallery5/700/600', alt: 'AI concept art 5', hint: 'underwater world' },
    { src: 'https://picsum.photos/seed/gallery6/600/600', alt: 'AI concept art 6', hint: 'space nebula' }
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
