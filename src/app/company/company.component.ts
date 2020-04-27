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
import {APIService} from '../services/apieservice';
import {ConfirmationService} from 'primeng/api';
import {ToastService} from '../services/toast.service'

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

    items: MenuItem[];

    address: any[];

    department: any[];

    designation: any[];

    employee: any[];

    bank: any[];

    gst: any[];

    constructor(private breadcrumbService: BreadcrumbService, private dialogService:DialogService,
      private confirmationService: ConfirmationService,private apiService:APIService,private toastService:ToastService) {
        this.breadcrumbService.setItems([
            { label: 'Dashboard' },
            { label: 'Company', routerLink: ['/app/company'] }
        ]);
    }

   ngOnInit() {


        this.showEmployee();

      
    }
    

    openDialogForGeneraledit() {
      const ref = this.dialogService.open( GeneralEditComponent , {
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
      const ref = this.dialogService.open( AddNewAddressComponent , {
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
      const ref = this.dialogService.open( DepartmentComponent , {
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
    openDialogForDesignation() {
      const ref = this.dialogService.open( DesignationComponent , {
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

    //Open Dialog To Add Employee
    openDialogForEmployee() {
      const ref = this.dialogService.open( EmployeeComponent , {
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
    showEmployee()
    {
      var dataToSend ={
        "iRequestID":2031,
        "iCID" :1
    }
      this.apiService.getDetails(dataToSend).then(response => {
        console.log("Response for Employee ",response)
        this.employee = response
      });
    }

    //Open Dialog To Edit Employee
    editEmployee(employeeId) {
      const ref = this.dialogService.open( EmployeeComponent , {
        data: {
          "employeeId":employeeId
        },
        header: 'Add New Employee',
        width: '80%'
      });
  
      ref.onClose.subscribe((success: boolean) => {
        if (success) {
          this.showEmployee();
          this.toastService.addSingle("success", "Updated Successfully", "");
        }
      });
    }

    //Open Dialog To Delete Employee
    deleteEmployee(employeeId){
      this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          var dataToSendDelete = {
            "iRequestID":2034,
            "iEmpID":employeeId,
            "iCID":1
          }

          this.apiService.getDetails(dataToSendDelete).then(response => {
            console.log("Response for Employee Delete ",response)
            this.toastService.addSingle("info", "Successfully Deleted", "Successfully Deleted");
            this.showEmployee();
          });
        },
        reject: () => {
    this.toastService.addSingle("info", "Rejected", "Rejected");

        }
    });
    }


    openDialogForBank() {
      const ref = this.dialogService.open( BankComponent , {
        data: {
          roleId:"123"
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
      const ref = this.dialogService.open( GstComponent , {
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
}
