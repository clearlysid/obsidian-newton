import { Plugin } from 'obsidian';
import { DEFAULT_SETTINGS, NewtonSettings } from './settings';
import { getVoiceMemos, recordNewVoiceMemo } from './voicememos';
import * as reminders from "./reminders";
import { VIEW_TYPE_NEWTON } from "./constants";
import NewtonView from './ui/NewtonView';
import { NewtonSettingsTab } from './ui/SettingsTab';


export default class Newton extends Plugin {
	settings: NewtonSettings;

	async onload() {
		await this.loadSettings();

		this.registerView(
      VIEW_TYPE_NEWTON,
      (leaf) => new NewtonView(leaf)
    );
		
		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon('apple', 'Newton', (evt: MouseEvent) => {
			// getVoiceMemos();

			this.activateView();

			// reminders.getLists().then((lists) => {
			// 	console.log(lists)
			// });

			// recordNewVoiceMemo();
		});

		this.addCommand({
      id: "show-newton-view",
      name: "Open Newton",
      checkCallback: (checking: boolean) => {},
    });



		// Adds a tab to Obsidian settings.
		this.addSettingTab(new NewtonSettingsTab(this.app, this));



		// Registering intervals this way, automatically clears them when plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
	}

	onunload() {
		this.app.workspace
      .getLeavesOfType("newton")
      .forEach((leaf) => leaf.detach());
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateView() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_NEWTON);

    await this.app.workspace.getRightLeaf(false).setViewState({
      type: VIEW_TYPE_NEWTON,
      active: true,
    });

    this.app.workspace.revealLeaf(
      this.app.workspace.getLeavesOfType(VIEW_TYPE_NEWTON)[0]
    );
  }
}

