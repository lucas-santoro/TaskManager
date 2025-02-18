import { TaskModel } from "../models/TaskModel";

class TaskManager 
{
    private tasks: TaskModel[] = [];
    private nextId: number = 1;

    getAllTasks(): TaskModel[] 
    {
        return this.tasks;
    }

    getTaskById(id: number): TaskModel | undefined 
    {
        return this.tasks.find(task => task.id === id);
    }

    createTask(title: string, description: string, status?: string): TaskModel 
    {
        const task: TaskModel = { 
            id: this.nextId++, 
            title, 
            description, 
            status: (status as "pendente" | "em progresso" | "concluída") || "pendente",
            createdAt: new Date() 
        };
        this.tasks.push(task);
        return task;
    }

    updateTask(id: number, updatedFields: Partial<TaskModel>): TaskModel | null 
    {
        const task = this.getTaskById(id);
        if (!task) return null;

        Object.assign(task, updatedFields);
        return task;
    }

    deleteTask(id: number): boolean 
    {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) return false;

        this.tasks.splice(index, 1);
        return true;
    }
}

export default new TaskManager();
