import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';

import { Pressure } from './pressure.model';

@Injectable({providedIn: 'root'})

export class PressureService {
    private pressures: Pressure[] = [];
    private pressuresUpdated = new Subject<Pressure[]>();

    constructor(private httpClient: HttpClient) {}

    getPressures() {
        this.httpClient.get<{message: String, pressures: Pressure[]}>('http://localhost:3001/api/pressureSensor')
            .subscribe((pressureData) =>{
                this.pressures = pressureData.pressures;
                this.pressuresUpdated.next([...this.pressures]);
            });

    }

    getPressureUpdateListener() {
        return this.pressuresUpdated.asObservable();
    }
}