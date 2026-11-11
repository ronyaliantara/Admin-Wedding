/* Excel (.xlsx) mini tanpa library — bisa jalan offline.
   - XLSX.build(sheets)  → Blob .xlsx   (sheets: [{ name, cols: [{ h, w, type }], rows: [[...]] }])
     type: "text" | "wrap" (isi panjang turun ke bawah) | "date" (YYYY-MM-DD) | "num"
   - XLSX.read(file)     → { namaSheet: [[baris], ...] }  (baca .xlsx dari Excel / Google Sheets / app ini) */
(function () {
  "use strict";
  const enc = new TextEncoder(), dec = new TextDecoder();

  /* ---------- ZIP (tanpa kompresi) ---------- */
  const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  const crc32 = b => { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; };
  function zip(files) {
    const parts = [], central = []; let off = 0;
    for (const f of files) {
      const nm = enc.encode(f.name), d = enc.encode(f.text), crc = crc32(d);
      const h = new DataView(new ArrayBuffer(30));
      h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true); h.setUint16(8, 0, true);
      h.setUint16(10, 0, true); h.setUint16(12, 0x21, true); h.setUint32(14, crc, true); h.setUint32(18, d.length, true);
      h.setUint32(22, d.length, true); h.setUint16(26, nm.length, true); h.setUint16(28, 0, true);
      parts.push(new Uint8Array(h.buffer), nm, d);
      const c = new DataView(new ArrayBuffer(46));
      c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true);
      c.setUint16(10, 0, true); c.setUint16(12, 0, true); c.setUint16(14, 0x21, true); c.setUint32(16, crc, true);
      c.setUint32(20, d.length, true); c.setUint32(24, d.length, true); c.setUint16(28, nm.length, true);
      c.setUint32(42, off, true);
      central.push(new Uint8Array(c.buffer), nm);
      off += 30 + nm.length + d.length;
    }
    const size = central.reduce((a, b) => a + b.length, 0), e = new DataView(new ArrayBuffer(22));
    e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true);
    e.setUint32(12, size, true); e.setUint32(16, off, true);
    return new Blob([...parts, ...central, new Uint8Array(e.buffer)], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  }

  /* ---------- tulis XLSX ---------- */
  const xe = s => String(s).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const colName = i => { let s = ""; i++; while (i) { const m = (i - 1) % 26; s = String.fromCharCode(65 + m) + s; i = Math.floor((i - 1) / 26); } return s; };
  const serial = ymd => { const [y, m, d] = String(ymd).split("-").map(Number); return (Date.UTC(y, m - 1, d) - Date.UTC(1899, 11, 30)) / 864e5; };
  // style: 1 judul kolom, 2 teks panjang (wrap), 3 tanggal, 4 angka, 5 teks biasa
  const STYLE = { wrap: 2, date: 3, num: 4, text: 5 };
  function sheetXml(sh) {
    const n = sh.rows.length + 1, last = colName(sh.cols.length - 1);
    const head = `<row r="1" ht="22" customHeight="1">${sh.cols.map((c, i) => `<c r="${colName(i)}1" t="inlineStr" s="1"><is><t>${xe(c.h)}</t></is></c>`).join("")}</row>`;
    const body = sh.rows.map((row, ri) => {
      const r = ri + 2;
      return `<row r="${r}">${sh.cols.map((c, ci) => {
        const v = row[ci], ref = colName(ci) + r;
        if (v === null || v === undefined || v === "") return "";
        if (c.type === "date" && /^\d{4}-\d{2}-\d{2}$/.test(v)) return `<c r="${ref}" s="3"><v>${serial(v)}</v></c>`;
        if (c.type === "num" && typeof v === "number" && isFinite(v)) return `<c r="${ref}" s="4"><v>${v}</v></c>`;
        return `<c r="${ref}" t="inlineStr" s="${STYLE[c.type] || 5}"><is><t xml:space="preserve">${xe(v)}</t></is></c>`;
      }).join("")}</row>`;
    }).join("");
    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews>${sh.noFreeze ? `<sheetView workbookViewId="0"/>` : `<sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView>`}</sheetViews><sheetFormatPr defaultRowHeight="16"/><cols>${sh.cols.map((c, i) => `<col min="${i + 1}" max="${i + 1}" width="${c.w || 14}" customWidth="1"/>`).join("")}</cols><sheetData>${head}${body}</sheetData>${sh.noFilter ? "" : `<autoFilter ref="A1:${last}${n}"/>`}</worksheet>`;
  }
  const STYLES = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<numFmts count="1"><numFmt numFmtId="164" formatCode="dd/mm/yyyy"/></numFmts>
<fonts count="2"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font></fonts>
<fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFB0832F"/><bgColor indexed="64"/></patternFill></fill></fills>
<borders count="2"><border><left/><right/><top/><bottom/><diagonal/></border><border><left style="thin"><color rgb="FFE3DBCC"/></left><right style="thin"><color rgb="FFE3DBCC"/></right><top style="thin"><color rgb="FFE3DBCC"/></top><bottom style="thin"><color rgb="FFE3DBCC"/></bottom><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="6">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
<xf numFmtId="164" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment horizontal="left" vertical="top"/></xf>
<xf numFmtId="3" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf>
<xf numFmtId="49" fontId="0" fillId="0" borderId="1" xfId="0" applyNumberFormat="1" applyBorder="1" applyAlignment="1"><alignment vertical="top"/></xf>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
  function build(sheets) {
    const files = [
      { name: "[Content_Types].xml", text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>${sheets.map((s, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("")}</Types>` },
      { name: "_rels/.rels", text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>` },
      { name: "xl/workbook.xml", text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView/></bookViews><sheets>${sheets.map((s, i) => `<sheet name="${xe(s.name.slice(0, 31))}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("")}</sheets>${sheets.some(s => !s.noFilter) ? `<definedNames>${sheets.map((s, i) => s.noFilter ? "" : `<definedName name="_xlnm._FilterDatabase" localSheetId="${i}" hidden="1">'${xe(s.name.slice(0, 31))}'!$A$1:$${colName(s.cols.length - 1)}$${s.rows.length + 1}</definedName>`).join("")}</definedNames>` : ""}</workbook>` },
      { name: "xl/_rels/workbook.xml.rels", text: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">${sheets.map((s, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("")}<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>` },
      { name: "xl/styles.xml", text: STYLES },
      ...sheets.map((s, i) => ({ name: `xl/worksheets/sheet${i + 1}.xml`, text: sheetXml(s) }))
    ];
    return zip(files);
  }

  /* ---------- baca XLSX ---------- */
  function unzip(buf) {
    const dv = new DataView(buf), u8 = new Uint8Array(buf);
    let e = buf.byteLength - 22; while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
    if (e < 0) throw new Error("Bukan file Excel (.xlsx).");
    const n = dv.getUint16(e + 10, true), out = {}; let p = dv.getUint32(e + 16, true);
    for (let i = 0; i < n; i++) {
      const method = dv.getUint16(p + 10, true), size = dv.getUint32(p + 20, true), nl = dv.getUint16(p + 28, true), xl = dv.getUint16(p + 30, true), cl = dv.getUint16(p + 32, true), lo = dv.getUint32(p + 42, true);
      const name = dec.decode(u8.subarray(p + 46, p + 46 + nl)); p += 46 + nl + xl + cl;
      const start = lo + 30 + dv.getUint16(lo + 26, true) + dv.getUint16(lo + 28, true);
      out[name.toLowerCase()] = { method, data: u8.subarray(start, start + size) };
    }
    return out;
  }
  async function inflate(f) {
    if (f.method === 0) return f.data;
    if (typeof DecompressionStream === "undefined") throw new Error("Browser ini belum bisa membaca Excel. Pakai Chrome / Safari versi terbaru.");
    const s = new Blob([f.data]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
    return new Uint8Array(await new Response(s).arrayBuffer());
  }
  const colIdx = s => [...s.toUpperCase()].reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0) - 1;
  const tags = (el, name) => [...el.getElementsByTagNameNS("*", name)];
  async function read(file) {
    const z = unzip(await file.arrayBuffer());
    const txt = async n => { const f = z[n.toLowerCase()]; return f ? dec.decode(await inflate(f)) : null; };
    const P = s => new DOMParser().parseFromString(s, "application/xml");
    const wbx = await txt("xl/workbook.xml"); if (!wbx) throw new Error("Bukan file Excel (.xlsx).");
    const wb = P(wbx), rels = P((await txt("xl/_rels/workbook.xml.rels")) || "<x/>");
    const relMap = {}; tags(rels, "Relationship").forEach(r => { relMap[r.getAttribute("Id")] = r.getAttribute("Target"); });
    const ssx = await txt("xl/sharedStrings.xml");
    const ss = ssx ? tags(P(ssx), "si").map(si => tags(si, "t").map(t => t.textContent).join("")) : [];
    const sheets = {};
    for (const sh of tags(wb, "sheet")) {
      const rid = sh.getAttribute("r:id") || sh.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id");
      let target = (relMap[rid] || "").replace(/^\//, "");
      if (!target.startsWith("xl/")) target = "xl/" + target;
      const x = await txt(target); if (!x) continue;
      const rows = [];
      for (const r of tags(P(x), "row")) {
        const ri = (+r.getAttribute("r") || rows.length + 1) - 1, arr = []; let ci = 0;
        for (const c of tags(r, "c")) {
          const ref = c.getAttribute("r"); if (ref) ci = colIdx(ref.replace(/\d+/g, ""));
          const t = c.getAttribute("t"), vEl = tags(c, "v")[0], vv = vEl ? vEl.textContent : undefined; let v;
          if (t === "s") v = ss[+vv] ?? "";
          else if (t === "inlineStr") v = tags(c, "t").map(x => x.textContent).join("");
          else if (t === "b") v = vv === "1";
          else if (t === "str" || t === "e") v = vv ?? "";
          else v = vv === undefined ? "" : (isNaN(+vv) ? vv : +vv);
          arr[ci++] = v;
        }
        rows[ri] = arr;
      }
      sheets[sh.getAttribute("name")] = rows;
    }
    return sheets;
  }
  /* angka tanggal Excel / teks 17/11/2026 / 2026-11-17 → "2026-11-17" */
  function toYmd(v) {
    if (v === null || v === undefined || v === "") return "";
    if (typeof v === "number" && v > 20000 && v < 80000) { const d = new Date(Date.UTC(1899, 11, 30) + Math.round(v) * 864e5); return d.toISOString().slice(0, 10); }
    const s = String(v).trim(); let m;
    if ((m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/))) return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
    if ((m = s.match(/^(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{4})$/))) return `${m[3]}-${m[2].padStart(2, "0")}-${m[1].padStart(2, "0")}`;
    return "";
  }
  window.XLSX = { build, read, toYmd };
})();
