import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://naroebordin:Rf6m4wOJQ1yglnPi@cluster0.c5khveo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
), TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
