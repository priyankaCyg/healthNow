import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { StatusData } from "src/app/model/status.model";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";

@Component({
  selector: "app-bank",
  templateUrl: "./bank.component.html",
  styleUrls: ["./bank.component.css"],
})
export class BankComponent implements OnInit {
  statusData: StatusData[];
  setStatus: object;
  temp;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private  ref: DynamicDialogRef
  ) {}

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
     

    console.log(this.statusData,"Promise")
    console.log(this.config.data, "edit");
     this.temp = this.config.data.iStatusID;
  
   
     let tempData =  this.statusData.filter(t=>t.iKVID ==this.temp);
     this.setStatus = tempData[0];
    // console.log(this.config.data, "edit");
    // let temp = this.config.data.iStatusID;
    // if(temp ==1){
    //   this.setStatus = {sKVValue: 'Active', iKVID: 1}
    // }
    // else{
    //   this.setStatus = {sKVValue: 'Inactive', iKVID: 2}
    // }
    if (this.config.data.iBankID != undefined) {
      this.bankForm.patchValue({
        bank_name: this.config.data.sBankName,
        short_code: this.config.data.sShortCode,
        account_no: this.config.data.sAccountNo,
        ifsc_code: this.config.data.sIFSC,
        bank_branch: this.config.data.sBankBranch,
        status: this.setStatus
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
  bankForm = this.fb.group({
    bank_name: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    short_code: ["", Validators.required],
    account_no: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    ifsc_code: ["", [Validators.required, Validators.pattern('^[0-9a-zA-Z]+$')]],
    bank_branch: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    status: ["", Validators.required],
  });

  onSubmit() {
    let bank_id = this.config.data.iBankID;

    let bank_name = this.bankForm.controls["bank_name"].value;
    let short_code = this.bankForm.controls["short_code"].value;
    let account_no = this.bankForm.controls["account_no"].value;
    let ifsc_code = this.bankForm.controls["ifsc_code"].value;
    let bank_branch = this.bankForm.controls["bank_branch"].value;
    let status = this.bankForm.controls["status"].value;
    console.log(this.bankForm.controls["status"].value);
    let status_id = status.iKVID;
    
    if (!this.bankForm.invalid) {
      if (bank_id == undefined) {
        const addBank_data = {
          iRequestID: 2041,
          iCID: 1,
          sBankName: bank_name,
          sAccountNo: account_no,
          sIFSC: ifsc_code,
          sBankBranch: bank_branch,
          sShortCode: short_code,
        };
        console.log(addBank_data, "add");
        this.apiService.callPostApi(addBank_data).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => console.log(error)
        );
        
      } else {
        const updateBank_data = {
          iRequestID: 2042,
          iCID: 1,
          sBankName: bank_name,
          sAccountNo: account_no,
          sIFSC: ifsc_code,
          sBankBranch: bank_branch,
          sShortCode: short_code,
          iStatusID: status_id,
          iBankID: bank_id,
        };
        console.log(updateBank_data, "update");
        this.apiService.callPostApi(updateBank_data).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => console.log(error)
        );
      }
      this.ref.close();
      this.bankForm.reset();
    } else {
      console.log("Error");
    }
  }
  onClose(){
    this.ref.close();
    this.bankForm.reset();
  }
}
