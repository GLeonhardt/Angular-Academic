import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {CidadeComponent} from '../cidade/cidade.component';


@Component({
    selector: 'Estudante',
    templateUrl: './student.component.html'
})
export class StudentComponent {
    public cidades: Cidade[];
    public students: Student[];
    
    public name : String;
    public address:String
    public email:String;
    public telephone:String;
    public selected:number;
    
    

   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/Student').subscribe(result => {
            this.students = result.json() as Student[];
        }, error => console.error(error));
        
        http.get(baseUrl + 'api/City').subscribe(result => {
            this.cidades = result.json() as Cidade[];
        }, error => console.error(error));
        
    }

    
    Save()
    {       
        var value = {name:this.name, address:this.address, email:this.email, telephone:this.telephone, cityId:this.selected};
        console.log(value);
        this.http.post(this.baseUrl + 'api/Student', value).subscribe(result=>{
            this.students.push(result.json())});
    }

    Delete(item:Student)
    {
        console.log(item.id);
    
        this.http.delete(this.baseUrl+ `api/Student/${item.id}`).subscribe(result  => {
            this.students.splice(this.students.indexOf(item),1);
            },error=> console.error(error));
            

    }

    public setCity(fuck:number){
        this.selected = fuck;
    }
}


interface Student{
    id:String;
    name:String;
    address:String;
    email:String;
    telephone:String;
    city:Cidade;
    cityId:number;
}

interface Cidade {
    id : String;
    name:String;
}  
