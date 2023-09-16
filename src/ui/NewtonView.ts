import { ItemView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_NEWTON } from "../constants";

export default class NewtonView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_NEWTON;
	}

	getDisplayText() {
		return "Newton view";
	}

	async onOpen() {
		const container = this.containerEl.children[1];
		container.empty();
		container.createEl("h4", { text: "Example view" });
	}

	async onClose() {
	}
}