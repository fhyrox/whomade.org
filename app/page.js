import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const findInventor = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() === "") {
      setResult("");
      return;
    }
    const res = await fetch(`/api/inventions?name=${e.target.value.toLowerCase()}`);
    const data = await res.json();
    setResult(data.inventor || "Böyle bir icat bulunamadı.");
  };

  return (
    <div style={{ textAlign: "center", margin: "50px", fontFamily: "Poppins, sans-serif", backgroundColor: "#f5f5f5", height: "100vh" }}>
      <h1>WhoInvented</h1>
      <input
        type="text"
        placeholder="Bir icat girin..."
        value={query}
        onChange={findInventor}
        style={{
          padding: "12px",
          width: "320px",
          fontSize: "18px",
          border: "none",
          borderRadius: "25px",
          outline: "none",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      />
      <div
        style={{
          marginTop: "20px",
          fontSize: "20px",
          fontWeight: "bold",
          background: "#ffffff",
          padding: "15px",
          borderRadius: "15px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
          display: "inline-block",
        }}
      >
        {result}
      </div>
    </div>
  );
}
