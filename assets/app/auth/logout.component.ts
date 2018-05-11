import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    selector:'app-logout',
    templateUrl:'./logout.component.html'
})

export class LogoutComponent implements OnInit {

    constructor(private auth: AuthenticationService, private router: Router){

    }

    ngOnInit(){
        this.auth.logout();
        this.router.navigateByUrl('login');
    }

}