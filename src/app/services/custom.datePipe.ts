import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
   
   @Pipe({
     name: 'customDate'
   })
//    @Injectable({
//     providedIn: 'root'
//   })
   export class CustomDatePipe extends DatePipe implements PipeTransform {
     transform(value: any, args?: any): any {
       if(value != '0000-00-00' && value  != '')
       return super.transform(value, "dd-MM-yyyy");
     }
   }