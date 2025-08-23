import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    change?: string;
}

export function StatCard({ title, value, icon, change }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change && 
                    <p className="text-xs text-muted-foreground flex items-center">
                        <ArrowUpRight className="h-4 w-4 mr-1 text-green-500"/>
                        {change}
                    </p>
                }
            </CardContent>
        </Card>
    );
}
