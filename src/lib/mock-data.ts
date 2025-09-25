

export type Service = {
    id: string;
    title: string;
    description: string;
    benefits: string[];
    price: string;
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
    content: string;
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
    time: string;
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
        benefits: ["Automated decision-making", "Predictive analytics capabilities", "Custom algorithm development"],
        price: "$5000"
    },
    {
        title: "Predictive Analytics",
        description: "Leverage your data to forecast trends, understand customer behavior, and make smarter business decisions.",
        benefits: ["Interactive dashboards", "Statistical analysis", "Predictive modeling"],
        price: "$4500"
    },
    {
        title: "Natural Language Processing",
        description: "Build powerful applications that understand and process human language, from chatbots to sentiment analysis.",
        benefits: ["Intelligent chatbot development", "Sentiment analysis & monitoring", "Text classification & extraction"],
        price: "$4000"
    },
    {
        title: "Computer Vision",
        description: "Enable systems to interpret and understand the visual world through images and videos.",
        benefits: ["Object detection & recognition", "Quality control automation", "Real-time video analysis"],
        price: "$6000"
    },
    {
        title: "AI Consulting & Strategy",
        description: "Develop a roadmap to integrate AI into your business, identifying opportunities and ensuring a smooth implementation.",
        benefits: ["AI strategy development", "Technology assessment", "Implementation roadmap"],
        price: "$2500"
    },
     {
        title: "Business Process Automation",
        description: "Automate repetitive tasks and workflows to increase efficiency and reduce operational costs.",
        benefits: ["Workflow automation", "Document processing", "Data integration"],
        price: "$3000"
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
        content: `
          <p>Artificial intelligence (AI) has become an integral part of our daily lives, from facial recognition software to self-driving cars. Machine learning, a core component of AI, allows algorithms to learn from data without explicit programming. Generative AI, a subfield of AI, stands apart by focusing on creating entirely new data. Unlike traditional AI, which analyses existing data for problem-solving or predictions, generative AI leverages its understanding of data patterns to create entirely new content. It is revolutionizing content creation with its ability to produce entirely new data across various formats. This technology is rapidly evolving, with experts predicting significant advancements in 2024.</p>
          <p>This article explores the potential of generative AI in text, audio, photo, and video generation, showcasing applications in healthcare, education, and more. While acknowledging challenges like bias and explainability, it emphasizes the importance of responsible development to harness generative AI’s benefits. Additionally, it examines limitations in data dependence, adaptability, and true creative capacity, highlighting areas for future research to push the boundaries of this transformative technology.</p>
          <h2>The Difference Between AI and Generative AI</h2>
          <p>Though AI and generative AI are intelligent systems, they have distinct purposes. Traditional AI analyses existing data to solve problems or perform tasks such as spam filters and facial recognition. Generative AI, on the other hand, creates entirely new data, like images from text descriptions or creative text formats. Traditional AI operates in a closed loop, using existing information. Generative AI, however, operates in an open loop, learning from data to create entirely new content (text, code, images, and video).</p>
          <p>This opens doors for applications in creative industries, scientific research, and product design. While both AI approaches require expertise, advancements make generative AI more accessible to developers and creators. In short, traditional AI analyzes, while generative AI creates, revolutionizing industries and enhancing user experiences.</p>
        `,
        date: "October 26, 2023",
        imageUrl: "https://picsum.photos/seed/genai/600/400",
        imageHint: "abstract art"
    },
    {
        title: "Ethical Considerations in AI",
        excerpt: "A deep dive into the ethical frameworks required to build responsible and fair artificial intelligence systems.",
        content: "<h2>Navigating the Moral Maze of AI</h2><p>As artificial intelligence becomes more integrated into our daily lives, the ethical implications of its use are more critical than ever. Issues of bias, privacy, accountability, and transparency must be addressed to ensure that AI systems are developed and deployed responsibly.</p><p>This post examines the key ethical challenges posed by AI. We discuss the importance of creating fair and unbiased algorithms, the need for robust data privacy measures, and the debate around accountability when an AI system makes a mistake. Join us as we explore the path toward building a future where AI serves humanity in a just and equitable manner.</p><h3>The Pillars of Responsible AI</h3><p><strong>Fairness:</strong> Ensuring that AI systems do not perpetuate or amplify existing societal biases.</p><p><strong>Transparency:</strong> Making the decision-making process of AI models understandable to humans.</p><p><strong>Accountability:</strong> Establishing clear lines of responsibility for the actions of AI systems.</p>",
        date: "October 15, 2023",
        imageUrl: "https://picsum.photos/seed/ethics/600/400",
        imageHint: "balanced scales"
    },
    {
        title: "Getting Started with Machine Learning",
        excerpt: "A beginner's guide to the fundamental concepts of machine learning, with practical tips and resources.",
        content: "<h2>Your Journey into Machine Learning Begins Here</h2><p>Machine learning can seem intimidating, but at its core, it's about teaching computers to learn from data. This guide is designed for absolute beginners who are curious about the world of ML but don't know where to start.</p><p>We will break down the fundamental concepts, such as supervised vs. unsupervised learning, regression, and classification. We'll also provide a curated list of resources, including online courses, books, and hands-on projects, to help you embark on your machine learning journey. By the end of this article, you'll have a clear roadmap for developing your skills and building your first model.</p><h3>First Steps:</h3><ol><li>Choose a programming language (Python is recommended).</li><li>Learn the basics of data manipulation with libraries like Pandas.</li><li>Start with a simple dataset and try to build a basic classification model.</li></ol>",
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
        time: "9:00 AM - 5:00 PM PST",
        location: "San Francisco, CA",
        description: "Join us at the world's leading AI conference to explore the latest trends and network with industry experts."
    },
    {
        title: "Webinar: The Future of Work with AI",
        date: "December 5, 2024",
        time: "10:00 AM PST",
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

    
