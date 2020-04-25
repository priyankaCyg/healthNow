import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { StatusData } from "src/app/model/status.model";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-designation",
  templateUrl: "./designation.component.html",
  styleUrls: ["./designation.component.css"],
})
export class DesignationComponent implements OnInit {
  statusData: StatusData[];
  setStatus: object;
  temp;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) { }

  async ngOnInit(): Promise<void> {
    const status_data = {
      iRequestID: 2071,
      sKVName: "Status",
    };

    await this.apiService.getDropDownData(status_data).then(
      data => {

        this.statusData = data;
        this.statusData.unshift({ "iKVID": 0, "sKVValue": "Select" });
        //  console.log(this.statusData, "check");
        // this.getData();

      },
      error => console.log(error)
    );


    console.log(this.statusData, "Promise")
    console.log(this.config.data, "edit");
    this.temp = this.config.data.iStatusID;


    let tempData = this.statusData.filter(t => t.iKVID == this.temp);
    this.setStatus = tempData[0];
    // console.log(this.setStatus,"Statustest")
    //  console.log("1")
    // if(temp ==1){
    //   this.setStatus = {sKVValue: 'Active', iKVID: 1}
    // }
    // else{
    //   this.setStatus = {sKVValue: 'Inactive', iKVID: 2}
    // }

    if (this.config.data.iDesigID != undefined) {
      // console.log("2")
      // this.flag = 1;
      // this.getData();
      this.desigForm.patchValue({
        desig_name: this.config.data.sDesigName,
        desig_level: this.config.data.iDesigLevel,
        status: this.setStatus,
      });
    }
    // const status_data = {
    //   iRequestID: 2071,
    //   sKVName: "Status",
    // };

    // this.apiService.callPostApi(status_data).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.statusData = data;
    //     this.statusData.unshift({"iKVID":0, "sKVValue": "Select"});
    //   },
    //   (error) => console.log(error)
    // );
  }

  desigForm = this.fb.group({
    desig_name: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    desig_level: ["", Validators.required],
    status: ["", Validators.required],
  });


  onSubmit() {
    let desig_id = this.config.data.iDesigID;

    let desig_name = this.desigForm.controls["desig_name"].value;
    let desig_level = this.desigForm.controls["desig_level"].value;
    // console.log(desig_level);
    let status = this.desigForm.controls["status"].value;
    // console.log(this.desigForm.controls["status"].value);
    let status_id = status.iKVID;
    if (status_id == 0) {
      console.log("abc")
      this.desigForm.setErrors({ 'invalid': true });
    }
    else {
      if (!this.desigForm.invalid) {
        if (desig_id == undefined) {
          const addDesig_data = {
            iRequestID: 2081,
            iCID: 1,
            sDesigName: desig_name,
            iDesigLevel: desig_level,
            iUserID: 1,
          };
          console.log(addDesig_data, "add");
          this.apiService.callPostApi(addDesig_data).subscribe(
            (data) => {
              console.log(data);
            },
            (error) => console.log(error)
          );
        } else {
          const updateDesig_data = {
            iRequestID: 2082,
            iCID: 1,
            iDesigID: desig_id,
            sDesigName: desig_name,
            iDesigLevel: desig_level,
            iUserID: 2,
            iStatusID: status_id
          };
          console.log(updateDesig_data, "update");
          this.apiService.callPostApi(updateDesig_data).subscribe(
            (data) => {
              console.log(data);
            },
            (error) => console.log(error)
          );
        }
        this.ref.close();
        this.desigForm.reset();
      } else {
        console.log("Error");
      }
    }

  }
  onClose() {
    this.ref.close();
    this.desigForm.reset();

  }

  // getData(){
  //   console.log(this.statusData,"final")
  //   console.log(this.temp)
  //   if(this.flag==1){
  //   if(this.temp!= undefined){
  //     console.log(this.statusData,"final123")
  //      this.setStatus =  this.statusData.filter(t=>t.iKVID ==this.temp);
  //      console.log(this.setStatus,"out")
  //   }
  //   }
  // }
}
