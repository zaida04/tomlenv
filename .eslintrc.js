module.exports = {
	parserOptions: {
		project: './tsconfig.eslint.json'
	},
	extends: '@sapphire',
	ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/types/**', '*.d.ts'],
	rules: {}
};