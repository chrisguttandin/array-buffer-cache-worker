describe('module', () => {

    let worker;

    after((done) => {
        // @todo This is an optimistic fix to prevent the famous 'Some of your tests did a full page reload!' error.
        setTimeout(done, 500);
    });

    beforeEach(() => {
        worker = new Worker('base/src/module.ts');
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
                            message: `There is no arrayBuffer stored with an id called "${ arrayBufferId }".`
                        },
                        id,
                        result: null
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
                    const float64Array = new Float64Array(data.result.arrayBuffer);

                    expect(float64Array[0]).to.equal(value);

                    expect(data).to.deep.equal({
                        error: null,
                        id,
                        result: { arrayBuffer: data.result.arrayBuffer }
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
                            message: `There is no arrayBuffer stored with an id called "${ arrayBufferId }".`
                        },
                        id,
                        result: null
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
                        error: null,
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

        // @todo

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

            it('should return the id of the store arrayBuffer message', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data).to.deep.equal({
                        error: null,
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
                            message: `There is already an arrayBuffer stored with an id called "${ arrayBufferId }".`
                        },
                        id,
                        result: null
                    });

                    done();
                });

                worker.postMessage({ id, method: 'store', params: { arrayBuffer, arrayBufferId } }, [ arrayBuffer ]);
            });

        });

    });

});
