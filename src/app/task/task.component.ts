import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TaskState } from '../enums';
import { Task, ChangedState, ChangedTask } from '../interfaces';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = {title: "", description: "", date: new Date(), state: TaskState.undone};
  @Input() index: number = 0;  
  @Output() onDelete = new EventEmitter<number>();
  @Output() onStateChanged = new EventEmitter<ChangedState>();
  @Output() onTaskChanged = new EventEmitter<ChangedTask>();
  showCahngeForm: boolean = false;
  doneTaskStr: string = "undone";
  taskTitle:string = "Task";
  taskDescription:string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

  deleteTask() {
    this.onDelete.emit(this.index);
  }

  doneTask() {     
    this.task.state = TaskState.done;
    let chs: ChangedState = {index: this.index, state: this.task.state}
    this.onStateChanged.emit(chs);
  }

  showChangeForm() {
    this.taskTitle = this.task.title;
    this.taskDescription = this.task.description;
    this.showCahngeForm = !this.showCahngeForm;
  }

  changeTask() {
    if (this.taskTitle !== "") {      
      let st: TaskState;
      if (this.task.title != this.taskTitle || this.task.description != this.taskDescription) {
        st = TaskState.undone;
      }
      else {        
        st = this.task.state;
      }
      this.task = {title: this.taskTitle, description: this.taskDescription, 
              state: st, date: new Date() };
      let cht: ChangedTask = {index: this.index, task: this.task}
      this.onTaskChanged.emit(cht);
      this.showCahngeForm = false;
    }    
  } 
  
  cancelChange(){
    this.showCahngeForm = false;
  }

  failTask() {    
    this.task.state = TaskState.failed;
    let chs: ChangedState = {index: this.index, state: this.task.state}
    this.onStateChanged.emit(chs);
  }

  undoneTask() {
    this.task.state = TaskState.undone;
    let chs: ChangedState = {index: this.index, state: this.task.state}
    this.onStateChanged.emit(chs);
  }
}
