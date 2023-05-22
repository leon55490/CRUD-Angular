import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private key = 'https://crudcrud.com/api/4c58b5e83763490c9a66a97f69f61808';

  constructor(private http: HttpClient) { }

  fetchTodos() {
    return this.http.get<any[]>(this.key);
  }

  createTodo(todo: any) {
    return this.http.post<any>(this.key, todo);
  }

  updateTodo(todo: any) {
    return this.http.put<any>(`${this.key}/${todo._id}`, todo);
  }

  deleteTodo(todo: any) {
    return this.http.delete<any>(`${this.key}/${todo._id}`);
  }
}
