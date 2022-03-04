import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../../services/user.service';
import {Subject} from 'rxjs';
import {IUser} from '../../interfaces/IUser';

class MockUserService {
  user: Subject<IUser[]> = new Subject<IUser[]>(); 

  login() {
    return [
      {
        email: "Test",
        password: "Test"
      }
    ]
  }

}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a proper initial state', () => {
    expect(component.ngOnInit).toBeTruthy();
    expect(component.error).toBeFalsy();
    expect(component.email).toBeFalsy();
    expect(component.password).toBeFalsy();
  });

  it('should be true onSubmit()', () => {
    expect(component.onSubmit).toBeTruthy();
  });

  it('should call login in the UserService', () => {
    let service = fixture.debugElement.injector.get(UserService);
    let serviceSpy = spyOn(service, 'login').and.callThrough();

    component.onSubmit();

    expect(serviceSpy).toHaveBeenCalled();
  });
});
