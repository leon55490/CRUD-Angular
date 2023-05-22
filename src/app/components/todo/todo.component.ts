import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
const key = 'https://crudcrud.com/api/ee8a8e5cd8c74911a0f3ed9fa8192c0f/todos'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  todoForm!: FormGroup;
  isEditing = false;
  editedTodoId: string | null = null;
  type: any

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  /**
   * The ngOnInit function initializes the component by fetching todos and setting up a form
   * using the formBuilder.
   */
  ngOnInit() {
    this.fetchTodos();
    this.todoForm = this.formBuilder.group({
      _id: [''],
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      type: ['How many people'],
      color: [''],
      gift: [''],
    });
  }

  /**
   * The function sets the value of a variable called "type" to the selected value from a
   * dropdown menu.
   * @param {string} value - value is a string parameter that represents the new value
   * selected by the user in a dropdown or select input field. The function assigns this
   * value to the "type" property of the current object or component.
   */
  onSelectChange(value: string) {
    this.type = value
  }

  /**
   * This function fetches todos using an HTTP GET request and assigns the response to a
   * variable.
   */
  fetchTodos() {
    this.http.get(key)
      .subscribe((response: any) => {
        this.todos = response;
      });
  }

  /**
   * The function checks if the user is editing a todo and updates it, otherwise it creates a
   * new todo.
   */
  submitTodoForm() {
    if (this.isEditing) {
      this.updateTodo();
    } else {
      this.createTodo();
    }
  }

  /**
   * The function creates a new todo item by sending a POST request to a server and adding
   * the response to an array.
   */
  createTodo() {
    const todo = {
      title: this.todoForm.value.title,
      price: this.todoForm.value.price,
      description: this.todoForm.value.description,
      type: this.type,
      color: this.todoForm.value.color,
      gift: this.todoForm.value.gift
    };

    this.http.post(key, todo)
      .subscribe((response: any) => {
        this.todos.push(response);
        this.resetForm();
      });
  }


  /**
   * This function updates a todo item by sending a PUT request to a specified URL with the
   * edited todo data and then resets the form and sets the isEditing flag to false.
   */
  updateTodo() {
    const editedTodo = {
      title: this.todoForm.value.title,
      price: this.todoForm.value.price,
      description: this.todoForm.value.description,
      type: this.todoForm.value.type,
      color: this.todoForm.value.color,
      gift: this.todoForm.value.gift
    };

    const url = `${key}/${this.editedTodoId}`;

    this.http.put(url, editedTodo)
      .subscribe(() => {
        this.fetchTodos();
        this.resetForm();
        this.isEditing = false;
      });
  }


  /**
   * This function deletes a todo item from a server and updates the local list of todos.
   * @param {any} todo - The `todo` parameter is an object that represents a single todo
   * item. It is used to identify the specific todo item that needs to be deleted from the
   * list of todos. The `_id` property of the `todo` object is used to construct the URL for
   * the DELETE request, and is also
   */
  deleteTodo(todo: any) {
    const url = `${key}/${todo._id}`;

    this.http.delete(url)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t._id !== todo._id);
      });
  }

  /**
   * The function edits a todo item and sets the form values accordingly.
   * @param {any} todo - The `todo` parameter is an object that represents a single todo
   * item. It contains properties such as `_id`, `title`, `description`, `type`, `color`, and
   * `gift`. The function `editTodo` is used to set the `isEditing` flag to true and the `
   */
  editTodo(todo: any) {
    this.isEditing = true;
    this.editedTodoId = todo._id;

    this.todoForm.setValue({
      _id: todo._id,
      title: todo.title,
      price: todo.price,
      description: todo.description,
      type: todo.type,
      color: todo.color,
      gift: todo.gift
    });
  }

  /**
   * The function cancels the editing of a todo item and resets the form.
   */
  cancelEdit() {
    this.isEditing = false;
    this.editedTodoId = null;
    this.resetForm();
  }

  /**
   * The function resets a form.
   */
  resetForm() {
    this.todoForm.reset();
  }
}
