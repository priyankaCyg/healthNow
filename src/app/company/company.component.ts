import { Component, OnInit } from "@angular/core";
import { BreadcrumbService } from "../breadcrumb.service";
import { CountryService } from "../demo/service/countryservice";
import { SelectItem, MenuItem } from "primeng/api";
import { GeneralEditComponent } from "./general-edit/general-edit.component";
import { AddNewAddressComponent } from "./add-new-address/add-new-address.component";
import { DepartmentComponent } from "./department/department.component";
import { DesignationComponent } from "./designation/designation.component";
import { EmployeeComponent } from "./employee/employee.component";
import { BankComponent } from "./bank/bank.component";
import { GstComponent } from "./gst/gst.component";
import { GeneratedFile } from "@angular/compiler";
import { DialogService } from "primeng";
import { from } from "rxjs";
import { BankData } from "../model/slelectAllBank.model";
import { ApiService } from "../services/api.service";
import { ToastService } from "../services/toast.service";
import { DesignationData } from "../model/selectAllDesignation";
import { departmentData } from "../model/department";
import { gstData } from "../model/gst";
import { companyData } from '../model/company';

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"],
})
export class CompanyComponent implements OnInit {
  
  items: MenuItem[];
  compData: companyData[];
  address: any[];
  department: departmentData[];
  gst: gstData[];
  bankData: BankData[];
  designationData: DesignationData[];

  constructor(
    private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    this.breadcrumbService.setItems([
      { label: "Dashboard" },
      { label: "Company", routerLink: ["/app/company"] },
    ]);
  }

  ngOnInit() {
    this.items = [
      {
        label: "Angular.io",
        icon: "pi pi-external-link",
        url: "http://angular.io",
      },
      { label: "Theming", icon: "pi pi-file", routerLink: ["/theming"] },
    ];
    this.companyData();
    this.departmentList();
    this.bankSelectData();
    this.designationSelectData();
    this.gstList();
   
  }

