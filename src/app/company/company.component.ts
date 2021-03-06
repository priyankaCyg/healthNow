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
import { APIService } from '../services/apieservice';
import { ConfirmationService } from 'primeng/api';
import { CompanyAddress } from '../model/company-address.model';
import { companyBankMaster } from "../model/companyBank.model";
import { ApiService } from "../services/api.service";
import { ToastService } from "../services/toast.service";
import { DesignationData } from "../model/selectAllDesignation";
import { departmentData } from "../model/department";
import { gstData } from "../model/gst";
import { companyData } from '../model/company';
import { config } from 'src/config';

@Component({
  selector: "app-company",
  templateUrl: "./company.component.html",
  styleUrls: ["./company.component.css"],
})
export class CompanyComponent implements OnInit {

  items: MenuItem[];
  compData: companyData[];
  addressDataArray: CompanyAddress[] = [];
  addressData: CompanyAddress;
  department: departmentData[] = [];
  gst: gstData[] = [];
  bankData: companyBankMaster[] = [];
  designationData: DesignationData[] = [];
  employee = [];
  EmployeeValue = [];
  selectedEmployee: any;
  employee_id: number;
  address: any[];
  WarehouseList: any[] = [];
  noRecordFound: string;

  constructor(
    private breadcrumbService: BreadcrumbService,
    private dialogService: DialogService,
    private httpService: ApiService,
    private toastService: ToastService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: "Dashboard" },
      { label: "Company", routerLink: ["company"] },
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

