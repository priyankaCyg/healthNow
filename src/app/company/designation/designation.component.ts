import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { StatusData } from "src/app/model/status.model";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ToastService } from 'src/app/services/toast.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"],
})

export class DesignationComponent implements OnInit {

  statusData: StatusData[];
  setStatus: object;
  temp;
  selectedstatus;
  isEdit: boolean = false;
  isSaveDesignation: number = 0;
  constructor(
    private httpService: ApiService, private fb: FormBuilder, private config: DynamicDialogConfig,
    private ref: DynamicDialogRef, private toastService: ToastService) { }

  async ngOnInit(): Promise<void> {
    const status_data = {
      iRequestID: 2071,
      sKVName: "Status",
    };

    await this.httpService.getDropDownData(status_data).then(
      data => {
        this.statusData = data;
        this.statusData.unshift({ "iKVID": 0, "sKVValue": "Select" });
      },
      error => console.log(error)
    );

    this.temp = this.config.data.iStatusID;
    let tempData = this.statusData.filter(t => t.iKVID == this.temp);
    this.setStatus = tempData[0];
    if (this.config.data.iDesigID != undefined) {
      this.isEdit = true;
      this.desigForm.patchValue({
        desig_name: this.config.data.sDesigName,
        desig_level: this.config.data.iDesigLevel,
        status: this.setStatus,
      });
    } else {
      this.isEdit = false;
    }
  }

  desigForm = this.fb.group({
    desig_name: ["", ValidationService.nameValidator_space],
    desig_level: ["", Validators.required],
    status: ["", Validators.required],
  });

  // Add and Update details function
  onSubmit() {
    let desig_id = this.config.data.iDesigID;
    let desig_name = this.desigForm.controls["desig_name"].value;
    let desig_level = this.desigForm.controls["desig_level"].value;
    let status = this.desigForm.controls["status"].value;
    let status_id = status.iKVID;
    if (status_id == 0) {
      this.desigForm.setErrors({ 'invalid': true });
    }
    else {
      if (!this.desigForm.invalid) {
        if (desig_id == undefined) {
          //Add designation details
          const addDesig_data = {
            iRequestID: 2081,
            iCID: 1,
            sDesigName: desig_name,
            iDesigLevel: desig_level,
            iUserID: 1,
          };
          if (this.isSaveDesignation == 0) {
            this.isSaveDesignation = 1;
            this.httpService.callPostApi(addDesig_data).subscribe(
              (data) => {
                this.isSaveDesignation = 0;
                if (data.headers.get('StatusCode') == 200) {
                  this.ref.close(true);
                }
                this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
              },
              (error) => console.log(error)
            )
          };
        } else {
          //update designation details
          const updateDesig_data = {
            iRequestID: 2082,
            iCID: 1,
            iDesigID: desig_id,
            sDesigName: desig_name,
            iDesigLevel: desig_level,
            iUserID: 2,
            iStatusID: status_id
          };
          this.httpService.callPostApi(updateDesig_data).subscribe(
            (data) => {
              if (data.headers.get('StatusCode') == 201) {
                this.ref.close(true);
              }
              this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            },
            (error) => console.log(error)
          );
        }
        //this.desigForm.reset();
      } else {
      }
    }
  }

  //Close Button Function
  onClose() {
    this.ref.close();
    this.desigForm.reset();
  }

}
