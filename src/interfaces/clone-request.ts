export interface ICloneRequest {

    id: number;

    method: 'clone';

    params: {

        arrayBufferId: number;

    };

}
