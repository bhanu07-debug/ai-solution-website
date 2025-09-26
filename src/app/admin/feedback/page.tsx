
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedbackTable } from "@/components/admin/feedback-table";
import { type Feedback } from "@/lib/types";
import { getFeedback, updateFeedbackStatus } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function AdminFeedbackPage() {
    const [feedback, setFeedback] = useState<Feedback[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchFeedback();
    }, []);

    const fetchFeedback = async () => {
        setIsLoading(true);
        const fetchedFeedback = await getFeedback();
        // Filter to only include actual feedback (submissions with a rating)
        const actualFeedback = fetchedFeedback.filter(f => f.rating && f.rating > 0);
        const sortedFeedback = actualFeedback.sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime());
        setFeedback(sortedFeedback);
        setIsLoading(false);
    }

    const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
        await updateFeedbackStatus(id, status);
        fetchFeedback();
    };

    const pendingFeedback = feedback.filter(f => f.status === 'pending');
    const reviewedFeedback = feedback.filter(f => f.status !== 'pending');

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Manage Feedback</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Feedback Submissions</CardTitle>
                    <CardDescription>Review, approve, or reject user feedback with star ratings.</CardDescription>
                </CardHeader>
                <CardContent>
                     {isLoading ? (
                         <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ) : (
                       <Tabs defaultValue="pending">
                            <TabsList>
                                <TabsTrigger value="pending">
                                    Pending 
                                    <Badge className="ml-2">{pendingFeedback.length}</Badge>
                                </TabsTrigger>
                                <TabsTrigger value="reviewed">Reviewed</TabsTrigger>
                            </TabsList>
                            <TabsContent value="pending" className="mt-4">
                                {pendingFeedback.length > 0 ? (
                                    <FeedbackTable data={pendingFeedback} onUpdateStatus={handleUpdateStatus} />
                                ) : (
                                    <div className="text-center text-muted-foreground py-12">
                                        <p>No pending feedback submissions.</p>
                                    </div>
                                )}
                            </TabsContent>
                            <TabsContent value="reviewed" className="mt-4">
                                {reviewedFeedback.length > 0 ? (
                                     <FeedbackTable data={reviewedFeedback} onUpdateStatus={handleUpdateStatus} />
                                ) : (
                                     <div className="text-center text-muted-foreground py-12">
                                        <p>No reviewed feedback submissions yet.</p>
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
