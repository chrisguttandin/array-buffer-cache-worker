import { ICloneResponse, IErrorResponse, IPurgeResponse, ISliceResponse, IStoreResponse } from '../interfaces';

export type TWorkerMessage = ICloneResponse | IErrorResponse | IPurgeResponse | ISliceResponse | IStoreResponse;
