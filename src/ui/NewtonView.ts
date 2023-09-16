import { ItemView, WorkspaceLeaf } from "obsidian";
import { VIEW_TYPE_NEWTON } from "../constants";
import * as reminders from "../reminders";
import VanillaCalendar from '@uvarov.frontend/vanilla-calendar';

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

		container.createDiv().id = "calendar";

		const calendar = new VanillaCalendar('#calendar');
		calendar.init();

		container.createEl("button", { text: "Fetch Reminders"}).onClickEvent((evt) => {
			reminders.getLists().then((lists) => {
				lists.forEach(({ id, name  }) => {
					container.createEl("h5", { text: name });

					reminders.getReminders(id).then((reminders) => {
						reminders.filter(reminder => !reminder.completed).forEach((reminder) => {
							container.createEl("p", { text: reminder.name });
						})
					});
				})
			});
			
		})		
	}

	async onClose() {
	}
}