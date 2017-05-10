export interface IArrayBufferCacheCloneEvent extends Event {

    data: {

        action: 'clone';

        id: number;

    };

}
