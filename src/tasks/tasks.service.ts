import { Injectable , NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {

  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }





  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }



  // Update 
  async updateOne(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const existingTask = await this.taskModel.findById({_id :id});
    console.log('Received ID:', id);
    if (!existingTask) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }

    // Update fields from updateTaskDto
    if (updateTaskDto.type) {
      existingTask.type = updateTaskDto.type;
    }
    if (updateTaskDto.name) {
      existingTask.name = updateTaskDto.name;
    }
    if (updateTaskDto.startTime) {
      existingTask.startTime = updateTaskDto.startTime;
    }
    if (updateTaskDto.finishTime) {
      existingTask.finishTime = updateTaskDto.finishTime;
    }
    if (updateTaskDto.status) {
      existingTask.status = updateTaskDto.status;
    }
    
    return existingTask.save();


    
  }




  // Remove one
  async removeOne(id: string): Promise<void> {
    const deletedTask = await this.taskModel.findByIdAndDelete({_id : id});

    if (!deletedTask) {
      throw new NotFoundException(`Task with ID '${id}' not found`);
    }
    
    console.log('Deleted task:', deletedTask);
  }

  
  //find many task in date time
  findManyWithinTime(id: number) {
    return `This action returns a #${id} task`;
  }


  
  async allTaskWithStartDate(startDate: Date): Promise<Task[]> {
    // Query tasks with the specified start date
    const tasks = await this.taskModel.find({ startTime: startDate }).exec();

    if (!tasks || tasks.length === 0) {
      throw new NotFoundException(`No tasks found with the specified start date`);
    }

    return tasks;
  }


  async getSummaryThisDate(date : Date) : Promise<Task[]> {
    // find which job was succeeded in this date ;
    console.log(date);
    const tasks = await this.taskModel.find({
      finishTime: date,
      status: 'done'
    }).exec();


    return tasks ;
  }

  async getSummaryThisMonth(date: Date): Promise<{ finishedTasks: number; processingTasks: number }> {
    // Calculate the start and end dates of the month
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Find tasks within the specified month
    const tasks = await this.taskModel.find({
      $or: [
        { status: 'processing' },
        { 
          status: 'done',
          finishTime: { $gte: startOfMonth, $lte: endOfMonth },
          updatedAt: { $gte: startOfMonth, $lte: endOfMonth }
        },
        { 
          status: 'canceled',
          updatedAt: { $gte: startOfMonth, $lte: endOfMonth }
        }
      ]
    }).exec();


    let finishedTasks = 0;
    let processingTasks = 0;

    tasks.forEach(item => {
      if (item.status === 'done') {
        finishedTasks ++ ;
      } else if (item.status === 'processing') {
        processingTasks ++ ;
      }
    });

    return { finishedTasks, processingTasks };

  }

  

  
}
