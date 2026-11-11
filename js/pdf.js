/* PDF mini tanpa library (jalan offline). Huruf Helvetica bawaan PDF, ukuran A4, koordinat dari kiri-atas (satuan pt).
   const d = PDF.create(); d.text(x, y, "teks", { size, bold, italic, color:[r,g,b], align:"left|right|center" });
   d.rect / d.rrect (kotak sudut bulat) / d.line / d.link / d.addJpeg(bytes) + d.image(x, y, w, h, img, { circle }) / d.addPage() / d.blob() */
(function () {
  "use strict";
  // lebar huruf Helvetica (1/1000 em) untuk karakter 32..126
  const W = [278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278, 278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584, 584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556, 833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278, 278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222, 500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500, 500, 334, 260, 334, 584];
  const WIN = { "€": 0x80, "‚": 0x82, "„": 0x84, "…": 0x85, "‘": 0x91, "’": 0x92, "“": 0x93, "”": 0x94, "•": 0x95, "–": 0x96, "—": 0x97, "™": 0x99 };
  // ubah teks ke huruf yang didukung Helvetica (WinAnsi); emoji & huruf lain dibuang
  const clean = s => String(s ?? "").replace(/\r/g, "").replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, "").replace(/[^\x20-\x7E\xA0-\xFF\n€‚„…‘’“”•–—™]/g, "");
  const enc = s => [...clean(s)].map(ch => { const c = WIN[ch] ?? ch.charCodeAt(0); const b = String.fromCharCode(c); return b === "(" || b === ")" || b === "\\" ? "\\" + b : b; }).join("");
  const cw = (ch, bold) => { const c = ch.charCodeAt(0); const w = c >= 32 && c <= 126 ? W[c - 32] : (WIN[ch] === 0x95 ? 350 : WIN[ch] === 0x97 ? 1000 : WIN[ch] === 0x96 ? 556 : 556); return bold ? w * 1.06 : w; };
  const width = (s, size, bold, spacing = 0) => { const t = [...clean(s)]; return t.reduce((a, ch) => a + cw(ch, bold), 0) * size / 1000 + spacing * Math.max(0, t.length - 1); };
  function fit(s, size, bold, maxW) { s = clean(s).replace(/\n/g, " "); if (width(s, size, bold) <= maxW) return s; while (s && width(s + "…", size, bold) > maxW) s = s.slice(0, -1); return s.trimEnd() + "…"; }
  function wrap(s, size, bold, maxW) {
    const out = [];
    clean(s).split("\n").forEach(par => {
      let line = "";
      par.split(/(\s+)/).forEach(tok => {
        if (!tok) return;
        const test = line + tok;
        if (width(test, size, bold) <= maxW || !line.trim()) {
          if (width(test, size, bold) > maxW && !line.trim()) { // satu kata kepanjangan (mis. link): potong paksa
            let part = ""; for (const ch of tok) { if (width(part + ch, size, bold) > maxW) { out.push(part); part = ""; } part += ch; } line = part;
          } else line = test;
        } else { out.push(line.trimEnd()); line = tok.trimStart(); }
      });
      out.push(line.trimEnd());
    });
    return out;
  }
  // ukuran & jenis warna JPEG
  function jpegInfo(b) {
    let i = 2;
    while (i < b.length) {
      if (b[i] !== 0xFF) { i++; continue; }
      const m = b[i + 1], len = (b[i + 2] << 8) | b[i + 3];
      if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) return { h: (b[i + 5] << 8) | b[i + 6], w: (b[i + 7] << 8) | b[i + 8], comp: b[i + 9] };
      i += 2 + len;
    }
    return null;
  }
  const col = c => (c || [0, 0, 0]).map(v => (v / 255).toFixed(3)).join(" ");
  const f2 = v => v.toFixed(2);
  function create() {
    const PW = 595.28, PH = 841.89, pages = [], images = [];
    const Y = y => PH - y;
    const d = { PW, PH, page: null, width, wrap, fit,
      addPage() { d.page = { ops: [], links: [] }; pages.push(d.page); return d.page; },
      text(x, y, s, o = {}) {
        const size = o.size || 10, font = o.bold ? "F2" : o.italic ? "F3" : "F1", sp = o.spacing || 0;
        const w = width(s, size, o.bold, sp); const xx = o.align === "right" ? x - w : o.align === "center" ? x - w / 2 : x;
        d.page.ops.push(`BT /${font} ${size} Tf ${sp ? sp + " Tc " : ""}${col(o.color)} rg ${f2(xx)} ${f2(Y(y) - size * 0.8)} Td (${enc(s)}) Tj ${sp ? "0 Tc " : ""}ET`);
        return w;
      },
      rect(x, y, w, h, fill, stroke, lw = 0.6) {
        const p = `${f2(x)} ${f2(Y(y) - h)} ${f2(w)} ${f2(h)} re`;
        d.page.ops.push(fill && stroke ? `${col(fill)} rg ${col(stroke)} RG ${lw} w ${p} B` : fill ? `${col(fill)} rg ${p} f` : `${col(stroke)} RG ${lw} w ${p} S`);
      },
      rrect(x, y, w, h, r, fill, stroke, lw = 0.6) {
        const k = 0.5523 * r, x0 = x, x1 = x + w, y0 = Y(y), y1 = Y(y) - h;
        const p = `${f2(x0 + r)} ${f2(y0)} m ${f2(x1 - r)} ${f2(y0)} l ${f2(x1 - r + k)} ${f2(y0)} ${f2(x1)} ${f2(y0 - r + k)} ${f2(x1)} ${f2(y0 - r)} c ${f2(x1)} ${f2(y1 + r)} l ${f2(x1)} ${f2(y1 + r - k)} ${f2(x1 - r + k)} ${f2(y1)} ${f2(x1 - r)} ${f2(y1)} c ${f2(x0 + r)} ${f2(y1)} l ${f2(x0 + r - k)} ${f2(y1)} ${f2(x0)} ${f2(y1 + r - k)} ${f2(x0)} ${f2(y1 + r)} c ${f2(x0)} ${f2(y0 - r)} l ${f2(x0)} ${f2(y0 - r + k)} ${f2(x0 + r - k)} ${f2(y0)} ${f2(x0 + r)} ${f2(y0)} c h`;
        d.page.ops.push(fill && stroke ? `${col(fill)} rg ${col(stroke)} RG ${lw} w ${p} B` : fill ? `${col(fill)} rg ${p} f` : `${col(stroke)} RG ${lw} w ${p} S`);
      },
      line(x1, y1, x2, y2, color, lw = 0.6) { d.page.ops.push(`${col(color)} RG ${lw} w ${f2(x1)} ${f2(Y(y1))} m ${f2(x2)} ${f2(Y(y2))} l S`); },
      link(x, y, w, h, url) { d.page.links.push({ r: [x, Y(y) - h, x + w, Y(y)], url: String(url) }); },
      addJpeg(bytes) { const info = bytes && jpegInfo(bytes); if (!info) return null; const img = { name: "Im" + (images.length + 1), bytes, ...info }; images.push(img); return img; },
      image(x, y, w, h, img, o = {}) {
        if (!img) return;
        let clip = "";
        if (o.circle) { const r = Math.min(w, h) / 2, cx = x + w / 2, cy = Y(y) - h / 2, k = 0.5523 * r;
          clip = `${f2(cx + r)} ${f2(cy)} m ${f2(cx + r)} ${f2(cy + k)} ${f2(cx + k)} ${f2(cy + r)} ${f2(cx)} ${f2(cy + r)} c ${f2(cx - k)} ${f2(cy + r)} ${f2(cx - r)} ${f2(cy + k)} ${f2(cx - r)} ${f2(cy)} c ${f2(cx - r)} ${f2(cy - k)} ${f2(cx - k)} ${f2(cy - r)} ${f2(cx)} ${f2(cy - r)} c ${f2(cx + k)} ${f2(cy - r)} ${f2(cx + r)} ${f2(cy - k)} ${f2(cx + r)} ${f2(cy)} c h W n `; }
        d.page.ops.push(`q ${clip}${f2(w)} 0 0 ${f2(h)} ${f2(x)} ${f2(Y(y) - h)} cm /${img.name} Do Q`);
      },
      count: () => pages.length,
      onPage(i) { d.page = pages[i]; },
      blob() {
        const objs = [];
        const add = s => { objs.push(s); return objs.length; };
        add("<< /Type /Catalog /Pages 2 0 R >>");
        add("PAGES");
        add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
        add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
        add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>");
        const imgRefs = images.map(im => {
          let bin = ""; for (let i = 0; i < im.bytes.length; i += 8192) bin += String.fromCharCode.apply(null, im.bytes.subarray(i, i + 8192));
          const cs = im.comp === 1 ? "/DeviceGray" : im.comp === 4 ? "/DeviceCMYK /Decode [1 0 1 0 1 0 1 0]" : "/DeviceRGB";
          return `/${im.name} ${add(`<< /Type /XObject /Subtype /Image /Width ${im.w} /Height ${im.h} /ColorSpace ${cs} /BitsPerComponent 8 /Filter /DCTDecode /Length ${im.bytes.length} >>\nstream\n${bin}\nendstream`)} 0 R`;
        });
        const res = `<< /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >>${imgRefs.length ? ` /XObject << ${imgRefs.join(" ")} >>` : ""} >>`;
        const kids = [];
        pages.forEach(pg => {
          const stream = pg.ops.join("\n");
          const cid = add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
          const annots = pg.links.filter(l => /^https?:\/\//i.test(l.url)).map(l => add(`<< /Type /Annot /Subtype /Link /Rect [${l.r.map(f2).join(" ")}] /Border [0 0 0] /A << /Type /Action /S /URI /URI (${enc(l.url)}) >> >>`));
          kids.push(add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PW} ${PH}] /Resources ${res} /Contents ${cid} 0 R${annots.length ? ` /Annots [${annots.map(a => a + " 0 R").join(" ")}]` : ""} >>`));
        });
        const info = add(`<< /Producer (Harvy Wedding Organizer) /Title (${enc(d.title || "Dokumen")}) >>`);
        objs[1] = `<< /Type /Pages /Kids [${kids.map(k => k + " 0 R").join(" ")}] /Count ${kids.length} >>`;
        let out = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n"; const offs = [];
        objs.forEach((o, i) => { offs.push(out.length); out += `${i + 1} 0 obj\n${o}\nendobj\n`; });
        const xref = out.length;
        out += `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${offs.map(o => String(o).padStart(10, "0") + " 00000 n \n").join("")}trailer\n<< /Size ${objs.length + 1} /Root 1 0 R /Info ${info} 0 R >>\nstartxref\n${xref}\n%%EOF`;
        const bytes = new Uint8Array(out.length); for (let i = 0; i < out.length; i++) bytes[i] = out.charCodeAt(i) & 0xFF;
        return new Blob([bytes], { type: "application/pdf" });
      }
    };
    d.addPage();
    return d;
  }
  window.PDF = { create, clean };
})();
