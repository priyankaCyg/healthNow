export class companyBankMaster {
  
  sIFSC: string;
  iBankID: string;
  iStatusID: string;
  sBankName: string;
  iCreatedBy: string;
  sAccountNo: string;
  sShortCode: string;
  sBankBranch: string;
  sCreatedDate: string;

  /**
   * Constructor
   *
   * @param companyBankMaster
   */

  constructor(companyBankMaster?) {

      companyBankMaster = companyBankMaster || {};

      this.sIFSC = companyBankMaster.sIFSC || '';
      this.iBankID = companyBankMaster.iBankID || '';
      this.iStatusID = companyBankMaster.iStatusID || '';
      this.sBankName = companyBankMaster.sBankName || '';
      this.iCreatedBy = companyBankMaster.iCreatedBy || '';
      this.sAccountNo = companyBankMaster.sAccountNo || '';
      this.sShortCode = companyBankMaster.sShortCode || '';
      this.sBankBranch = companyBankMaster.sBankBranch || '';
      this.sCreatedDate = companyBankMaster.sCreatedDate || '';
  }
}
