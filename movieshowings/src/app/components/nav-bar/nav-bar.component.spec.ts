import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Subject} from 'rxjs';
import {IUser} from '../../interfaces/IUser';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigateLogin on click', () => {
    let navCom = fixture.debugElement.injector.get(NavBarComponent);
    let navComSpy = spyOn(navCom, 'navigateLogin').and.callThrough();

    component.navigateLogin();

    expect(navComSpy).toHaveBeenCalled();
  });

  /*uncomment once these functions have been implemented
  it('should call navigateHome on click', () => {
    let navCom = fixture.debugElement.injector.get(NavBarComponent);
    let navComSpy = spyOn(navCom, 'navigateHome').and.callThrough();

    component.navigateHome();

    expect(navComSpy).toHaveBeenCalled();
  });

  it('should call navigateAccount on click', () => {
    let navCom = fixture.debugElement.injector.get(NavBarComponent);
    let navComSpy = spyOn(navCom, 'navigateAccount').and.callThrough();

    component.navigateAccount();

    expect(navComSpy).toHaveBeenCalled();
  });

  it('should call navigateTickets on click', () => {
    let navCom = fixture.debugElement.injector.get(NavBarComponent);
    let navComSpy = spyOn(navCom, 'navigateTickets').and.callThrough();

    component.navigateTickets();

    expect(navComSpy).toHaveBeenCalled();
  });

  it('should call navigatePurchase on click', () => {
    let navCom = fixture.debugElement.injector.get(NavBarComponent);
    let navComSpy = spyOn(navCom, 'navigatePurchase').and.callThrough();

    component.navigatePurchase();

    expect(navComSpy).toHaveBeenCalled();
  });
  */
});
