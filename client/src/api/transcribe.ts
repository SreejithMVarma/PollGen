const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function sendAudioForTranscription(audioBlob: Blob) {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");

  const response = await fetch(`${BASE_URL}/api/transcribe`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.details || "Transcription failed");
  }

  return await response.json();
}
