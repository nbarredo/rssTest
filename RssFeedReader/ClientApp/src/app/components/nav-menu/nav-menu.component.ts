import { Component } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { Account } from 'msal/lib-commonjs';
import { from } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(
    private broadcastService: BroadcastService,
    private authService: MsalService,
    private userService: UserService
  ) { }
  isExpanded = false;
  loggedIn = false;
  name = '';

  ngOnInit() {
    this.checkoutAccount();
    const account: Account = this.authService.getAccount();
    this.name = account.name;
    this.broadcastService.subscribe('msal:loginSuccess', () => {
      this.checkoutAccount();   
    
      const isNew: boolean = !!account.idTokenClaims['newUser'];
      if (isNew) {
        this.userService.saveUser(account);
      }
    });
  }

  checkoutAccount() {
    this.loggedIn = !!this.authService.getAccount();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }



  login() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
      this.authService.loginRedirect();
    } else {
      this.authService.loginPopup();
    }
  }


  logout() {
    this.authService.logout();
  }
}
