import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface TodoItem {
  completed: boolean,
  created_at: string,
  id: string,
  title: string,
  updated_at: string,
  user: number
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(
    private http: HttpClient
  ){}

  getAll(): Observable<TodoItem[]> {
    return this.http.get(`/api/todo/`)
      .pipe(
        map((res: any) => {
          if (res?.results) {
            return res?.results
          };
          return [];
        })
      )
  }

  editData(item: TodoItem, id: string) {
    return this.http.put(`/api/todo/${id}/`, item);
  }

  removeData(id: string) {
    return this.http.delete(`/api/todo/${id}/`);
  }

  addNewData(item: TodoItem) {
    return this.http.post(`/api/todo/`, item);
  }
}