    this.noRecordFound = config.noRecordFound;
    this.companyData();
    this.showEmployee();
    this.departmentList();
    this.bankSelectData();
    this.designationSelectData();
    this.gstList();
    this.getAllAddressesList();
    this.showEmployee();
    this.EmployeeDropdown();
  }

  // code for company field data 
  companyData() {
    const company_data =
    {
      "iRequestID": 2001,
      "iCID": 1
    };
    this.httpService.callPostApi(company_data).subscribe(
      data => {
        this.compData = data.body;
      },
      error => console.log(error)
    );
  }

  // code for dialog  general edit
  openDialogForGeneraledit(dt) {
    const ref = this.dialogService.open(GeneralEditComponent, {
      data: dt,
      header: "Edit Details",
      width: "28%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.companyData();
      }
    });
  }

  // Get address list start
  getAllAddressesList() {
    const all_address_api =
    {
      "iRequestID": 2015,
      "iCID": 1
    }
    this.httpService.callPostApi(all_address_api).subscribe(
      data => {
        this.addressDataArray = data.body;
      },
      error => console.log(error)
    );
  }

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

  // open modal for edit address
  openDialogForeditAddress(address: CompanyAddress) {
    const ref = this.dialogService.open(AddNewAddressComponent, {
      data: address,
      header: 'Edit Address',
      width: '80%'
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.getAllAddressesList();
      }
    });
  }

  // open modal for delete address 
  onDeleteAddress(addressId: number) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteAddressApi = {
          "iRequestID": 2014,
          "iCID": 1,
          "iAddID": addressId
        }
        this.httpService.callPostApi(deleteAddressApi).subscribe(
          data => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.getAllAddressesList();
          },
          error => console.log(error)
        );
      }
    });
  }

  // code for open dialog for add department
  openDialogForaddDepartment() {
    const ref = this.dialogService.open(DepartmentComponent, {
      data: {},
      header: "Add New Department",
      width: "28%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.departmentList();
      }
    });
  }

  //code for open dialog for edit department
  openDialogForeditDepartment(department) {
    const ref = this.dialogService.open(DepartmentComponent, {
      data: department,
      header: "Edit Department",
      width: "28%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.departmentList();
      }
    });
  }

  //code for show all list of department
  departmentList() {
    const department_data = {
      iRequestID: 2055,
      iCID: 1,
    };
    this.httpService.callPostApi(department_data).subscribe(
      (data) => {
        this.department = data.body;
      },
      (error) => console.log(error)
    );
  }

  // code for delete departemnt
  deleteDepartemnt(department: departmentData) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let dep_id = department.iDeptID;
        let delete_data_api = {
          iRequestID: 2054,
          iCID: 1,
          iDeptID: dep_id,
        };
        this.httpService.callPostApi(delete_data_api).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.departmentList();
          },
          (error) => console.log(error)
        );
      }
    });
  }

  //code for open dialog  for add gst
  openDialogForGST() {
    const ref = this.dialogService.open(GstComponent, {
      data: {},
      header: "Add New GST",
      width: "28%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.gstList();
      }
    });
  }

  // code for open dialog for edit gst
  openDialogForEditGST(gst) {
    const ref = this.dialogService.open(GstComponent, {
      data: gst,
      header: "Edit GST",
      width: "28%",
    });
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.gstList();
      }
    });
  }

  // code for show all list of gst
  gstList() {
    const gst_data =
    {
      "iRequestID": 2063,
      "iCID": 1
    };
    this.httpService.callPostApi(gst_data).subscribe(
      data => {
        this.gst = data.body;
      },
      error => console.log(error)
    );
  }

  //code for delete gst
  deleteGst(gst: gstData) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let csg_id = +gst.iCSGID;
        let delete_gst_data_api = {
          "iRequestID": 2064,
          "iCSGID": csg_id,
          "iCID": 1
        };
        this.httpService.callPostApi(delete_gst_data_api).subscribe(
          data => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
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
    this.httpService.callPostApi(selectDesig_data).subscribe(
      (data) => {
        this.designationData = data.body;
      },
      (error) => console.log(error)
    );
  }

  // Function to add designation
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

  // Function to update designation
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
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteDesig_data = {
          iRequestID: 2083,
          iCID: 1,
          iDesigID: desig_id,
          iUserID: 2
        };
        this.httpService.callPostApi(deleteDesig_data).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.designationSelectData();
          },
          (error) => console.log(error)
        );
      },
      reject: () => { }
    });
  }

  // Function for Bank table data
  bankSelectData() {
    const selectBank_data = {
      iRequestID: 2045,
      iCID: 1,
    };
    this.httpService.callPostApi(selectBank_data).subscribe(
      (data) => {
        this.bankData = data.body;
      },
      (error) => console.log(error)
    );
  }

  //Function to add bank
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

  // Function to update bank
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
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const deleteBank_data = {
          iRequestID: 2044,
          iCID: 1,
          iBankID: bank_id,
        };
        this.httpService.callPostApi(deleteBank_data).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.bankSelectData();
          },
          (error) => console.log(error)
        );
      },
      reject: () => { }
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
      }
    });
  }

  //List Employee Details
  showEmployee() {
    var dataToSend = {
      "iRequestID": 2031,
      "iCID": 1
    }
    this.httpService.callPostApi(dataToSend).subscribe(
      (data) => {
        this.employee = data.body;
      },
      (error) => console.log(error)
    );
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
    ref.onClose.subscribe((success: boolean) => {
      if (success) {
        this.showEmployee();
      }
    });
  }

  //Open Dialog To Delete Employee
  deleteEmployee(employeeId) {
    this.confirmationService.confirm({
      message: config.deleteMsg,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        var dataToSendDelete = {
          "iRequestID": 2034,
          "iEmpID": employeeId,
          "iCID": 1
        }
        this.httpService.callPostApi(dataToSendDelete).subscribe(
          (data) => {
            this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
            this.showEmployee();
          },
          (error) => console.log(error)
        );
      },
      reject: () => { }
    });
  }

  //Function for Employee dropdown 
  EmployeeDropdown() {
    return new Promise((resolve, reject) => {
      const dataToSendEmployee = {
        "iRequestID": 2031,
        "iCID": 1
      }
      this.httpService.getDropDownData(dataToSendEmployee).then(response => {
        this.EmployeeValue = response
        this.EmployeeValue.splice(0, 0, { iEmpID: "", sEmpName: "Select Employee" })
        this.selectedEmployee = { iEmpID: "", sEmpName: "Select Employee" }
        resolve(this.EmployeeValue)
      });
    })
  }

  //On change of Employee dropdown
  employeeDropdownChange(event) {
    this.employee_id = event.value.iEmpID;
    this.address = [];
    this.WarehouseList = [];
    this.getwarehouse();
  }

  //Function to list all address
  getwarehouse() {
    this.WarehouseList = [];
    const warehouse_list_data = {
      "iRequestID": 2401,
      "iEmpID": this.employee_id
    }
    this.httpService.callPostApi(warehouse_list_data).subscribe(
      (data) => {
        this.address = data.body;
        this.WarehouseList = this.address.filter(key => key.iIsSelected == 1)
      },
      (error) => console.log(error)
    );
  }

  //Function to save warehouse mapping
  saveAddress() {
    const address_id = this.WarehouseList.map(({ iAddID }) => iAddID);
    let address_id_str = address_id.toString();
    const save_data = {
      "iRequestID": 2402,
      "iEmpID": this.employee_id,
      "sAddIds": address_id_str
    }
    this.httpService.callPostApi(save_data).subscribe(
      (data) => {
        this.getwarehouse();
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      (error) => console.log(error)
    );
  }

}
