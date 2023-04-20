import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isVisited = new BehaviorSubject<boolean>(false); 
  /// To control if the user is logged in or not
  /// The BehaviorSubject keeps the latest value cached (in our case when the service is created the initial value is going to be false). 
  /// So when an Observer subscribes to the isLoggedIn(), the cached valued is going to be emitted right away.

  constructor(private _router: Router) { 
  }

  get isVisitedHome() {
    return this.isVisited.asObservable(); // getter to expose only the get method publicly and as also expose the Subject as an Observable
  }

  home() {
    this.isVisited.next(true);  
  }


  public default() {
    this._router.navigate(['/']);
    this.isVisited.next(false);
  }
}
