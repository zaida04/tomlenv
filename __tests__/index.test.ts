import { expect } from 'chai';
import * as tomlenv from '../src';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const envTOMLPath = join(__dirname, '.env.toml');
const envTOML = readFileSync(envTOMLPath, 'utf8');

const testTOMLPath = join(__dirname, 'test.toml');
const testTOML = readFileSync(testTOMLPath, 'utf8');

const processEnvCopy = Object.freeze(Object.assign({}, process.env));
beforeEach(() => {
	process.env = Object.assign({}, processEnvCopy);
});

describe('.env.toml', () => {
	it('Parse config', () => {
		expect(tomlenv.parseConfig(envTOML)).to.deep.equal({
			test: 'A3A',
			test2: 'B4B'
		});
	});

	it('Populates process.env', () => {
		tomlenv.config({
			path: envTOMLPath
		});
		expect(process.env).to.haveOwnProperty('test', 'A3A');
		expect(process.env).to.haveOwnProperty('test2', 'B4B');
	});

	it('Overwrite existing process.env vars', () => {
		process.env.test = 'THIS_SHOULD_BE_REPLACED';
		tomlenv.config({
			path: envTOMLPath,
			overwrite: true
		});
		expect(process.env).to.haveOwnProperty('test', 'A3A');
	});

	it("Don't overwrite existing process.env vars", () => {
		process.env.test = 'THIS_SHOULD_BE_REPLACED';
		tomlenv.config({
			path: envTOMLPath,
			overwrite: false
		});
		expect(process.env).to.haveOwnProperty('test', 'THIS_SHOULD_BE_REPLACED');
	});

	it('Error on invalid file path', () => {
		expect(() => {
			tomlenv.config({
				path: join(__dirname, 'incorrectenv.env.toml')
			});
		}).to.throw('Error reading specified toml file. Make sure it exists and is readable.');
	});
});

describe('test.toml', () => {
	it('Parse prod config', () => {
		expect(tomlenv.parseConfig(testTOML, { environment: 'prod' })).to.deep.equal({
			test: 'PRODUCTION'
		});
	});

	it('Parse dev config', () => {
		expect(tomlenv.parseConfig(testTOML, { environment: 'dev' })).to.deep.equal({
			test: 'DEVELOPMENT'
		});
	});

	it('Throw on invalid environment passed', () => {
		expect(() => {
			tomlenv.config({
				path: testTOMLPath,
				environment: 'fake_key'
			});
		}).to.throw('Invalid environment. Specified environment not defined in config. Passed fake_key.');
	});

	it('Populates process.env', () => {
		tomlenv.config({
			path: testTOMLPath,
			environment: 'prod'
		});
		expect(process.env).to.haveOwnProperty('test', 'PRODUCTION');
	});
});

describe('Validate options', () => {
	it('Validate path', () => {
		expect(() => {
			tomlenv.config({
				// @ts-expect-error Testing invalid option
				path: true
			});
		}).to.throw('Expected options.path to be a string!');
	});

	it('Validate environmentObject', () => {
		expect(() => {
			tomlenv.config({
				path: testTOMLPath,
				// @ts-expect-error Testing invalid option
				environmentObject: 'yea'
			});
		}).to.throw('Expected options.environmentObject to be a object when provided!');
	});

	it('Validate overwrite', () => {
		expect(() => {
			tomlenv.config({
				path: testTOMLPath,
				// @ts-expect-error Testing invalid option
				overwrite: 'no'
			});
		}).to.throw('Expected options.overwrite to be a boolean when provided!');
	});

	it('Validate environment', () => {
		expect(() => {
			tomlenv.config({
				path: testTOMLPath,
				// @ts-expect-error Testing invalid option
				environment: false
			});
		}).to.throw('Expected options.environment to be a string when provided!');
	});
});

// describe('Miscellaneous', () => {});
