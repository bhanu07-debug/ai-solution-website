import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MessageSquare, FileText } from "lucide-react";

export default function AdminDashboardPage() {
    const stats = [
        { title: "Pending Feedback", value: "12", icon: <MessageSquare className="h-6 w-6 text-muted-foreground" />, change: "+5 this week" },
        { title: "Total Projects", value: "45", icon: <Briefcase className="h-6 w-6 text-muted-foreground" />, change: "+2 this month" },
        { title: "Published Articles", value: "89", icon: <FileText className="h-6 w-6 text-muted-foreground" />, change: "7 new drafts" },
    ];

    const recentActivity = [
        { user: "John Doe", action: "Approved feedback", item: "Great service!", time: "2m ago", status: "Approved" },
        { user: "Admin", action: "Published new article", item: "The Future of AI", time: "1h ago", status: "Published" },
        { user: "Jane Smith", action: "Submitted feedback", item: "Amazing results...", time: "3h ago", status: "Pending" },
        { user: "Admin", action: "Added new project", item: "E-commerce Bot", time: "1d ago", status: "Completed" },
    ]

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>A log of recent changes and submissions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Item</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivity.map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{activity.user}</TableCell>
                                    <TableCell>{activity.action}</TableCell>
                                    <TableCell className="max-w-[150px] truncate">{activity.item}</TableCell>
                                    <TableCell>{activity.time}</TableCell>
                                    <TableCell>
                                        <Badge variant={activity.status === 'Pending' ? 'destructive' : 'secondary'}>
                                            {activity.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
