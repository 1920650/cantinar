import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registerComponent.html',
  styleUrl: './registerComponent.css'
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required]],
    }, {
      validators: this.passwordsCoinciden
    });
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get telefono() { return this.registerForm.get('telefono'); }
  get password() { return this.registerForm.get('password'); }
  get password_confirmation() { return this.registerForm.get('password_confirmation'); }

  // Validador personalizado: comprueba que password y password_confirmation coinciden
  passwordsCoinciden(form: any) {
    const p = form.get('password')?.value;
    const pc = form.get('password_confirmation')?.value;
    return p === pc ? null : { noCoinciden: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { name, email, password, password_confirmation, telefono } = this.registerForm.value;

    this.authService.register(name, email, password, password_confirmation, telefono).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 422) {
          // Errores de validación de Laravel
          const errores = err.error?.errors;
          if (errores?.email) {
            this.errorMessage = 'Ese email ya está registrado.';
          } else {
            this.errorMessage = 'Los datos no son válidos.';
          }
        } else {
          this.errorMessage = 'Ha ocurrido un error. Inténtalo de nuevo.';
        }
      }
    });
  }
}