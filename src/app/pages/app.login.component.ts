import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../app/services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnInit {

  dark: boolean;

  checked: boolean;

  username;
  password;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login() {


    var dataToSendEdit = {
      "iRequestID": 1001,
      "sUserName": this.username,
      "sPassword": this.password
    }

    this.loginService.authenticate(dataToSendEdit).then(response => {

      console.log("Response of Login ", response.body)

      var bodyData = response.body[0];

      localStorage.setItem('iCID', bodyData.iCID);
      localStorage.setItem('iRoleID', bodyData.iRoleID);
      localStorage.setItem('iUserID', bodyData.iUserID);
      localStorage.setItem('sRoleName', bodyData.sRoleName);
      localStorage.setItem('sUserName', bodyData.sUserName);
      localStorage.setItem('sFirstName', bodyData.sFirstName);
      localStorage.setItem('sFirstInitial', bodyData.sFirstInitial);
      let temp = ''
      this.loginService.getAccess(temp).then(response1 => {

        console.log("Response of Access ", response1)


      }).catch(error => {
        // alert(error)
      })
    })
  }


}
