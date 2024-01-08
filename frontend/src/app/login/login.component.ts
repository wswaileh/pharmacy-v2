import { Component } from '@angular/core';
import { AuthService } from '../_services/facade-services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string;
  password: string;

  errorMsg: string | undefined;

  constructor(public authService: AuthService, public router: Router) {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    if (this.router.getCurrentNavigation()?.extras?.state?.['msg']) {
      this.errorMsg = this.router.getCurrentNavigation().extras.state['msg'];
    }
  }

  loginFormSubmitted() {
    this.authService.login(this.username, this.password).subscribe(
      (_) => {
        this.router.navigate(['/main']);
      },
      (err) => (this.errorMsg = err.error.message)
    );
  }
}
