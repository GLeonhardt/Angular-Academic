import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import {FetchDataComponent} from '../fetchdata/fetchdata.component';


@Component({
    selector: 'Cidade',
    templateUrl: './Cidade.component.html'
})
export class CidadeComponent {
    public cidades: Cidade[];
    public name : String;
    public forecasts: StateForecast[];
    public selected:number;
    
    

   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/City').subscribe(result => {
            this.cidades = result.json() as Cidade[];
        }, error => console.error(error));
        http.get(baseUrl + 'api/State').subscribe(result => {
            this.forecasts = result.json() as StateForecast[];
        }, error => console.error(error));
        
    }

    
    Save()
    {       
        var value = {name:this.name, stateId:this.selected};
        console.log(value);
        this.http.post(this.baseUrl + 'api/City', value).subscribe(result=>{
            this.cidades.push(result.json())});
    }

    Delete(item:Cidade)
    {
        console.log(item.id);
    
        this.http.delete(this.baseUrl+ `api/City/${item.id}`).subscribe(result  => {
            this.cidades.splice(this.cidades.indexOf(item),1);
            },error=> console.error(error));
            

    }

    public setState(fuck:number){
        this.selected = fuck;
    }
}



interface Cidade {
    id : String;
    name:String;
    state:StateForecast;
    stateId:number;
}  

interface StateForecast {
    id : String;
    name:String;
}
