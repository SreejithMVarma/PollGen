import { execFile } from 'child_process';
import path from 'path';

export function runWhisper(filePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Path to your python.exe inside whisper_env virtual environment
    const pythonExe = path.resolve(__dirname, '../../whisper_env/Scripts/python.exe');

    const whisperArgs = [
      '-m', 'whisper',
      filePath,
      '--model', 'base',
      '--language', 'English',
      '--output_format', 'json',
      '--output_dir', path.resolve(__dirname, '../../transcripts'),
    ];

    execFile(pythonExe, whisperArgs, { windowsHide: true }, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      if (stderr) {
        console.warn(stderr);
      }
      resolve();
    });
  });
}
