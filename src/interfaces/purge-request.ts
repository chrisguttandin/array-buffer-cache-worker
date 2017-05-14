export interface IPurgeRequest {

    id: number;

    method: 'purge';

    params: {

        arrayBufferId: number;

    };

}
