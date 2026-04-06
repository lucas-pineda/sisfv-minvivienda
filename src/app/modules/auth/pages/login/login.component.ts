import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly form = this.fb.group({
    email: ['usuariominpruebas@minvivienda.gov.co', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required]]
  });

  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  submit(): void {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const email = this.form.value.email ?? '';
    const password = this.form.value.password ?? '';

    const ok = this.auth.login(email, password);
    if (!ok) {
      this.errorMessage = 'Credenciales inválidas';
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.router.navigate([returnUrl || '/dashboard']);
  }
}
