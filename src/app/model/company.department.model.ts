
export class DepartmentMaster {

    iCID: Number;
    iDeptID: Number;
    iStatusID: Number;
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