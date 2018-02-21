import { AnyAction } from 'redux';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Schema } from 'normalizr';

export interface IApiActionRequest {
  method: string;
  url: string;
  options?: { [key: string]: any };
}

export interface IApiActionHandlers {
  start: () => AnyAction;
  success: (data: any) => AnyAction;
  error: (error: HttpErrorResponse) => AnyAction;
  complete: () => AnyAction;
}

export interface IApiAction extends AnyAction {
  payload: {
    request: IApiActionRequest;
    handlers: IApiActionHandlers | string;
    cancel?: Observable<any>;
    normalizrSchema?: Schema;
    rawDataProcessor?: (data: any) => any;
  };
}
