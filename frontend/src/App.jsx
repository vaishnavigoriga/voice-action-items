import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [copied, setCopied] = useState("");

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("audio/")) {
      alert("Please select an audio file.");
      return;
    }

    setFile(selectedFile);
    setResult(null);
  };

  const handleFileChange = (event) => {
    handleFile(event.target.files[0]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const processAudio = async () => {
    if (!file) {
      alert("Please select an audio file first.");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/process", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        throw new Error("Backend processing failed");
      }

      const data = await response.json();
      setResult(data);

    } catch (error) {
      console.error("Error:", error);
      alert(
        "Something went wrong while processing the audio. Check the backend terminal for the error."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyText = async (text, type) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);

    setTimeout(() => {
      setCopied("");
    }, 1500);
  };

  const clearAll = () => {
    setFile(null);
    setResult(null);
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">◉</span>
          Voice<span>Action</span>
        </div>

        <div className="header-badge">
          AI Powered
        </div>
      </header>


      {/* HERO */}
      <main className="main-container">

        <section className="hero">

          <div className="hero-badge">
            ✦ Smart Voice Processing
          </div>

          <h1>
            Turn your voice notes into
            <span> actionable tasks.</span>
          </h1>

          <p>
            Upload a voice note and let AI transform it into a clear
            transcript, concise summary, and organized action items.
          </p>

        </section>


        {/* UPLOAD AREA */}
        <section
          className={`upload-card ${dragging ? "dragging" : ""}`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >

          <div className="upload-icon">
            🎙️
          </div>

          <h2>
            {file ? "Audio selected" : "Drop your voice note here"}
          </h2>

          <p className="upload-description">
            {file
              ? "Your audio is ready to be processed."
              : "Drag and drop your audio file here, or browse your computer."}
          </p>

          <label className="browse-button">
            Choose Audio
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
            />
          </label>

          <p className="supported">
            Supports MP3, WAV, M4A and other audio formats
          </p>

          {file && (
            <div className="selected-file">

              <div className="file-icon">
                ♪
              </div>

              <div className="file-details">
                <strong>{file.name}</strong>
                <span>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>

              <button
                className="remove-file"
                onClick={clearAll}
              >
                ×
              </button>

            </div>
          )}

        </section>


        {/* PROCESS BUTTON */}
        <button
          className="process-button"
          onClick={processAudio}
          disabled={!file || loading}
        >

          {loading ? (
            <>
              <span className="spinner"></span>
              Processing your voice note...
            </>
          ) : (
            <>
              ✦ Process Voice Note
            </>
          )}

        </button>


        {/* PROCESSING STATUS */}
        {loading && (
          <div className="processing-card">

            <div className="processing-title">
              <span className="pulse"></span>
              AI is analyzing your voice note
            </div>

            <div className="processing-steps">

              <div className="processing-step active">
                <span>✓</span>
                Reading audio
              </div>

              <div className="processing-step active">
                <span>✓</span>
                Generating transcript
              </div>

              <div className="processing-step active">
                <span>✦</span>
                Extracting action items
              </div>

            </div>

          </div>
        )}


        {/* RESULTS */}
        {result && !loading && (

          <section className="results">

            <div className="results-header">

              <div>
                <div className="result-label">
                  ✦ AI ANALYSIS COMPLETE
                </div>

                <h2>Your voice note results</h2>
              </div>

              <button
                className="clear-button"
                onClick={clearAll}
              >
                New Note
              </button>

            </div>


            {/* TRANSCRIPT */}
            <div className="result-card">

              <div className="card-header">

                <div className="card-title">
                  <span className="card-icon">▤</span>
                  Transcript
                </div>

                <button
                  className="copy-button"
                  onClick={() =>
                    copyText(result.transcript, "transcript")
                  }
                >
                  {copied === "transcript" ? "Copied!" : "Copy"}
                </button>

              </div>

              <p className="transcript">
                {result.transcript}
              </p>

            </div>


            {/* SUMMARY */}
            <div className="result-card summary-card">

              <div className="card-header">

                <div className="card-title">
                  <span className="card-icon">✦</span>
                  AI Summary
                </div>

                <button
                  className="copy-button"
                  onClick={() =>
                    copyText(result.summary, "summary")
                  }
                >
                  {copied === "summary" ? "Copied!" : "Copy"}
                </button>

              </div>

              <p className="summary">
                {result.summary}
              </p>

            </div>


            {/* ACTION ITEMS */}
            <div className="action-section">

              <div className="action-heading">

                <div>
                  <div className="result-label">
                    ACTION PLAN
                  </div>

                  <h2>Action Items</h2>
                </div>

                <div className="task-count">
                  {result.action_items.length}{" "}
                  {result.action_items.length === 1
                    ? "task"
                    : "tasks"}
                </div>

              </div>


              {result.action_items.length === 0 ? (

                <div className="empty-tasks">
                  No actionable tasks were found in this voice note.
                </div>

              ) : (

                <div className="task-grid">

                  {result.action_items.map((item, index) => (

                    <div className="task-card" key={index}>

                      <div className="task-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="task-content">

                        <h3>
                          {item.task}
                        </h3>

                        {item.deadline && (
                          <div className="deadline">
                            ◷ {item.deadline}
                          </div>
                        )}

                      </div>

                      <div className="task-check">
                        ✓
                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </section>
        )}

      </main>


      {/* FOOTER */}
      <footer>
        <span>VoiceAction</span>
        <span>Built with React + FastAPI + Gemini</span>
      </footer>

    </div>
  );
}

export default App;