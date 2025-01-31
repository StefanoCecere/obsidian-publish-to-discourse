import { PluginSettingTab, Setting, App } from 'obsidian';
import DiscourseSyncPlugin from './main';

export interface DiscourseSyncSettings {
	baseUrl: string;
	apiKey: string;
	disUser: string;
	category: number;
	selectedTags: string[];
}

export const DEFAULT_SETTINGS: DiscourseSyncSettings = {
	baseUrl: "https://yourforum.example.com",
	apiKey: "apikey",
	disUser: "DiscourseUsername",
	category: 1,
	selectedTags: []
};

export class DiscourseSyncSettingsTab extends PluginSettingTab {
	plugin: DiscourseSyncPlugin;
	constructor(app: App, plugin: DiscourseSyncPlugin) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName("Forum / 论坛地址")
			.setDesc("Discourse URL / 论坛的网址 URL")
			.addText((text) =>
				text
					.setPlaceholder("https://forum.example.com")
					.setValue(this.plugin.settings.baseUrl)
					.onChange(async (value) => {
						this.plugin.settings.baseUrl = value;
						await this.plugin.saveSettings();
					})
		);

		new Setting(containerEl)
			.setName("API Keys / API 密钥")
			.setDesc("在'/admin/api/keys'中创建的 API 密钥")
			.addText((text) =>
				text
					.setPlaceholder("api_key")
					.setValue(this.plugin.settings.apiKey)
					.onChange(async (value) => {
						this.plugin.settings.apiKey = value;
						await this.plugin.saveSettings();
					})
		);

		new Setting(containerEl)
			.setName("Username / 用户名")
			.setDesc("Discourse Username / 用户名")
			.addText((text) =>
				text
					.setPlaceholder("username")
					.setValue(this.plugin.settings.disUser)
					.onChange(async (value) => {
						this.plugin.settings.disUser = value;
						await this.plugin.saveSettings();
					}),
		);
	}
}
