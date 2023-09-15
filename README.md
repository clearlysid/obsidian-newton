# Obsidian Newton Plugin

I use an Apple Watch and love the idea of relying on wearables to _ingest_ thoughts and ideas into my Obsidian Vault.

## Development Guide

1. Run `yarn dev` to watch, bundle and copy your plugin to the Example Obsidian Vault in the `test` folder.
2. Open the `test` folder in the Obsidian application as a vault and enable "Newton" plugin from the settings.

---

> Everything following this is from the official Obsidian Sample plugin guide. I will remove these once their relevance is gone.

## Releasing new releases

-   Update your `manifest.json` with your new version number, such as `1.0.1`, and the minimum Obsidian version required for your latest release.
-   Update your `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"` so older versions of Obsidian can download an older version of your plugin that's compatible.
-   Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix `v`. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
-   Upload the files `manifest.json`, `main.js`, `styles.css` as binary attachments. Note: The manifest.json file must be in two places, first the root path of your repository and also in the release.
-   Publish the release.

## API Documentation

See https://github.com/obsidianmd/obsidian-api
