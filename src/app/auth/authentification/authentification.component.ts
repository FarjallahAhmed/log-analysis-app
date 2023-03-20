import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {

  public email = '';
  public password = '';
  public message = '';
  loading = false;
  error!: string | null;

  loginForm!: FormGroup;

  submitted = false;

  constructor(private router: Router, private authService: AuthentificationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });

  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(result => {
      if (result) {
        this.router.navigate(['']);
      } else {
        this.loading = false;
      }
    });
  }


}
