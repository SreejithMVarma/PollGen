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
     whisper_env/Scripts/activate
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
# FFmpeg Installation Guide

FFmpeg is a critical dependency for the audio transcription feature powered by OpenAI Whisper. Please follow the instructions below to install FFmpeg on your operating system and ensure it's available in your system's PATH.

## 1. Linux (Ubuntu/Debian-based)

This is the recommended method for your Ubuntu Server VM.

1.  **Update Package Lists:**
    Open a terminal and update your system's package lists to ensure you get the latest information about available software.
    ```bash
    sudo apt update
    ```

2.  **Install FFmpeg:**
    Install the `ffmpeg` package using `apt`. This will automatically place the executable in a location already included in your system's PATH.
    ```bash
    sudo apt install ffmpeg
    ```
    When prompted, type `Y` and press Enter to confirm the installation.

3.  **Verify Installation:**
    After the installation completes, verify that FFmpeg is installed and accessible by checking its version.
    ```bash
    ffmpeg -version
    ```
    You should see output detailing the FFmpeg version and build information.

## 2. Windows

This section is for developers running the project directly on a Windows machine.

1.  **Download FFmpeg:**
    * Go to the official FFmpeg download page: [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
    * Click on the **Windows** icon.
    * Under "Windows builds", click on one of the recommended build providers (e.g., "Gyan's Builds" or "BtbN").
    * Download the latest "full" or "essentials" build (it will be a `.zip` file).

2.  **Extract FFmpeg:**
    * Create a new, easily accessible folder on your `C:` drive, for example: `C:\ffmpeg`.
    * Extract the contents of the downloaded `.zip` file into this new folder. You'll typically find a subfolder (e.g., `ffmpeg-N-xxxx-gxxxxx-win64-gpl`) which contains a `bin` folder. The `ffmpeg.exe` executable is inside this `bin` folder.
    * The full path to the `bin` folder might look something like: `C:\ffmpeg\ffmpeg-N-xxxx-gxxxxx-win64-gpl\bin` (the exact name will vary by version).

3.  **Add to System PATH:**
    This step ensures you can run `ffmpeg` commands from any directory in Command Prompt or PowerShell.

    * Search for "environment variables" in the Windows search bar and select "Edit the system environment variables".
    * In the "System Properties" window, click the "Environment Variables..." button.
    * Under the "System variables" section, find and select the `Path` variable, then click "Edit...".
    * In the "Edit environment variable" window, click "New" and paste the full path to the `bin` folder you extracted in the previous step (e.g., `C:\ffmpeg\ffmpeg-N-xxxx-gxxxxx-win64-gpl\bin`).
    * Click "OK" on all open windows to save the changes.

4.  **Verify Installation:**
    * **Close and re-open any existing Command Prompt or PowerShell windows.**
    * Open a **new** Command Prompt or PowerShell window.
    * Type:
        ```bash
        ffmpeg -version
        ```
    * You should see the FFmpeg version information. If not, double-check your PATH settings.

## 3. macOS

This section is for developers working on macOS, either natively or in a VM (if applicable).

1.  **Install Homebrew (if not already installed):**
    Homebrew is the most popular package manager for macOS and simplifies software installation. If you don't have it, open Terminal and run:
    ```bash
    /bin/bash -c "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh](https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh))"
    ```
    Follow the on-screen prompts, which may include installing Xcode Command Line Tools.

2.  **Install FFmpeg:**
    Once Homebrew is installed, you can easily install FFmpeg using a single command:
    ```bash
    brew install ffmpeg
    ```
    Homebrew will handle all dependencies and place `ffmpeg` in a location (`/usr/local/bin` or `/opt/homebrew/bin` for Apple Silicon) that is already part of your system's PATH.

3.  **Verify Installation:**
    After the installation completes, verify that FFmpeg is installed and accessible:
    ```bash
    ffmpeg -version
    ```
    You should see output confirming the FFmpeg version and build details.

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
- [ ] Chunking Strategy
- [ ] Higher model integration
- [ ] Compatibility testing

---