   // company field data 
   companyData() {
    const company_data =
    {
      "iRequestID": 2001,
      "iCID": 1

    };
    this.apiService.callPostApi(company_data).subscribe(
      data => {
        console.log(data);
        this.compData = data;
      },
      error => console.log(error)
    );
  }
  // dialog for general edit
  openDialogForGeneraledit(dt) {
    const ref = this.dialogService.open(GeneralEditComponent, {
      data: dt,
      header: "Edit Details",
      width: "28%",
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
      this.companyData();
    });
  }
  openDialogForaddNewAddress() {
    const ref = this.dialogService.open(AddNewAddressComponent, {
      data: {},
      header: "Add New Address",
      width: "80%",
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  //open dialog for add departemnt
  openDialogForaddDepartment() {
    const ref = this.dialogService.open(DepartmentComponent, {
      data: {},
      header: "Add New Department",
      width: "28%",
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
      this.departmentList();
    });
  }
  //open dialog for edit department
  openDialogForeditDepartment(department) {
    const ref = this.dialogService.open(DepartmentComponent, {
      data: department,
      header: "Edit Department",
      width: "28%",
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
      this.departmentList();
    });
  }
  //show all list of department
  departmentList() {
    const department_data = {
      iRequestID: 2055,
      iCID: 1,
    };
    this.apiService.callPostApi(department_data).subscribe(
      (data) => {
        console.log(data);
        this.department = data;
      },
      (error) => console.log(error)
    );
  }
  // delete departemnt
  deleteDepartemnt(department: departmentData) {
    let dep_id = department.iDeptID;
    let delete_data_api = {
      iRequestID: 2054,
      iCID: 1,
      iDeptID: dep_id,
    };
    this.apiService.callPostApi(delete_data_api).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => console.log(error)
    );
    this.departmentList();

  }

  openDialogForEmployee() {
    const ref = this.dialogService.open(EmployeeComponent, {
      data: {},
      header: "Add New Employee",
      width: "80%",
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  
  //open dialog  for add gst
  openDialogForGST() {
    const ref = this.dialogService.open(GstComponent, {
      data: {},
      header: "Add New GST",
      width: "28%",
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
      this.gstList();
    });
  }

  // open dialog for edit gst
  openDialogForEditGST(gst) {
    const ref = this.dialogService.open(GstComponent, {
      data: gst,
      header: "Edit GST",
      width: "28%",
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
      this.gstList();
    });
  }
  // show all list of gst
  gstList() {
    const gst_data =
    {

      "iRequestID": 2063,
      "iCID": 1

    };
    this.apiService.callPostApi(gst_data).subscribe(
      data => {
        console.log(data);
        this.gst = data;

      },
      error => console.log(error)
    );
  }
  //delete for gst
  deleteGst(gst: gstData) {

    let state_id = +gst.iStateID;
    let delete_gst_data_api = {

      "iRequestID": 2064,
      "iStateID": state_id,
      "iCID": 1
    };
    console.log(delete_gst_data_api);
    this.apiService.callPostApi(delete_gst_data_api).subscribe(
      data => {
        console.log(data);

      },
      error => console.log(error)
    );
    this.gstList();

  }

  //new code

 

  designationSelectData() {
    const selectDesig_data = {
      iRequestID: 2084,
      iCID: 1,
    };

    this.apiService.callPostApi(selectDesig_data).subscribe(
      (data) => {
        console.log(data);
        this.designationData = data;

        console.log(this.designationData);
      },
      (error) => console.log(error)
    );
  }
  openDialogForDesignation() {
    const ref = this.dialogService.open(DesignationComponent, {
      data: {},
      header: "Add New Designation",
      width: "28%",
    });

    ref.onClose.subscribe((success: boolean) => {
      
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
      this.designationSelectData();
    });
  }
  updateDesig(desig) {
    const ref = this.dialogService.open(DesignationComponent, {
      data: desig,
      header: "Edit Designation",
      width: "28%",
    });

    ref.onClose.subscribe((success: boolean) => {
     
      if (success) {
        // this.toastService.addSingle("success", "Record Added successfully", "");
      }
      this.designationSelectData();
    });
  }
  deleteDesig(desig) {
    let desig_id = desig.iDesigID;
    const deleteDesig_data = {
      iRequestID: 2083,
      iCID: 1,
      iDesigID: desig_id,
      iUserID:2
  
    };
    console.log(deleteDesig_data);
    this.apiService.callPostApi(deleteDesig_data).subscribe(
      (data) => {
        console.log(data);
        
      },
      (error) => console.log(error)
    );
    this.designationSelectData();
    
  }
  
  bankSelectData() {
    const selectBank_data = {
      iRequestID: 2045,
      iCID: 1,
    };

    this.apiService.callPostApi(selectBank_data).subscribe(
      (data) => {
        console.log(data);
        this.bankData = data;

        console.log(this.bankData);
      },
      (error) => console.log(error)
    );
  }
  openDialogForBank() {
    const ref = this.dialogService.open(BankComponent, {
      data: {},
      header: "Add New Bank",
      width: "50%",
    });
  
    ref.onClose.subscribe((success: boolean) => {
     
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
      this.bankSelectData();
    });
  }

  updateBank(bank) {
    const ref = this.dialogService.open(BankComponent, {
      data: bank,
      header: "Edit Bank",
      width: "50%",
    });

    ref.onClose.subscribe((success: boolean) => {
      console.log("123")
    
      if (success) {
      
        // this.toastService.addSingle("success", "Record Added successfully", "");
      }
      this.bankSelectData();
    });
  }
  deleteBank(bank) {
    let bank_id = bank.iBankID;
    const deleteBank_data = {
      iRequestID: 2044,
      iCID: 1,
      iBankID: bank_id,
    };
    console.log(deleteBank_data);
    this.apiService.callPostApi(deleteBank_data).subscribe(
      (data) => {
        console.log(data);
        
      },
      (error) => console.log(error)
    );
    this.bankSelectData();

  }

}
