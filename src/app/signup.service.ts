import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signUp(obj): Observable<any>{
    return this.http.post<any>("https://api.raisely.com/v3/signup", obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }).pipe((
      map( res =>{
        return res
      })
    ), catchError( err =>{
      return throwError(err)
    }))
  }

  checkEmail(obj): Observable<any>{
    return this.http.post<any>("https://api.raisely.com/v3/check-user", obj, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }).pipe((
      map( res =>{
        return res
      })
    ), catchError( err =>{
      return throwError(err)
    }))
  }



}
