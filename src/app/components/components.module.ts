import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo/todo.component';
import { ComponentRoutingModule } from './components-routing.module';
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
    declarations: [
        LoginComponent,
        TodoComponent
    ],
    imports: [
        CommonModule,
        ComponentRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})
export class ComponentsModule { }
