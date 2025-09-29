
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInquiries } from '@/lib/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type Inquiry } from '@/lib/types';
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AdminInquiriesPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);
    const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

    useEffect(() => {
        setIsClient(true);
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        setIsLoading(true);
        const inquirySubmissions = await getInquiries();
        const sortedInquiries = inquirySubmissions.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt as string).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt as string).getTime() : 0;
            return dateB - dateA;
        });
        setInquiries(sortedInquiries);
        setIsLoading(false);
    }
    
    const formatDate = (date: Date | string | undefined) => {
        if (!isClient || !date) return '';
        try {
            const dateObj = typeof date === 'string' ? new Date(date) : date;
            return formatDistanceToNow(dateObj, { addSuffix: true });
        } catch (e) {
            return '';
        }
    }

    const handleViewInquiry = (inquiry: Inquiry) => {
        setSelectedInquiry(inquiry);
    };

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
                                    <TableHead className="hidden sm:table-cell">Company</TableHead>
                                    <TableHead className="hidden sm:table-cell">Department</TableHead>
                                    <TableHead className="hidden lg:table-cell">Submitted</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inquiries.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-sm text-muted-foreground">{item.email}</div>
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">{item.company}</TableCell>
                                        <TableCell className="hidden sm:table-cell">{item.inquireDepartment}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{formatDate(item.createdAt)}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleViewInquiry(item)}>
                                                <Eye className="h-4 w-4" />
                                                <span className="sr-only">View Inquiry</span>
                                            </Button>
                                        </TableCell>
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

            <Dialog open={!!selectedInquiry} onOpenChange={(isOpen) => !isOpen && setSelectedInquiry(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Inquiry from {selectedInquiry?.name}</DialogTitle>
                        <DialogDescription>
                            Submitted {selectedInquiry?.createdAt ? formatDate(selectedInquiry.createdAt) : 'recently'}.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedInquiry && (
                        <div className="space-y-4 py-4 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-medium">Author</p>
                                    <p className="text-muted-foreground">{selectedInquiry.name}</p>
                                    <p className="text-muted-foreground">{selectedInquiry.email}</p>
                                </div>
                                 <div>
                                    <p className="font-medium">Company</p>
                                    <p className="text-muted-foreground">{selectedInquiry.company}</p>
                                     <p className="text-muted-foreground">{selectedInquiry.phone}</p>
                                </div>
                                 <div>
                                    <p className="font-medium">Location</p>
                                    <p className="text-muted-foreground">{selectedInquiry.localAddress}, {selectedInquiry.pinCode}</p>
                                    <p className="text-muted-foreground">{selectedInquiry.country}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Department</p>
                                    <p className="text-muted-foreground">{selectedInquiry.inquireDepartment}</p>
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <p className="font-medium">Message</p>
                                <p className="text-muted-foreground whitespace-pre-wrap bg-secondary/50 p-4 rounded-md mt-1">{selectedInquiry.message}</p>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
