
export class ProducerMaster {

    iStatusID: number;
    iCountryID: number;
    iCreatedBy: number;
    sShortCode: string;
    iProducerID: number;
    sStatusName: string;
    sCountryName: string;
    sCreatedDate: string;
    sProducerName: string;

    /**
     * Constructor
     *
     * @param ProducerMaster
     */
    constructor(ProducerMaster?) {
        ProducerMaster = ProducerMaster || {};

        this.iStatusID = ProducerMaster.iStatusID || '';
        this.iCountryID = ProducerMaster.iCountryID || '';
        this.iCreatedBy = ProducerMaster.iCreatedBy || '';
        this.sShortCode = ProducerMaster.sShortCode || '';
        this.iProducerID = ProducerMaster.iProducerID || '';
        this.sStatusName = ProducerMaster.sStatusName || '';
        this.sCountryName = ProducerMaster.sCountryName || '';
        this.sCreatedDate = ProducerMaster.sCreatedDate || '';
        this.sProducerName = ProducerMaster.sProducerName || '';



    }
}