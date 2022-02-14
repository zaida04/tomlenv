import { readFileSync } from 'fs';
import { parse } from 'toml';
import { BASE_CONFIG, validateOptions } from './util';
import type { ConfigOptions } from './typings';

export function parseConfig(data: string, options?: Pick<ConfigOptions, 'environment'>) {
	const readConfig = parse(data);
	let parsedConfigPostPath;
	if (options?.environment) {
		if (!Reflect.has(readConfig.env, options?.environment))
			throw new Error(`Invalid environment. Specified environment not defined in config. Passed ${options.environment}.`);
		parsedConfigPostPath = readConfig.env[options.environment];
	}
	return parsedConfigPostPath ?? readConfig;
}

export function config(options?: ConfigOptions) {
	if (!options) options = BASE_CONFIG;
	validateOptions(options, [
		['path', 'string', false],
		['environment', 'string', true],
		['overwrite', 'boolean', true],
		['environmentObject', 'object', true]
	]);

	let file;
	try {
		file = readFileSync(options.path, 'utf8');
	} catch (e) {
		throw new Error('Error reading specified toml file. Make sure it exists and is readable.');
	}

	const envVars = parseConfig(file, {
		environment: options.environment
	});
	const environmentObject = options.environmentObject ?? process.env;
	Object.keys(envVars).forEach((key) => {
		if (Reflect.has(environmentObject, key)) {
			if (!options!.overwrite) return void 0;
		}
		environmentObject[key] = envVars[key];
	});
}
