import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-obs',
  templateUrl: './obs.component.html',
  styleUrls: ['./obs.component.css']
})
export class ObsComponent implements OnInit {

  public chartType: string;
  chartRange: string;
  constructor() { }

  ngOnInit() {
  }

  public onValChange(val: string) {
    this.chartType = val;
  }

  public onRangeChange(val: string) {
    this.chartRange = val;
  }

}
