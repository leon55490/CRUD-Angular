import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Asegúrate de que la ruta de importación sea correcta
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'todo',
        component: TodoComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ComponentRoutingModule { } // Cambia el nombre de la clase si es necesario
