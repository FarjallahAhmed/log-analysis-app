import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BasicAuthInterceptor } from "./BasicAuthInterceptor.intercept";


export const httpInterceptBasic =[
  {provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor,multi:true}
]
