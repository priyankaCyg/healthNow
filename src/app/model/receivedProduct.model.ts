export class receivedProductMaster {
    sBatchNo: string;
    iReceivedQty: number;
    sPODNo: string;
    sPODDate: Date;
    sManufacturingDate: Date;
    sExpireDate: Date;
    iUserID: number;

    constructor(receivedProductMaster?) {
        receivedProductMaster = receivedProductMaster || {};
        this.sBatchNo = receivedProductMaster.sBatchNo || '';
        this.iReceivedQty = receivedProductMaster.iReceivedQty || '';
        this.sPODNo = receivedProductMaster.sPODNo || '';
        this.sPODDate = receivedProductMaster.sPODDate || '';
        this.sManufacturingDate = receivedProductMaster.sManufacturingDate || '';
        this.sExpireDate = receivedProductMaster.sExpireDate || '';
        this.iUserID = receivedProductMaster.iUserID || '';
    }
   
}