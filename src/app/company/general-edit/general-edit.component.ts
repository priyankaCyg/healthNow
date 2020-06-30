import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from "../../services/toast.service";

@Component({
  selector: 'app-general-edit',
  templateUrl: './general-edit.component.html',
  styleUrls: ['./general-edit.component.css']
})

export class GeneralEditComponent implements OnInit {

  constructor(private fb: FormBuilder, private httpService: ApiService, private config: DynamicDialogConfig,
    private ref: DynamicDialogRef, private toastService: ToastService) { }

  ngOnInit(): void {
    // code for set value when click on edit Button 
    this.GeneralSubmit.patchValue({
      website: this.config.data.sWebsite,
      tele1: this.config.data.sTelNo1,
      tele2: this.config.data.sTelNo2,
      fax: this.config.data.sFaxNo
    });
  }

  // code for implement formBuilder and Validation
  GeneralSubmit = this.fb.group({
    website: ['', Validators.required],
    tele1: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(13)]],
    tele2: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(13)]],
    fax: ['', Validators.required]
  });

  // code for Submit Form Data 
  onSubmit() {
    let web_name = this.GeneralSubmit.controls["website"].value;
    let tele_1 = this.GeneralSubmit.controls["tele1"].value;
    let tele_2 = this.GeneralSubmit.controls["tele2"].value;
    let fax_no = this.GeneralSubmit.controls["fax"].value;
    const general_Submit_Data =
    {
      "iRequestID": 2002,
      "iCID": 1,
      "sWebsite": web_name,
      "sTelNo1": tele_1,
      "sTelNo2": tele_2,
      "sFaxNo": fax_no
    };
    this.httpService.callPostApi(general_Submit_Data).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }

  // code for Edit Dialog Box Closed 
  close() {
    this.ref.close();
  }

}
