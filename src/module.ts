import { ArrayBufferStore } from './helpers/array-buffer-store';
import { TArrayBufferCacheEvent } from './types';

export * from './interfaces';
export * from './types';

const arrayBufferStore = new ArrayBufferStore();

addEventListener('message', ({ data }: TArrayBufferCacheEvent) => {
    try {
        if (data.action === 'clone') {
            const { action, id } = data;

            const arrayBuffer = arrayBufferStore.clone(id);

            postMessage({ action, arrayBuffer, id }, [ arrayBuffer ]);
        } else if (data.action === 'purge') {
            const { action, id } = data;

            arrayBufferStore.purge(id);

            postMessage({ action, id });
        } else if (data.action === 'slice') {
            const { action, begin, end = null, id } = data;

            const arrayBuffer = arrayBufferStore.slice(id, begin, end);

            postMessage({ action, arrayBuffer, id }, [ arrayBuffer ]);
        } else if (data.action === 'store') {
            const { action, arrayBuffer, id } = data;

            arrayBufferStore.store(id, arrayBuffer);

            postMessage({ action, id });
        }
    } catch (err) {
        postMessage({ err: { message: err.message } });
    }
});
