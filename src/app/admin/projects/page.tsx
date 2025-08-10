
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminProjectsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Manage Projects</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Projects</CardTitle>
                    <CardDescription>Add, edit, or remove projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Project management functionality will be implemented here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
