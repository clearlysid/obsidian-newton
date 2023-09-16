export interface NewtonSettings {
	vm: boolean;
	transcribeVm: string;
}

export const DEFAULT_SETTINGS: NewtonSettings = {
	vm: false,
	transcribeVm: "",
}