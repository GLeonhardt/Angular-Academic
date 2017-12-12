import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    selector: 'Course',
    templateUrl: './course.component.html'
})
export class CourseComponent {
    public courses: Course[];
    public name : String;
    public title: String;
    public Id:String;
   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/Course').subscribe(result => {
            this.courses = result.json() as Course[];
        }, error => console.error(error));
        
    }

    
    Save()
    {
        var value = {name:this.name, title:this.title};
        console.log(value);
        this.http.post(this.baseUrl + 'api/Course', value).subscribe(result=>{
            this.courses.push(result.json())});
    }

    Delete(item:Course)
    {
        console.log(item.id);
    
        this.http.delete(this.baseUrl+ `api/Course/${item.id}`).subscribe(result  => {
            this.courses.splice(this.courses.indexOf(item),1);
            },error=> console.error(error));
            

    }
}

interface Course {
    id : String;
    name:String;
    title:String;
}
