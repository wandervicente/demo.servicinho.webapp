import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { Temperature } from './temperature.model';

@Injectable({providedIn: 'root'})

export class TemperatureService {
    private temperatures: Temperature[] = [];
    private temperaturesUpdated = new Subject<Temperature[]>();
    
    constructor(private httpClient: HttpClient) {}
    getTemperatures() {
        this.httpClient.get<{message: String, temperatures: Temperature[]}>('http://localhost:3000/api/temperatureSensor')
            .subscribe((temperatureData) =>{
                this.temperatures = temperatureData.temperatures;
                this.temperaturesUpdated.next([...this.temperatures]);
            });
    }

    getTemperatureUpdateListener() {
        return this.temperaturesUpdated.asObservable();
    }
}