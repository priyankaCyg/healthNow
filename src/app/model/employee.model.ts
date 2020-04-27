
export class EmployeeMaster {
   
        iCID: string;
        iAddID: string;
        iEmpID: string;
        sPOBox: string;
        iDeptID: string;
        iRoleID: string;
        sDirect: string;
        sGender: string;
        iDesigID: string;
        sEmailID: string;
        sEmpCode: string;
        sEmpName: string;
        iGenderID: string;
        iStatusID: string;
        sDeptName: string;
        sLastName: string;
        sMobileNo: string;
        sRoleName: string;
        iCreatedBy: string;
        sContactNo: string;
        sDesigName: string;
        sFirstName: string;
        sMiddleName: string;
        sCreatedDate: string;
        sFullAddress: string;
        sReportingTo: string;
        iReportingToID: string

    /**
     * Constructor
     *
     * @param employeeMaster
     */
    constructor(employeeMaster?) {
        employeeMaster = employeeMaster || {};

        this.iCID = employeeMaster.iCID || '';
        this.iAddID = employeeMaster.iAddID || '';
        this.iEmpID = employeeMaster.iEmpID || '';
        this.sPOBox = employeeMaster.sPOBox || '';
        this.iDeptID = employeeMaster.iDeptID || '';
        this.iRoleID = employeeMaster.iRoleID || '';
        this.sDirect = employeeMaster.sDirect || '';
        this.sGender = employeeMaster.sGender || '';
        this.iDesigID = employeeMaster.iDesigID || '';
        this.sEmailID = employeeMaster.sEmailID || '';
        this.sEmpCode = employeeMaster.sEmpCode || '';
        this.sEmpName = employeeMaster.sEmpName || '';
        this.iGenderID = employeeMaster.iGenderID || '';
        this.iStatusID = employeeMaster.iStatusID || '';
        this.sDeptName = employeeMaster.sDeptName || '';
        this.sLastName = employeeMaster.sLastName || '';
        this.sMobileNo = employeeMaster.sMobileNo || '';
        this.sRoleName = employeeMaster.sRoleName || '';
        this.iCreatedBy = employeeMaster.iCreatedBy || '';
        this.sContactNo = employeeMaster.sContactNo || '';
        this.sDesigName = employeeMaster.sDesigName || '';
        this.sFirstName = employeeMaster.sFirstName || '';
        this.sMiddleName = employeeMaster.sMiddleName || '';
        this.sCreatedDate = employeeMaster.sCreatedDate || '';
        this.sFullAddress = employeeMaster.sFullAddress || '';
        this.sReportingTo = employeeMaster.sReportingTo || '';
        this.iReportingToID = employeeMaster.iReportingToID || '';



    }
}