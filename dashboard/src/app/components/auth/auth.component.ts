import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/authService";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user: any = {};

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.user.username, this.user.password)
        .subscribe(success => {
            console.log(success);
          if (success) {
            this.router.navigate(['dashboard'])
          } else {
            console.log('error auth');
          }
        })
  }
}
