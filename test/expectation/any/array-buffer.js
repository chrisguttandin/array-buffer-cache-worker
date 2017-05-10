describe('ArrayBuffer', () => {

    describe('slice()', () => {

        let arrayBuffer;

        beforeEach(function (done) {
            this.timeout(5000);

            arrayBuffer = new ArrayBuffer(2147479551);

            // Wait some time to allow the browser to warm up.
            setTimeout(done, 1000);
        });

        it('should block the main thread', function (done) {
            this.timeout(10000);

            let remainingMinimalCycles = 10;
            let slicedBuffer; // eslint-disable-line no-unused-vars
            let timeAtLastCycle = null;

            const budget = (1000 / 20);

            const cycle = () => {
                const now = performance.now();

                try {
                    if (timeAtLastCycle !== null) {
                        const elapsedTime = now - timeAtLastCycle;

                        if (remainingMinimalCycles === 7) {
                            expect(elapsedTime).to.be.above(budget);
                        } else {
                            expect(elapsedTime).to.be.below(budget);
                        }

                        remainingMinimalCycles -= 1;

                        if (remainingMinimalCycles === 7) {
                            // Keep a reference until the test is over to avoid garbage collection.
                            slicedBuffer = arrayBuffer.slice(0);
                        } else if (remainingMinimalCycles === 0) {
                            done();
                        }
                    }

                    timeAtLastCycle = now;

                    requestAnimationFrame(() => cycle());
                } catch (err) {
                    done(err);
                }
            };

            requestAnimationFrame(() => cycle());
        });

    });

});
