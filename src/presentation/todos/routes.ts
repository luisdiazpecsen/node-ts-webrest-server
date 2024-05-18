import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const todoController = new TodosController();

        /**
         * Middleware: Función que se ejecuta
         */

        router.get('/todos', todoController.getTodos);
        router.get('/todos/:id', todoController.getTodoById);
        router.post('/todos', todoController.createTodo);
        router.put('/todos/:id', todoController.updateTodo);
        router.delete('/todos/:id', todoController.deleteTodo);

        return router;
    }
}