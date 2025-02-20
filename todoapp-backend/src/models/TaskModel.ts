export interface TaskModel 
{
    id: number;
    title: string;
    description: string;
    status: "pending" | "in progress" | "completed";
    createdAt: Date;
}
