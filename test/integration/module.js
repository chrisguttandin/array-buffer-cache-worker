describe('module', () => {

    let worker;

    beforeEach(() => {
        worker = new Worker('base/src/module.ts');
    });

    describe('clone()', () => {

        let id;

        beforeEach(() => {
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should return an error', (done) => {
                worker.addEventListener('message', ({ data: { err: { message } } }) => {
                    expect(message).to.equal(`There is no arrayBuffer stored with an id called "${ id }".`);

                    done();
                });

                worker.postMessage({ action: 'clone', id });
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
                worker.postMessage({ action: 'store', arrayBuffer: float64Array.buffer, id }, [ float64Array.buffer ]);
            });

            it('should return the cloned arrayBuffer with the given id', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data.action).to.equal('clone');

                    const float64Array = new Float64Array(data.arrayBuffer);

                    expect(float64Array[0]).to.equal(value);
                    expect(data.id).to.equal(id);

                    done();
                });

                worker.postMessage({ action: 'clone', id });
            });

        });

    });

    describe('purge()', () => {

        let id;

        beforeEach(() => {
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should return an error', (done) => {
                worker.addEventListener('message', ({ data: { err: { message } } }) => {
                    expect(message).to.equal(`There is no arrayBuffer stored with an id called "${ id }".`);

                    done();
                });

                worker.postMessage({ action: 'purge', id });
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
                worker.postMessage({ action: 'store', arrayBuffer: float64Array.buffer, id }, [ float64Array.buffer ]);
            });

            it('should return the id of the purge arrayBuffer', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data.action).to.equal('purge');
                    expect(data.id).to.equal(id);

                    done();
                });

                worker.postMessage({ action: 'purge', id });
            });

        });

    });

    describe('slice()', () => {

        // @todo

    });

    describe('store()', () => {

        let arrayBuffer;
        let id;

        beforeEach(() => {
            arrayBuffer = new ArrayBuffer(8);
            id = 43;
        });

        describe('without a stored arrayBuffer', () => {

            it('should return the id of the stored arrayBuffer', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data.action).to.equal('store');
                    expect(data.id).to.equal(id);

                    done();
                });

                worker.postMessage({ action: 'store', arrayBuffer, id }, [ arrayBuffer ]);
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
                worker.postMessage({ action: 'store', arrayBuffer: otherArrayBuffer, id }, [ otherArrayBuffer ]);
            });

            it('should return an error', (done) => {
                worker.addEventListener('message', ({ data: { err: { message } } }) => {
                    expect(message).to.equal(`There is already an arrayBuffer stored with an id called "${ id }".`);

                    done();
                });

                worker.postMessage({ action: 'store', arrayBuffer, id }, [ arrayBuffer ]);
            });

        });

    });

});
