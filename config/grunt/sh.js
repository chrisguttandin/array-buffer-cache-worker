module.exports = (grunt) => {
    const continuous = grunt.option('continuous') === true;

    return {
        'build': {
            cmd: 'npm run build'
        },
        'test-expectation': {
            cmd: `karma start config/karma/config-expectation.js ${continuous ? '--concurrency Infinity' : '--single-run'}`
        },
        'test-integration': {
            cmd: `karma start config/karma/config-integration.js ${continuous ? '--concurrency Infinity' : '--single-run'}`
        },
        'test-unit': {
            cmd: `karma start config/karma/config-unit.js ${continuous ? '--concurrency Infinity' : '--single-run'}`
        }
    };
};
