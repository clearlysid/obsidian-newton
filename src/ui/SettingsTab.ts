import { App, PluginSettingTab, Setting, TFolder } from "obsidian";
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

					const rootFolders = app.vault.getRoot().children.filter(c => c instanceof TFolder);
					const folderNames = rootFolders.map(f => f.name);

					d.addOptions({
						"": "Disable Transcription",
						...Object.fromEntries(folderNames.map(n => [n, n]))
					});
				})

		new Setting(containerEl).setName("Reminders").setHeading();

		new Setting(containerEl)
			.setName('Sync from iCloud')
			.setDesc("Ensure iCloud-sync for Reminders is enabled.")
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.vm)
				.onChange(async (value) => {
					this.plugin.settings.vm = value;
					await this.plugin.saveSettings();
				}));
	}
}
