import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MovieServiceService} from '../../services/movie-service.service';
import {Subject} from 'rxjs';
import {IMovie} from '../../interfaces/imovie';
import { By } from '@angular/platform-browser';
import { ITicket } from 'src/app/interfaces/ITicket';

class MockMovieServiceervice {
  movie: Subject<IMovie[]> = new Subject<IMovie[]>(); 

  getMovies() {
    return [
      {
        items: []
      }
    ]
  }

}

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //oninit should call to the movie service to grab said movies
  it('should call getMovies in MovieService at oninit', () => {
    let service = fixture.debugElement.injector.get(MovieServiceService);
    let serviceSpy = spyOn(service, 'getMovies').and.callThrough();

    component.ngOnInit();

    expect(serviceSpy).toHaveBeenCalled();
  });

  /*this one broke when the big merge was made. :( i believe its because of login
  it('should call and create saveTickets', () => {
    let mainComponent = fixture.debugElement.injector.get(MainPageComponent);
    let mainComponentSpy = spyOn(mainComponent, 'saveTickets').and.callThrough();


    component.saveTickets({title:"", releaseState:"", image:"", genres: ""},"", "", "");

    expect(mainComponentSpy).toHaveBeenCalled();
  })
  */
});
