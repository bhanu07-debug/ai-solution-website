'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedbackTable } from "@/components/admin/feedback-table";
import { type Feedback } from "@/lib/types";
import { getFeedback, updateFeedbackStatus } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminFeedbackPage() {
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        setIsLoading(true);
        const fetchedFeedback = await getFeedback();
        // Sort by creation date
        fetchedFeedback.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setFeedback(fetchedFeedback);
        setIsLoading(false);
    }

    const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
        await updateFeedbackStatus(id, status);
        fetchFeedback();
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Manage Feedback</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Feedback Submissions</CardTitle>
                    <CardDescription>Review, approve, or reject user feedback.</CardDescription>
                </CardHeader>
                <CardContent>
                     {isLoading ? (
                         <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ) : (
                        <FeedbackTable data={feedback} onUpdateStatus={handleUpdateStatus} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
