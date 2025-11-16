import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const PORT = process.env.PORT || 8787;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

let model;
if (GEMINI_API_KEY) {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  let envModel = process.env.GEMINI_MODEL || "gemini-pro-latest";
  // Backward-compatibility: remap newer/older aliases to supported names visible in /v1beta/models
  if (
    envModel === "gemini-1.5-flash" ||
    envModel === "gemini-1.5-flash-latest" ||
    envModel === "gemini-1.0-pro" ||
    envModel === "gemini-1.0-pro-latest"
  ) {
    envModel = "gemini-pro-latest";
  }
  model = genAI.getGenerativeModel({ model: envModel });
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, gemini: Boolean(GEMINI_API_KEY) });
});

app.get("/api/models", async (_req, res) => {
  try {
    if (!GEMINI_API_KEY) return res.status(503).json({ error: "Gemini not configured" });
    const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models", {
      headers: { "x-goog-api-key": GEMINI_API_KEY },
    });
    const j = await r.json();
    return res.json(j);
  } catch (e) {
    console.error("/api/models error", e);
    return res.status(500).json({ error: "List models failed", message: e?.message || String(e) });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { query, context } = req.body || {};
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Invalid 'query'" });
    }

    if (!model) {
      return res.status(503).json({ error: "Gemini not configured on server" });
    }

    const system = `Anda adalah asisten belanja untuk platform UMKM Laris Manis.
  Aturan ketat:
  - HANYA gunakan data yang diberikan pada KONTEKS sebagai sumber kebenaran.
  - Jangan mengarang produk/merk/harga yang tidak ada di KONTEKS.
  - Jawab singkat dalam bahasa Indonesia (1-2 kalimat ringkas), sebagai pengantar.
  - Jangan mencetak ulang semua detail; daftar produk akan dirender oleh klien.
  - Jika tidak ada yang relevan, katakan ringkas bahwa tidak ditemukan di katalog.`;
    const contextText = context ? `\nKONTEKS:\n${JSON.stringify(context).slice(0, 6000)}` : "";
    const prompt = `${system}\n\nPERTANYAAN PENGGUNA:\n${query}${contextText}`;

    const result = await model.generateContent(prompt);
    const text = result && result.response && typeof result.response.text === "function" ? result.response.text() : "";
    return res.json({ text });
  } catch (e) {
    // Improve diagnostics for easier debugging
    const errPayload = {
      error: "Chat failed",
      message: e?.message || String(e),
      name: e?.name,
      status: e?.status,
    };
    try {
      // Some SDK errors include response JSON
      if (e?.response) {
        errPayload.sdk = {
          hasResponse: true,
          // Avoid dumping huge payloads
          responseKeys: Object.keys(e.response || {}),
        };
      }
    } catch (_) {}
    console.error("/api/chat error", errPayload);
    return res.status(500).json(errPayload);
  }
});

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
});
