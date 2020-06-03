export class PartnerAddress {
    sAdd1: string;
    sAdd2: string;
    iLocID: number;
    sAddType: string;
    iCityCode: number;
    iStatusID: number;
    sCityName: string;
    sLandmark: string;
    iAddTypeID: number;
    iCreatedBy: number;
    iPartnerID: number;
    iStateCode: number;
    sStateName: string;
    sPostalCode: string;
    sStatusName: string;
    iCountryCode: number;
    sCountryName: string;
    sCreatedDate: string;
    sPartnerName: string;
    iPartnerAddID: number;
    
    constructor(PartnerAddress?){
        PartnerAddress = PartnerAddress || {};

        this.sAdd1 = PartnerAddress.sAdd1 || '';
        this.sAdd2 = PartnerAddress.sAdd2 || '';
        this.iPartnerAddID = PartnerAddress.iPartnerAddID || '';
        this.iLocID = PartnerAddress.iLocID || '';
        this.sAddType = PartnerAddress.sAddType || '';
        this.sPartnerName = PartnerAddress.sPartnerName || '';
        this.iCityCode = PartnerAddress.iCityCode || '';
        this.iStatusID = PartnerAddress.iStatusID || '';
        this.sCityName = PartnerAddress.sCityName || '';
        this.sLandmark = PartnerAddress.sLandmark || '';
        this.iAddTypeID = PartnerAddress.iAddTypeID || '';
        this.iPartnerID = PartnerAddress.iPartnerID || '';
        this.iStateCode = PartnerAddress.iStateCode || '';
        this.sStateName = PartnerAddress.sStateName || '';
        this.sPostalCode = PartnerAddress.sPostalCode || '';
        this.sStatusName = PartnerAddress.sStatusName || '';
        this.iCountryCode = PartnerAddress.iCountryCode || '';
        this.sCountryName = PartnerAddress.sCountryName || '';
        this.sCreatedDate = PartnerAddress.sCreatedDate || '';
    }
}
