
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminEventsPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Manage Events</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Events</CardTitle>
                    <CardDescription>Add, edit, or remove events.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Event management functionality will be implemented here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
