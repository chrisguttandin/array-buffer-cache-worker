export interface IArrayBufferCachePurgeEvent extends Event {

    data: {

        action: 'purge';

        id: number;

    };

}
