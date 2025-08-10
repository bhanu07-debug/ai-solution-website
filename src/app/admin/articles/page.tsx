
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminArticlesPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Manage Articles</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Articles</CardTitle>
                    <CardDescription>Write, edit, or publish articles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Article management functionality will be implemented here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
