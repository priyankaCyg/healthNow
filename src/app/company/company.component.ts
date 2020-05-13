import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { SelectItem, MenuItem } from 'primeng/api';
import { GeneralEditComponent } from './general-edit/general-edit.component';
import { AddNewAddressComponent } from './add-new-address/add-new-address.component';
import { DepartmentComponent } from './department/department.component';
import { DesignationComponent } from './designation/designation.component';
import { EmployeeComponent } from './employee/employee.component';
import { BankComponent } from './bank/bank.component';
import { GstComponent } from './gst/gst.component';
import { GeneratedFile } from '@angular/compiler';
import { DialogService } from 'primeng';
import { from } from 'rxjs';
import { APIService } from '../services/apieservice';
import { ConfirmationService } from 'primeng/api';
import { CompanyAddress } from '../models/company-address.model';
import { companyBankMaster } from "../model/companyBank.model";
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
  addressDataArray: CompanyAddress[];
  addressData: CompanyAddress;
  department: departmentData[];
  gst: gstData[];
  bankData: companyBankMaster[];
  designationData: DesignationData[];
  employee;
  constructor(
    private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,
    private apiService: ApiService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService, private _apiService: APIService) {
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
    this.showEmployee();
    this.departmentList();
    this.bankSelectData();
    this.designationSelectData();
    this.gstList();
    this.getAllAddressesList();
    this.showEmployee();


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
        this.compData = data.body;
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
  // Get address list start
  getAllAddressesList() {
    const all_address_api =
    {
      "iRequestID": 2015,
      "iCID": 1
    }
    this.apiService.callPostApi(all_address_api).subscribe(
      data => {
        console.log(data);
        this.addressDataArray = data.body;
      },
      error => console.log(error)
    );
  }
  // Get address list end

  // open modal for new address start
  openDialogForaddNewAddress() {
    const ref = this.dialogService.open(AddNewAddressComponent, {
      data: {
      },
      header: 'Add New Address',
      width: '80%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getAllAddressesList();
      }
    });
  }
  // open modal for new address end

  // open modal for edit address start
  openDialogForeditAddress(address: CompanyAddress) {
    const ref = this.dialogService.open(AddNewAddressComponent, {
      data: address,
      header: 'Edit Addrees',
      width: '80%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getAllAddressesList(); 
      }
    });
  }


  // open modal for delete address start
  onDeleteAddress(addressId: number) {
    
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteAddressApi = {
          "iRequestID": 2014,
          "iCID": 1,
          "iAddID": addressId
        }
        console.log(deleteAddressApi);
        this.apiService.callPostApi(deleteAddressApi).subscribe(
          data => {
            console.log(data);
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
            this.getAllAddressesList();

          },
          error => console.log(error)
        );
      }

    });
  }
  // open modal for delete address end
  openDialogForaddDepartment() {
    const ref = this.dialogService.open(DepartmentComponent, {
      data: {},
      header: "Add New Department",
      width: "28%",
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        //this.toastService.addSingle("success", "Record Added successfully", "");
        this.departmentList();

        this.toastService.addSingle("success", "Record Added Successfully", "");

      }

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
        this.departmentList();

        this.toastService.addSingle("success", "Record Updated Successfully", "");

      }

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
        this.department = data.body;
      },
      (error) => console.log(error)
    );
  }
  // delete departemnt
  deleteDepartemnt(department: departmentData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let dep_id = department.iDeptID;
        let delete_data_api = {
          iRequestID: 2054,
          iCID: 1,
          iDeptID: dep_id,
        };
        this.apiService.callPostApi(delete_data_api).subscribe(
          (data) => {
            console.log(data);
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.departmentList();
          },
          (error) => console.log(error)
        );
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
        this.gstList();

        this.toastService.addSingle("success", "Record Added Successfully", "");
      }
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
        this.gstList();

        this.toastService.addSingle("success", "Record Updated Successfully", "");
      }
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
        this.gst = data.body;

      },
      error => console.log(error)
    );
  }
  //delete for gst
  deleteGst(gst: gstData) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
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
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.gstList();

          },
          error => console.log(error)
        );
      }

    });
  }

  //Function for Designation Table Data 
  designationSelectData() {
    const selectDesig_data = {
      iRequestID: 2084,
      iCID: 1,
    };
    this.apiService.callPostApi(selectDesig_data).subscribe(
      (data) => {
        console.log(data);
        this.designationData = data.body;
        console.log(this.designationData);
      },
      (error) => console.log(error)
    );
  }

  // Dialog box to add designation
  openDialogForDesignation() {
    const ref = this.dialogService.open(DesignationComponent, {
      data: {},
      header: "Add New Designation",
      width: "28%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) { 
        this.designationSelectData();
      }
      
    });
  }

  // Dialog box to update designation
  updateDesig(desig) {
    const ref = this.dialogService.open(DesignationComponent, {
      data: desig,
      header: "Edit Designation",
      width: "28%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.designationSelectData();
       }
    
    });
  }

  // Delete Function for Designation
  deleteDesig(desig) {

    let desig_id = desig.iDesigID;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteDesig_data = {
          iRequestID: 2083,
          iCID: 1,
          iDesigID: desig_id,
          iUserID: 2
        };
        this.apiService.callPostApi(deleteDesig_data).subscribe(
          (data) => {
            console.log(data);
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
            this.designationSelectData();
          },
          (error) => console.log(error)
        );
      
      
      },
      reject: () => {
       // this.toastService.addSingle("info", "Rejected", "Rejected");
      }
    });
  }

  // Function for Bank table data
  bankSelectData() {
    const selectBank_data = {
      iRequestID: 2045,
      iCID: 1,
    };
    this.apiService.callPostApi(selectBank_data).subscribe(
      (data) => {
        console.log(data.body);
        this.bankData = data.body;
      },
      (error) => console.log(error)
    );
  }

  //Dialog box to add bank
  openDialogForBank() {
    const ref = this.dialogService.open(BankComponent, {
      data: {},
      header: "Add New Bank",
      width: "50%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.bankSelectData();
     
       } 
    });
  }

  // Dialog box to update bank
  updateBank(iBankID) {
    const ref = this.dialogService.open(BankComponent, {
      data: iBankID,
      header: "Edit Bank",
      width: "50%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) { 
        this.bankSelectData();
      } 
    });
  }

  // Delete function for bank
  deleteBank(iBankID) {
    let bank_id = iBankID;
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteBank_data = {
          iRequestID: 2044,
          iCID: 1,
          iBankID: bank_id,
        };
        console.log(deleteBank_data);
        this.apiService.callPostApi(deleteBank_data).subscribe(
          (data) => {
            console.log(data);
            this.toastService.addSingle("success", data.headers.get('StatusMessage'), "");
            this.bankSelectData();
          },
          (error) => console.log(error)
        );
     
      },
      reject: () => {
      //  this.toastService.addSingle("info", "Rejected", "Rejected");
      }
    });
  }


  //Open Dialog To Add Employee
  openDialogForEmployee() {
    const ref = this.dialogService.open(EmployeeComponent, {
      data: {
      },
      header: 'Add New Employee',
      width: '80%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.showEmployee();
        this.toastService.addSingle("success", "Employee Added Successfully", "");
      }
    });
  }

  //List Employee Details
  showEmployee() {
    var dataToSend = {
      "iRequestID": 2031,
      "iCID": 1
    }
    this._apiService.getDetails(dataToSend).then(response => {
      console.log("Response for Employee ", response)
      this.employee = response
    });
  }

  //Open Dialog To Edit Employee
  editEmployee(employeeId) {
    const ref = this.dialogService.open(EmployeeComponent, {
      data: {
        "employeeId": employeeId
      },
      header: 'Edit Employee',
      width: '80%'
    });

    ref.onClose.subscribe((success: any) => {
      // alert(success)
      if (success) {
        this.showEmployee();
        this.toastService.addSingle("success", "Updated Successfully", "");
      }
    });
  }

  //Open Dialog To Delete Employee
  deleteEmployee(employeeId) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2034,
          "iEmpID": employeeId,
          "iCID": 1
        }

        this._apiService.getDetails(dataToSendDelete).then(response => {
          console.log("Response for Employee Delete ", response)
          this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
          this.showEmployee();
        });
      },
      reject: () => {
        this.toastService.addSingle("info", "Rejected", "Rejected");

      }
    });
  }

}
