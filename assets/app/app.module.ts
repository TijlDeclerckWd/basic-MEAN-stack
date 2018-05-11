import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./header/header.component";
import {routing} from "./app.routing";
import {LoginComponent} from "./auth/login.component";
import { SocialLoginModule, AuthServiceConfig} from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angular4-social-login";
import {AuthenticationService} from "./auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {LogoutComponent} from "./auth/logout.component";

let config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("407752772889-ecvibbr5r6ib3eah1tc4ueitiuq1h2po.apps.googleusercontent.com")
    }
]);

@NgModule({
    declarations:[
        AppComponent,
        HomeComponent,
        HeaderComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        NgbModule.forRoot(),
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        routing,
        ReactiveFormsModule,
        SocialLoginModule.initialize(config)
    ],
    bootstrap: [AppComponent],
    providers: [
        AuthenticationService,
        HttpClientModule
    ]
})
export class AppModule{

}