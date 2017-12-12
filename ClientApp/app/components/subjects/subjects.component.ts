import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {CourseComponent} from '../course/course.component';


@Component({
    selector: 'Subjects',
    templateUrl: './Subjects.component.html'
})
export class SubjectsComponent {
    public subjects:Subjects[];
    public name : String;
    public workload:number;
    public course:Course[];
    public selected:number;
    
    

   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/Subjects').subscribe(result => {
            this.subjects = result.json() as Subjects[];
        }, error => console.error(error));
        
        http.get(baseUrl + 'api/Course').subscribe(result => {
            this.course = result.json() as Course[];
        }, error => console.error(error));
        
    }

    
    Save()
    {       
        var value = {name:this.name, workload:this.workload, CourseId:this.selected};
        console.log(value);
        this.http.post(this.baseUrl + 'api/Subjects', value).subscribe(result=>{
            this.subjects.push(result.json())});
            
    }

    Delete(item:Subjects)
    {
        console.log(item.id);
    
        this.http.delete(this.baseUrl+ `api/Subjects/${item.id}`).subscribe(result  => {
            this.subjects.splice(this.subjects.indexOf(item),1);
            },error=> console.error(error));
            

    }

    public setCourse(fuck:number){
        this.selected = fuck;
    }
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
