import { useRef, useState } from "react";
import { sendAudioForTranscription } from "../api/transcribe";

export const useAudioRecorder = () => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcripts, setTranscripts] = useState<any[]>([]);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
    mediaRecorderRef.current = recorder;

    recorder.ondataavailable = async (e) => {
      const blob = e.data;
      setAudioBlob(blob); // Save blob for external use

      try {
        const json = await sendAudioForTranscription(blob);
        console.log("📝 Received transcription:", json);
        setTranscripts((prev) => [...prev, json]);
      } catch (err) {
        console.error("❌ Transcription request error:", err);
      }
    };

    recorder.start(300000); // 5 minutes
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const latestTranscript = transcripts.length > 0 ? transcripts[transcripts.length - 1] : null;

  return {
    startRecording,
    stopRecording,
    isRecording,
    transcripts,
    latestTranscript,
    audioBlob,
  };
};
