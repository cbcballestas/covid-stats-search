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
  loading: boolean;
  visible: boolean;
  data: Response;

  subscription: Subscription = new Subscription();

  constructor(private covidService: CovidService) {}

  ngOnInit(): void {
    this._resetData();
  }

  buscar(value: string): void {
    if (!value) {
      return alert('You must enter a country');
    }

    this.loading = true;

    this.subscription.add(
      this.covidService.findByCountry(value).subscribe(
        (res) => {
          this.loading = false;
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
    this.loading = false;
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
