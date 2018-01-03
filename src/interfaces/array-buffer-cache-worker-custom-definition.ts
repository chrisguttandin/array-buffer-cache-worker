import { IWorkerDefinition } from 'worker-factory';

export interface IArrayBufferCacheWorkerCustomDefinition extends IWorkerDefinition {

    clone: {

        params: {

            arrayBufferId: number;

        };

        response: {

            result: ArrayBuffer;

            transferables: [ ArrayBuffer ];

        };

    };

    purge: {

        params: {

            arrayBufferId: number;

        };

        response: {

            result: null;

        };

    };

    slice: {

        params: {

            arrayBufferId: number;

            begin: number;

            end: null | number;

        };

        response: {

            result: ArrayBuffer;

            transferables: [ ArrayBuffer ];

        };

    };

    store: {

        params: {

            arrayBufferId: number;

            arrayBuffer: ArrayBuffer;

        };

        response: {

            result: null;

        };

    };

}
