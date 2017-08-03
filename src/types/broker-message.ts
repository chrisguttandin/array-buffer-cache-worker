import { ICloneRequest, IConnectRequest, IDisconnectRequest, IPurgeRequest, ISliceRequest, IStoreRequest } from '../interfaces';

export type TBrokerMessage = ICloneRequest | IConnectRequest | IDisconnectRequest | IPurgeRequest | ISliceRequest | IStoreRequest;
