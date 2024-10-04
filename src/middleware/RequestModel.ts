import { Request } from 'express';
import { User } from '../entities/User';
import {Task} from "../entities/Task";

export interface RequestModel extends Request{
    auth: User
}

export interface RequestTaskModel extends Request{
    auth: Task
}