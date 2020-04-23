import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from '../breadcrumb.service';
import { CountryService } from '../demo/service/countryservice';
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
import { ApiService } from '../services/api.service';
import { departmentData } from '../model/department';
import { gstData } from '../model/gst';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  items: MenuItem[];

  address: any[];

  department: departmentData[];

  designation: any[];

  employee: any[];

  bank: any[];

  gst: gstData[];

  constructor(private breadcrumbService: BreadcrumbService, private dialogService: DialogService,
    private _apiService: ApiService
  ) {
    this.breadcrumbService.setItems([
      { label: 'Dashboard' },
      { label: 'Company', routerLink: ['/app/company'] }
    ]);
  }

  ngOnInit() {

    this.items = [
      { label: 'Angular.io', icon: 'pi pi-external-link', url: 'http://angular.io' },
      { label: 'Theming', icon: 'pi pi-file', routerLink: ['/theming'] }
    ];

    this.address = [
      { addresstype: 'Registered', address1: 'address01', address2: 'address001', state: 'Maharashtra', city: 'Thane', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' },
      { addresstype: 'Wearhouse', address1: 'address02', address2: 'address002', state: 'Maharashtra', city: 'Bhiwandi', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' },
      { addresstype: 'Registered', address1: 'address03', address2: 'address003', state: 'Maharashtra', city: 'Mumbai', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' },
      { addresstype: 'Wearhouse', address1: 'address04', address2: 'address004', state: 'Maharashtra', city: 'Bhiwandi', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' },
      { addresstype: 'Wearhouse', address1: 'address05', address2: 'address005', state: 'Maharashtra', city: 'Mumbai', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' },
      { addresstype: 'Registered', address1: 'address06', address2: 'address006', state: 'Maharashtra', city: 'Thane', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' },
      { addresstype: 'Registered', address1: 'address07', address2: 'address007', state: 'Maharashtra', city: 'Bhiwandi', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' },
      { addresstype: 'Wearhouse', address1: 'address08', address2: 'address008', state: 'Maharashtra', city: 'Mumbai', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' },
      { addresstype: 'Registered', address1: 'address09', address2: 'address009', state: 'Maharashtra', city: 'Thane', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' },
      { addresstype: 'Wearhouse', address1: 'address010', address2: 'address0010', state: 'Maharashtra', city: 'Bhiwandi', landmark: 'Hirandadni', tel1: '4564466456', tel2: '77887897899', fax: '25588525858', status: 'Active' }
    ];

    // this.department =[
    //   {departmentName: 'Sales', status: 'Active'},
    //   {departmentName: 'Accounts', status: 'Active'},
    //   {departmentName: 'Service', status: 'Active'},
    //   {departmentName: 'IT', status: 'Active'},
    //   {departmentName: 'Admin', status: 'Active'},
    //   {departmentName: 'HR', status: 'Active'}
    // ];

    this.departmentList();

    this.designation = [
      { designationName: 'CFO', designationLevel: '2', status: 'Active' },
      { designationName: 'CTO', designationLevel: '3', status: 'Active' },
      { designationName: 'COO', designationLevel: '4', status: 'Active' },
      { designationName: 'Manager', designationLevel: '5', status: 'Active' },
      { designationName: 'Sales Manager', designationLevel: '6', status: 'Active' },
      { designationName: 'Service Manager', designationLevel: '7', status: 'Active' },
      { designationName: 'Account Manager', designationLevel: '8', status: 'Active' },
      { designationName: 'Accountant', designationLevel: '9', status: 'Active' },
      { designationName: 'Account Assistant', designationLevel: '10', status: 'Active' },
      { designationName: 'Service coordinator', designationLevel: '11', status: 'Active' },
      { designationName: 'Engineer', designationLevel: '12', status: 'Active' },
      { designationName: 'Warehouse Incharge', designationLevel: '13', status: 'Active' },
      { designationName: 'Sales coordinator', designationLevel: '14', status: 'Active' },
      { designationName: 'Office Assistant', designationLevel: '15', status: 'Active' },
      { designationName: 'HR', designationLevel: '16', status: 'Active' }
    ];

    this.employee = [
      { employeeCode: '190104254', firstName: 'Pragati', middleName: 'Baghwandas', lastName: 'Varma', department: 'Sales', designation: 'Sales coordinator', reportingTo: 'Vikas Sitaram Narkar', status: 'Active' },
      { employeeCode: '120403180', firstName: 'Santosh', middleName: 'Chandrakant', lastName: 'Trimbake', department: 'Sales', designation: 'Warehouse Incharge', reportingTo: 'Rajiv A Gandhi', status: 'Active' },
      { employeeCode: '130106184', firstName: 'Nilesh', middleName: 'Sunil', lastName: 'Mahadik', department: 'Sales', designation: 'Sales Manager', reportingTo: 'Krishna KamalKishor Biyani', status: 'Active' },
      { employeeCode: '102102162', firstName: 'Hemangi', middleName: 'Raju', lastName: 'Bavkar', department: 'Sales', designation: 'Manager', reportingTo: 'Pragati Kunal Jadhav', status: 'Active' },
      { employeeCode: '162206230', firstName: 'Supriya', middleName: 'Vilas', lastName: 'Bandarkar', department: 'Sales', designation: 'Sales coordinator', reportingTo: 'Priyanka Omprakash Motiani', status: 'Active' }
    ];

    this.bank = [
      { bankName: 'GS MAHANAGAR CO-OP BANK LTD.', accounttype: 'GSMHA/Current account', accountNo: '007011200003797', IFSC: 'MCBL0960007', bankBranch: 'LALBAUG', status: 'Active' },
      { bankName: 'KOTAK MAHINDRA BANK', accounttype: 'KMBL/ CA', accountNo: '06402000000484', IFSC: 'KKBK0000640', bankBranch: 'PAREL', status: 'Active' }
    ];

    // this.gst = [
    //   { state: 'Maharashtra', gst1: '27AACCC1130A1ZL', status: 'Active' },
    //   { state: 'Haryana', gst1: '4243453STt06', status: 'Active' }
    // ];
    const gst_data =
    {

      "iRequestID": 2063,
      "iCID": 1

    };
    this._apiService.callPostApi(gst_data).subscribe(
      data => {
        console.log(data);
        this.gst = data;

      },
      error => console.log(error)
    );

  }

  openDialogForGeneraledit() {
    const ref = this.dialogService.open(GeneralEditComponent, {
      data: {
      },
      header: 'Edit Details',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForaddNewAddress() {
    const ref = this.dialogService.open(AddNewAddressComponent, {
      data: {
      },
      header: 'Add New Address',
      width: '80%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForaddDepartment() {
    const ref = this.dialogService.open(DepartmentComponent, {
      data: {
      },
      header: 'Add New Department',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }

  openDialogForeditDepartment(department) {
    const ref = this.dialogService.open(DepartmentComponent, {
      data:
        department,
      header: 'Edit Department',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }

  departmentList() {
    const department_data =
    {
      "iRequestID": 2055,
      "iCID": 1
    };
    this._apiService.callPostApi(department_data).subscribe(
      data => {
        console.log(data);
        this.department = data;

      },
      error => console.log(error)
    );
  }


  deleteService(department: departmentData) {

    let dep_id = department.iDeptID;
    let delete_data_api = {

      "iRequestID": 2054,
      "iCID": 1,
      "iDeptID": dep_id
    };
    this._apiService.callPostApi(delete_data_api).subscribe(
      data => {
        console.log(data);

      },
      error => console.log(error)
    );

    // this._apiService.callPostApi(delete_data_api).subscribe((data) => {
    //   if (data.success) {
    //     //this.department = this.department.filter((c) => c !== department);
    //   }
    // });
    // console.log("delete");


  }

  openDialogForDesignation() {
    const ref = this.dialogService.open(DesignationComponent, {
      data: {
      },
      header: 'Add New Designation',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForEmployee() {
    const ref = this.dialogService.open(EmployeeComponent, {
      data: {
      },
      header: 'Add New Employee',
      width: '80%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForBank() {
    const ref = this.dialogService.open(BankComponent, {
      data: {
      },
      header: 'Add New Bank',
      width: '50%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }
  openDialogForGST() {
    const ref = this.dialogService.open(GstComponent, {
      data: {
      },
      header: 'Add New GST',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }

  openDialogForEditGST(gst) {
    const ref = this.dialogService.open(GstComponent, {
      data: gst,
      header: 'Edit GST',
      width: '28%'
    });

    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        // this.toastService.addSingle("success", "Mail send successfully", "");
      }
    });
  }





}
