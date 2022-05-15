import { TaskState } from './enums';

export interface Task {
    title: string;
    description: string;
    date: Date;
    state: TaskState;
  };
  
  export interface ChangedState {
    index: number;
    state: TaskState;
  }
  
  export interface ChangedTask {
    index: number;
    task: Task;
  }


  
