import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../repositories/TaskRepository';
import { UserRepository } from '../repositories/UserRepository';
import { TaskStatus } from '../enums/TaskStatus';
import { logger } from '../utils/wintons';
import {RequestModel, RequestTaskModel} from "../middleware/RequestModel";

class TaskController {
    async create(request: RequestTaskModel, response: Response) {
        try {
            const { title, description, parentTaskId } = request.body;
            const userId = request.auth.id; // Assuming user ID is available in request.auth

            const taskRepository = getCustomRepository(TaskRepository);
            const userRepository = getCustomRepository(UserRepository);

            const user = await userRepository.findOne(userId);
            if (!user) {
                return response.status(404).send('User not found');
            }

            const task = taskRepository.create({
                title,
                description,
                user,
                parentTask: parentTaskId ? await taskRepository.findOne(parentTaskId) : null
            });

            await taskRepository.save(task);
            return response.status(201).json(task);
        } catch (error) {
            logger.error('TaskController: create ERROR: ', error);
            return response.status(500).send('Server error');
        }
    }

    async list(request: RequestModel, response: Response) {
        try {
            const userId = request.auth.id; // Assuming user ID is available in request.auth
            const taskRepository = getCustomRepository(TaskRepository);

            const tasks = await taskRepository.find({ where: { user: userId }, relations: ['subtasks'] });
            return response.json(tasks);
        } catch (error) {
            logger.error('TaskController: list ERROR: ', error);
            return response.status(500).send('Server error');
        }
    }

    async update(request: RequestModel, response: Response) {
        try {
            const { id } = request.params;
            const { title, description, status } = request.body;
            const taskRepository = getCustomRepository(TaskRepository);

            const task = await taskRepository.findOne(id);
            if (!task) {
                return response.status(404).send('Task not found');
            }

            task.title = title || task.title;
            task.description = description || task.description;
            task.status = status || task.status;

            await taskRepository.save(task);
            return response.json(task);
        } catch (error) {
            logger.error('TaskController: update ERROR: ', error);
            return response.status(500).send('Server error');
        }
    }

    async delete(request: RequestModel, response: Response) {
        try {
            const { id } = request.params;
            const taskRepository = getCustomRepository(TaskRepository);

            const task = await taskRepository.findOne(id);
            if (!task) {
                return response.status(404).send('Task not found');
            }

            await taskRepository.remove(task);
            return response.status(204).send();
        } catch (error) {
            logger.error('TaskController: delete ERROR: ', error);
            return response.status(500).send('Server error');
        }
    }

    async markAsCompleted(request: RequestModel, response: Response) {
        try {
            const { id } = request.params;
            const taskRepository = getCustomRepository(TaskRepository);

            const task = await taskRepository.findOne(id);
            if (!task) {
                return response.status(404).send('Task not found');
            }

            task.status = TaskStatus.COMPLETED;
            await taskRepository.save(task);
            return response.json(task);
        } catch (error) {
            logger.error('TaskController: markAsCompleted ERROR: ', error);
            return response.status(500).send('Server error');
        }
    }

    async unmarkAsCompleted(request: RequestModel, response: Response) {
        try {
            const { id } = request.params;
            const taskRepository = getCustomRepository(TaskRepository);

            const task = await taskRepository.findOne(id);
            if (!task) {
                return response.status(404).send('Task not found');
            }

            task.status = TaskStatus.PENDING;
            await taskRepository.save(task);
            return response.json(task);
        } catch (error) {
            logger.error('TaskController: unmarkAsCompleted ERROR: ', error);
            return response.status(500).send('Server error');
        }
    }

    async filterByStatus(request: RequestModel, response: Response) {
        try {
            const { status } = request.query;
            const userId = request.auth.id; // Assuming user ID is available in request.auth
            const taskRepository = getCustomRepository(TaskRepository);

            const tasks = await taskRepository.find({
                where: { user: userId, status },
                relations: ['subtasks']
            });
            return response.json(tasks);
        } catch (error) {
            logger.error('TaskController: filterByStatus ERROR: ', error);
            return response.status(500).send('Server error');
        }
    }
}

export { TaskController };