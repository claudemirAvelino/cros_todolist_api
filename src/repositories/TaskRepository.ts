import { EntityRepository, Repository } from 'typeorm'
import {Task} from "../entities/Task";

@EntityRepository(Task)
class TaskRepository extends Repository<Task>{

}

export { TaskRepository }