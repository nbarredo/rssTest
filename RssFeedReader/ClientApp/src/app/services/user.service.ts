import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from 'msal/lib-commonjs';
import { User } from '../models/User';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: MsalService,
    @Inject('BASE_URL') private baseUrl: string) { }

  saveUser(userAccount: Account) {
    const mail = userAccount.idTokenClaims['emails'] && userAccount.idTokenClaims['emails'].length ? userAccount.idTokenClaims['emails'][0] : '';
    const user = new User();
    user.userEmail = mail;
    user.userId = userAccount.accountIdentifier;
    this.http.post(this.baseUrl + 'users', user).subscribe(result => {

    }, error => console.error(error));
  }

  getUser(): Observable<User> {
    const account= this.authService.getAccount();
    return this.http.get<User>(this.baseUrl + 'users/'+account.accountIdentifier);
  }
}
