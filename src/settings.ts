import { App, PluginSettingTab, Setting } from 'obsidian';

import Newton from './main';

export interface NewtonSettings {
	mySetting: string;
	vm: boolean;
	transcribeVm: string;
}

export const DEFAULT_SETTINGS: NewtonSettings = {
	mySetting: 'default',
	vm: false,
	transcribeVm: "",
}

export class SampleSettingTab extends PluginSettingTab {
	plugin: Newton;

	constructor(app: App, plugin: Newton) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Voice Memos')
			.setDesc("Sync to Apple's Voice Memos app")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.vm)
				.onChange(async (value) => {
					this.plugin.settings.vm = value;
					await this.plugin.saveSettings();
				}));
	}
}
