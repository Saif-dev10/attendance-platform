/** Minimal RFC-4180-style CSV parser. Headers are normalised to snake_case lowercase. */
export function parseCsv(input) {
  const text = String(input).replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;

  const endRow = () => {
    row.push(cur);
    cur = "";
    if (row.some((x) => x.trim() !== "")) rows.push(row);
    row = [];
  };

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQuotes = false;
      } else cur += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(cur);
      cur = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      endRow();
    } else cur += c;
  }
  if (cur !== "" || row.length) endRow();

  if (!rows.length) return { headers: [], rows: [] };
  const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, "_"));
  const data = rows.slice(1).map((r) => Object.fromEntries(headers.map((h, j) => [h, (r[j] ?? "").trim()])));
  return { headers, rows: data };
}

export function buildCsv(headers, rows = []) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [headers.join(","), ...rows.map((r) => r.map(esc).join(","))].join("\n");
}

export function downloadText(filename, text, mime = "text/csv;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([text], { type: mime }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}