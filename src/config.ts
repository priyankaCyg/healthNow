export const stringify = require('fast-json-stable-stringify');

export var config = {
     url: 'http://13.126.132.149/healthnow/DataAPI',
   // url: 'http://13.126.132.149/healthnowstore/DataAPI',
    authUrl: 'http://13.126.132.149/healthnowauth/authenticate',
    authAccess: 'http://13.126.132.149/healthnowauth/access',
    authStoreUrl: 'http://13.126.132.149/healthnowstore/authenticate',
    fileUrl: 'http://13.126.132.149/healthnow/file',
    deleteMsg: "Are you sure you want to Delete this record ?",
    dateFormat : 'yyyy-dd-MM'
}

