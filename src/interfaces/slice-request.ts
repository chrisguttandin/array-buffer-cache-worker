export interface ISliceRequest {

    id: number;

    method: 'slice';

    params: {

        arrayBufferId: number;

        begin: number;

        end?: number;

    };

}
