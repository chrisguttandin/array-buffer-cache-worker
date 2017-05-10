export interface IArrayBufferCacheSliceEvent extends Event {

    data: {

        action: 'slice';

        begin: number;

        end?: number;

        id: number;

    };

}
