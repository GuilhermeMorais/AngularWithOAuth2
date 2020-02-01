import { Injectable } from '@angular/core';
import { UserProfile } from '../models/user-profile';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants';

@Injectable()
export class AccountService {

  userProfile: UserProfile;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UserProfile[]>{
    return this.http.get<UserProfile[]>(Constants.apiRoot + 'Account/Users');
  }

  createUserProfile(user: UserProfile){
    return this.http.post(`${Constants.apiRoot}Account/Profile`, user);
  }

  updateUserProfile(user: UserProfile){
    return this.http.put(`${Constants.apiRoot}Account/Profile/${user.id}`, user);
  }

  register(userInfo: any){
    return this.http.post(`${Constants.apiRoot}Account/Register`, userInfo);
  }
}
