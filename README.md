# 🎙️ PollGen — Real Time AI Poll Generation for meetings

PollGen is a real-time audio transcription tool powered by OpenAI Whisper. It allows hosts (e.g., teachers) to record their voice during meetings or classes, transcribe the audio into text, and eventually (in upcoming features) generate interactive polls based on that transcript. It uses a MERN stack enhanced with TypeScript, React Query, and Whisper (via Python).

---

## 🚀 Features

- 🎧 Audio recording (WebM)
- 📝 Real-time transcription using Whisper (local)
- 📦 Modular MERN + TS architecture
- 📄 Transcript preview and endpoint access
- 🌐 Clean, cross-platform startup script (Windows/Linux/Mac)
- 📊 Future-ready for LLM-based MCQ generation

---

## 📁 Project Structure
```
PollGen/
├── client/             # React + TypeScript frontend (Vite)
└── server/             # Express + TypeScript backend
    ├── uploads/        # Temporary uploaded audio files
    ├── transcripts/    # JSON output from Whisper
    └── whisper_env/    # Python venv for Whisper + Torch
```

## 🚀 Project Setup Instructions

Follow the steps below to run both the server and client for the project:

### 📌 Prerequisites
Ensure the following tools are installed:

- Node.js (v18+ recommended)
- Python (v3.8+)
- FFmpeg (ensure it’s added to your system PATH)
- Git
---
### 📥 Clone the Repository

```bash
git clone https://github.com/SreejithMVarma/PollGen
cd PollGen
```

### 🖥️ Server Setup (`/server`)

1. **Navigate to the server directory:**

   ```bash
   cd server
   ```

2. **Create Python virtual environment (if not exists):**

   ```bash
   python -m venv whisper_env
   ```

3. **Activate the virtual environment:**

   * **Windows:**

     ```bash
     whisper_env\Scripts\activate
     ```

   * **Linux / macOS:**

     ```bash
     source whisper_env/bin/activate
     ```

4. **Install Python dependencies:**

   * Install [OpenAI Whisper](https://github.com/openai/whisper):

     ```bash
     pip install git+https://github.com/openai/whisper.git
     ```

   * Install additional required packages:

     ```bash
     pip install torch soundfile
     ```

   * ⚠️ **Make sure `ffmpeg` is installed** and available in system PATH.

5. **(Optional)** If `requirements.txt` exists, install from it:

   ```bash
   pip install -r requirements.txt
   ```

6. **Install Node.js dependencies and start server:**

   ```bash
   npm install
   npm run dev
   ```

---

### 🌐 Client Setup (`/client`)

1. **Open a new terminal and navigate to the client directory:**

   ```bash
   cd client
   ```

2. **Install Node.js dependencies and start client:**

   ```bash
   npm install
   npm run dev
   ```

---

### ✅ You're Done!

The server and client will now run concurrently in separate terminals.

## ✅ Verify Setup

1. Visit `http://localhost:5173` (client)
2. Start recording → Wait for Whisper → See transcript.
3. Visit `http://localhost:5000/api/transcript/<file_id>` to view extracted fields (like `text`, `language`).

---

## 🧼 Clean Git Repos

Ensure proper `.gitignore` exists for both `/client` and `/server` to avoid committing:

* `node_modules`, `dist`, `uploads`, `transcripts`, `.env`, logs
* Python venv (`whisper_env`) and cache files

---

## 🧩 Planned Features

- [x] 🎙️ Whisper (base) model integration for audio transcription
- [x] 📁 Server-side transcript storage and retrieval API
- [x] 🎥 Real-time audio recording and upload from client
- [ ] ⚡ Unified script to auto-setup server + client on Windows/Mac/Linux
- [ ] 🎯 Whisper model switch (base → higher models)
- [ ] 🤖 LLM-based poll generation
- [ ] 📊 Dashboard for host/admin roles
- [ ] 📊 MCQ dashboard for student roles
- [ ] 📊 Poll Result calculation and statistics
- [ ] 🔒 Auth (JWT or session-based login)
- [ ] 🧪 Unit tests & test coverage

---


