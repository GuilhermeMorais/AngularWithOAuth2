import { Injectable } from '@angular/core';
import { UserManager, User } from "oidc-client";
import { Constants } from '../constants';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService {
  private userManger: UserManager
  private user: User;
  private loginChangedSubject = new Subject<boolean>();

  loginChanged = this.loginChangedSubject.asObservable();

  constructor() {
    const stsSettings = {
      authority: Constants.stsAuthority,
      client_id: Constants.clientId,
      redirect_uri: `${Constants.clientRoot}signin-callback`,
      scope: 'openid profile projects-api',
      response_type: 'code',
      post_logout_redirect_uri: `${Constants.clientRoot}signout-callback`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${Constants.clientRoot}assets/silent-callback.html`
    };

    this.userManger = new UserManager(stsSettings);
    this.userManger.events.addAccessTokenExpired(_ => {
      this.loginChangedSubject.next(false);
    })
  }

  login() {
    return this.userManger.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this.userManger.getUser().then(user => {
      const userCurrent = !!user && !user.expired;
      if (this.user !== user) {
        this.loginChangedSubject.next(userCurrent);
      }
      this.user = user;
      return userCurrent;
    });
  }

  completeLogin() {
    return this.userManger.signinRedirectCallback().then(user => {
      this.user = user;
      this.loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this.userManger.signoutRedirect();
  }

  completeLogout() {
    this.user = null;
    this.loginChangedSubject.next(false);
    return this.userManger.signoutRedirectCallback();
  }

  //Method to get the access token to be used in the api.
  getAccessToken() {
    return this.userManger.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      } else {
        return null;
      }
    })
  }
}
