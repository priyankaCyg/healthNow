export class poDetailMaster {
    iQty: number;
    iPCID: number;
    iPrdID: number;
    iDisAmt: number;
    iDisPer: number;
    iPReqID: number;
    sPCName: string;
    iSupRate: number;
    sPrdName: string;
    sCreatedDate: string;
    iPurchasePrice: number;
    iTotalAmount:number;

    constructor(poDetailMaster?) {
        poDetailMaster = poDetailMaster || {};
        this.iQty = poDetailMaster.iQty || '';
        this.iPCID = poDetailMaster.iPCID || '';
        this.iPCID = poDetailMaster.iPCID || '';
        this.iDisAmt = poDetailMaster.iDisAmt || '';
        this.iDisPer = poDetailMaster.iDisPer || '';
        this.iPReqID = poDetailMaster.iPReqID || '';
        this.sPCName = poDetailMaster.sPCName || '';
        this.iSupRate = poDetailMaster.iSupRate || '';
        this.sPrdName = poDetailMaster.sPrdName || '';
        this.sCreatedDate = poDetailMaster.sCreatedDate || '';
        this.iPurchasePrice = poDetailMaster.iPurchasePrice || '';
        this.iTotalAmount = poDetailMaster.iTotalAmount || '';
    }
}