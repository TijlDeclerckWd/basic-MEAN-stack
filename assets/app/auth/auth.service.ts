import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()

export class AuthenticationService {

    constructor(private http: HttpClient){}

    signup(user){
        console.log(user);
        return this.http.post('http://localhost:3000/user/signup', user)
            .catch((error: Response) => {
                return Observable.throw(error);
            });
    }

    signIn(data){

        return this.http.post('http://localhost:3000/user/signin', data)
            .catch((error: Response) => {
                return Observable.throw(error);
            });
    }

    logout(){
            localStorage.clear();
    }

    createLoginObject(user){
        let endFirstIndex = user.name.indexOf(' ');
        let obj = {
            email: user.email,
            firstName: user.name.slice(0,endFirstIndex),
            lastName: user.name.slice(endFirstIndex+1, user.name.length-1),
            provider: {
                name: user.provider,
                ID: user.id,
            }
        };
        return this.signIn(obj);
    }
}