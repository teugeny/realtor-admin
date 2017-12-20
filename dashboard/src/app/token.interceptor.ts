import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    /**
     *
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('ajax-access-token');
        let _req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'x-access-token': token !== null ? token : ''
            }
        });

        return next.handle(_req)
            .catch((error, caught) => {
                this.router.navigate(['login']);
                return Observable.throw(error);
            }) as any;
    }
}