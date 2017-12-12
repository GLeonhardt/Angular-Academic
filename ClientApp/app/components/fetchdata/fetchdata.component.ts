import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';


@Component({
    selector: 'State',
    templateUrl: './fetchdata.component.html'
})
export class FetchDataComponent {
    public forecasts: StateForecast[];
    public name : String;
    public Id:String;
   
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/State').subscribe(result => {
            this.forecasts = result.json() as StateForecast[];
        }, error => console.error(error));
        
    }

    
    SaveState()
    {
        var value = {name:this.name};
        console.log(value);
        this.http.post(this.baseUrl + 'api/State', value).subscribe(result=>{
            this.forecasts.push(result.json())});
    }

    Delete(forecast:StateForecast)
    {
        console.log(forecast.id);
    
        this.http.delete(this.baseUrl+ `api/State/${forecast.id}`).subscribe(result  => {
            this.forecasts.splice(this.forecasts.indexOf(forecast),1);
            },error=> console.error(error));
            

    }

    List()
    {
        // `api/State/${forecast.id}`
        this.http.get(this.baseUrl + 'api/State').subscribe(result => {
            this.forecasts = result.json() as StateForecast[];
        }, error => console.error(error)); 

    }
}

interface StateForecast {
    id : String;
    name:String;
}
