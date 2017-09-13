import {
    ICloneResponse,
    IConnectResponse,
    IDisconnectResponse,
    IErrorResponse,
    IPurgeResponse,
    ISliceResponse,
    IStoreResponse
} from '../interfaces';

export type TWorkerMessage = ICloneResponse |
    IConnectResponse |
    IDisconnectResponse |
    IErrorResponse |
    IPurgeResponse |
    ISliceResponse |
    IStoreResponse;
