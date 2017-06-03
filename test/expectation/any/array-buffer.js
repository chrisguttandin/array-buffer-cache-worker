describe('ArrayBuffer', () => {

    describe('slice()', () => {

        let arrayBuffer;

        beforeEach(function () {
            this.timeout(30000);

            arrayBuffer = new ArrayBuffer(2147479551);
        });

        it('should block the main thread', function () {
            this.timeout(30000);

            let lastNow = performance.now();
            let currentNow = performance.now();

            expect(currentNow - lastNow).to.be.below(100);

            arrayBuffer.slice(0);

            lastNow = currentNow;
            currentNow = performance.now();

            expect(currentNow - lastNow).to.be.above(100);
        });

    });

});
