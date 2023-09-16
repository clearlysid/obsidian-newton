# Reminders API Notes

This is a stripped-down "fork" of [node-reminders](https://github.com/caroso1222/node-reminders/) by [Carlos Roso](https://github.com/caroso1222).

Why is a fork needed?

The original package references the JXA files using their `path`. This prevents it from being used in an Obsidian plugin environment where all external dependencies must be inlined in a single `main.js` file.

To get around this issue, I've made some tweaks to how the JXA scripts were being loaded and I use my `esbuild` config to inline them as text files.

The resulting API is identical to the one Carlos created, just with zero external file references and dependencies.
