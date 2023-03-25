import { Injectable } from '@angular/core';
import { toDo } from './to-do';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  private Url = 'http://www.localhost:3000/';  // URL to web api

  getTodoList(): Observable<toDo[]> {    //asincrona
    return this.http.get<toDo[]>(this.Url);
  };

  addToDo(toDo: toDo): Observable<Object> {
    return this.http.post(this.Url, toDo);
  };

  deleteTodo(toDo: toDo):Observable<Object>{
    return this.http.post(this.Url+'delete',toDo);
  }

  constructor(
    private http: HttpClient) { }
}
