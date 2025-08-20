
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
