export class POGeneralMaster {

    iRequestID: number;
    sPODate: Date;
    iSupContactID: number;
    iSupAddID: number;
    iPOContactID: number;
    iCurrencyID: number;
    iPOID: number;
    sLocName: string;
    sPartnerName: string;
    sSupName: string;
    sPONo: string;
    iSupID: number;
    iPartnerID: number;
    iIncludeTaxes: number;
    iPartnerContactID: number;
    iKVID: number;
    sScheduledDate: Date
    /**
     * Constructor
     *
     * @param POGeneralMaster
     */

    constructor(POGeneralMaster?) {
        POGeneralMaster = POGeneralMaster || {};
        this.sPODate = POGeneralMaster.sPODate || '';
        this.iSupContactID = POGeneralMaster.iSupContactID || '';
        this.iSupAddID = POGeneralMaster.iSupAddID || '';
        this.iPOContactID = POGeneralMaster.iPOContactID || '';
        this.iCurrencyID = POGeneralMaster.iCurrencyID || '';
        this.iPOID = POGeneralMaster.iPOID || '';
        this.sLocName = POGeneralMaster.sLocName || '';
        this.sPartnerName = POGeneralMaster.sPartnerName || '';
        this.sSupName = POGeneralMaster.sSupName || '';
        this.sPONo = POGeneralMaster.sPONo || '';
        this.iSupID = POGeneralMaster.iSupID || '';
        this.iPartnerID = POGeneralMaster.iPartnerID || '';
        this.iIncludeTaxes = POGeneralMaster.iIncludeTaxes || '';
        this.sScheduledDate = POGeneralMaster.sScheduledDate || '';
    }
}