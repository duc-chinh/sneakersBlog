import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: any = '';
  password: any = '';
  
  constructor(public authService: AuthService, private route: Router)
  {
    
  }

  ngOnInit(): void {
  }

  submit(): any
  {
    this.authService.login(this.login, this.password).subscribe(
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
