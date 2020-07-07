export class purchaseProductMaster {
    iPrdID: number;
    iSupID: number;
    sStartDate: Date;
    sEndDate: Date;
    iPurchaseAmt: number;
    iIsDefault: number

    constructor(purchaseProductMaster?) {
        purchaseProductMaster = purchaseProductMaster || {};
        this.iPrdID = purchaseProductMaster.sBatchNo || '';
        this.iSupID = purchaseProductMaster.iReceivedQty || '';
        this.sStartDate = purchaseProductMaster.sPODNo || '';
        this.sEndDate = purchaseProductMaster.sPODDate || '';
        this.iPurchaseAmt = purchaseProductMaster.sManufacturingDate || '';
        this.iIsDefault = purchaseProductMaster.sExpireDate || '';
    }

}