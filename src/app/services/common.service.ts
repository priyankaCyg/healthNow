import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }


  
 stringToDate(_date,_format,_delimiter)
{
            var formatLowerCase=_format.toLowerCase();
            var formatItems=formatLowerCase.split(_delimiter);
            var dateItems=_date.split(_delimiter);
            var monthIndex=formatItems.indexOf("mm");
            var dayIndex=formatItems.indexOf("dd");
            var yearIndex=formatItems.indexOf("yyyy");
            var month=parseInt(dateItems[monthIndex]);
            month-=1;
            var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
            return formatedDate;
}

 convertDateForInput(_date,_format,_delimiter)
{
            let formatLowerCase=_format.toLowerCase();
            let formatItems=formatLowerCase.split(_delimiter);
            let dateItems=_date.split(_delimiter);
            let monthIndex=formatItems.indexOf("mm");
            let dayIndex=formatItems.indexOf("dd");
            let yearIndex=formatItems.indexOf("yyyy");
            let month=parseInt(dateItems[monthIndex]);
            
            let formatedDate = dateItems[yearIndex]+"-"+month+"-"+dateItems[dayIndex];
            
            return formatedDate;
}
 convertDateForOutput(_date,_format,_delimiter)
{
            let formatLowerCase=_format.toLowerCase();
            let formatItems=formatLowerCase.split(_delimiter);
            let dateItems=_date.split(_delimiter);
            let monthIndex=formatItems.indexOf("mm");
            let dayIndex=formatItems.indexOf("dd");
            let yearIndex=formatItems.indexOf("yyyy");
            let month=parseInt(dateItems[monthIndex]);
            
            let formatedDate = dateItems[dayIndex]+"-"+month+"-"+dateItems[yearIndex];
            
            return formatedDate;
}
 convertDateForCalculation(_date,_format,_delimiter)
{
            let formatLowerCase=_format.toLowerCase();
            let formatItems=formatLowerCase.split(_delimiter);
            let dateItems=_date.split(_delimiter);
            let monthIndex=formatItems.indexOf("mm");
            let dayIndex=formatItems.indexOf("dd");
            let yearIndex=formatItems.indexOf("yyyy");
            let month=parseInt(dateItems[monthIndex]);
            
            let formatedDate = month+ "/"+dateItems[dayIndex]+"/"+dateItems[yearIndex];
            
            return formatedDate;
}




}
