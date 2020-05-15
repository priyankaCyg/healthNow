
export class DepartmentMaster {

    iCID: string;
    iDeptID: string;
    iStatusID: string;
    sDeptName: string;
    iCreatedBy: string;
    sCreatedDate: string;

    /**
     * Constructor
     *
     * @param UnitMaster
     */
    constructor(GstMaster?) {
        GstMaster = GstMaster || {};

        this.iCID = GstMaster.iCID || '';
        this.iDeptID = GstMaster.iDeptID || '';
        this.iStatusID = GstMaster.iStatusID || '';
        this.sDeptName = GstMaster.sDeptName || '';
        this.iCreatedBy = GstMaster.iCreatedBy || '';
        this.sCreatedDate = GstMaster.sCreatedDate || '';

    }
}