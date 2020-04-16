import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { interval} from 'rxjs';
import { map } from 'rxjs/operators'

import { Temperature } from './temperature.model';
import { TemperatureService } from './temperature.service';


@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css']
})

export class TemperatureComponent implements OnInit, OnDestroy {
    temperatures: Temperature[];
    private temperatureSub: Subscription;
    status: Boolean = false;

    constructor(public temperatureService: TemperatureService) {}

    ngOnInit(){
        this.temperatureService.getTemperatures();
        this.temperatureSub = this.temperatureService.getTemperatureUpdateListener()
            .subscribe((temperatures: Temperature[]) => {
                this.temperatures = temperatures;
                this.status = temperatures[0].currentStatus;
            });
    }

    ngOnDestroy() {
        this.temperatureSub.unsubscribe();
        this.status = false;
    }
}