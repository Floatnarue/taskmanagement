import { IsString, IsNotEmpty, IsEnum } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

enum TaskType {
    Development = 'Development',
    Test = 'Test',
    Document = 'Document'
}

enum TaskStatus {
    Processing = 'processing',
    Done = 'done',
    Canceled = 'canceled'
}



export class CreateTaskDto {

    @ApiProperty({ enum: TaskType })
    @IsNotEmpty()
    @IsEnum(TaskType)
    type: TaskType;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    startTime: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    finishTime: Date;

    @ApiProperty({ enum: TaskStatus })
    @IsEnum(TaskStatus)
    status: TaskStatus;
}