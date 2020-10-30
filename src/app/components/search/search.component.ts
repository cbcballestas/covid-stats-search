import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { CovidService } from '../../services/covid.service';
import { Response } from '../../models/response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  visible: boolean;
  data: Response;

  subscription: Subscription = new Subscription();

  constructor(private covidService: CovidService) {
    this._resetData();
  }

  ngOnInit(): void {}

  buscar(value: string): void {
    if (!value) {
      return alert('You must enter a country');
    }

    this.subscription.add(
      this.covidService.findByCountry(value).subscribe(
        (res) => {
          this.visible = true;
          this.data = res;
        },
        (err) => {
          this._resetData();
          alert(err.error.message);
        }
      )
    );
  }

  private _resetData(): void {
    this.visible = false;
    this.data = {
      country: '',
      cases: 0,
      deaths: 0,
      recovered: 0,
      flag: '',
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
