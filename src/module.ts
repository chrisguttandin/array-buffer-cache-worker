import { createWorker } from 'worker-factory';
import { ArrayBufferStore } from './helpers/array-buffer-store';
import { IArrayBufferCacheWorkerCustomDefinition } from './interfaces';

export * from './interfaces';
export * from './types';

const arrayBufferStore = new ArrayBufferStore();

createWorker<IArrayBufferCacheWorkerCustomDefinition>(self, {
    clone: ({ arrayBufferId }) => {
        const arrayBuffer = arrayBufferStore.clone(arrayBufferId);

        return { result: arrayBuffer, transferables: [ arrayBuffer ] };
    },
    purge: ({ arrayBufferId }) => {
        arrayBufferStore.purge(arrayBufferId);

        return { result: null };
    },
    slice: ({ arrayBufferId, begin, end }) => {
        const arrayBuffer = arrayBufferStore.slice(arrayBufferId, begin, end);

        return { result: arrayBuffer, transferables: [ arrayBuffer ] };
    },
    store: ({ arrayBuffer, arrayBufferId }) => {
        arrayBufferStore.store(arrayBufferId, arrayBuffer);

        return { result: null };
    }
});
