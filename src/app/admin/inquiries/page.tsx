
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInquiries } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type Inquiry } from '@/lib/types';
import { formatDistanceToNow } from "date-fns";

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setIsLoading(true);
        const inquirySubmissions = await getInquiries();
        const sortedInquiries = inquirySubmissions.sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime());
        setInquiries(sortedInquiries);
        setIsLoading(false);
    }
    
    const formatDate = (date: Date | string) => {
        if (!isClient) return '';
        try {
            const dateObj = typeof date === 'string' ? new Date(date) : date;
            return formatDistanceToNow(dateObj, { addSuffix: true });
        } catch (e) {
            return '';
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Manage Inquiries</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Contact Form Submissions</CardTitle>
                    <CardDescription>Review messages sent from the contact page.</CardDescription>
                </CardHeader>
                <CardContent>
                     {isLoading ? (
                         <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ) : inquiries.length > 0 ? (
                       <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Author</TableHead>
                                    <TableHead className="hidden md:table-cell">Message</TableHead>
                                    <TableHead className="hidden sm:table-cell">Department</TableHead>
                                    <TableHead className="hidden lg:table-cell">Submitted</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inquiries.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-sm text-muted-foreground">{item.email}</div>
                                            <div className="text-sm text-muted-foreground">{item.phone}</div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell max-w-sm truncate">{item.message}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{item.inquireDepartment}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{formatDate(item.createdAt)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <div className="text-center text-muted-foreground py-12">
                            <p>No inquiries have been submitted yet.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
