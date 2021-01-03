import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: any = '';
  lastName: any = '';
  login: any = '';
  password: any = '';

  constructor(public authService: AuthService, private route: Router) {
  }

  ngOnInit(): void {
  }

  submit(): any
  {
    this.authService.register(this.firstName, this.lastName, this.login, this.password).subscribe(
      (userInfo: any) =>
      {
        this.authService.connectedUser = userInfo;
        this.route.navigate(['/']);
      },
      (err) =>
      {
        console.log('err', err);
      }
    );
  }
}
