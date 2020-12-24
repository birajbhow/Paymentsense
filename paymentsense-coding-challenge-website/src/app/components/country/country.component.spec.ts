import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaymentsenseCodingChallengeApiService } from 'src/app/services';
import { MockPaymentsenseCodingChallengeApiService } from 'src/app/testing/mock-paymentsense-coding-challenge-api.service';
import { CountryComponent } from './country.component';

describe('CountryComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CountryComponent
      ],
      providers: [
        { provide: PaymentsenseCodingChallengeApiService, useClass: MockPaymentsenseCodingChallengeApiService }
      ]
    }).compileComponents();
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CountryComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render country name and flag', () => {
    const fixture = TestBed.createComponent(CountryComponent);
    fixture.componentInstance.country = MockPaymentsenseCodingChallengeApiService.getMockCountryViewModelObject();
    fixture.detectChanges();
    const expectedCountryName: string = fixture.componentInstance.country.name;
    const expectedFlagUrl: string = fixture.componentInstance.country.flagUrl;

    const flgImg: HTMLImageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    const countryName: HTMLElement = fixture.debugElement.queryAll(By.css('td'))[1].nativeElement;

    expect(flgImg.src).toBe(expectedFlagUrl);
    expect(countryName.textContent).toBe(expectedCountryName);
  });

  it('should render country details', () => {
    const fixture = TestBed.createComponent(CountryComponent);
    fixture.componentInstance.country = MockPaymentsenseCodingChallengeApiService.getMockCountryViewModelObject();
    fixture.componentInstance.countryClickHandler();
    fixture.detectChanges();
    const expectedCapitalCity: string = fixture.componentInstance.country.capitalCity;

    const liElem: HTMLElement = fixture.debugElement.queryAll(By.css('li'))[0].nativeElement;

    expect(liElem.textContent.search(expectedCapitalCity) > 0).toBeTruthy();
  });
});
