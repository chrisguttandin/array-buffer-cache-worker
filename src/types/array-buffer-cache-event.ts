import {
    IArrayBufferCacheCloneEvent,
    IArrayBufferCachePurgeEvent,
    IArrayBufferCacheSliceEvent,
    IArrayBufferCacheStoreEvent
} from '../interfaces';

export type TArrayBufferCacheEvent = IArrayBufferCacheCloneEvent
    | IArrayBufferCachePurgeEvent
    | IArrayBufferCacheSliceEvent
    | IArrayBufferCacheStoreEvent;
