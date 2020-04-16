import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Pressure } from './pressure.model';
import { PressureService } from './pressure.service';


@Component({
  selector: 'app-pressure',
  templateUrl: './pressure.component.html',
  styleUrls: ['./pressure.component.css']
})

export class PressureComponent implements OnInit, OnDestroy {
    pressures: Pressure[];
    private pressureSub: Subscription;
    status: Boolean = false;

    constructor(public pressureService: PressureService) {}

    ngOnInit(){
        this.pressureService.getPressures();
        this.pressureSub = this.pressureService.getPressureUpdateListener()
            .subscribe((pressures: Pressure[]) => {
                this.pressures = pressures;
                this.status = pressures[0].currentStatus;
            });
    }

    ngOnDestroy() {
        this.pressureSub.unsubscribe();
        this.status = false;
    }
}