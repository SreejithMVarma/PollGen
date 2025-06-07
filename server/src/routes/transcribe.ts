import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import logger from '../utils/logger';
import { runWhisper } from '../utils/whisperRunner';

const router = express.Router();

const upload = multer({
  dest: path.resolve(__dirname, '../../uploads/'),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max
});

router.post('/transcribe', upload.single('audio'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      logger.warn('No file uploaded');
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    logger.info(`File uploaded: ${req.file.filename}`);

    const uploadedFilePath = req.file.path;

    // Run whisper transcription (this creates the JSON in transcripts folder)
    await runWhisper(uploadedFilePath);

    // The transcript JSON filename is same as uploaded file basename + '.json'
    const baseName = path.parse(req.file.filename).name;
    const transcriptFilePath = path.resolve(__dirname, '../../transcripts', `${baseName}.json`);

    if (!fs.existsSync(transcriptFilePath)) {
      logger.error('Transcription file not found after whisper run.');
      res.status(500).json({ error: 'Transcription file not found after whisper run.' });
      return;
    }

    // Read transcript JSON
    const transcriptJson = JSON.parse(fs.readFileSync(transcriptFilePath, 'utf-8'));

    res.json({
      message: 'Transcription successful',
      transcript: transcriptJson,
      transcriptId: baseName,  // You can send this ID to fetch text/lang later
    });
  } catch (error: any) {
    logger.error(`Transcription failed: ${error.message}`);
    res.status(500).json({ error: 'Transcription failed', details: error.message });
  }
});

// GET endpoint to return only text and language by transcript ID
router.get('/transcript/:id', (req: Request, res: Response) => {
  const transcriptFile = path.resolve(__dirname, '../../transcripts', `${req.params.id}.json`);

  if (!fs.existsSync(transcriptFile)) {
    res.status(404).json({ error: 'Transcript not found' });
    return;
  }

  const transcriptJson = JSON.parse(fs.readFileSync(transcriptFile, 'utf-8'));
  const { text, language } = transcriptJson;

  res.json({ text, language });
});

export default router;
