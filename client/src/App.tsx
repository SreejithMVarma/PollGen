import React from "react";
import { useAudioRecorder } from "./hooks/useRecorder";
import "./App.css";

const App: React.FC = () => {
  const {
    startRecording,
    stopRecording,
    isRecording,
    transcripts,
  } = useAudioRecorder();

  return (
    <div style={{ padding: 20 }}>
      <h1>PollGen</h1>

      {!isRecording ? (
        <button onClick={startRecording}>Start Recording</button>
      ) : (
        <button onClick={stopRecording}>Stop Recording</button>
      )}

      <h3>Transcripts:</h3>
      <ul>
        {transcripts.map((t, i) => (
          <li key={i}>
            <pre>{JSON.stringify(t.transcript?.text || t, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
