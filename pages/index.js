import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedExcuse, setSelectedExcuse] = useState(null);
  const resultRef = useRef(null);

  const excuses = [
    "Çünkü hayat kısa, bunu seçmelisin!",
    "Bugün tam zamanı!",
    "Çünkü canın çekiyor.",
    "En iyi seçim bu, kesinlikle!",
    "Diyet yarına, bugün keyif zamanı."
  ];

  const addOption = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setOptions((prev) => [...prev, trimmed]);
    setInput("");
    setResult(null);
  };

  const pickRandom = () => {
    if (options.length === 0) return;
    
    setIsSelecting(true);
    setResult(null);
    
    // Rastgele seçim animasyonu
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setSelectedFood(options[randomIndex]);
      setSelectedExcuse(excuses[Math.floor(Math.random() * excuses.length)]);
    }, 100);
    
    // 2 saniye sonra seçimi tamamla
    setTimeout(() => {
      clearInterval(interval);
      const finalChoice = options[Math.floor(Math.random() * options.length)];
      const finalExcuse = excuses[Math.floor(Math.random() * excuses.length)];
      setResult(`${finalChoice} — ${finalExcuse}`);
      setIsSelecting(false);
    }, 2000);
  };

  const clearOptions = () => {
    setOptions([]);
    setResult(null);
  };

  // Sonuç değiştiğinde ekranı kaydır
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [result]);

  return (
    <div style={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      padding: "24px 16px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Dekoratif öğeler */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "radial-gradient(#ffffff33 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        zIndex: 0
      }}></div>
      
      <div style={{
        position: "absolute",
        top: "10%",
        right: "5%",
        width: "80px",
        height: "80px",
        background: "#ff6b6b",
        borderRadius: "50%",
        filter: "blur(40px)",
        opacity: 0.4
      }}></div>
      
      <div style={{
        position: "absolute",
        bottom: "15%",
        left: "7%",
        width: "100px",
        height: "100px",
        background: "#4ecdc4",
        borderRadius: "50%",
        filter: "blur(50px)",
        opacity: 0.3
      }}></div>
      
      <div style={{
        position: "relative",
        zIndex: 1,
        maxWidth: "600px",
        width: "100%",
        background: "rgba(255, 255, 255, 0.92)",
        borderRadius: "24px",
        padding: "40px 30px",
        boxShadow: "0 15px 50px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.5)"
      }}>
        <div style={{ 
          textAlign: "center", 
          marginBottom: "32px",
          position: "relative"
        }}>
          <h1 style={{ 
            fontSize: "42px", 
            fontWeight: 800, 
            marginBottom: "8px", 
            color: "#ff6b6b",
            background: "linear-gradient(45deg, #ff6b6b, #ff8e53)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            🍽️ Bugün Ne Yiyeceğiz?
          </h1>
          <p style={{ 
            fontSize: "18px", 
            color: "#666", 
            maxWidth: "500px", 
            margin: "0 auto",
            lineHeight: 1.5
          }}>
            Yemek seçiminde kararsız mı kaldın? Seçeneklerini ekle, rastgele seçim yap ve lezzetli bir yemeğe başla!
          </p>
        </div>

        <div style={{ 
          display: "flex", 
          gap: "12px", 
          marginBottom: "30px", 
          maxWidth: "500px", 
          width: "100%",
          margin: "0 auto 30px"
        }}>
          <div style={{ flexGrow: 1, position: "relative" }}>
            <input
              type="text"
              placeholder="Pizza, hamburger, salata..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addOption()}
              style={{
                width: "100%",
                padding: "16px 52px 16px 20px",
                borderRadius: "16px",
                border: "2px solid #e9ecef",
                fontSize: "16px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                transition: "all 0.3s ease",
                outline: "none"
              }}
              className="input-focus"
            />
            <button
              onClick={addOption}
              style={{
                position: "absolute",
                right: "8px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "linear-gradient(45deg, #4ecdc4, #1a936f)",
                color: "#fff",
                border: "none",
                borderRadius: "12px",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "20px",
                boxShadow: "0 4px 10px rgba(78, 205, 196, 0.3)",
                transition: "all 0.2s ease"
              }}
              className="button-hover"
            >
              +
            </button>
          </div>
        </div>

        <div style={{ 
          display: "flex", 
          gap: "16px", 
          marginBottom: "30px", 
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
          <button
            onClick={pickRandom}
            disabled={isSelecting || options.length === 0}
            style={{
              background: "linear-gradient(45deg, #ff6b6b, #ff8e53)",
              color: "#fff",
              border: "none",
              borderRadius: "16px",
              padding: "16px 40px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "18px",
              boxShadow: "0 6px 15px rgba(255, 107, 107, 0.4)",
              transition: "all 0.2s ease",
              minWidth: "160px",
              opacity: (isSelecting || options.length === 0) ? 0.7 : 1
            }}
            className="button-hover"
          >
            {isSelecting ? "Seçiliyor..." : "RASTGELE SEÇ"}
          </button>
          
          <button
            onClick={clearOptions}
            disabled={options.length === 0}
            style={{
              background: "linear-gradient(45deg, #6a11cb, #2575fc)",
              color: "#fff",
              border: "none",
              borderRadius: "16px",
              padding: "16px 40px",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: "18px",
              boxShadow: "0 6px 15px rgba(106, 17, 203, 0.4)",
              transition: "all 0.2s ease",
              minWidth: "160px",
              opacity: options.length === 0 ? 0.7 : 1
            }}
            className="button-hover"
          >
            LİSTEYİ TEMİZLE
          </button>
        </div>

        {(isSelecting || result) && (
          <div 
            ref={resultRef}
            style={{
              backgroundColor: "#fff",
              padding: "28px",
              borderRadius: "20px",
              margin: "0 auto 30px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "22px",
              color: "#ff6b6b",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
              border: "2px dashed #ffd8d8",
              maxWidth: "500px",
              transition: "all 0.5s ease",
              transform: "translateY(0)",
              opacity: 1
            }}
          >
            {isSelecting ? (
              <div>
                <div style={{ marginBottom: "20px", fontSize: "24px", color: "#4ecdc4" }}>
                  🍕 {selectedFood} 🍔
                </div>
                <div style={{ 
                  height: "8px", 
                  background: "#e9ecef", 
                  borderRadius: "10px", 
                  overflow: "hidden",
                  maxWidth: "300px",
                  margin: "0 auto"
                }}>
                  <div style={{ 
                    height: "100%", 
                    width: "70%", 
                    background: "linear-gradient(90deg, #4ecdc4, #1a936f)",
                    borderRadius: "10px",
                    animation: "loading 1.5s infinite ease-in-out"
                  }}></div>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ 
                  fontSize: "32px", 
                  fontWeight: 800, 
                  marginBottom: "10px",
                  background: "linear-gradient(45deg, #ff6b6b, #ff8e53)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  {result.split(" — ")[0]}
                </div>
                <div style={{ 
                  fontSize: "20px", 
                  color: "#495057",
                  lineHeight: 1.5,
                  marginTop: "16px"
                }}>
                  {result.split(" — ")[1]}
                </div>
                <div style={{ 
                  marginTop: "24px", 
                  fontSize: "60px",
                  animation: "bounce 1s infinite"
                }}>
                  🎉
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ 
          maxWidth: "500px", 
          width: "100%",
          margin: "0 auto",
          backgroundColor: "#f8f9fa",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "space-between", 
            marginBottom: "20px"
          }}>
            <h2 style={{ 
              fontWeight: 700, 
              fontSize: "22px", 
              color: "#495057",
              display: "flex",
              alignItems: "center",
              gap: "10px"
            }}>
              <span style={{ 
                background: "#ff6b6b", 
                color: "white", 
                width: "30px", 
                height: "30px", 
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px"
              }}>
                {options.length}
              </span>
              Seçenek Listesi
            </h2>
            
            {options.length > 0 && (
              <button 
                onClick={clearOptions}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6c757d",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: 600,
                  fontSize: "14px",
                  transition: "all 0.2s ease"
                }}
                className="button-hover"
              >
                <span>Listeyi Temizle</span>
                <span>🗑️</span>
              </button>
            )}
          </div>
          
          {options.length === 0 ? (
            <div style={{ 
              textAlign: "center", 
              padding: "30px 20px",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              borderRadius: "16px",
              border: "2px dashed #e9ecef"
            }}>
              <div style={{ fontSize: "80px", marginBottom: "20px", opacity: 0.3 }}>🍽️</div>
              <p style={{ 
                fontSize: "18px", 
                color: "#6c757d", 
                margin: 0,
                lineHeight: 1.6
              }}>
                Henüz bir seçenek eklemedin. <br/>
                Üstteki alana yemek seçeneklerini yaz ve Ekle butonuna bas!
              </p>
            </div>
          ) : (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", 
              gap: "12px",
              maxHeight: "300px",
              overflowY: "auto",
              padding: "10px"
            }}>
              {options.map((opt, idx) => (
                <div 
                  key={idx} 
                  style={{
                    backgroundColor: "#fff",
                    padding: "14px 12px",
                    borderRadius: "14px",
                    textAlign: "center",
                    fontWeight: 600,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
                    border: "1px solid #e9ecef",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                  className="button-hover"
                  onClick={() => {
                    setResult(`${opt} — ${excuses[Math.floor(Math.random() * excuses.length)]}`);
                    if (resultRef.current) {
                      resultRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "4px",
                    background: "linear-gradient(90deg, #ff6b6b, #ff8e53)"
                  }}></div>
                  <div style={{ 
                    fontSize: "40px", 
                    marginBottom: "10px",
                    lineHeight: 1
                  }}>
                    {opt.includes("pizza") ? "🍕" : 
                     opt.includes("hamburger") ? "🍔" : 
                     opt.includes("döner") ? "🌯" : 
                     opt.includes("salata") ? "🥗" : 
                     opt.includes("makarna") ? "🍝" : 
                     opt.includes("kahve") ? "☕" : 
                     opt.includes("tatlı") ? "🍰" : "🍽️"}
                  </div>
                  <div style={{ 
                    fontSize: "16px", 
                    color: "#495057",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}>
                    {opt}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <style jsx global>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        .button-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }
        
        .button-hover:active {
          transform: translateY(1px);
        }
        
        .input-focus:focus {
          border-color: #ff6b6b !important;
          box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2) !important;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #ff6b6b, #ff8e53);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #ff5252, #ff7b38);
        }
      `}</style>
    </div>
  );
}