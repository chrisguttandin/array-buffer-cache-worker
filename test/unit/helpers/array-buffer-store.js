import { beforeEach, describe, expect, it } from 'vitest';
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
                }).to.throw(Error, `There is no arrayBuffer stored with an id called "${id}".`);
            });
        });

        describe('with a stored arrayBuffer', () => {
            let value;

            beforeEach(() => {
                value = Math.random();

                const float64Array = new Float64Array([value]);

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
                }).to.throw(Error, `There is no arrayBuffer stored with an id called "${id}".`);
            });
        });

        describe('with a stored arrayBuffer', () => {
            let value;

            beforeEach(() => {
                value = Math.random();

                const float64Array = new Float64Array([value]);

                arrayBufferStore.store(id, float64Array.buffer);
            });

            it('should purge the arrayBuffer with the given id', () => {
                arrayBufferStore.purge(id);
            });
        });
    });

    describe('slice()', () => {
        let arrayBufferStore;
        let id;

        beforeEach(() => {
            arrayBufferStore = new ArrayBufferStore();
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {
            it('should throw an error', () => {
                expect(() => {
                    arrayBufferStore.slice(id, 0);
                }).to.throw(Error, `There is no arrayBuffer stored with an id called "${id}".`);
            });
        });

        describe('with a stored arrayBuffer', () => {
            let values;

            beforeEach(() => {
                values = [Math.random(), Math.random(), Math.random()];

                const float64Array = new Float64Array(values);

                arrayBufferStore.store(id, float64Array.buffer);
            });

            it('should clone the arrayBuffer with the given id', () => {
                const float64Array = new Float64Array(arrayBufferStore.slice(id, 0, null));

                expect(Array.from(float64Array)).to.deep.equal(values);
            });

            it('should slice the arrayBuffer with the given id', () => {
                const float64Array = new Float64Array(
                    arrayBufferStore.slice(id, Float64Array.BYTES_PER_ELEMENT, Float64Array.BYTES_PER_ELEMENT * 2)
                );

                expect(Array.from(float64Array)).to.deep.equal(values.slice(1, 2));
            });

            describe('with a value for begin below zero', () => {
                it('should throw an error', () => {
                    expect(() => {
                        arrayBufferStore.slice(id, -1, null);
                    }).to.throw(Error, 'The given value for begin "-1" is out of bounds.');
                });
            });

            describe('with a value for begin above the size of the arrayBuffer', () => {
                it('should throw an error', () => {
                    expect(() => {
                        arrayBufferStore.slice(id, Float64Array.BYTES_PER_ELEMENT * 3 + 1, null);
                    }).to.throw(Error, 'The given value for begin "25" is out of bounds.');
                });
            });

            describe('with a value for end above the size of the arrayBuffer', () => {
                it('should throw an error', () => {
                    expect(() => {
                        arrayBufferStore.slice(id, 0, Float64Array.BYTES_PER_ELEMENT * 3 + 1);
                    }).to.throw(Error, 'The given value for end "25" is out of bounds.');
                });
            });

            describe('with a value for end below the value of begin', () => {
                it('should throw an error', () => {
                    expect(() => {
                        arrayBufferStore.slice(id, 12, 4);
                    }).to.throw(Error, 'The given value for end "4" is below the given value for begin "12".');
                });
            });
        });
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
                }).to.throw(Error, `There is already an arrayBuffer stored with an id called "${id}".`);
            });
        });
    });
});
