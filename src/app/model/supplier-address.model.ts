export class SupplierAddress {
        sAdd1: string;
        sAdd2: string;
        iAddID: number;
        iLocID: number;
        sAddType: string;
        sSupName: string;
        iCityCode: number;
        iStatusID: number;
        sCityName: string;
        sLandmark: string;
        iAddTypeID: number;
        iSupAddID: number;
        iCreatedBy: number;
        iStateCode: number;
        sStateName: string;
        sPostalCode: string;
        sStatusName: string;
        iCountryCode: number;
        sCountryName: string

        constructor(SupplierAddress?){
            SupplierAddress = SupplierAddress || {};

            this.sAdd1 = SupplierAddress.sAdd1 || '';
            this.sAdd2 = SupplierAddress.sAdd2 || '';
            this.iAddID = SupplierAddress.iAddID || '';
            this.iLocID = SupplierAddress.iLocID || '';
            this.sAddType = SupplierAddress.sAddType || '';
            this.sSupName = SupplierAddress.sSupName || '';
            this.iCityCode = SupplierAddress.iCityCode || '';
            this.iStatusID = SupplierAddress.iStatusID || '';
            this.sCityName = SupplierAddress.sCityName || '';
            this.sLandmark = SupplierAddress.sLandmark || '';
            this.iAddTypeID = SupplierAddress.iAddTypeID || '';
            this.iSupAddID = SupplierAddress.iSupAddID || '';
            this.iStateCode = SupplierAddress.iStateCode || '';
            this.sStateName = SupplierAddress.sStateName || '';
            this.sPostalCode = SupplierAddress.sPostalCode || '';
            this.sStatusName = SupplierAddress.sStatusName || '';
            this.iCountryCode = SupplierAddress.iCountryCode || '';
            this.sCountryName = SupplierAddress.sCountryName || '';

        }
}
