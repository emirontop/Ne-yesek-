import { useState } from "react";

export default function Home() {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const excuses = [
    "Çünkü hayat kısa, bunu seçmelisin!",
    "Bugün tam zamanı!",
    "Çünkü canın çekiyor.",
    "En iyi seçim bu, kesinlikle!",
    "Diyet yarına, bugün keyif zamanı."
  ];

  const addOption = () => {
    const trimmed = input.trim();
    if (!trimmed) return alert("Lütfen bir seçenek yaz!");
    setOptions((prev) => [...prev, trimmed]);
    setInput("");
    setResult(null);
  };

  const pickRandom = () => {
    if (options.length === 0) return alert("Lütfen önce en az 1 seçenek ekle!");
    const choice = options[Math.floor(Math.random() * options.length)];
    const excuse = excuses[Math.floor(Math.random() * excuses.length)];
    setResult(`${choice} — ${excuse}`);
  };

  const clearOptions = () => {
    setOptions([]);
    setResult(null);
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(180deg, #FBBF24 0%, #F97316 100%)", 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: 24,
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: 36, fontWeight: "bold", marginBottom: 24, color: "#000" }}>
        🍽️ Bugün Ne Yiyeceğiz?
      </h1>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, maxWidth: 400, width: "100%" }}>
        <input
          type="text"
          placeholder="Yemek seçeneği ekle..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addOption()}
          style={{
            flexGrow: 1,
            padding: 12,
            borderRadius: 6,
            border: "1px solid #999",
            fontSize: 16
          }}
        />
        <button
          onClick={addOption}
          style={{
            backgroundColor: "#16A34A",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 20px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Ekle
        </button>
      </div>

      <div style={{ marginBottom: 24, display: "flex", gap: 16 }}>
        <button
          onClick={pickRandom}
          style={{
            backgroundColor: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 30px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Seç
        </button>
        <button
          onClick={clearOptions}
          style={{
            backgroundColor: "#DC2626",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "12px 30px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Temizle
        </button>
      </div>

      {result && (
        <div style={{
          backgroundColor: "#fff",
          padding: 24,
          borderRadius: 10,
          maxWidth: 400,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: 20,
          color: "#C2410C",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
        }}>
          {result}
        </div>
      )}

      <div style={{ marginTop: 32, maxWidth: 400, width: "100%" }}>
        <h2 style={{ fontWeight: "bold", fontSize: 22, marginBottom: 8, color: "#000" }}>
          Eklenen Seçenekler:
        </h2>
        {options.length === 0 ? (
          <p style={{ fontStyle: "italic", color: "#444" }}>
            Henüz seçenek yok, ekleyin!
          </p>
        ) : (
          <ul style={{ paddingLeft: 20, color: "#000" }}>
            {options.map((opt, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>{opt}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
    }
