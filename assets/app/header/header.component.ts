import {Component, OnInit} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../auth/user.model";
import {AuthenticationService} from "../auth/auth.service";
import {Router} from "@angular/router";


@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

    modalReference;
    mySignupForm;

    constructor(private modalService: NgbModal, private authService: AuthenticationService, private route: Router){}

    ngOnInit(){
        this.mySignupForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            username: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
        });
    }

    open(content) {
        this.modalReference = this.modalService.open(content, { size: 'lg', backdrop: 'static' });

        this.modalReference.result.then((result) => {
            console.log(result);
        });
    }

    onSignupSubmit() {
        const user =  new User(
            this.mySignupForm.value.email,
            this.mySignupForm.value.username,
            this.mySignupForm.value.password,
            this.mySignupForm.value.firstName,
            this.mySignupForm.value.lastName
        );
        this.authService.signup(user)
            .subscribe(
                data => {
                    console.log(data);
                    setTimeout(() => {
                        this.modalReference.close();
                        this.mySignupForm.reset();
                        this.route.navigateByUrl('/login')
                    }, 2000)

                        ,
                        error => console.error(error)
                }
            );
    }

    logout(){

    }
}