
"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Feedback } from "@/lib/types";
import { Check, ThumbsDown, X } from "lucide-react";
import { Star } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

interface FeedbackTableProps {
    data: Feedback[];
    onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
}

export function FeedbackTable({ data, onUpdateStatus }: FeedbackTableProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const getBadgeVariant = (status: Feedback['status']) => {
        switch (status) {
            case 'approved': return 'default';
            case 'pending': return 'secondary';
            case 'rejected': return 'destructive';
            default: return 'outline';
        }
    };

    const StarRating = ({ rating }: { rating: number }) => (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-primary fill-primary' : 'text-muted-foreground/30'}`} />
        ))}
      </div>
    );

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Author</TableHead>
                        <TableHead className="hidden md:table-cell">Message</TableHead>
                        <TableHead className="hidden sm:table-cell">Rating</TableHead>
                        <TableHead className="hidden lg:table-cell">Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-muted-foreground">{item.company || item.role}</div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell max-w-xs truncate">{item.message}</TableCell>
                            <TableCell className="hidden sm:table-cell">
                                <StarRating rating={item.rating} />
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                {isClient ? formatDistanceToNow(new Date(item.createdAt), { addSuffix: true }) : ''}
                            </TableCell>
                            <TableCell>
                                <Badge variant={getBadgeVariant(item.status)} className="capitalize">{item.status}</Badge>
                            </TableCell>
                            <TableCell className="text-right">
                                {item.status === 'pending' && (
                                    <div className="flex gap-2 justify-end">
                                        <Button variant="outline" size="icon" onClick={() => onUpdateStatus(item.id, 'approved')}>
                                            <Check className="h-4 w-4" />
                                            <span className="sr-only">Approve</span>
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => onUpdateStatus(item.id, 'rejected')}>
                                            <X className="h-4 w-4" />
                                            <span className="sr-only">Reject</span>
                                        </Button>
                                    </div>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
