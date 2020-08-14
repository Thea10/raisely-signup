import { Component, OnInit } from '@angular/core';
import { SignupService } from './signup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'raisely-signup';
  public firstname: string;
  public lastname: string;
  public email: string;
  public password: string;
  public loading: boolean;
  emailValidationLoading: boolean;
  public emailText: any;
  public feedbackText: any;
  fieldTextType: boolean;
  campaignId = "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a";

  constructor( public authService: SignupService ){}
  ngOnInit(){

  }

 /*ngAfterViewInit(): void {
    
    if (this.email !== "") { this.validateEmail()} 
    
  }*/

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }


  clearDetails() {
    this.firstname = "";
    this.lastname = "";
    this.email = ""
    this.password = ""
  }

  async validateEmail(email){

     setTimeout(() => {
      if(!email.control.errors){
        this.emailValidationLoading = true;
        this.emailText = "Please wait.. we're checking to make sure you've not signed up yet";
        let details = {
          "campaignUuid": this.campaignId,
          "data": {
            email: this.email
          }
        };
    
          this.authService.checkEmail(details).subscribe(
           
           async res =>{
             this.emailValidationLoading = false;
             if(res.data.status === "OK"){
               this.emailText = "All good! Please proceed with filling the form";
             } else if(res.data.status === "EXISTS"){
               this.emailText = "Looks like you've signed up already, please choose a new email address"
             }
             setTimeout(() => this.emailText = "", 4000);
           },
    
           async err =>{
             await this.handleError(err)
           }
         )
    
  
      } else{
        return email.control.errors;
      }

    }, 1500)
   
  
  }

  async signUp(){
    this.loading = true;
    let details = JSON.stringify({
      "campaignUuid": this.campaignId,
      "data": {
        firstName: this.firstname,
        lastName: this.lastname,
        email: this.email,
        password: this.password
      }
    });

    await this.authService.signUp(details).subscribe(
      async res =>{
        this.loading = false;
        this.feedbackText = res.message; 
        //`Registration successful, ${this.firstname}. Look out for a verification email from us!`;
      },

      async err =>{
        await this.handleError(err)
      }
    )

  }

  async handleError(err){
    this.emailValidationLoading = false;
    this.loading = false;
    if(err.statusText === "Unknown Error"){
      this.feedbackText = "Please check your internet connection";
    } else{
       this.feedbackText = err.error.errors[0].message;
       setTimeout(() => this.feedbackText = "", 4000);
    }

  }

  

 


 
}
