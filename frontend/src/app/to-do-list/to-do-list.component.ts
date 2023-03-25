import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { toDo } from '../to-do';
import { ToDoListService } from '../to-do-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {

  newToDo: toDo = {
    _id: '',
    title: '',
    description: ''
  };

  toDoList: toDo[];

  async addToDo(): Promise<void> { //aggiunto Promise perchè è async
    this.ToDoListService.addToDo(this.newToDo).subscribe(toDoAdded => console.log('Added element: ' + this.newToDo));
    await this.delay(200);
    this.getTodoList();
    this.newToDo.title = '';
    this.newToDo.description = '';
  };

  selectTodo(any : any):void{
    const element = any.target;
    const id = element.childNodes[0].innerText;
    console.log(id);
    element.className == "active" ? (element.className = "", this.newToDo._id ='' ) : (element.className = "active", this.newToDo._id = id);

  };

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  getTodoList(): void { // con le observable usi il subrscibe per iscriverti alla chiamata per ricevere i dati una volta compiuta
    this.ToDoListService.getTodoList().subscribe((toDoList) => this.toDoList = toDoList)
  };

  async deleteTodo(): Promise<void> {
    this.ToDoListService.deleteTodo(this.newToDo).subscribe(toDODeleted => console.log('Element deleted: ' + this.newToDo._id));
    await this.delay(200);
    this.getTodoList();
  };
  
  //nel costruttore inserire tutti gli oggetti che vengono utilizzati a sua volta da questo oggetto
  constructor(private ToDoListService: ToDoListService) { }

  //vengono inserite le azione da eseguire al caricamento del componente
  ngOnInit(): void {
    this.getTodoList();
  }

}
