
import { db } from './firebase';
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, Timestamp, DocumentData, writeBatch } from 'firebase/firestore';
import { type Service, type Project, type Article, type GalleryItem, type Event, type Career, MOCK_SERVICES, MOCK_PROJECTS, MOCK_ARTICLES, MOCK_GALLERY_ITEMS, MOCK_EVENTS, MOCK_CAREERS } from './mock-data';
import type { Feedback, Inquiry } from './types';

// Generic Firestore CRUD operations

// CREATE
export const createItem = async <T extends DocumentData>(collectionPath: string, data: T) => {
    const docRef = await addDoc(collection(db, collectionPath), { ...data, createdAt: serverTimestamp() });
    const docSnap = await getDoc(docRef); // Fetch the document we just created
    if (!docSnap.exists()) {
        // This case is unlikely but good to handle.
        throw new Error("Failed to create and retrieve the document.");
    }
    const createdData = docSnap.data();
    // Convert timestamp to a serializable format (string)
    const serializableData = {
        ...createdData,
        id: docRef.id,
        createdAt: createdData?.createdAt instanceof Timestamp ? createdData.createdAt.toDate().toISOString() : new Date().toISOString(),
    };
    return serializableData as T & { id: string; createdAt: string };
};


// READ all items
export const getItems = async <T>(collectionPath: string, mockData?: Omit<T, 'id'>[]): Promise<(T & { id: string })[]> => {
    try {
        const snapshot = await getDocs(collection(db, collectionPath));
        if (snapshot.empty && mockData) {
            // If the collection is empty and mock data is provided, populate it.
            const batch = writeBatch(db);
            mockData.forEach(item => {
                const docRef = doc(collection(db, collectionPath));
                batch.set(docRef, { ...item, createdAt: serverTimestamp() });
            });
            await batch.commit();
            // Fetch the newly created items
            const newSnapshot = await getDocs(collection(db, collectionPath));
            return newSnapshot.docs.map(doc => {
                const data = doc.data();
                // Convert Timestamps to ISO strings for serializability
                Object.keys(data).forEach(key => {
                    if (data[key] instanceof Timestamp) {
                        data[key] = data[key].toDate().toISOString();
                    }
                });
                return { ...data, id: doc.id } as T & { id: string };
            });
        }
        return snapshot.docs.map(doc => {
            const data = doc.data();
            // Convert Firestore Timestamps to ISO strings for serializability.
            Object.keys(data).forEach(key => {
                if (data[key] instanceof Timestamp) {
                   data[key] = data[key].toDate().toISOString();
                }
            });
            return { ...data, id: doc.id } as T & { id: string };
        });
    } catch (error) {
        console.error(`Error fetching items from ${collectionPath}:`, error);
        return [];
    }
};

// READ a single item by ID
export const getItemById = async <T>(collectionPath: string, id: string): Promise<(T & { id: string }) | null> => {
    try {
        const docRef = doc(db, collectionPath, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            // Convert Firestore Timestamps to ISO strings.
            Object.keys(data).forEach(key => {
                if (data[key] instanceof Timestamp) {
                    data[key] = data[key].toDate().toISOString();
                }
            });
            return { ...data, id: docSnap.id } as T & { id: string };
        } else {
            console.log(`No document found with id ${id} in ${collectionPath}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching item with id ${id} from ${collectionPath}:`, error);
        return null;
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
export const getServices = () => getItems<Service>('services', MOCK_SERVICES);
export const createService = (data: Omit<Service, 'id'>) => createItem<Omit<Service, 'id'>>('services', data);
export const updateService = (id: string, data: Partial<Service>) => updateItem<Service>('services', id, data);
export const deleteService = (id: string) => deleteItem('services', id);

export const getProjects = () => getItems<Project>('projects', MOCK_PROJECTS);
export const getProject = (id: string) => getItemById<Project>('projects', id);
export const createProject = (data: Omit<Project, 'id'>) => createItem<Omit<Project, 'id'>>('projects', data);
export const updateProject = (id: string, data: Partial<Project>) => updateItem<Project>('projects', id, data);
export const deleteProject = (id: string) => deleteItem('projects', id);

export const getArticles = () => getItems<Article>('articles', MOCK_ARTICLES);
export const getArticle = (id: string) => getItemById<Article>('articles', id);
export const createArticle = (data: Omit<Article, 'id'>) => createItem<Omit<Article, 'id'>>('articles', data);
export const updateArticle = (id: string, data: Partial<Article>) => updateItem<Article>('articles', id, data);
export const deleteArticle = (id: string) => deleteItem('articles', id);

export const getGalleryItems = () => getItems<GalleryItem>('gallery', MOCK_GALLERY_ITEMS);
export const createGalleryItem = (data: Omit<GalleryItem, 'id'>) => createItem<Omit<GalleryItem, 'id'>>('gallery', data);
export const updateGalleryItem = (id: string, data: Partial<GalleryItem>) => updateItem<GalleryItem>('gallery', id, data);
export const deleteGalleryItem = (id: string) => deleteItem('gallery', id);

export const getEvents = () => getItems<Event>('events', MOCK_EVENTS);
export const getEvent = (id: string) => getItemById<Event>('events', id);
export const createEvent = (data: Omit<Event, 'id'>) => createItem<Omit<Event, 'id'>>('events', data);
export const updateEvent = (id: string, data: Partial<Event>) => updateItem<Event>('events', id, data);
export const deleteEvent = (id: string) => deleteItem('events', id);

export const getCareers = () => getItems<Career>('careers', MOCK_CAREERS);
export const createCareer = (data: Omit<Career, 'id'>) => createItem<Omit<Career, 'id'>>('careers', data);
export const updateCareer = (id: string, data: Partial<Career>) => updateItem<Career>('careers', id, data);
export const deleteCareer = (id: string) => deleteItem('careers', id);

// Feedback Functions
export const getFeedback = () => getItems<Feedback>('feedback');
export const createFeedback = (data: Omit<Feedback, 'id' | 'status'>) => {
    const feedbackData: Omit<Feedback, 'id'|'createdAt'> = {
        ...data,
        status: 'pending',
        createdAt: new Date().toISOString(),
    };
    return createItem('feedback', feedbackData);
};
export const updateFeedbackStatus = (id: string, status: 'approved' | 'rejected') => updateItem('feedback', id, { status });

// Inquiry Functions
export const getInquiries = () => getItems<Inquiry>('inquiries');
export const createInquiry = (data: Omit<Inquiry, 'id'>) => createItem('inquiries', data);
