module.exports = () => {
    return {
        'build': {
            cmd: 'npm run build'
        },
        'test-expectation': {
            cmd: 'npm run test:expectation'
        },
        'test-integration': {
            cmd: 'npm run test:integration'
        },
        'test-unit': {
            cmd: 'npm run test:unit'
        }
    };
};
