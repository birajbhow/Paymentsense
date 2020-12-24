import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { CountryListViewModel } from '../types';

@Injectable({
  providedIn: 'root'
})
export class PaymentsenseCodingChallengeApiService {
  private baseUrl: string;

  constructor(private httpClient: HttpClient) {
    this.baseUrl = 'https://localhost:44355';
  }

  public getHealth(): Observable<string> {
    return this.httpClient.get(`${this.baseUrl}/health`, { responseType: 'text' });
  }

  public getCountries(currentPage: number = 1): Observable<CountryListViewModel> {
    return this.httpClient
        .get<CountryListViewModel>(`${this.baseUrl}/paymentsensecodingchallenge/countries?page=${currentPage}`)
        .pipe(catchError(err => {
          console.log('Error occurred while fetching countries from api!');
          console.log(err);
          return of(null);
        }));
  }
}
