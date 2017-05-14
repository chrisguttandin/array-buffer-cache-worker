import { ICloneRequest, IPurgeRequest, ISliceRequest, IStoreRequest } from '../interfaces';

export type TBrokerMessage = ICloneRequest | IPurgeRequest | ISliceRequest | IStoreRequest;
