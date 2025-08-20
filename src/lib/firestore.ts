
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, Timestamp, DocumentData } from 'firebase/firestore';
import type { Service, Project, Article, GalleryItem, Event } from './mock-data';
import type { Feedback } from './types';

// Generic Firestore CRUD operations

// CREATE
export const createItem = async <T extends DocumentData>(collectionPath: string, data: T) => {
    const docRef = await addDoc(collection(db, collectionPath), { ...data, createdAt: serverTimestamp() });
    return { ...data, id: docRef.id };
};

// READ all items
export const getItems = async <T>(collectionPath: string): Promise<(T & { id: string })[]> => {
    try {
        const snapshot = await getDocs(collection(db, collectionPath));
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Firestore Timestamps to JS Date objects.
            // This is crucial for Next.js to avoid hydration errors, as Timestamps are not directly serializable.
            Object.keys(data).forEach(key => {
                if (data[key] instanceof Timestamp) {
                    data[key] = data[key].toDate();
                }
            });
            return { ...data, id: doc.id } as T & { id: string };
        });
    } catch (error) {
        console.error(`Error fetching items from ${collectionPath}:`, error);
        // In case of an error, return an empty array to prevent the app from crashing.
        return [];
    }
};

// UPDATE
export const updateItem = async <T>(collectionPath: string, id: string, data: Partial<T>) => {
    const docRef = doc(db, collectionPath, id);
    await updateDoc(docRef, data as DocumentData);
};

// DELETE
export const deleteItem = async (collectionPath: string, id: string) => {
    const docRef = doc(db, collectionPath, id);
    await deleteDoc(docRef);
};


// Specific functions for each collection
export const getServices = () => getItems<Service>('services');
export const createService = (data: Omit<Service, 'id'>) => createItem<Omit<Service, 'id'>>('services', data);
export const updateService = (id: string, data: Partial<Service>) => updateItem<Service>('services', id, data);
export const deleteService = (id: string) => deleteItem('services', id);

export const getProjects = async () => {
    try {
        return await getItems<Project>('projects');
    } catch (error) {
        console.error("Failed to fetch projects, returning empty array.", error);
        return [];
    }
};
export const createProject = (data: Omit<Project, 'id'>) => createItem<Omit<Project, 'id'>>('projects', data);
export const updateProject = (id: string, data: Partial<Project>) => updateItem<Project>('projects', id, data);
export const deleteProject = (id: string) => deleteItem('projects', id);

export const getArticles = () => getItems<Article>('articles');
export const createArticle = (data: Omit<Article, 'id'>) => createItem<Omit<Article, 'id'>>('articles', data);
export const updateArticle = (id: string, data: Partial<Article>) => updateItem<Article>('articles', id, data);
export const deleteArticle = (id: string) => deleteItem('articles', id);

export const getGalleryItems = () => getItems<GalleryItem>('gallery');
export const createGalleryItem = (data: Omit<GalleryItem, 'id'>) => createItem<Omit<GalleryItem, 'id'>>('gallery', data);
export const updateGalleryItem = (id: string, data: Partial<GalleryItem>) => updateItem<GalleryItem>('gallery', id, data);
export const deleteGalleryItem = (id: string) => deleteItem('gallery', id);

export const getEvents = () => getItems<Event>('events');
export const createEvent = (data: Omit<Event, 'id'>) => createItem<Omit<Event, 'id'>>('events', data);
export const updateEvent = (id: string, data: Partial<Event>) => updateItem<Event>('events', id, data);
export const deleteEvent = (id: string) => deleteItem('events', id);

export const getFeedback = () => getItems<Feedback>('feedback');
export const createFeedback = (data: Omit<Feedback, 'id' | 'status' | 'createdAt'>) => {
    const feedbackData: Omit<Feedback, 'id' | 'createdAt'> & {createdAt: Date} = {
        ...data,
        status: 'pending',
        createdAt: new Date(),
    };
    return createItem('feedback', feedbackData);
};
export const updateFeedbackStatus = (id: string, status: 'approved' | 'rejected') => updateItem('feedback', id, { status });
