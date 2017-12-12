import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {ProfessorComponent} from '../professor/professor.component';
import {SubjectsComponent} from '../subjects/subjects.component';
import {CourseComponent} from '../course/course.component';
import {StudentComponent} from '../student/student.component';


@Component({
    selector: 'Enrollment',
    templateUrl: './enrollment.component.html'
})
export class EnrollmentComponent {
    public enrollment:Enrollment[];
    public Classroom:Classroom[];
    public ClassroomId:number;

    public students:Student[];
    public StudentId:number;

    public dateEnrollment:Date;
    public hour:String

    public class:String;
    public day:number;
    public vacancies:number;
    
    public selected:number;
    public selected2:number;
    
    

   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/Enrollment').subscribe(result => {
            this.enrollment = result.json() as Enrollment[];
        }, error => console.error(error));
        http.get(baseUrl + 'api/Classroom').subscribe(result => {
            this.Classroom = result.json() as Classroom[];
        }, error => console.error(error));
        http.get(baseUrl + 'api/Student').subscribe(result => {
            this.students = result.json() as Student[];
        }, error => console.error(error));
    }

    
    Save()
    {       
        var value = {StudentId:this.selected, ClassroomId:this.selected2};
        console.log(value);
        this.http.post(this.baseUrl + 'api/Enrollment', value).subscribe(result=>{
            this.enrollment.push(result.json())});
    }

    Delete(item:Enrollment)
    {
        console.log(item.id);
    
        this.http.delete(this.baseUrl+ `api/Enrollment/${item.id}`).subscribe(result  => {
            this.enrollment.splice(this.enrollment.indexOf(item),1);
            },error=> console.error(error));
            

    }

    public setStudent(fuck:number){
        this.selected = fuck;
    }
    
    public setClassroom(fucks:number){
        this.selected2 = fucks;
    }
}

interface Enrollment{
    id:String;
    dateEnrollment:Date;
    hour:String;
    student:Student;
    StudentId:number;
    classroom:Classroom;
    ClassroomId:number;
}

interface Student{
    id:String;
    name:String;
}


interface Classroom {
    id : String;
    classroom:String;

}