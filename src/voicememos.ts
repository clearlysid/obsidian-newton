import os from "os";
import fs from "fs";
import path from "path";
import { parseFile } from 'music-metadata';
import { exec } from "child_process";

export const getVoiceMemos = () => {
	const vmPath = path.resolve(os.homedir(), 'Library/Application Support/com.apple.voicememos/Recordings')

			// TODO: Handle case where no vm found

			// loop through files in voicememosPath
			fs.readdirSync(vmPath).forEach(file => {

				if (file.contains(".m4a")) {
					// parse metadata
					parseFile(path.resolve(vmPath, file)).then(metadata => {
						console.log(metadata.common.title)

						const title = metadata?.common?.title ?? "";
					}).catch(err => {
						console.error(err.message);
					});
				}
				
			});
}

export const recordNewVoiceMemo = () => {
	const script = `
		tell application "System Events"
				if not (exists process "Voice Memos") then
						tell application "Voice Memos" to activate
						delay 1
				end if
		end tell
	`

	exec(`osascript -e '${script}'`);
}
