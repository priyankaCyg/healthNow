
export class GstMaster {

    iSupID: number;
    iStateID: number;
    sCreatedDate: string;
    sGST: string;
    sLocCode: string;
    sStateName: string;

    /**
     * Constructor
     *
     * @param UnitMaster
     */
    constructor(GstMaster?) {
        GstMaster = GstMaster || {};

        this.iSupID = GstMaster.iSupID || '';
        this.iStateID = GstMaster.iStateID || '';
        this.sCreatedDate = GstMaster.sCreatedDate || '';
        this.sGST = GstMaster.sGST || '';
        this.sLocCode = GstMaster.sLocCode || '';
        this.sStateName = GstMaster.sStateName || '';

    }
}