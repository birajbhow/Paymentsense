import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaymentsenseCodingChallengeApiService } from 'src/app/services';
import { MockPaymentsenseCodingChallengeApiService } from 'src/app/testing/mock-paymentsense-coding-challenge-api.service';
import { CountryComponent } from '../country/country.component';
import { PagingComponent } from '../pagination/paging.component';
import { CountryListComponent } from './country-list.component';

describe('CountryListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CountryListComponent,
        CountryComponent,
        PagingComponent
      ],
      providers: [
        { provide: PaymentsenseCodingChallengeApiService, useClass: MockPaymentsenseCodingChallengeApiService }
      ]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CountryListComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render valid message if no country found', () => {
    const fixture = TestBed.createComponent(CountryListComponent);
    fixture.componentInstance.content = null;
    fixture.detectChanges();

    const msgElem: HTMLElement = fixture.debugElement.query(By.css('h3')).nativeElement;

    expect(msgElem.textContent).toBe('No Countries Found!');
  });

  it('should render pagination component for valid content', () => {
    const fixture = TestBed.createComponent(CountryListComponent);
    fixture.detectChanges();

    const pagingElem: HTMLElement = fixture.debugElement.query(By.css('app-pagination')).nativeElement;

    expect(pagingElem).toBeTruthy();
  });
});
