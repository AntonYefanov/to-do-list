import { Injectable } from '@angular/core';
import { Task } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  taskArray: string = "tasksArray";

  constructor() { }

  setTaskToLS(data: Task[]) {
    localStorage.setItem(this.taskArray, JSON.stringify(data));
  }

  getTaskFromLS() {
    return localStorage.getItem(this.taskArray);
  }
}
