import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Api } from '../../services/api';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private api: Api,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    const { username, password } = this.loginForm.value;
    this.api.login(username, password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token); 
        this.router.navigateByUrl('/bakeries');  
      },
      error: (err) => {
        this.errorMessage = err.error || 'Falha na autenticação';
      }
    });
  }
}
