import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';



import { AppComponent } from './app.component';
import { MaterialModule } from './material-module/material.module';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeedDetailsComponent } from './components/feed-details/feed-details.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AddFeedComponent } from './components/add-feed/add-feed.component';
import { FeedItemCardComponent } from './components/feed-item-card/feed-item-card.component';
import { SafePipe } from './pipes/safe.pipe';
import { FeedCardComponent } from './components/feed-card/feed-card.component';
import { FeedListComponent } from './components/feed-list/feed-list.component';
import { FilterNewsPipe } from './pipes/filter-news.pipe';
import { AllNewsComponent } from './components/all-news/all-news.component';
import { MyNewsComponent } from './components/my-news/my-news.component';

export const protectedResourceMap: [string, string[]][] = [
  ['https://graph.microsoft.com/v1.0/me', ['user.read']]
];

@NgModule({
  declarations: [
    AppComponent,
    SafePipe,
    FeedCardComponent,
    NavMenuComponent,
    FeedDetailsComponent,
    MyNewsComponent,
    FilterNewsPipe,
    AllNewsComponent,
    FeedListComponent,
    FeedItemCardComponent,
    AddFeedComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MsalModule.forRoot({
      auth: {
        clientId: '97b973fc-77aa-42d1-9394-b780095a3f25',
        authority: 'https://nicobtest.b2clogin.com/tfp/nicobtest.onmicrosoft.com/B2C_1_signin_signup',
        validateAuthority: false,
        redirectUri: environment.redirectUri,
        postLogoutRedirectUri: environment.redirectUri,
        navigateToLoginRequestUrl: true,
      },
      cache: {
        cacheLocation: 'localStorage',

      },
    },
      {
        popUp: true,
        consentScopes: [
          'user.read',
          'openid',
          'profile'
        ],
        unprotectedResources: ['https://www.microsoft.com/en-us/'],
        protectedResourceMap,
        extraQueryParameters: {}
      }),
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: MyNewsComponent, pathMatch: 'full' },
      { path: 'add', component: AddFeedComponent },
      { path: 'feeds', component: FeedListComponent },
      { path: 'all', component: AllNewsComponent },
      { path: 'my-news', component: MyNewsComponent },
      { path: 'feed/:feedId', component: FeedDetailsComponent },
      { path: '**', component: MyNewsComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
