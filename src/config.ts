

export const stringify = require('fast-json-stable-stringify');

export var config={
    // url:"http://localhost",
    // url:"http://192.168.5.121",
    // url:"http://192.168.0.101",
    url:"http://localhost",
    port: "10011/PHAPI",
   // url:"https://raptest.southindianbank.com",
   // port: "/PHAPI",

    key:"REPLACE THIS WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
    // port:"8000",
    // port:"10012",
    appName: "Users",
    appURL: "http://10.1.214.3:4200",
    // appURL: "http://localhost:4200"
    
}

export var appConst = {
    default_status: 'NOSTAT',
    saperator:'@:SIB:@',
    indc:'6,4,11,24,18,32'
}

export const Permissions={
    read:"read",
    create:"create",
    authorize:"authorize",
    execute:"execute",
    generate:"generate",
}

export var statusCode =
{

    Draft: 'Draft',
    New: 'New',
    Activated: 'Activated',
    Issued: 'Issued',
    Rejected: 'Rejected',
    Updated: 'Updated',
    Discard: 'Discard',
    Approved: 'Approved',
    AcceptRejection: 'Accept Rejection',
    Active : true,
    Deactivate : false,
    KillSession : true
}


export var MODE =
{
    edit: "edit",
    view: "view"

}    

export var ORGTYPE={
    MANUFACTURER:'Manufacturer',
    SUPPLIER:'Supplier',
}

export var statusBtn = {

    Approved: 'Approve',
    Reject: 'Reject',
    Delete: 'Delete',
    Activate: 'Activate',
    Dectivate: 'Dectivate',
    Issue: 'Issue',
    KillSession:'KillSession'
}

export var ROLES = {

    Maker: 'Maker',
    Checker: 'Checker',
    Admin: 'Admin'
}

