export interface TaskModel 
{
    id: number;
    title: string;
    description: string;
    status: "pendente" | "em progresso" | "concluída";
    createdAt: Date;
}
