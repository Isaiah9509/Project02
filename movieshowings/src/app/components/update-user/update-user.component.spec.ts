import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateUserComponent } from './update-user.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserService} from '../../services/user.service';
import {Subject} from 'rxjs';
import {IUser} from '../../interfaces/IUser';


class MockUserService {
  user: Subject<IUser[]> = new Subject<IUser[]>(); 

  register() {
    return [
      {
        id: 0,
        first: "Test",
        last: "Test",
        email: "Test",
        password: "Test"
      }
    ]
  }

}

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
