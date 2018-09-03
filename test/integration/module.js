describe('module', () => {

    let worker;

    after((done) => {
        // @todo This is an optimistic fix to prevent the famous 'Some of your tests did a full page reload!' error.
        setTimeout(done, 500);
    });

    beforeEach(() => {
        worker = new Worker('base/src/module.js');
    });

    describe('clone()', () => {

        let arrayBufferId;
        let id;

        beforeEach(() => {
            arrayBufferId = 17;
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should return an error', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data).to.deep.equal({
                        error: {
                            // @todo Define a more meaningful error code.
                            code: -32603,
                            message: `There is no arrayBuffer stored with an id called "${ arrayBufferId }".`
                        },
                        id
                    });

                    done();
                });

                worker.postMessage({ id, method: 'clone', params: { arrayBufferId } });
            });

        });

        describe('with a stored arrayBuffer', () => {

            let value;

            beforeEach((done) => {
                value = Math.random();

                const float64Array = new Float64Array([ value ]);
                const onMessage = () => {
                    worker.removeEventListener('message', onMessage);

                    done();
                };

                worker.addEventListener('message', onMessage);
                worker.postMessage({ id, method: 'store', params: { arrayBuffer: float64Array.buffer, arrayBufferId } }, [ float64Array.buffer ]);
            });

            it('should return the cloned arrayBuffer with the given id', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    const float64Array = new Float64Array(data.result);

                    expect(float64Array[0]).to.equal(value);

                    expect(data).to.deep.equal({
                        id,
                        result: data.result
                    });

                    done();
                });

                worker.postMessage({ id, method: 'clone', params: { arrayBufferId } });
            });

        });

    });

    describe('purge()', () => {

        let arrayBufferId;
        let id;

        beforeEach(() => {
            arrayBufferId = 23;
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should return an error', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data).to.deep.equal({
                        error: {
                            // @todo Define a more meaningful error code.
                            code: -32603,
                            message: `There is no arrayBuffer stored with an id called "${ arrayBufferId }".`
                        },
                        id
                    });

                    done();
                });

                worker.postMessage({ id, method: 'purge', params: { arrayBufferId } });
            });

        });

        describe('with a stored arrayBuffer', () => {

            let value;

            beforeEach((done) => {
                value = Math.random();

                const float64Array = new Float64Array([ value ]);
                const onMessage = () => {
                    worker.removeEventListener('message', onMessage);

                    done();
                };

                worker.addEventListener('message', onMessage);
                worker.postMessage({ id, method: 'store', params: { arrayBuffer: float64Array.buffer, arrayBufferId } }, [ float64Array.buffer ]);
            });

            it('should return the id of the purge arrayBuffer message', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data).to.deep.equal({
                        id,
                        result: null
                    });

                    done();
                });

                worker.postMessage({ id, method: 'purge', params: { arrayBufferId } });
            });

        });

    });

    describe('slice()', () => {

        let arrayBufferId;
        let id;

        beforeEach(() => {
            arrayBufferId = 17;
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should return an error', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data).to.deep.equal({
                        error: {
                            // @todo Define a more meaningful error code.
                            code: -32603,
                            message: `There is no arrayBuffer stored with an id called "${ arrayBufferId }".`
                        },
                        id
                    });

                    done();
                });

                worker.postMessage({ id, method: 'slice', params: { arrayBufferId } });
            });

        });

        describe('with a stored arrayBuffer', () => {

            let values;

            beforeEach((done) => {
                values = [ Math.random(), Math.random(), Math.random() ];

                const float64Array = new Float64Array(values);
                const onMessage = () => {
                    worker.removeEventListener('message', onMessage);

                    done();
                };

                worker.addEventListener('message', onMessage);
                worker.postMessage({ id, method: 'store', params: { arrayBuffer: float64Array.buffer, arrayBufferId } }, [ float64Array.buffer ]);
            });

            it('should return the cloned arrayBuffer with the given id', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    const float64Array = new Float64Array(data.result);

                    expect(Array.from(float64Array)).to.deep.equal(values);

                    expect(data).to.deep.equal({
                        id,
                        result: data.result
                    });

                    done();
                });

                worker.postMessage({ id, method: 'slice', params: { arrayBufferId, begin: 0, end: null } });
            });

            it('should return the sliced arrayBuffer with the given id', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    const float64Array = new Float64Array(data.result);

                    expect(Array.from(float64Array)).to.deep.equal(values.slice(1, 2));

                    expect(data).to.deep.equal({
                        id,
                        result: data.result
                    });

                    done();
                });

                worker.postMessage({ id, method: 'slice', params: { arrayBufferId, begin: Float64Array.BYTES_PER_ELEMENT, end: Float64Array.BYTES_PER_ELEMENT * 2 } });
            });

            describe('with a value for begin below zero', () => {

                it('should return an error', (done) => {
                    worker.addEventListener('message', ({ data }) => {
                        expect(data).to.deep.equal({
                            error: {
                                // @todo Define a more meaningful error code.
                                code: -32603,
                                message: 'The given value for begin "-1" is out of bounds.'
                            },
                            id
                        });

                        done();
                    });

                    worker.postMessage({ id, method: 'slice', params: { arrayBufferId, begin: -1 } });
                });

            });

            describe('with a value for begin above the size of the arrayBuffer', () => {

                it('should return an error', (done) => {
                    worker.addEventListener('message', ({ data }) => {
                        expect(data).to.deep.equal({
                            error: {
                                // @todo Define a more meaningful error code.
                                code: -32603,
                                message: 'The given value for begin "25" is out of bounds.'
                            },
                            id
                        });

                        done();
                    });

                    worker.postMessage({ id, method: 'slice', params: { arrayBufferId, begin: (Float64Array.BYTES_PER_ELEMENT * 3) + 1 } });
                });

            });

            describe('with a value for end above the size of the arrayBuffer', () => {

                it('should return an error', (done) => {
                    worker.addEventListener('message', ({ data }) => {
                        expect(data).to.deep.equal({
                            error: {
                                // @todo Define a more meaningful error code.
                                code: -32603,
                                message: 'The given value for end "25" is out of bounds.'
                            },
                            id
                        });

                        done();
                    });

                    worker.postMessage({ id, method: 'slice', params: { arrayBufferId, begin: 0, end: (Float64Array.BYTES_PER_ELEMENT * 3) + 1 } });
                });

            });

            describe('with a value for end below the value of begin', () => {

                it('should return an error', (done) => {
                    worker.addEventListener('message', ({ data }) => {
                        expect(data).to.deep.equal({
                            error: {
                                // @todo Define a more meaningful error code.
                                code: -32603,
                                message: 'The given value for end "4" is below the given value for begin "12".'
                            },
                            id
                        });

                        done();
                    });

                    worker.postMessage({ id, method: 'slice', params: { arrayBufferId, begin: 12, end: 4 } });
                });

            });


        });

    });

    describe('store()', () => {

        let arrayBuffer;
        let arrayBufferId;
        let id;

        beforeEach(() => {
            arrayBuffer = new ArrayBuffer(8);
            arrayBufferId = 27;
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should return the id of the stored arrayBuffer message', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data).to.deep.equal({
                        id,
                        result: null
                    });

                    done();
                });

                worker.postMessage({ id, method: 'store', params: { arrayBuffer, arrayBufferId } }, [ arrayBuffer ]);
            });

        });

        describe('with a stored arrayBuffer', () => {

            beforeEach((done) => {
                const otherArrayBuffer = new ArrayBuffer(8);
                const onMessage = () => {
                    worker.removeEventListener('message', onMessage);

                    done();
                };

                worker.addEventListener('message', onMessage);
                worker.postMessage({ id, method: 'store', params: { arrayBuffer: otherArrayBuffer, arrayBufferId } }, [ otherArrayBuffer ]);
            });

            it('should return an error', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data).to.deep.equal({
                        error: {
                            // @todo Define a more meaningful error code.
                            code: -32603,
                            message: `There is already an arrayBuffer stored with an id called "${ arrayBufferId }".`
                        },
                        id
                    });

                    done();
                });

                worker.postMessage({ id, method: 'store', params: { arrayBuffer, arrayBufferId } }, [ arrayBuffer ]);
            });

        });

    });

});
