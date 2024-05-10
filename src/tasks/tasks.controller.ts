import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findManyWithinTime(+id);
  }

  @Get('startDate/:startDate')
  findAllWithStartDate(@Param('startDate') startDate: string) {
    const parsedDate = new Date(startDate);
    return this.tasksService.allTaskWithStartDate(parsedDate);
  }

  
  @Get('summary/:date') 
  summaryThisDay(@Param('date' ) date : string ) {
    const parsedDate = new Date(date);
    return this.tasksService.getSummaryThisDate(parsedDate) ;
  }

  @Get('summarymonth/:month')
  async summaryThisMonth(@Param('month') month: string) {
    // Extract month and year from the provided date string
    const [monthNumber, year] = month.split('-');
    const parsedDate = new Date(`${year}-${monthNumber}-01`); // Set day to 01 for the first day of the month

    return this.tasksService.getSummaryThisMonth(parsedDate);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateOne(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.removeOne(id);
  }

  
}
