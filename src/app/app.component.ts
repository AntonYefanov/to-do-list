import { Component, NgModule } from '@angular/core';
import { Task, ChangedState, ChangedTask } from './interfaces';
import { TaskState } from './enums';
import { LocalStorageService } from './local-storage.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
  providers: [LocalStorageService]
})
export class AppComponent {
  tasks: Task[] = [{title: "Придумать что делать", description: "Добавить новых заданий", date: new Date(), state: TaskState.undone} ];
  taskTitle: string = "";
  taskDescription: string = "";
  toggle:boolean = false;

  constructor(private lsService: LocalStorageService) {
    //let temp = localStorage.getItem("tasksArray");
    let temp = lsService.getTaskFromLS();
    if (temp != null){
      this.tasks = JSON.parse(temp);
    }    
  }

  showAddForm(){    
    this.toggle = !this.toggle;
  }

  addTask(taskTitle: string, taskDescription: string) {
    if (taskTitle !== "") {
      let newTask: Task = {title: taskTitle, description: taskDescription, date: new Date(), state: TaskState.undone};
      this.tasks.push(newTask);    

      //localStorage.setItem("tasksArray", JSON.stringify(this.tasks));
      this.lsService.setTaskToLS(this.tasks)

      this.taskTitle = "";
      this.taskDescription = "";
      this.toggle = false;
    } else {
      this.taskDescription = "Введите название";
    }    
  }

  onDelete(del:any) {
    this.tasks.splice(del, 1);
    //localStorage.setItem("tasksArray", JSON.stringify(this.tasks));
    this.lsService.setTaskToLS(this.tasks)
  }

  onStateChanged(chs: ChangedState) {
    this.tasks[chs.index].state = chs.state;
    //localStorage.setItem("tasksArray", JSON.stringify(this.tasks));
    this.lsService.setTaskToLS(this.tasks)
  }

  onTaskChanged(cht: ChangedTask) {
    this.tasks[cht.index] = cht.task;
    //localStorage.setItem("tasksArray", JSON.stringify(this.tasks));
    this.lsService.setTaskToLS(this.tasks)
  }
}
