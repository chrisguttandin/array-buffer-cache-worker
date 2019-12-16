import { TWorkerImplementation, createWorker } from 'worker-factory';
import { ArrayBufferStore } from './helpers/array-buffer-store';
import { IArrayBufferCacheWorkerCustomDefinition } from './interfaces';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';
export * from './types/index';

const arrayBufferStore = new ArrayBufferStore();

createWorker<IArrayBufferCacheWorkerCustomDefinition>(self, <TWorkerImplementation<IArrayBufferCacheWorkerCustomDefinition>> {
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
