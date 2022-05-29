import { RequestHandler } from 'express';
import { Todo } from '../models/todo.model';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
   const text = (req.body as { text: string }).text;
   const newTodo = new Todo(Math.random().toString(), text);
   TODOS.push(newTodo);
   res.status(200).json({ message: 'Todo created successfully.', createdTodo: newTodo })
};

export const getTodos: RequestHandler = (req, res, next) => {
   res.status(200).json({ message: 'All Todos.', todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
   const todoId = req.params.id;
   const text = (req.body as { text: string }).text;
   const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
   if (todoIndex < 0) {
      throw new Error('Could not find that Todo');
   }
   TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, text);
   res.status(200).json({ message: 'Todo updated successfully.', updatedTodo: TODOS[todoIndex] });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res, next) => {
   const todoId = req.params.id;
   const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
   if (todoIndex < 0) {
      throw new Error('Could not find that Todo');
   }
   TODOS.splice(todoIndex, 1);
   res.status(200).json({ message: 'Todo deleted successfully.' });
};