
export class createRequisitionMaster {

    iQty: number;
    iPCID: number;
    iPrdID: number;
    sPCName: string;
    sLocCode: string;
    sLocName: string;
    sPrdName: string;
    iPartLocID: number;
    iPartnerID: number;
    sCreatedDate: string;
    sPartnerName: string;

    /**
     * Constructor
     *
     * @param UnitMaster
     */
    constructor(createRequisitionMaster?) {
        createRequisitionMaster = createRequisitionMaster || {};

        this.iQty = createRequisitionMaster.iQty || '';
        this.iPCID = createRequisitionMaster.iPCID || '';
        this.iPrdID = createRequisitionMaster.iPrdID || '';
        this.sPCName = createRequisitionMaster.sPCName || '';
        this.sLocCode = createRequisitionMaster.sLocCode || '';
        this.sLocName = createRequisitionMaster.sLocName || '';
        this.sPrdName = createRequisitionMaster.sPrdName || '';
        this.iPartLocID = createRequisitionMaster.iPartLocID || '';
        this.iPartnerID = createRequisitionMaster.iPartnerID || '';
        this.sCreatedDate = createRequisitionMaster.sCreatedDate || '';
        this.sPartnerName = createRequisitionMaster.sPartnerName || '';
    }
}