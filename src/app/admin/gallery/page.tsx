
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminGalleryPage() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold font-headline">Manage Gallery</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Your Gallery</CardTitle>
                    <CardDescription>Add or remove gallery images.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Gallery management functionality will be implemented here.</p>
                </CardContent>
            </Card>
        </div>
    );
}
