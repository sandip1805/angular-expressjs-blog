import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login-signup-form',
  templateUrl: './login-signup-form.component.html',
  styleUrls: ['./login-signup-form.component.scss']
})
export class LoginSignupFormComponent implements OnInit {
  form!: FormGroup;
  queryParams: any;

  constructor(
    private toastrSvc: ToastrService,
    private authSvc: AuthService,
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getQueryParams();
  }

  initForm(){
    this.form = new FormGroup({
      userName :  new FormControl('', [Validators.required]),
      password :  new FormControl('', [Validators.required]),
    });
  }

  getQueryParams() {
    this.activatedRoute.queryParams.subscribe((query: any) => {
      this.queryParams = JSON.parse(query?.isSignUp);
    });
  }

  validateForm() {
    const value = this.form.value;
    console.log(value);

    if (value?.userName === '' || !value?.userName) {
      this.toastrSvc.warning('','Please enter a valid username to continue.',{
        timeOut: 3000
      });
      return false;
    }

    if (value?.password === '' || !value?.password) {
      this.toastrSvc.warning('','Please enter a valid password to continue.',{
        timeOut: 3000
      });
      return false;
    }

    return true;
  }

  generateBody() {
    const value = this.form.value;

    const body = {
      email: value?.userName,
      password: value?.password
    }

    return body;
  }

  onLogIn() {
    const validateForm = this.validateForm();
    if (!validateForm) return;
    const body = this.generateBody();
    console.log(body);
    if (this.queryParams?.isSignUp) {
      this.continueSignUpAction(body);
    }
    else {
      this.continueLoginAction(body);
    }
  }

  continueLoginAction(body: any) {
    this.authSvc.login(body).subscribe(res => {
      console.log(res);
      if (res && res?.length > 0) {
        this.toastrSvc.success('','logged in successfully');
        this.userService.setUserStatus = true;
        this.navigateToHomePage();
      }
      else {
        this.toastrSvc.error('','invalid credentials', {
          timeOut: 3000
        });
        this.form.reset('');
      }
    })
  }

  continueSignUpAction(body: any) {
    this.authSvc.signup(body).subscribe(res => {
      console.log(res);
      this.navigateToHomePage();
    })
  }

  navigateToHomePage() {
    this.router.navigate(['/']);
  }

}
