import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ProfessorComponent} from  './components/professor/professor.component';
import { CidadeComponent} from  './components/cidade/cidade.component';
import { StudentComponent } from "./components/student/student.component";
import {CourseComponent} from "./components/course/course.component";
import {SubjectsComponent} from "./components/subjects/subjects.component";
import {ClassroomComponent} from "./components/classroom/classroom.component"; 
import {EnrollmentComponent} from "./components/enrollment/enrollment.component";


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        ProfessorComponent,
        CidadeComponent,
        StudentComponent,
        CourseComponent,
        SubjectsComponent,
        ClassroomComponent,
        EnrollmentComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'State', component: FetchDataComponent },
            { path: 'Professor', component: ProfessorComponent},
            { path: 'City', component: CidadeComponent},
            { path: 'Student', component: StudentComponent},
            { path: 'Course', component: CourseComponent},
            { path: 'Subjects', component: SubjectsComponent},
            { path: 'Classroom', component: ClassroomComponent},
            { path: 'Enrollment', component: EnrollmentComponent},
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
