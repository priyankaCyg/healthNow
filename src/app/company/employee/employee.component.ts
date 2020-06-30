import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeMaster } from '../../model/employee.model'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastService } from "../../services/toast.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {
  employeeId: number;
  isEdit: boolean = false
  roleData;
  statusData;
  reportingToData = [];
  designationData;
  departmentData;
  genderData;
  addressData;
  employeeData: EmployeeMaster;
  depId: number;
  desigId: number;
  selectedgender;
  selectedsaddress;
  selecteddepartment;
  selecteddesignation;
  selectedreportingTo;
  selectedrole;
  selectedstatus;
  public employeeForm: FormGroup;

  constructor(public config: DynamicDialogConfig, public ref: DynamicDialogRef, private toastService: ToastService,
    private httpService: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.defaultDropDwnValue();
    this.employeeId = this.config.data.employeeId
    this.employeeData = new EmployeeMaster();
    this.employeeForm = this.createControl(this.employeeData);
    this.reportingToData.splice(0, 0, { iEmpID: "", sReportingTo: "Select Reporting To" })

    if (this.employeeId != null) {
      this.isEdit = true
      var dataToSendEdit = {
        "iRequestID": 2036,
        "iCID": 1,
        "iEmpID": this.employeeId
      }
      this.httpService.getDropDownData(dataToSendEdit).then(response => {
        this.employeeData = new EmployeeMaster(response[0]);
        this.employeeForm = this.createControl(this.employeeData);
        Promise.all([this.getRoleDrpDwn(), this.getAddressDrpDwn(), this.getGenderDrpDwn(), this.getDepartmentDrpDwn(), this.getStatusDrpDwn(), this.getDesignationDrpDwn()]).then(values => {
          this.setDropDownVal()
        });
      });
    }
    else {
      this.isEdit = false;
      this.employeeData = new EmployeeMaster();
      this.employeeForm = this.createControl(this.employeeData);
      Promise.all([this.getRoleDrpDwn(), this.getAddressDrpDwn(), this.getGenderDrpDwn(), this.getDepartmentDrpDwn(), this.getStatusDrpDwn(), this.getDesignationDrpDwn()]).then(values => {
      });
    }
    this.employeeForm.valueChanges.subscribe((changedObj: any) => {
      this.dropDownValidityCheck()
    });
  }

  //code for default dropdown data
  defaultDropDwnValue() {
    this.selectedrole = { iRoleID: "", sRoleName: "Select Role" }
    this.selectedsaddress = { iAddID: "", sAddress: "Select Address" }
    this.selectedgender = { iKVID: "", sKVValue: "Select Gender" }
    this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
    this.selecteddepartment = { iDeptID: "", sDeptName: "Select Department" };
    this.selecteddesignation = { iDesigID: "", sDesigName: "Select Designation" }
    this.selectedreportingTo = { iEmpID: "", sReportingTo: "Select Reporting to" };
  }

  //code for role dropdown data
  getRoleDrpDwn(): Promise<any> {
    return new Promise((resolve, reject) => {
      var role_data = {
        "iRequestID": 2091
      }
      this.httpService.getDropDownData(role_data).then(response => {
        this.roleData = response
        this.roleData.splice(0, 0, { iRoleID: "", sRoleName: "Select Role" })
        this.selectedrole = { iRoleID: "", sRoleName: "Select Role" }
        resolve(this.roleData)
      });
    })
  }

  //code for address fropdowm data
  getAddressDrpDwn() {
    return new Promise((resolve, reject) => {
      var address_data = {
        "iRequestID": 2019,
        "iCID": 1
      }
      this.httpService.getDropDownData(address_data).then(response => {
        this.addressData = response
        this.addressData.splice(0, 0, { iAddID: "", sAddress: "Select Address" })
        this.selectedsaddress = { iAddID: "", sAddress: "Select Address" }
        resolve(this.addressData)

      });
    })
  }

  //code for gender dropdown data
  getGenderDrpDwn() {
    return new Promise((resolve, reject) => {
      var gender_data = {
        "iRequestID": 2071,
        "sKVName": "Gender"
      }
      this.httpService.getDropDownData(gender_data).then(response => {
        this.genderData = response
        this.genderData.splice(0, 0, { iKVID: "", sKVValue: "Select Gender" })
        this.selectedgender = { iKVID: "", sKVValue: "Select Gender" }
        resolve(this.genderData)
      });
    })
  }

  //code for status dropdown data
  getStatusDrpDwn() {
    return new Promise((resolve, reject) => {
      var status_data = {
        "iRequestID": 2071,
        "sKVName": "Status"
      }
      this.httpService.getDropDownData(status_data).then(response => {
        this.statusData = response
        this.statusData.splice(0, 0, { iKVID: "", sKVValue: "Select Status" })
        this.selectedstatus = { iKVID: "", sKVValue: "Select Status" }
        resolve(this.statusData)
      });
    })
  }

  //code for department dropdown data
  getDepartmentDrpDwn() {
    return new Promise((resolve, reject) => {
      var department_data = {
        "iRequestID": 2057,
        "iCID": 1
      }
      this.httpService.getDropDownData(department_data).then(response => {
        this.departmentData = response
        this.departmentData.splice(0, 0, { iDeptID: "", sDeptName: "Select Department" })
        this.selecteddepartment = { iDeptID: "", sDeptName: "Select Department" };
        resolve(this.departmentData)
      });
    })
  }

  //code for designation dropdown data
  getDesignationDrpDwn() {
    return new Promise((resolve, reject) => {
      var designation_data = {
        "iRequestID": 2085,
        "iCID": 1
      }
      this.httpService.getDropDownData(designation_data).then(response => {
        this.designationData = response
        this.designationData.splice(0, 0, { iDesigID: "", sDesigName: "Select Designation" })
        this.selecteddesignation = { iDesigID: "", sDesigName: "Select Designation" }
        resolve(this.designationData)
      });
    })
  }

  //code for set default dropdown value
  setDropDownVal() {
    // Gender Dropdown Select
    let selectedGenderObj = this.genderData.find(x => x.iKVID == this.employeeData.iGenderID);

    if (selectedGenderObj !== undefined) {
      this.selectedgender = selectedGenderObj;
    }
    // Address Dropdown Select
    let selectedAddObj = this.addressData.find(x => x.iAddID == this.employeeData.iAddID);

    if (selectedAddObj !== undefined) {
      this.selectedsaddress = selectedAddObj;
    }
    // Department Dropdown Select
    let selectedDepObj = this.departmentData.find(x => x.iDeptID == this.employeeData.iDeptID);

    if (selectedDepObj !== undefined) {
      this.selecteddepartment = selectedDepObj;
    }
    // Designation Dropdown Select
    let selectedDesigObj = this.designationData.find(x => x.iDesigID == this.employeeData.iDesigID);

    if (selectedDesigObj !== undefined) {
      this.selecteddesignation = selectedDesigObj;
    }
    // Role Dropdown Select
    let selectedRoleObj = this.roleData.find(x => x.iRoleID == this.employeeData.iRoleID);

    if (selectedRoleObj !== undefined) {
      this.selectedrole = selectedRoleObj;
    }
    // Status Dropdown Select
    let selectedStatusObj = this.statusData.find(x => x.iKVID == this.employeeData.iStatusID);

    if (selectedStatusObj !== undefined) {
      this.selectedstatus = selectedStatusObj;
    }

    // Report Dropdown Select
    var reportingTo_data = {
      "iRequestID": 2035,
      "iDesigID": this.employeeData.iDesigID,
      "iDeptID": this.employeeData.iDeptID,
      "iCID": 1
    }
    this.httpService.getDropDownData(reportingTo_data).then(response => {
      this.reportingToData = response
      this.reportingToData.splice(0, 0, { iEmpID: "", sReportingTo: "Select Reporting to" })
      if (response != null || response != "") {
        let selectedReportToObj = this.reportingToData.find(x => x.iEmpID == this.employeeData.iReportingToID);
        if (selectedReportToObj !== undefined) {
          this.selectedreportingTo = selectedReportToObj;
        }
      }
    });

  }

  setDesignationId(event) {
    this.desigId = event.value.iDesigID
    this.getReportingManager();
  }

  setDepartmentId(event) {
    this.depId = event.value.iDeptID
    this.getReportingManager();
  }

  //code for reporting dropdown data
  getReportingManager() {
    var reportingTo_data = {
      "iRequestID": 2035,
      "iDesigID": this.desigId,
      "iDeptID": this.depId,
      "iCID": 1
    }
    this.httpService.getDropDownData(reportingTo_data).then(response => {
      this.reportingToData = response
      this.reportingToData.splice(0, 0, { iEmpID: "", sReportingTo: "Select Reporting to" })
      this.selectedreportingTo = { iEmpID: "", sReportingTo: "Select Reporting to" };
    });
  }

  //code for add new employee data
  addEmployee() {
    var formData = this.employeeForm.getRawValue();
    var dataToSendAdd = {
      "iRequestID": 2032,
      "iCID": 1,//logged in user company id
      "sEmpCode": formData.sEmpCode,
      "sFirstName": formData.sFirstName,
      "sMiddleName": formData.sMiddleName,
      "sLastName": formData.sLastName,
      "iGenderID": parseInt(formData.sGender.iKVID),
      "iAddID": parseInt(formData.sFullAddress.iAddID),
      "iDesigID": parseInt(formData.sDesigName.iDesigID),
      "sMobileNo": formData.sMobileNo,
      "sContactNo": formData.sContactNo,
      "sDirect": formData.sDirect,
      "sPOBox": "12365",
      "sEmailID": formData.sEmailID,
      "iReportingToID": parseInt(formData.sReportingTo.iEmpID),
      "iDeptID": parseInt(formData.sDeptName.iDeptID),
      "iRoleID": parseInt(formData.sRoleName.iRoleID),
      "iUserID": 1234 //logged in user user id
    }
    this.httpService.callPostApi(dataToSendAdd).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }

  //code for edit employee data
  updateEmployee() {
    var formData = this.employeeForm.getRawValue();
    var dataToSendEdit = {
      "iRequestID": 2033,
      "iCID": 1,//logged in user company id
      "iEmpID": this.employeeId,
      "sEmpCode": formData.sEmpCode,
      "sFirstName": formData.sFirstName,
      "sMiddleName": formData.sMiddleName,
      "sLastName": formData.sLastName,
      "iGenderID": parseInt(formData.sGender.iKVID),
      "iAddID": parseInt(formData.sFullAddress.iAddID),
      "iDesigID": parseInt(formData.sDesigName.iDesigID),
      "sMobileNo": formData.sMobileNo,
      "sContactNo": formData.sContactNo,
      "sDirect": formData.sDirect,
      "sPOBox": "12365",
      "sEmailID": formData.sEmailID,
      "iReportingToID": parseInt(formData.sReportingTo.iEmpID),
      "iDeptID": parseInt(formData.sDeptName.iDeptID),
      "iRoleID": parseInt(formData.sRoleName.iRoleID),
      "iUserID": 1234, //logged in user user id
      "iStatusID": parseInt(formData.iStatusID.iKVID)
    }
    this.httpService.callPostApi(dataToSendEdit).subscribe(
      data => {
        this.ref.close(true);
        this.toastService.displayApiMessage(data.headers.get('StatusMessage'), data.headers.get('StatusCode'));
      },
      error => console.log(error)
    );
  }

  //code for implement form builder 
  createControl(employeeMaster?: EmployeeMaster): FormGroup {
    this.employeeForm = this.fb.group({
      iCID: [employeeMaster.iCID],
      iAddID: [employeeMaster.iAddID],
      iEmpID: [employeeMaster.iEmpID],
      sPOBox: [employeeMaster.sPOBox],
      iDeptID: [employeeMaster.iDeptID],
      iRoleID: [employeeMaster.iRoleID],
      sDirect: [employeeMaster.sDirect, [Validators.required]],
      sGender: [employeeMaster.sGender],
      iDesigID: [employeeMaster.iDesigID],
      sEmailID: [employeeMaster.sEmailID, [Validators.required, Validators.pattern("^[a-zA-Z0-9]+[a-zA-Z0-9._-]+@[a-z]+\.[a-z.]{2,5}$")]],
      sEmpCode: [employeeMaster.sEmpCode, [Validators.required]],
      sEmpName: [employeeMaster.sEmpName],
      iGenderID: [employeeMaster.iGenderID],
      iStatusID: [employeeMaster.iStatusID],
      sDeptName: [employeeMaster.sDeptName],
      sLastName: [employeeMaster.sLastName, [Validators.required]],
      sMobileNo: [employeeMaster.sMobileNo, [Validators.required]],
      sRoleName: [employeeMaster.sRoleName],
      iCreatedBy: [employeeMaster.iCreatedBy],
      sContactNo: [employeeMaster.sContactNo, [Validators.required]],
      sDesigName: [employeeMaster.sDesigName],
      sFirstName: [employeeMaster.sFirstName, [Validators.required]],
      sMiddleName: [employeeMaster.sMiddleName, [Validators.required]],
      sCreatedDate: [employeeMaster.sCreatedDate],
      sFullAddress: [employeeMaster.sFullAddress],
      sReportingTo: [employeeMaster.sReportingTo],
      iReportingToID: [employeeMaster.iReportingToID],
    });
    return this.employeeForm;
  }

  //code for close dialog box
  closeDialog() {
    this.ref.close()
  }

  //code for check dropdown validation
  dropDownValidityCheck() {
    if (this.selectedgender.iKVID == '') {
      return true;
    }
    else if (this.selectedsaddress.iAddID == '') {
      return true
    }
    else if (this.selectedstatus.iKVID == '') {
      return true
    }
    else if (this.selecteddepartment.iDeptID == '') {
      return true
    }
    else if (this.selecteddesignation.iDesigID == '') {
      return true
    }
    else if (this.selectedreportingTo.iEmpID == '') {
      return true
    }
    else if (this.selectedrole.iRoleID == '') {
      return true
    }
    else {
      return false
    }
  }

}
