import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {ProfessorComponent} from '../professor/professor.component';
import {SubjectsComponent} from '../subjects/subjects.component';
import {CourseComponent} from '../course/course.component';


@Component({
    selector: 'Classroom',
    templateUrl: './classroom.component.html'
})
export class ClassroomComponent {
    public classroom:Classroom[];
    public professores: Professor[];
    public subjects:Subjects[];
    public courses:Course[]
    
    public class:String;
    public day:number;
    public vacancies:number;
    
    public selected:number;
    public selected2:number;
    
    

   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/Classroom').subscribe(result => {
            this.classroom = result.json() as Classroom[];
        }, error => console.error(error));
        http.get(baseUrl + 'api/Professor').subscribe(result => {
            this.professores = result.json() as Professor[];
        }, error => console.error(error));
        http.get(baseUrl + 'api/Subjects').subscribe(result => {
            this.subjects = result.json() as Subjects[];
        }, error => console.error(error));
    }

    
    Save()
    {       
        var value = {classroom:this.class, vacancies:this.vacancies, day:this.day, ProfessorId:this.selected,
             SubjectId:this.selected2};
        console.log(value);
        this.http.post(this.baseUrl + 'api/Classroom', value).subscribe(result=>{
            this.classroom.push(result.json())});
    }

    Delete(item:Classroom)
    {
        console.log(item.id);
    
        this.http.delete(this.baseUrl+ `api/Classroom/${item.id}`).subscribe(result  => {
            this.classroom.splice(this.classroom.indexOf(item),1);
            },error=> console.error(error));
            

    }

    public setProfessor(fuck:number){
        this.selected = fuck;
    }
    
    public setSubject(fucks:number){
        this.selected2 = fucks;
    }
}



interface Classroom {
    id : String;
    classroom:String;
    day:number;
    vacancies:number;
    subject:Subjects;
    SubjectId:number;
    professor:Professor;
    ProfessorId:number;
}  

interface Subjects {
    id : String;
    name:String;
    workload:number;
    course:Course;
    CourseId:number;
}  

interface Course {
    id : String;
    name:String;
}

interface Professor {
    id : String;
    name:String;
}