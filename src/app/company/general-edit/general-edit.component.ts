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

  constructor(private fb: FormBuilder, private apiService: ApiService,
    public config: DynamicDialogConfig,
    private ref: DynamicDialogRef, private toastService: ToastService) { }

  ngOnInit(): void {
    this.GeneralSubmit.patchValue({
      website: this.config.data.sWebsite,
      tele1: this.config.data.sTelNo1,
      tele2: this.config.data.sTelNo2,
      fax: this.config.data.sFaxNo
    });
  }

  GeneralSubmit = this.fb.group({
    website: ['', Validators.required],
    tele1: ['', Validators.required],
    tele2: ['', Validators.required],
    fax: ['', Validators.required]
  });



  onSubmit() {
    let web_name = this.GeneralSubmit.controls["website"].value;
    let tele_1 = this.GeneralSubmit.controls["tele1"].value;
    let tele_2 = this.GeneralSubmit.controls["tele2"].value;
    let fax_no = this.GeneralSubmit.controls["fax"].value;

    const general_submit_data =
    {
      "iRequestID": 2002,
      "iCID": 1,
      "sWebsite": web_name,
      "sTelNo1": tele_1,
      "sTelNo2": tele_2,
      "sFaxNo": fax_no
    };
    console.log(general_submit_data);
    this.apiService.callPostApi(general_submit_data).subscribe(
      data => {
        console.log(data);
        this.toastService.addSingle("success", "Record Added Successfully", "");

      },
      error => console.log(error)
    );
    this.ref.close();
  }

  close() {
    this.ref.close();
  }

}
