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
		const {containerEl, app} = this;

		containerEl.empty();

		new Setting(containerEl).setName("Voice Memos").setHeading();

		new Setting(containerEl)
			.setName('Sync from iCloud')
			.setDesc("Ensure that your voice memos are synced from iCloud.")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.vm)
				.onChange(async (value) => {
					this.plugin.settings.vm = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
				.setName("Transcription Location")
				.setDesc("Pick the folder to store your transcribed notes in.")
				.addDropdown(d => {

					// @ts-expect-error: extension is not a property of TFile. Need to filter for folders only
					const foldersInRoot = app.vault.getRoot().children.filter(c => !c.extension)
					const folderNames = foldersInRoot.map(f => f.name);

					d.addOptions({
						"": "None",
						...Object.fromEntries(folderNames.map(n => [n, n]))
					});
				})

		new Setting(containerEl).setName("Voice Memos").setHeading();
	}
}
