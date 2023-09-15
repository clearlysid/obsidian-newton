import { Notice, Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, SampleSettingTab, NewtonSettings } from './settings';

export default class Newton extends Plugin {
	settings: NewtonSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('apple', 'Newton', (evt: MouseEvent) => {
			new Notice('This is a notice!');
		});

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-sample-modal-simple',
			name: 'Open sample modal (simple)',
			callback: () => {
				console.log("open sample modal")
			}
		});

		// Adds a tab to Obsidian settings.
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// Registering intervals this way, automatically clears them when plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

