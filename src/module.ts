import { ArrayBufferStore } from './helpers/array-buffer-store';
import { IBrokerEvent, ICloneResponse, IErrorResponse, IPurgeResponse, ISliceResponse, IStoreResponse } from './interfaces';

export * from './interfaces';
export * from './types';

const arrayBufferStore = new ArrayBufferStore();

addEventListener('message', ({ data }: IBrokerEvent) => {
    try {
        if (data.method === 'clone') {
            const { id, params: { arrayBufferId } } = data;

            const arrayBuffer = arrayBufferStore.clone(arrayBufferId);

            postMessage(<ICloneResponse> { error: null, id, result: { arrayBuffer } }, [ arrayBuffer ]);
        } else if (data.method === 'purge') {
            const { id, params: { arrayBufferId } } = data;

            arrayBufferStore.purge(arrayBufferId);

            postMessage(<IPurgeResponse> { error: null, id, result: null });
        } else if (data.method === 'slice') {
            const { id, params: { arrayBufferId, begin, end = null } } = data;

            const arrayBuffer = arrayBufferStore.slice(arrayBufferId, begin, end);

            postMessage(<ISliceResponse> { error: null, id, result: { arrayBuffer } }, [ arrayBuffer ]);
        } else if (data.method === 'store') {
            const { id, params: { arrayBuffer, arrayBufferId } } = data;

            arrayBufferStore.store(arrayBufferId, arrayBuffer);

            postMessage(<IStoreResponse> { error: null, id, result: null });
        }
    } catch (err) {
        postMessage(<IErrorResponse> {
            error: {
                message: err.message
            },
            id: data.id,
            result: null
        });
    }
});
