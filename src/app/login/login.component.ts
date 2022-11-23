import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Observable, ReplaySubject } from 'rxjs';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user_data: any;
  error_messg: string = '' ;
 
  loginForm: FormGroup = new FormGroup({

    username: new FormControl('' , [ Validators.required,Validators.minLength(4),]),
    password: new FormControl('' ,  [Validators.required,Validators.minLength(4)]),

  });

  constructor(private ApisService: ApisService, private FormBuilder: FormBuilder, private router: Router) { 
    // check the user data is saved or not
    if(this.ApisService.finalChange.getValue())
    {
      this.router.navigate(['/'])
    }
  }

  ngOnInit(): void {
   
  }
// Save the data of the user in local storage after login
  saveData(key: string, value: object) {
    localStorage.setItem(key, JSON.stringify(value));

  }
  

// function for submit the data of login
  loginSubmit(formdata: FormGroup) {

    this.ApisService.login(formdata.value).subscribe(
      (res: any) => {

        this.user_data = res;

        this.saveData("User", res.token)
       let dataOfUser = this.ApisService.getData()
        // this.loginform.reset();
        console.log(dataOfUser);
        
        this.router.navigate(['/home'])


      },
      (err: any) => {
        this.error_messg = err.error.message
        console.log(err);


      }
    )

  }


}






