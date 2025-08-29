module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	roots: ['<rootDir>/test'],
	testMatch: ['**/*.spec.ts'],
	collectCoverageFrom: [
		'nodes/**/*.ts',
		'credentials/**/*.ts',
		'!**/*.d.ts',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	moduleNameMapping: {
		'^@/(.*)$': '<rootDir>/nodes/$1',
	},
	transform: {
		'^.+\\.ts$': ['ts-jest', {
			tsconfig: {
				compilerOptions: {
					strict: false,
					noImplicitAny: false,
				}
			}
		}]
	}
};