import {Component, OnInit} from "@angular/core";
import {AuthService, GoogleLoginProvider, SocialUser} from "angular4-social-login";
import {AuthenticationService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    user: SocialUser;

    constructor(private authSocial: AuthService, private auth: AuthenticationService, private route: Router){
}

ngOnInit() {

        // this.authSocial.authState.subscribe((user) => {
        // this.user = user;
        // if (user) {
        //     console.log(this.user);
        // }
        // })
}

onLogin(formValues){
        this.auth.signIn(formValues)
            .subscribe((result) => {
                localStorage.setItem('token', result.token);
                localStorage.setItem('fullName', result.fullName);
                this.route.navigateByUrl('/');
    });
}

signInWithGoogle(): void {
        this.authSocial.signIn(GoogleLoginProvider.PROVIDER_ID)
            .then((user) => {
                console.log('finished social login front-end');
                this.auth.createLoginObject(user)
                    .subscribe((result)=> {
                        localStorage.setItem('token', result.token);
                        localStorage.setItem('fullName', result.fullName);
                        this.route.navigateByUrl('/');
                    })
            })
}

signOut(): void {
        this.authSocial.signOut();
}

}