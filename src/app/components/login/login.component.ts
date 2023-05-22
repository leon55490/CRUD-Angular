import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) { }

  /**
   * The ngOnInit function calls the ConstruirFormulario function.
   */
  ngOnInit() {
    this.ConstruirFormulario();
  }

  /**
   * The function creates a form group with email and password fields, and applies required
   * and email validators to the email field and a required validator to the password field.
   */
  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * This function handles user login by sending a POST request to an API endpoint and
   * storing the user's session data in local storage.
   * @returns If the form group is invalid, the function will return nothing (since there is
   * a `return;` statement). If the form group is valid, the function will make an HTTP POST
   * request to a login endpoint and subscribe to the response. If the response is
   * successful, it will save the user data and access token to local storage and redirect to
   * the home page. If there is an error, it
   */
  login() {
    if (this.fGroup.invalid) {
      return;
    }

    const email = this.obtenerFormGroup['email'].value;
    const password = this.obtenerFormGroup['password'].value;

    const body = {
      email: email,
      password: password
    };

    this.http.post<any>('https://dev-api.contender-logistics.draketechdev.ca/api/auth/login', body)
      .subscribe(response => {

        /* `localStorage.setItem('user', JSON.stringify(response.user));` is storing the user
        data returned from the API response in local storage as a stringified JSON object
        with the key 'user'. */
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('accessToken', response.accessToken);

        /* `this.router.navigate(['/home']);` is navigating the user to the home page of the
        application. It uses the Angular Router to navigate to the specified route, which
        in this case is the home page. */
        this.router.navigate(['/home']);
      }, error => {
        alert("Theres and error with the login")
      });
  }

  /**
   * The function returns the controls of a form group.
   * @returns The code is returning the controls of a FormGroup object. The `fGroup` is a
   * FormGroup instance and `controls` is a property of the FormGroup class that returns an
   * object containing all the child controls of the FormGroup. The `obtenerFormGroup` method
   * is returning this object.
   */
  get obtenerFormGroup() {
    return this.fGroup.controls;
  }
}
