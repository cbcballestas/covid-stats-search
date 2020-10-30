import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CovidService {
  constructor(private http: HttpClient) {}

  findByCountry(country: string): Observable<Response> {
    return this.http.get(`${environment.API_URL}/${country}`).pipe(
      map((data: any) => {
        return {
          country: data.country,
          cases: data.cases,
          deaths: data.deaths,
          recovered: data.recovered,
          flag: data.countryInfo.flag,
        };
      })
    );
  }
}
