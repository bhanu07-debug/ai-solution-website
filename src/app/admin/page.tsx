
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MessageSquare, FileText, CheckCircle } from "lucide-react";
import { getProjects, getArticles, getFeedback } from "@/lib/firestore";
import { type Feedback } from "@/lib/types";

export default async function AdminDashboardPage() {
    const projects = await getProjects();
    const articles = await getArticles();
    const feedback = await getFeedback();

    const pendingFeedbackCount = feedback.filter(f => f.status === 'pending').length;

    const stats = [
        { title: "Pending Feedback", value: pendingFeedbackCount.toString(), icon: <MessageSquare className="h-6 w-6 text-muted-foreground" /> },
        { title: "Total Projects", value: projects.length.toString(), icon: <Briefcase className="h-6 w-6 text-muted-foreground" /> },
        { title: "Published Articles", value: articles.length.toString(), icon: <FileText className="h-6 w-6 text-muted-foreground" /> },
    ];

    const recentActivity = feedback
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5)
        .map(f => ({
            user: f.name,
            action: "Submitted feedback",
            item: f.message,
            time: new Date(f.createdAt).toLocaleDateString(),
            status: f.status
        }));


    if (!projects.length && !articles.length && !feedback.length) {
        return (
             <div className="flex flex-col items-center justify-center h-[50vh] text-center p-4 rounded-lg bg-card border shadow-sm">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h2 className="text-2xl font-headline font-bold mb-2">You're All Set!</h2>
                <p className="text-muted-foreground max-w-md">
                    Your application is connected to Firestore. Go to the content sections in the sidebar to add your first project, article, or service to see them here and on your live site.
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Feedback</CardTitle>
                    <CardDescription>The latest feedback submissions from your users.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivity.map((activity, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{activity.user}</TableCell>
                                    <TableCell className="max-w-[250px] truncate">{activity.item}</TableCell>
                                    <TableCell>{activity.time}</TableCell>
                                    <TableCell>
                                        <Badge 
                                            variant={
                                                activity.status === 'pending' ? 'destructive' : 
                                                activity.status === 'approved' ? 'default' : 'secondary'
                                            } 
                                            className="capitalize"
                                        >
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
