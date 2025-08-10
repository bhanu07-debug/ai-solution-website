'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedbackTable } from "@/components/admin/feedback-table";
import { type Feedback } from "@/lib/types";

const mockFeedback: Feedback[] = [
    { id: 'fb1', name: 'John Doe', company: 'Client Co.', message: 'This is some great feedback, I really enjoyed the service!', rating: 5, status: 'pending', createdAt: new Date() },
    { id: 'fb2', name: 'Jane Smith', role: 'Developer', message: 'The API was a pleasure to work with. Well documented and very fast.', rating: 4, status: 'pending', createdAt: new Date() },
    { id: 'fb3', name: 'Sam Wilson', company: 'Startup X', message: 'Could use some improvement in the user onboarding flow, but overall a solid product.', rating: 3, status: 'pending', createdAt: new Date() },
    { id: 'fb4', name: 'Lisa Ray', role: 'Project Manager', message: 'The project management tools helped us deliver on time and under budget. Highly recommended!', rating: 5, status: 'approved', createdAt: new Date() },
    { id: 'fb5', name: 'Mike Johnson', company: 'Big Corp', message: 'I was not satisfied with the support response time.', rating: 2, status: 'rejected', createdAt: new Date() },
];


export default function AdminFeedbackPage() {
    const [feedback, setFeedback] = useState<Feedback[]>(mockFeedback);

    const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
        setFeedback(prev => prev.map(fb => fb.id === id ? { ...fb, status } : fb));
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
                    <FeedbackTable data={feedback} onUpdateStatus={handleUpdateStatus} />
                </CardContent>
            </Card>
        </div>
    );
}
