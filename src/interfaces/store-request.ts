export interface IStoreRequest {

    id: number;

    method: 'store';

    params: {

        arrayBufferId: number;

        arrayBuffer: ArrayBuffer;

    };

}
