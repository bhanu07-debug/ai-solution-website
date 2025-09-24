
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Check, FileText, MessageSquare, Briefcase, ThumbsDown, Edit, PlusCircle } from "lucide-react";
import Link from 'next/link';
import { getProjects, getArticles, getFeedback } from "@/lib/firestore";
import { type Feedback } from "@/lib/types";
import { AdminLineChart } from "@/components/admin/admin-line-chart";

export default async function AdminDashboardPage() {
    const projects = await getProjects();
    const articles = await getArticles();
    const allFeedback = await getFeedback();

    const pendingFeedback = allFeedback.filter(f => f.status === 'pending');
    const recentFeedback = allFeedback
        .sort((a, b) => new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime())
        .slice(0, 5);


    const stats = [
        { title: "Pending Feedback", value: pendingFeedback.length.toString(), icon: <MessageSquare className="h-5 w-5 text-muted-foreground" />, change: "+2 from last week" },
        { title: "Total Projects", value: projects.length.toString(), icon: <Briefcase className="h-5 w-5 text-muted-foreground" />, change: "+5 from last week" },
        { title: "Published Articles", value: articles.length.toString(), icon: <FileText className="h-5 w-5 text-muted-foreground" />, change: "No change" },
        { title: "Total Inquiries", value: "24", icon: <MessageSquare className="h-5 w-5 text-muted-foreground" />, change: "+10 from last week" },
    ];
    
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Welcome back, Admin</h1>
                    <p className="text-muted-foreground">Here's what is happening with your AI Solutions metadata today.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map(stat => <StatCard key={stat.title} {...stat} />)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Website Traffic</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <AdminLineChart />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Private Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <AdminLineChart />
                        </CardContent>
                    </Card>
                </div>
                <div className="md:col-span-1 lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-lg border bg-secondary/50">
                                <div>
                                    <h4 className="font-semibold">Manage Content</h4>
                                    <p className="text-sm text-muted-foreground">Edit existing articles.</p>
                                </div>
                                <Button asChild size="sm">
                                    <Link href="/admin/articles"><Edit className="mr-2 h-4 w-4"/>Edit</Link>
                                </Button>
                            </div>
                             <div className="flex justify-between items-center p-3 rounded-lg border bg-secondary/50">
                                <div>
                                    <h4 className="font-semibold">New Service</h4>
                                    <p className="text-sm text-muted-foreground">Add a new service page.</p>
                                </div>
                                <Button asChild size="sm">
                                    <Link href="/admin/services"><PlusCircle className="mr-2 h-4 w-4"/>New</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Pending Feedback</CardTitle>
                            <Button asChild variant="link" size="sm">
                                <Link href="/admin/feedback">View All</Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {pendingFeedback.slice(0, 3).map(fb => (
                                <div key={fb.id} className="text-sm">
                                    <div className="flex justify-between">
                                        <p className="font-semibold">{fb.name}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(fb.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="text-muted-foreground truncate my-1">"{fb.message}"</p>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" className="h-7 text-xs"><Check className="h-3 w-3 mr-1"/>Approve</Button>
                                        <Button size="sm" variant="destructive" className="h-7 text-xs"><ThumbsDown className="h-3 w-3 mr-1"/>Reject</Button>
                                    </div>
                                </div>
                            ))}
                            {pendingFeedback.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No pending feedback.</p>}
                        </CardContent>
                    </Card>
                </div>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                   <ul className="space-y-4">
                        {recentFeedback.map(fb => (
                            <li key={fb.id} className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <MessageSquare className="h-5 w-5 text-primary"/>
                                </div>
                                <div>
                                    <p className="font-medium text-sm">New feedback received</p>
                                    <p className="text-xs text-muted-foreground">From <span className="font-semibold">{fb.name}</span> regarding "{fb.message.substring(0, 20)}..."</p>
                                </div>
                                <p className="text-xs text-muted-foreground ml-auto">{new Date(fb.createdAt).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

        </div>
    );
}
