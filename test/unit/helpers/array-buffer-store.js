import { ArrayBufferStore } from '../../../src/helpers/array-buffer-store';

describe('arrayBufferStore', () => {

    describe('clone()', () => {

        let arrayBufferStore;
        let id;

        beforeEach(() => {
            arrayBufferStore = new ArrayBufferStore();
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should throw an error', () => {
                expect(() => {
                    arrayBufferStore.clone(id);
                }).to.throw(Error, `There is no arrayBuffer stored with an id called "${ id }".`);
            });

        });

        describe('with a stored arrayBuffer', () => {

            let value;

            beforeEach(() => {
                value = Math.random();

                const float64Array = new Float64Array([ value ]);

                arrayBufferStore.store(id, float64Array.buffer);
            });

            it('should clone the arrayBuffer with the given id', () => {
                const float64Array = new Float64Array(arrayBufferStore.clone(id));

                expect(float64Array[0]).to.equal(value);
            });

        });

    });

    describe('purge()', () => {

        let arrayBufferStore;
        let id;

        beforeEach(() => {
            arrayBufferStore = new ArrayBufferStore();
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should throw an error', () => {
                expect(() => {
                    arrayBufferStore.purge(id);
                }).to.throw(Error, `There is no arrayBuffer stored with an id called "${ id }".`);
            });

        });

        describe('with a stored arrayBuffer', () => {

            let value;

            beforeEach(() => {
                value = Math.random();

                const float64Array = new Float64Array([ value ]);

                arrayBufferStore.store(id, float64Array.buffer);
            });

            it('should purge the arrayBuffer with the given id', () => {
                arrayBufferStore.purge(id);
            });

        });

    });

    describe('slice()', () => {

        // @todo

    });

    describe('store()', () => {

        let arrayBuffer;
        let arrayBufferStore;
        let id;

        beforeEach(() => {
            arrayBuffer = new ArrayBuffer(8);
            arrayBufferStore = new ArrayBufferStore();
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should store the given arrayBuffer', () => {
                arrayBufferStore.store(id, arrayBuffer);
            });

        });

        describe('with a stored arrayBuffer', () => {

            beforeEach(() => {
                arrayBufferStore.store(id, arrayBuffer);
            });

            it('should throw an error', () => {
                expect(() => {
                    arrayBufferStore.store(id, arrayBuffer);
                }).to.throw(Error, `There is already an arrayBuffer stored with an id called "${ id }".`);
            });

        });

    });

});
