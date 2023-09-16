import { App, PluginSettingTab, Setting } from "obsidian";
import type Newton from "../main";

export class NewtonSettingsTab extends PluginSettingTab {
	plugin: Newton;

	constructor(app: App, plugin: Newton) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl, app} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Voice Memos")
			.setDesc("Sync your voice memos from iCloud and transcribe them into Obsidian notes.")
			.setHeading();

		new Setting(containerEl)
			.setName('Sync from iCloud')
			.setDesc("Ensure iCloud-sync for Voice Memos is enabled.")
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
