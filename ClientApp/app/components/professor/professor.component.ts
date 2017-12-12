import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    selector: 'Professor',
    templateUrl: './professor.component.html'
})
export class ProfessorComponent {
    public professores: Professor[];
    public name : String;
    public Id:String;
   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/Professor').subscribe(result => {
            this.professores = result.json() as Professor[];
        }, error => console.error(error));
        
    }

    
    Save()
    {
        var value = {name:this.name};
        console.log(value);
        this.http.post(this.baseUrl + 'api/Professor', value).subscribe(result=>{
            this.professores.push(result.json())});
    }

    Delete(item:Professor)
    {
        console.log(item.id);
    
        this.http.delete(this.baseUrl+ `api/Professor/${item.id}`).subscribe(result  => {
            this.professores.splice(this.professores.indexOf(item),1);
            },error=> console.error(error));
            

    }

    List()
    {
        // `api/State/${forecast.id}`
        this.http.get(this.baseUrl + 'api/State').subscribe(result => {
            this.professores = result.json() as Professor[];
        }, error => console.error(error)); 

    }
}

interface Professor {
    id : String;
    name:String;
}