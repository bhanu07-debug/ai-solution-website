
import { Bot, Code, Rocket } from "lucide-react";

export type Service = {
    id: string;
    title: string;
    description: string;
    icon: string;
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
    id: string;
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


export const services: Service[] = [
    { id: 's1', title: 'AI Automation', description: 'Streamline your operations with our cutting-edge AI automation solutions.', icon: 'Bot' },
    { id: 's2', title: 'Custom Models', description: 'Develop bespoke AI models tailored to your unique business challenges.', icon: 'Code' },
    { id: 's3', title: 'Strategic Consulting', description: 'Leverage our expertise to craft and implement a winning AI strategy.', icon: 'Rocket' },
];

export const projects: Project[] = [
    { id: 'p1', title: "E-commerce Recommendation Engine", description: "A recommendation engine that increased sales by 20% for a major e-commerce platform.", technologies: ["React", "Next.js", "Python", "TensorFlow"], imageUrl: "https://placehold.co/600x400.png", imageHint: "e-commerce analysis" },
    { id: 'p2', title: "Healthcare Diagnostic Tool", description: "An AI-powered tool that assists doctors in diagnosing diseases with higher accuracy.", technologies: ["PyTorch", "Flask", "React", "Next.js"], imageUrl: "https://placehold.co/600x400.png", imageHint: "medical technology" },
    { id: 'p3', title: "Financial Fraud Detection", description: "A system that detects and prevents fraudulent transactions in real-time.", technologies: ["Java", "Spring Boot", "Kafka", "Scikit-learn"], imageUrl: "https://placehold.co/600x400.png", imageHint: "financial security" },
];

export const articles: Article[] = [
    { id: 'a1', title: "The Future of AI in Business", date: "October 26, 2023", excerpt: "Discover how AI is reshaping industries and what it means for your business.", imageUrl: "https://placehold.co/600x400.png", imageHint: "future technology" },
    { id: 'a2', title: "Getting Started with Machine Learning", date: "October 20, 2023", excerpt: "A beginner-friendly guide to the core concepts of machine learning.", imageUrl: "https://placehold.co/600x400.png", imageHint: "machine learning" },
    { id: 'a3', title: "Ethical Considerations in AI", date: "October 15, 2023", excerpt: "Navigating the complex ethical landscape of artificial intelligence.", imageUrl: "https://placehold.co/600x400.png", imageHint: "ai ethics" },
];

export const gallery: GalleryItem[] = [
    { id: 'g1', src: "https://placehold.co/600x400.png", alt: "AI generated art 1", hint: "abstract art" },
    { id: 'g2', src: "https://placehold.co/400x600.png", alt: "AI generated art 2", hint: "futuristic city" },
    { id: 'g3', src: "https://placehold.co/600x400.png", alt: "AI generated art 3", hint: "robot human" },
    { id: 'g4', src: "https://placehold.co/600x400.png", alt: "AI generated art 4", hint: "data visualization" },
    { id: 'g5', src: "https://placehold.co/400x600.png", alt: "AI generated art 5", hint: "surreal landscape" },
    { id: 'g6', src: "https://placehold.co/600x400.png", alt: "AI generated art 6", hint: "cybernetic organism" },
];

export const events: Event[] = [
    { id: 'e1', title: "AI & The Future of Work Summit", date: "November 15, 2023", location: "Virtual", description: "Join industry leaders to discuss the impact of AI on the workforce and how to prepare for the future." },
    { id: 'e2', title: "Advanced Machine Learning Workshop", date: "December 5, 2023", location: "San Francisco, CA", description: "A hands-on workshop for developers looking to deepen their ML skills." },
    { id: 'e3', title: "AI in Healthcare Conference", date: "January 20, 2024", location: "Boston, MA", description: "Exploring the latest innovations in AI for patient care, diagnostics, and research." },
];
