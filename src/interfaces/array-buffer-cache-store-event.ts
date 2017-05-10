export interface IArrayBufferCacheStoreEvent extends Event {

    data: {

        action: 'store';

        arrayBuffer: ArrayBuffer;

        id: number;

    };

}
