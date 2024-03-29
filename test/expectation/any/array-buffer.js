describe('ArrayBuffer', () => {
    describe('slice()', () => {
        let arrayBuffer;

        beforeEach(function () {
            this.timeout(30000);

            /*
             * 2147479551 is the largest possible length but an ArrayBuffer of that size can't be sliced by Chrome and Safari on
             * Sauce Labs. However a size of 300,000,000 bytes is enough to let the test pass.
             */
            arrayBuffer = new ArrayBuffer(300000000);
        });

        it('should block the main thread', function () {
            this.timeout(30000);

            let lastNow = performance.now();
            let currentNow = performance.now();

            expect(currentNow - lastNow).to.be.below(30);

            arrayBuffer.slice(0);

            lastNow = currentNow;
            currentNow = performance.now();

            expect(currentNow - lastNow).to.be.above(30);
        });
    });
});
