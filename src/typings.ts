export interface ConfigOptions {
	environment?: string;
	path: string;
	environmentObject?: {
		[key: string]: string | undefined;
	};
	overwrite?: boolean;
}
