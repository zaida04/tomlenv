import type { ConfigOptions } from './typings';

export function validateOptions(options: ConfigOptions, args: [keyof ConfigOptions, string, boolean][]): void {
	for (const [key, type, optional] of args) {
		// if not optional, check if it equals type
		// if it is optional, check if it's not undefined then check if equals type
		if (!optional && typeof options[key] !== type) throw new TypeError(`Expected options.${key} to be a ${type}!`);
		if (Reflect.has(options, key) && typeof options[key] !== type) throw new TypeError(`Expected options.${key} to be a ${type} when provided!`);
	}
}

export const BASE_CONFIG = {
	baseDir: process.cwd(),
	path: '.env.toml',
	overwrite: true
};
