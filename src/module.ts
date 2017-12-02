import { ArrayBufferStore } from './helpers/array-buffer-store';
import {
    IBrokerEvent,
    ICloneResponse,
    IConnectResponse,
    IDisconnectResponse,
    IErrorResponse,
    IPurgeResponse,
    ISliceResponse,
    IStoreResponse
} from './interfaces';

export * from './interfaces';
export * from './types';

const arrayBufferStore = new ArrayBufferStore();

const handleEvent = (receiver: MessagePort, { data }: IBrokerEvent) => {
    try {
        if (data.method === 'clone') {
            const { id, params: { arrayBufferId } } = data;

            const arrayBuffer = arrayBufferStore.clone(arrayBufferId);

            receiver.postMessage(<ICloneResponse> { error: null, id, result: { arrayBuffer } }, [ arrayBuffer ]);
        } else if (data.method === 'connect') {
            const { id, params: { port } } = data;

            port.start();
            port.addEventListener('message', handleEvent.bind(null, port));

            receiver.postMessage(<IConnectResponse> { error: null, id, result: null });
        } else if (data.method === 'disconnect') {
            const { id, params: { port } } = data;

            port.close();

            receiver.postMessage(<IDisconnectResponse> { error: null, id, result: null });
        } else if (data.method === 'purge') {
            const { id, params: { arrayBufferId } } = data;

            arrayBufferStore.purge(arrayBufferId);

            receiver.postMessage(<IPurgeResponse> { error: null, id, result: null });
        } else if (data.method === 'slice') {
            const { id, params: { arrayBufferId, begin, end = null } } = data;

            const arrayBuffer = arrayBufferStore.slice(arrayBufferId, begin, end);

            receiver.postMessage(<ISliceResponse> { error: null, id, result: { arrayBuffer } }, [ arrayBuffer ]);
        } else if (data.method === 'store') {
            const { id, params: { arrayBuffer, arrayBufferId } } = data;

            arrayBufferStore.store(arrayBufferId, arrayBuffer);

            receiver.postMessage(<IStoreResponse> { error: null, id, result: null });
        }
    } catch (err) {
        receiver.postMessage(<IErrorResponse> {
            error: {
                message: err.message
            },
            id: data.id,
            result: null
        });
    }
};

addEventListener('message', handleEvent.bind(null, self));
