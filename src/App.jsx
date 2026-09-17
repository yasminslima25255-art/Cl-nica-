import React, { useState, useEffect, useMemo } from "react";
/* ==========================================================
   CRM VENDAS — tema preto e dourado
   Sem dependências externas (só React). Ícones e gráficos
   são SVG escritos à mão, por isso o projeto instala rápido
   e não quebra no build do Netlify.
   ========================================================== */

const T = {
  bg: "#0A0A0B",
  panel: "#131316",
  card: "#1A1A1E",
  cardAlt: "#202026",
  border: "#2A2A30",
  borderSoft: "#222228",
  gold: "#D4A94A",
  goldLight: "#E8C877",
  goldDim: "#7A6430",
  text: "#F2F0EA",
  textMid: "#B9B6AE",
  muted: "#83838C",
  green: "#3FA96B",
  blue: "#4A7FD4",
  red: "#C94A4A",
  orange: "#D4883F",
  grey: "#4A4A52",
};

const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* ================== ÍCONES (SVG inline) ================== */

const ic = (d, extra) => (p) => (
  <svg
    width={p.size || 16}
    height={p.size || 16}
    viewBox="0 0 24 24"
    fill="none"
    stroke={p.color || "currentColor"}
    strokeWidth={p.sw || 1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, ...(p.style || {}) }}
  >
    {d}
    {extra}
  </svg>
);

const IconHome = ic(
  <>
    <path d="M3 10.5 12 3l9 7.5" />
    <path d="M5 9.5V21h14V9.5" />
  </>
);
const IconUser = ic(
  <>
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7" />
  </>
);
const IconChat = ic(<path d="M21 12a8 8 0 0 1-8 8H8l-5 3 1.4-4.6A8 8 0 1 1 21 12Z" />);
const IconDoc = ic(
  <>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </>
);
const IconFunnel = ic(<path d="M3 4h18l-7 8v8l-4-2v-6L3 4Z" />);
const IconChart = ic(
  <>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </>
);
const IconGear = ic(
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
  </>
);
const IconSearch = ic(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4.3-4.3" />
  </>
);
const IconCheck = ic(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.3 2.3 4.7-5" />
  </>
);
const IconCopy = ic(
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3H6a2 2 0 0 0-2 2v8" />
  </>
);
const IconPdf = ic(
  <>
    <path d="M13 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-6-6Z" />
    <path d="M13 3v6h6" />
  </>
);
const IconSheet = ic(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 10h18M9 4v16M15 4v16" />
  </>
);
const IconPlus = ic(<path d="M12 5v14M5 12h14" />);
const IconPen = ic(
  <>
    <path d="M16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1 1-4Z" />
  </>
);
const IconDots = ic(
  <>
    <circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" />
  </>
);
const IconCalendar = ic(
  <>
    <rect x="3.5" y="5" width="17" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
  </>
);
const IconArrowUp = ic(<path d="M12 19V5M6 11l6-6 6 6" />);
const IconTrend = ic(
  <>
    <path d="M3 17l6-6 4 4 8-9" />
    <path d="M15 6h6v6" />
  </>
);

const IconWallet = ic(
  <>
    <path d="M3 7h17a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
    <path d="M3 7V5a2 2 0 0 1 2-2h14" />
    <path d="M17 13h4" />
  </>
);

const IconKanban = ic(
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M8 8v8M12 8v5M16 8v3" />
  </>
);
/* Borboleta — usada UMA única vez, apenas na logo */
function Butterfly({ size = 13, color = T.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d="M12 6.4c0-.5.4-.9.9-.9.4 0 .7.2.9.5C15.3 4.1 17.4 3 19.2 3c2 0 3.3 1.4 3.3 3.5 0 3-2.4 5.7-6.1 7.2 1.5.5 2.5 1.6 2.5 2.9 0 1.5-1.2 2.6-2.8 2.6-1.6 0-2.9-1-3.6-2.6-.2.1-.3.1-.5.1s-.3 0-.5-.1c-.7 1.6-2 2.6-3.6 2.6-1.6 0-2.8-1.1-2.8-2.6 0-1.3 1-2.4 2.5-2.9C4.4 12.2 2 9.5 2 6.5 2 4.4 3.3 3 5.3 3c1.8 0 3.9 1.1 5.4 3 .2-.3.5-.5.9-.5.5 0 .9.4.9.9Z" />
      <path d="M11.35 7.2h1.3l-.35 11.4h-.6l-.35-11.4Z" fill={T.bg} opacity="0.55" />
    </svg>
  );
}

/* ================== DADOS DE EXEMPLO ================== */

const clientes = [
  { nome: "Maria Souza", telefone: "(51) 99999-1111", cidade: "Osório", status: "Cliente", data: "2026-08-12" },
  { nome: "Carlos Lima", telefone: "(51) 98888-2222", cidade: "Tramandaí", status: "Em negociação", data: "2026-08-11" },
  { nome: "Juliana Alves", telefone: "(51) 97777-3333", cidade: "Imbé", status: "Proposta", data: "2026-08-10" },
  { nome: "Roberto Silva", telefone: "(51) 96666-4444", cidade: "Osório", status: "Contato inicial", data: "2026-08-09" },
  { nome: "Ana Paula", telefone: "(51) 95555-5555", cidade: "Tramandaí", status: "Cliente", data: "2026-08-08" },
  { nome: "Fernando Costa", telefone: "(51) 94444-6666", cidade: "Capão da Canoa", status: "Sem retorno", data: "2026-08-07" },
  { nome: "Beatriz Rocha", telefone: "(51) 93333-7777", cidade: "Osório", status: "Em atendimento", data: "2026-08-06" },
  { nome: "Rafael Moreira", telefone: "(51) 92222-8888", cidade: "Imbé", status: "Em negociação", data: "2026-07-30" },
];

const contatos = [
  { nome: "Mariana Alves", telefone: "(51) 98888-1234", origem: "WhatsApp", status: "Em atendimento", data: "2026-08-13" },
  { nome: "Lucas Ferreira", telefone: "(51) 97777-2345", origem: "Instagram", status: "Novo contato", data: "2026-08-12" },
  { nome: "Tatiane Souza", telefone: "(51) 96566-3456", origem: "Ligação", status: "Retorno agendado", data: "2026-08-11" },
  { nome: "Gabriel Martins", telefone: "(51) 95555-4567", origem: "Site", status: "Orçamento enviado", data: "2026-08-10" },
  { nome: "Camila Rocha", telefone: "(51) 94444-5678", origem: "Indicação", status: "Cliente em potencial", data: "2026-08-09" },
  { nome: "Felipe Santos", telefone: "(51) 93333-6789", origem: "WhatsApp", status: "Em retorno", data: "2026-08-08" },
  { nome: "Bruna Costa", telefone: "(51) 92222-7890", origem: "Instagram", status: "Em atendimento", data: "2026-08-07" },
];

const orcamentos = [
  { numero: "0012", cliente: "Maria Souza", produto: "Energia Solar", valor: 6500, status: "Enviado", data: "2026-08-12" },
  { numero: "0011", cliente: "Carlos Lima", produto: "Carregador Veicular", valor: 3200, status: "Em negociação", data: "2026-08-11" },
  { numero: "0010", cliente: "Juliana Alves", produto: "Energia Solar", valor: 8900, status: "Aprovado", data: "2026-08-10" },
  { numero: "0009", cliente: "Roberto Silva", produto: "Carregador Veicular", valor: 4600, status: "Enviado", data: "2026-08-09" },
  { numero: "0008", cliente: "Ana Paula", produto: "Energia Solar", valor: 7300, status: "Aprovado", data: "2026-08-08" },
  { numero: "0007", cliente: "Fernando Costa", produto: "Energia Solar", valor: 5600, status: "Perdido", data: "2026-08-07" },
  { numero: "0006", cliente: "Beatriz Rocha", produto: "Carregador Veicular", valor: 4200, status: "Enviado", data: "2026-08-06" },
  { numero: "0005", cliente: "Rafael Moreira", produto: "Energia Solar", valor: 9100, status: "Aprovado", data: "2026-07-29" },
];

/* ================== HELPERS ================== */

const brl = (n) => "R$ " + n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const dataBR = (iso) => {
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
};
/** Guarda o estado no localStorage — os dados não se perdem ao recarregar. */
function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo ? JSON.parse(salvo) : valorInicial;
    } catch {
      return valorInicial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {}
  }, [chave, valor]);
  return [valor, setValor];
   
}
/** Filtra qualquer lista pelo campo `data` (ISO) entre de/até. */
function filtrarPorPeriodo(lista, de, ate) {
  return lista.filter((r) => {
    if (de && r.data < de) return false;
    if (ate && r.data > ate) return false;
    return true;
  });
}

function baixarArquivo(nome, conteudo, tipo) {
  const blob = new Blob(["\uFEFF" + conteudo], { type: tipo });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = nome;
  a.click();
  URL.revokeObjectURL(url);
}

/** Exporta para planilha (CSV com ; — abre direto no Excel em pt-BR). */
function exportarExcel(nomeArquivo, colunas, linhas) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [colunas.map(esc).join(";"), ...linhas.map((l) => l.map(esc).join(";"))].join("\r\n");
  baixarArquivo(`${nomeArquivo}.csv`, csv, "text/csv;charset=utf-8;");
}

/** Gera um PDF abrindo a janela de impressão com a tabela formatada. */
function exportarPDF(titulo, colunas, linhas, periodo) {
  const w = window.open("", "_blank");
  if (!w) return alert("Libere os pop-ups do navegador para gerar o PDF.");
  const th = colunas.map((c) => `<th>${c}</th>`).join("");
  const tr = linhas.map((l) => `<tr>${l.map((c) => `<td>${c ?? ""}</td>`).join("")}</tr>`).join("");
  w.document.write(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
    <title>${titulo}</title>
    <style>
      *{box-sizing:border-box}
      body{font-family:Inter,Arial,sans-serif;margin:32px;color:#16161a}
      header{display:flex;align-items:center;gap:10px;border-bottom:2px solid #D4A94A;padding-bottom:12px;margin-bottom:6px}
      h1{font-size:17px;margin:0;letter-spacing:.06em}
      .sub{font-size:11px;color:#6b6b73;margin:8px 0 18px}
      table{width:100%;border-collapse:collapse;font-size:11px}
      th{background:#16161a;color:#fff;text-align:left;padding:8px 10px;font-weight:600}
      td{padding:7px 10px;border-bottom:1px solid #e6e6ea}
      tr:nth-child(even) td{background:#faf9f6}
      footer{margin-top:20px;font-size:10px;color:#9a9aa2}
      @media print{@page{margin:14mm}}
    </style></head><body>
    <header><h1>CRM VENDAS &middot; ${titulo}</h1></header>
    <div class="sub">${periodo || "Todos os registros"} &nbsp;|&nbsp; Gerado em ${new Date().toLocaleString("pt-BR")}</div>
    <table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>
    <footer>${linhas.length} registro(s)</footer>
    </body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 350);
}

/* ================== COMPONENTES BASE ================== */

const CHIP = {
  Cliente: T.green,
  Aprovado: T.green,
  "Em atendimento": T.green,
  "Em negociação": T.blue,
  "Retorno agendado": T.blue,
  "Orçamento enviado": T.blue,
  Enviado: T.blue,
  Proposta: T.gold,
  "Novo contato": T.gold,
  "Em retorno": T.gold,
  "Contato inicial": T.grey,
  "Cliente em potencial": T.grey,
  "Sem retorno": T.grey,
  Perdido: T.red,
};

function Chip({ children }) {
  const cor = CHIP[children] || T.grey;
  const solido = cor === T.green || cor === T.blue || cor === T.red;
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 6,
        fontSize: 11.5,
        fontWeight: 600,
        whiteSpace: "nowrap",
        background: solido ? cor : cor + "26",
        color: solido ? "#0C0C0D" : cor,
        border: solido ? "none" : `1px solid ${cor}55`,
      }}
    >
      {children}
    </span>
  );
}

function Panel({ children, style, pad = 20 }) {
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.borderSoft}`,
        borderRadius: 12,
        padding: pad,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function PageHead({ titulo, sub, acao }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18, flexWrap: "wrap" }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: T.text, letterSpacing: "-0.02em" }}>{titulo}</h1>
        {sub && <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>{sub}</div>}
      </div>
      {acao}
    </div>
  );
}

function GoldButton({ children, onClick, icon: Ic }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: T.gold,
        color: "#14120A",
        border: "none",
        borderRadius: 8,
        padding: "9px 15px",
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        fontFamily: FONT,
      }}
    >
      {Ic && <Ic size={14} sw={2.2} />}
      {children}
    </button>
  );
}

function GhostButton({ children, onClick, icon: Ic, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        background: T.cardAlt,
        color: T.textMid,
        border: `1px solid ${T.border}`,
        borderRadius: 8,
        padding: "8px 13px",
        fontSize: 12.5,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: FONT,
      }}
    >
      {Ic && <Ic size={14} />}
      {children}
    </button>
  );
}

/** Botão de copiar — usado em cada linha e no topo das tabelas. */
function CopyButton({ texto, label, title }) {
  const [ok, setOk] = useState(false);
  function copiar() {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = texto;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    };
    const done = () => {
      setOk(true);
      setTimeout(() => setOk(false), 1400);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(texto).then(done).catch(() => {
        fallback();
        done();
      });
    } else {
      fallback();
      done();
    }
  }
  const Ic = ok ? IconCheck : IconCopy;
  return (
    <button
      onClick={copiar}
      title={title || "Copiar dados"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: label ? T.cardAlt : "transparent",
        color: ok ? T.green : T.muted,
        border: label ? `1px solid ${T.border}` : "none",
        borderRadius: 8,
        padding: label ? "8px 13px" : 5,
        fontSize: 12.5,
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: FONT,
      }}
    >
      <Ic size={14} />
      {label && (ok ? "Copiado" : label)}
    </button>
  );
}

const inputBase = {
  background: T.panel,
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  color: T.text,
  fontSize: 13,
  padding: "9px 12px",
  fontFamily: FONT,
  outline: "none",
};

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
      <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.muted, display: "flex" }}>
        <IconSearch size={15} />
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputBase, width: "100%", paddingLeft: 36 }}
      />
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} style={{ ...inputBase, minWidth: 140, cursor: "pointer" }}>
      {options.map((o) => (
        <option key={o} value={o} style={{ background: T.panel }}>
          {o}
        </option>
      ))}
    </select>
  );
}

/** Filtro de data: de tal data até tal data. */
function DateRange({ de, ate, setDe, setAte }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: T.panel,
        border: `1px solid ${T.border}`,
        borderRadius: 8,
        padding: "5px 10px",
      }}
    >
      <IconCalendar size={14} color={T.gold} />
      <input
        type="date"
        value={de}
        onChange={(e) => setDe(e.target.value)}
        style={{ ...inputBase, border: "none", background: "transparent", padding: "4px 2px", colorScheme: "dark", width: 126 }}
      />
      <span style={{ color: T.muted, fontSize: 12 }}>até</span>
      <input
        type="date"
        value={ate}
        onChange={(e) => setAte(e.target.value)}
        style={{ ...inputBase, border: "none", background: "transparent", padding: "4px 2px", colorScheme: "dark", width: 126 }}
      />
      {(de || ate) && (
        <button
          onClick={() => {
            setDe("");
            setAte("");
          }}
          title="Limpar período"
          style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 16, lineHeight: 1, padding: "0 2px" }}
        >
          ×
        </button>
      )}
    </div>
  );
}

/** Barra de ações: exportar PDF, exportar planilha e copiar tudo. */
function ExportBar({ titulo, colunas, linhas, periodo }) {
  const textoTudo = [colunas.join("\t"), ...linhas.map((l) => l.join("\t"))].join("\n");
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <GhostButton icon={IconPdf} onClick={() => exportarPDF(titulo, colunas, linhas, periodo)}>
        PDF
      </GhostButton>
      <GhostButton icon={IconSheet} onClick={() => exportarExcel(titulo.toLowerCase().replace(/\s+/g, "-"), colunas, linhas)}>
        Planilha
      </GhostButton>
      <CopyButton texto={textoTudo} label="Copiar tabela" title="Copiar todos os dados visíveis" />
    </div>
  );
}

function Toolbar({ children }) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 14 }}>{children}</div>
  );
}

function Table({ head, children, vazio }) {
  return (
    <Panel pad={0} style={{ overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, minWidth: 700 }}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th
                  key={i}
                  style={{
                    textAlign: i === head.length - 1 ? "right" : "left",
                    padding: "12px 18px",
                    fontSize: 11.5,
                    fontWeight: 600,
                    color: T.muted,
                    background: T.cardAlt,
                    borderBottom: `1px solid ${T.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
      {vazio && (
        <div style={{ padding: "34px 20px", textAlign: "center", color: T.muted, fontSize: 13 }}>
          Nenhum registro no período selecionado. Ajuste as datas ou limpe o filtro.
        </div>
      )}
    </Panel>
  );
}

const td = { padding: "13px 18px", borderBottom: `1px solid ${T.borderSoft}`, color: T.textMid, whiteSpace: "nowrap" };

function RowActions({ textoCopia }) {
  return (
    <td style={{ ...td, textAlign: "right" }}>
      <span style={{ display: "inline-flex", gap: 2, alignItems: "center" }}>
        <CopyButton texto={textoCopia} title="Copiar dados deste registro" />
        <button style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", padding: 5, display: "flex" }} title="Editar">
          <IconPen size={14} />
        </button>
        <button style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", padding: 5, display: "flex" }} title="Mais">
          <IconDots size={14} />
        </button>
      </span>
    </td>
  );
}

/* ================== GRÁFICOS (SVG) ================== */

function Donut({ dados, total, legendaCentro }) {
  const R = 52, SW = 16, C = 2 * Math.PI * R;
  let acc = 0;
  const soma = dados.reduce((s, d) => s + d.valor, 0) || 1;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={R} fill="none" stroke={T.cardAlt} strokeWidth={SW} />
        {dados.map((d, i) => {
          const frac = d.valor / soma;
          const el = (
            <circle
              key={i}
              cx="70"
              cy="70"
              r={R}
              fill="none"
              stroke={d.cor}
              strokeWidth={SW}
              strokeDasharray={`${C * frac} ${C}`}
              strokeDashoffset={-C * acc}
              transform="rotate(-90 70 70)"
              strokeLinecap="butt"
            />
          );
          acc += frac;
          return el;
        })}
        <text x="70" y="66" textAnchor="middle" fill={T.text} fontSize="24" fontWeight="700" fontFamily={FONT}>
          {total}
        </text>
        <text x="70" y="83" textAnchor="middle" fill={T.muted} fontSize="10.5" fontFamily={FONT}>
          {legendaCentro}
        </text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, minWidth: 170 }}>
        {dados.map((d, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 999, background: d.cor, flexShrink: 0 }} />
            <span style={{ color: T.textMid, flex: 1 }}>{d.rotulo}</span>
            <span style={{ color: T.text, fontWeight: 600, width: 22, textAlign: "right" }}>{d.valor}</span>
            <span style={{ color: T.muted, width: 38, textAlign: "right" }}>{Math.round((d.valor / soma) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Bars({ dados, altura = 150 }) {
  const max = Math.max(...dados.map((d) => d.valor), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: altura, marginTop: 8 }}>
      {dados.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, height: "100%", justifyContent: "flex-end" }} title={`Dia ${d.rotulo}: ${brl(d.valor)}`}>
          <div
            style={{
              width: "100%",
              height: `${(d.valor / max) * 100}%`,
              minHeight: 3,
              background: d.destaque ? T.gold : T.goldDim,
              borderRadius: "3px 3px 0 0",
            }}
          />
          <span style={{ fontSize: 9.5, color: T.muted }}>{i % 5 === 0 ? d.rotulo : ""}</span>
        </div>
      ))}
    </div>
  );
}

function Gauge({ pct, titulo, sub }) {
  const R = 46, C = 2 * Math.PI * R;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
      <svg width={116} height={116} viewBox="0 0 116 116">
        <circle cx="58" cy="58" r={R} fill="none" stroke={T.cardAlt} strokeWidth={13} />
        <circle
          cx="58"
          cy="58"
          r={R}
          fill="none"
          stroke={T.gold}
          strokeWidth={13}
          strokeDasharray={`${(C * pct) / 100} ${C}`}
          strokeDashoffset={0}
          transform="rotate(-90 58 58)"
          strokeLinecap="round"
        />
        <text x="58" y="64" textAnchor="middle" fill={T.text} fontSize="21" fontWeight="700" fontFamily={FONT}>
          {pct}%
        </text>
      </svg>
      <div style={{ flex: 1, minWidth: 130 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>{titulo}</div>
        <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>{sub}</div>
      </div>
    </div>
  );
}

function StatCard({ rotulo, valor, delta, icon: Ic }) {
  return (
    <Panel pad={17}>
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: T.gold + "1F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.gold,
          }}
        >
          <Ic size={17} />
        </span>
        <span style={{ fontSize: 12.5, color: T.muted, fontWeight: 500 }}>{rotulo}</span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
          <span style={{ fontSize: 28, fontWeight: 700, color: T.text, letterSpacing: "-0.03em" }}>{valor}</span>
          {delta && (
            <span style={{ fontSize: 12, color: T.green, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 2 }}>
              <IconArrowUp size={11} sw={2.6} /> {delta}
            </span>
          )}
        </div>
      </div>
    </Panel>
  );
}

/* ================== TELAS ================== */

function Inicio({ de, ate, setDe, setAte }) {
  const cli = filtrarPorPeriodo(clientes, de, ate);
  const orc = filtrarPorPeriodo(orcamentos, de, ate);
  const fechadas = orc.filter((o) => o.status === "Aprovado").length;
  const negoc = cli.filter((c) => c.status === "Em negociação").length + orc.filter((o) => o.status === "Em negociação").length;
  const proposta = cli.filter((c) => c.status === "Proposta").length;
  const semRetorno = cli.filter((c) => c.status === "Sem retorno").length;
  const meta = 20;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: T.text, letterSpacing: "-0.03em" }}>Olá, Yasmin!</h1>
          <div style={{ fontSize: 13.5, color: T.muted, marginTop: 5 }}>Aqui está um resumo do seu dia.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: T.textMid }}>
            <IconCalendar size={15} color={T.gold} />
            {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
          </span>
          <DateRange de={de} ate={ate} setDe={setDe} setAte={setAte} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard rotulo="Total de clientes" valor={cli.length} delta="12%" icon={IconUser} />
        <StatCard rotulo="Em atendimento" valor={negoc} delta="3%" icon={IconChat} />
        <StatCard rotulo="Orçamentos enviados" valor={orc.length} delta="25%" icon={IconDoc} />
        <StatCard rotulo="Vendas fechadas" valor={fechadas} delta="50%" icon={IconCheck} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 14 }}>
        <Panel>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 18 }}>Resumo de vendas</div>
          <Donut
            total={fechadas}
            legendaCentro="fechadas"
            dados={[
              { rotulo: "Fechadas", valor: fechadas, cor: T.gold },
              { rotulo: "Em negociação", valor: negoc, cor: T.goldDim },
              { rotulo: "Proposta", valor: proposta, cor: "#5A5A62" },
              { rotulo: "Sem retorno", valor: semRetorno, cor: "#33333A" },
            ]}
          />
        </Panel>

        <Panel>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 18 }}>Meta do mês</div>
          <div style={{ height: 9, background: T.cardAlt, borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ width: `${Math.min((fechadas / meta) * 100, 100)}%`, height: "100%", background: T.gold, borderRadius: 999 }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: T.textMid, paddingBottom: 18, borderBottom: `1px solid ${T.borderSoft}` }}>
            <span>
              {fechadas} / {meta} vendas
            </span>
            <span style={{ color: T.gold, fontWeight: 600 }}>{Math.round((fechadas / meta) * 100)}%</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 18 }}>
            <Butterfly size={24} />
            <div style={{ fontSize: 16, fontWeight: 600, color: T.text, lineHeight: 1.35 }}>
              Disciplina hoje,
              <br />
              vendas amanhã.
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Clientes({ de, ate, setDe, setAte }) {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("Todos");

  const dados = useMemo(() => {
    let l = filtrarPorPeriodo(clientes, de, ate);
    if (status !== "Todos") l = l.filter((c) => c.status === status);
    const q = busca.trim().toLowerCase();
    if (q) l = l.filter((c) => [c.nome, c.telefone, c.cidade].join(" ").toLowerCase().includes(q));
    return l;
  }, [busca, status, de, ate]);

  const colunas = ["Nome", "Telefone", "Cidade", "Status", "Último contato"];
  const linhas = dados.map((c) => [c.nome, c.telefone, c.cidade, c.status, dataBR(c.data)]);
  const periodo = de || ate ? `Período: ${de ? dataBR(de) : "início"} a ${ate ? dataBR(ate) : "hoje"}` : null;

  return (
    <div>
      <PageHead titulo="Clientes" sub="Gerencie seus clientes e acompanhe o histórico de cada um." acao={<GoldButton icon={IconPlus}>Novo cliente</GoldButton>} />
      <Toolbar>
        <SearchInput value={busca} onChange={setBusca} placeholder="Buscar por nome, telefone ou cidade..." />
        <Select value={status} onChange={setStatus} options={["Todos", "Cliente", "Em negociação", "Proposta", "Contato inicial", "Em atendimento", "Sem retorno"]} />
        <DateRange de={de} ate={ate} setDe={setDe} setAte={setAte} />
        <ExportBar titulo="Clientes" colunas={colunas} linhas={linhas} periodo={periodo} />
      </Toolbar>
      <Table head={[...colunas, "Ações"]} vazio={dados.length === 0}>
        {dados.map((c, i) => (
          <tr key={i}>
            <td style={{ ...td, color: T.text, fontWeight: 500 }}>{c.nome}</td>
            <td style={td}>{c.telefone}</td>
            <td style={td}>{c.cidade}</td>
            <td style={td}>
              <Chip>{c.status}</Chip>
            </td>
            <td style={td}>{dataBR(c.data)}</td>
            <RowActions textoCopia={`${c.nome}\n${c.telefone}\n${c.cidade}\nStatus: ${c.status}\nÚltimo contato: ${dataBR(c.data)}`} />
          </tr>
        ))}
      </Table>
      <Rodape n={dados.length} total={clientes.length} />
    </div>
  );
}

function Contatos({ de, ate, setDe, setAte }) {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("Todos");
  const [origem, setOrigem] = useState("Todas as origens");

  const dados = useMemo(() => {
    let l = filtrarPorPeriodo(contatos, de, ate);
    if (status !== "Todos") l = l.filter((c) => c.status === status);
    if (origem !== "Todas as origens") l = l.filter((c) => c.origem === origem);
    const q = busca.trim().toLowerCase();
    if (q) l = l.filter((c) => [c.nome, c.telefone, c.origem].join(" ").toLowerCase().includes(q));
    return l;
  }, [busca, status, origem, de, ate]);

  const colunas = ["Nome", "Telefone", "Origem", "Status", "Data"];
  const linhas = dados.map((c) => [c.nome, c.telefone, c.origem, c.status, dataBR(c.data)]);
  const periodo = de || ate ? `Período: ${de ? dataBR(de) : "início"} a ${ate ? dataBR(ate) : "hoje"}` : null;

  return (
    <div>
      <PageHead titulo="Contatos" sub="Todos os seus contatos em um só lugar." acao={<GoldButton icon={IconPlus}>Novo contato</GoldButton>} />
      <Toolbar>
        <SearchInput value={busca} onChange={setBusca} placeholder="Buscar por nome, telefone ou origem..." />
        <Select value={status} onChange={setStatus} options={["Todos", "Novo contato", "Em atendimento", "Retorno agendado", "Orçamento enviado", "Cliente em potencial", "Em retorno"]} />
        <Select value={origem} onChange={setOrigem} options={["Todas as origens", "WhatsApp", "Instagram", "Ligação", "Site", "Indicação"]} />
        <DateRange de={de} ate={ate} setDe={setDe} setAte={setAte} />
        <ExportBar titulo="Contatos" colunas={colunas} linhas={linhas} periodo={periodo} />
      </Toolbar>
      <Table head={[...colunas, "Ações"]} vazio={dados.length === 0}>
        {dados.map((c, i) => (
          <tr key={i}>
            <td style={{ ...td, color: T.text, fontWeight: 500 }}>{c.nome}</td>
            <td style={td}>{c.telefone}</td>
            <td style={td}>{c.origem}</td>
            <td style={td}>
              <Chip>{c.status}</Chip>
            </td>
            <td style={td}>{dataBR(c.data)}</td>
            <RowActions textoCopia={`${c.nome}\n${c.telefone}\nOrigem: ${c.origem}\nStatus: ${c.status}`} />
          </tr>
        ))}
      </Table>
      <Rodape n={dados.length} total={contatos.length} />
    </div>
  );
}

function Orcamentos({ de, ate, setDe, setAte }) {
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("Todos");

  const dados = useMemo(() => {
    let l = filtrarPorPeriodo(orcamentos, de, ate);
    if (status !== "Todos") l = l.filter((o) => o.status === status);
    const q = busca.trim().toLowerCase();
    if (q) l = l.filter((o) => [o.numero, o.cliente, o.produto].join(" ").toLowerCase().includes(q));
    return l;
  }, [busca, status, de, ate]);

  const somaTotal = dados.reduce((s, o) => s + o.valor, 0);
  const colunas = ["Nº", "Cliente", "Produto/Serviço", "Valor", "Status", "Data"];
  const linhas = dados.map((o) => [o.numero, o.cliente, o.produto, brl(o.valor), o.status, dataBR(o.data)]);
  const periodo = de || ate ? `Período: ${de ? dataBR(de) : "início"} a ${ate ? dataBR(ate) : "hoje"}` : null;

  return (
    <div>
      <PageHead titulo="Orçamentos" sub="Acompanhe e gerencie todos os orçamentos enviados." acao={<GoldButton icon={IconPlus}>Novo orçamento</GoldButton>} />
      <Toolbar>
        <SearchInput value={busca} onChange={setBusca} placeholder="Buscar por cliente, produto ou número..." />
        <Select value={status} onChange={setStatus} options={["Todos", "Enviado", "Em negociação", "Aprovado", "Perdido"]} />
        <DateRange de={de} ate={ate} setDe={setDe} setAte={setAte} />
        <ExportBar titulo="Orçamentos" colunas={colunas} linhas={linhas} periodo={periodo} />
      </Toolbar>
      <Table head={[...colunas, "Ações"]} vazio={dados.length === 0}>
        {dados.map((o, i) => (
          <tr key={i}>
            <td style={{ ...td, color: T.muted, fontVariantNumeric: "tabular-nums" }}>{o.numero}</td>
            <td style={{ ...td, color: T.text, fontWeight: 500 }}>{o.cliente}</td>
            <td style={td}>{o.produto}</td>
            <td style={{ ...td, color: T.gold, fontWeight: 600 }}>{brl(o.valor)}</td>
            <td style={td}>
              <Chip>{o.status}</Chip>
            </td>
            <td style={td}>{dataBR(o.data)}</td>
            <RowActions textoCopia={`Orçamento ${o.numero}\n${o.cliente}\n${o.produto}\n${brl(o.valor)}\nStatus: ${o.status}\nData: ${dataBR(o.data)}`} />
          </tr>
        ))}
      </Table>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 12, fontSize: 12.5, color: T.muted }}>
        <span>
          {dados.length} de {orcamentos.length} orçamentos
        </span>
        <span>
          Total no período: <strong style={{ color: T.gold }}>{brl(somaTotal)}</strong>
        </span>
      </div>
    </div>
  );
}

function Funil({ de, ate, setDe, setAte }) {
  const cli = filtrarPorPeriodo(clientes, de, ate);
  const orc = filtrarPorPeriodo(orcamentos, de, ate);
  const etapas = [
    { rotulo: "Contato inicial", valor: cli.length },
    { rotulo: "Em negociação", valor: cli.filter((c) => c.status === "Em negociação").length + orc.filter((o) => o.status === "Em negociação").length },
    { rotulo: "Proposta", valor: orc.filter((o) => o.status === "Enviado").length },
    { rotulo: "Fechados", valor: orc.filter((o) => o.status === "Aprovado").length },
  ];
  const topo = etapas[0].valor || 1;
  const conv = Math.round((etapas[3].valor / topo) * 100);
  const colunas = ["Etapa", "Quantidade", "% do topo do funil"];
  const linhas = etapas.map((e) => [e.rotulo, e.valor, `${Math.round((e.valor / topo) * 100)}%`]);

  return (
    <div>
      <PageHead
        titulo="Funil de vendas"
        sub="Visualize em qual etapa estão seus leads e oportunidades."
        acao={
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <DateRange de={de} ate={ate} setDe={setDe} setAte={setAte} />
            <ExportBar titulo="Funil de vendas" colunas={colunas} linhas={linhas} />
          </div>
        }
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
        <Panel>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {etapas.map((e, i) => {
              const largura = 100 - i * 18;
              const pct = Math.round((e.valor / topo) * 100);
              const tons = [T.goldLight, T.gold, "#8C7638", "#4A4A52"];
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 130, display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        width: `${largura}%`,
                        height: 34,
                        background: tons[i],
                        clipPath: "polygon(0 0, 100% 0, 88% 100%, 12% 100%)",
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: T.textMid }}>{e.rotulo}</div>
                    <div style={{ fontSize: 19, fontWeight: 700, color: T.text }}>{e.valor}</div>
                  </div>
                  <span style={{ fontSize: 12.5, color: T.muted }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        </Panel>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Panel>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 16 }}>Taxa de conversão</div>
            <Gauge pct={conv} titulo={`${etapas[3].valor} de ${topo}`} sub="leads viraram vendas" />
          </Panel>
          <Panel>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 12 }}>Média do mês</div>
            <div style={{ height: 9, background: T.cardAlt, borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: `${Math.min((etapas[3].valor / 20) * 100, 100)}%`, height: "100%", background: T.gold }} />
            </div>
            <div style={{ fontSize: 12.5, color: T.muted, marginTop: 9 }}>{etapas[3].valor} de 20 vendas na meta</div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Relatorios({ de, ate, setDe, setAte }) {
  const orc = filtrarPorPeriodo(orcamentos, de, ate);
  const cli = filtrarPorPeriodo(clientes, de, ate);
  const aprovados = orc.filter((o) => o.status === "Aprovado");
  const receita = aprovados.reduce((s, o) => s + o.valor, 0);
  const ticket = aprovados.length ? receita / aprovados.length : 0;

  const porDia = Array.from({ length: 31 }, (_, i) => {
    const dia = String(i + 1).padStart(2, "0");
    const doDia = orc.filter((o) => o.data.endsWith("-" + dia));
    return { rotulo: dia, valor: doDia.reduce((s, o) => s + o.valor, 0), destaque: doDia.length > 0 };
  });

  const origens = ["WhatsApp", "Instagram", "Ligação", "Site", "Indicação"];
  const cont = filtrarPorPeriodo(contatos, de, ate);
  const tons = [T.goldLight, T.gold, "#9C8240", "#5E5E66", "#37373E"];
  const dadosOrigem = origens.map((o, i) => ({
    rotulo: o,
    valor: cont.filter((c) => c.origem === o).length,
    cor: tons[i],
  }));

  const colunas = ["Nº", "Cliente", "Produto/Serviço", "Valor", "Status", "Data"];
  const linhas = orc.map((o) => [o.numero, o.cliente, o.produto, brl(o.valor), o.status, dataBR(o.data)]);
  const periodo = de || ate ? `Período: ${de ? dataBR(de) : "início"} a ${ate ? dataBR(ate) : "hoje"}` : null;

  return (
    <div>
      <PageHead
        titulo="Relatórios"
        sub="Acompanhe seu desempenho com dados e gráficos."
        acao={
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <DateRange de={de} ate={ate} setDe={setDe} setAte={setAte} />
            <ExportBar titulo="Relatório de vendas" colunas={colunas} linhas={linhas} periodo={periodo} />
          </div>
        }
         
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard rotulo="Vendas" valor={brl(receita).replace(",00", "")} delta="28%" icon={IconTrend} />
        <StatCard rotulo="Orçamentos" valor={orc.length} delta="25%" icon={IconDoc} />
        <StatCard rotulo="Clientes novos" valor={cli.length} delta="43%" icon={IconUser} />
        <StatCard rotulo="Ticket médio" valor={brl(ticket).replace(",00", "")} delta="16%" icon={IconChart} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))", gap: 14 }}>
        <Panel>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>Vendas por período</div>
          <div style={{ fontSize: 12, color: T.muted, marginTop: 3 }}>Valor de orçamentos por dia do mês</div>
          <Bars dados={porDia} />
        </Panel>
        <Panel>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 18 }}>Origem dos contatos</div>
          <Donut total={cont.length} legendaCentro="contatos" dados={dadosOrigem} />
        </Panel>
      </div>
    </div>
  );
}
/* ================== AGENDA ================== */

const STATUS_AGENDA = ["Agendado", "Concluído", "Cancelado"];
const CHIP_AGENDA = { Agendado: T.blue, "Concluído": T.green, Cancelado: T.red };

function ChipAgenda({ children }) {
  const cor = CHIP_AGENDA[children] || T.grey;
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap", background: cor, color: "#0C0C0D" }}>
      {children}
    </span>
  );
}

function Agenda() {
  const [compromissos, setCompromissos] = useLocalStorage("crm_agenda", []);
  const [form, setForm] = useState({ cliente: "", telefone: "", data: "", hora: "", tipo: "Consulta", obs: "" });
  const [filtroData, setFiltroData] = useState("");

  function atualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function adicionar() {
    if (!form.cliente || !form.data || !form.hora) {
      alert("Preencha ao menos o nome do paciente, a data e a hora.");
      return;
    }
    setCompromissos((lista) => [...lista, { id: Date.now(), ...form, status: "Agendado" }]);
    setForm({ cliente: "", telefone: "", data: "", hora: "", tipo: "Consulta", obs: "" });
  }

  function mudarStatus(id, status) {
    setCompromissos((lista) => lista.map((c) => (c.id === id ? { ...c, status } : c)));
  }

  function remover(id) {
    if (confirm("Remover este agendamento?")) {
      setCompromissos((lista) => lista.filter((c) => c.id !== id));
    }
  }

  const ordenados = useMemo(() => {
    let l = [...compromissos].sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora));
    if (filtroData) l = l.filter((c) => c.data === filtroData);
    return l;
  }, [compromissos, filtroData]);

  return (
    <div>
      <PageHead titulo="Agenda" sub="Marque, acompanhe e organize os atendimentos da clínica." />

      <Panel style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 14 }}>Novo agendamento</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 12 }}>
          <input style={inputBase} placeholder="Nome do paciente" value={form.cliente} onChange={(e) => atualizar("cliente", e.target.value)} />
          <input style={inputBase} placeholder="Telefone" value={form.telefone} onChange={(e) => atualizar("telefone", e.target.value)} />
          <input style={{ ...inputBase, colorScheme: "dark" }} type="date" value={form.data} onChange={(e) => atualizar("data", e.target.value)} />
          <input style={{ ...inputBase, colorScheme: "dark" }} type="time" value={form.hora} onChange={(e) => atualizar("hora", e.target.value)} />
          <Select value={form.tipo} onChange={(v) => atualizar("tipo", v)} options={["Consulta", "Retorno", "Avaliação", "Procedimento"]} />
        </div>
        <input style={{ ...inputBase, width: "100%", marginBottom: 12 }} placeholder="Observações (opcional)" value={form.obs} onChange={(e) => atualizar("obs", e.target.value)} />
        <GoldButton icon={IconPlus} onClick={adicionar}>Agendar</GoldButton>
      </Panel>

      <Toolbar>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.panel, border: `1px solid ${T.border}`, borderRadius: 8, padding: "5px 10px" }}>
          <IconCalendar size={14} color={T.gold} />
          <input type="date" value={filtroData} onChange={(e) => setFiltroData(e.target.value)} style={{ ...inputBase, border: "none", background: "transparent", padding: "4px 2px", colorScheme: "dark" }} />
          {filtroData && (
            <button onClick={() => setFiltroData("")} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 16 }}>×</button>
          )}
        </div>
      </Toolbar>

      <Table head={["Paciente", "Telefone", "Data", "Hora", "Tipo", "Status", "Ações"]} vazio={ordenados.length === 0}>
        {ordenados.map((c) => (
          <tr key={c.id}>
            <td style={{ ...td, color: T.text, fontWeight: 500 }}>{c.cliente}</td>
            <td style={td}>{c.telefone}</td>
            <td style={td}>{c.data ? dataBR(c.data) : ""}</td>
            <td style={td}>{c.hora}</td>
            <td style={td}>{c.tipo}</td>
            <td style={td}><ChipAgenda>{c.status}</ChipAgenda></td>
            <td style={{ ...td, textAlign: "right" }}>
              <select value={c.status} onChange={(e) => mudarStatus(c.id, e.target.value)} style={{ ...inputBase, padding: "5px 8px", fontSize: 12, marginRight: 6 }}>
                {STATUS_AGENDA.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => remover(c.id)} style={{ background: "none", border: "none", color: T.red, cursor: "pointer", padding: 5 }} title="Remover">✕</button>
            </td>
          </tr>
        ))}
      </Table>
      <Rodape n={ordenados.length} total={compromissos.length} />
    </div>
  );
}
/* ================== PAGAMENTOS ================== */

const FORMAS_PAGAMENTO = ["Pix", "Cartão", "Dinheiro", "Boleto"];
const CHIP_PAG = { Pendente: T.orange, Pago: T.green };

function ChipPagamento({ children }) {
  const cor = CHIP_PAG[children] || T.grey;
  return (
    <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: 6, fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap", background: cor, color: "#0C0C0D" }}>
      {children}
    </span>
  );
}

function Pagamentos({ de, ate, setDe, setAte }) {
  const [pagamentos, setPagamentos] = useLocalStorage("crm_pagamentos", []);
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("Todos");
  const [form, setForm] = useState({ cliente: "", telefone: "", descricao: "", valor: "", forma: "Pix", data: "" });

  function atualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function adicionar() {
    if (!form.cliente || !form.valor || !form.data) {
      alert("Preencha ao menos o nome do paciente, o valor e o vencimento.");
      return;
    }
    setPagamentos((lista) => [
      ...lista,
      { id: Date.now(), ...form, valor: Number(form.valor), status: "Pendente", dataPagamento: null },
    ]);
    setForm({ cliente: "", telefone: "", descricao: "", valor: "", forma: "Pix", data: "" });
  }

  function marcarPago(id) {
    setPagamentos((lista) =>
      lista.map((p) => (p.id === id ? { ...p, status: "Pago", dataPagamento: new Date().toISOString().slice(0, 10) } : p))
    );
  }

  function marcarPendente(id) {
    setPagamentos((lista) => lista.map((p) => (p.id === id ? { ...p, status: "Pendente", dataPagamento: null } : p)));
  }

  function remover(id) {
    if (confirm("Remover este lançamento?")) {
      setPagamentos((lista) => lista.filter((p) => p.id !== id));
    }
  }

  const dados = useMemo(() => {
    let l = filtrarPorPeriodo(pagamentos, de, ate);
    if (status !== "Todos") l = l.filter((p) => p.status === status);
    const q = busca.trim().toLowerCase();
    if (q) l = l.filter((p) => [p.cliente, p.telefone, p.descricao].join(" ").toLowerCase().includes(q));
    return l;
  }, [pagamentos, busca, status, de, ate]);

  const totalPendente = pagamentos.filter((p) => p.status === "Pendente").reduce((s, p) => s + p.valor, 0);
  const totalPago = pagamentos.filter((p) => p.status === "Pago").reduce((s, p) => s + p.valor, 0);
  const qtdPendente = pagamentos.filter((p) => p.status === "Pendente").length;
  const qtdPago = pagamentos.filter((p) => p.status === "Pago").length;

  const colunas = ["Paciente", "Descrição", "Valor", "Forma", "Vencimento", "Status", "Pago em"];
  const linhas = dados.map((p) => [p.cliente, p.descricao, brl(p.valor), p.forma, dataBR(p.data), p.status, p.dataPagamento ? dataBR(p.dataPagamento) : "—"]);
  const periodo = de || ate ? `Período: ${de ? dataBR(de) : "início"} a ${ate ? dataBR(ate) : "hoje"}` : null;

  return (
    <div>
      <PageHead titulo="Pagamentos" sub="Controle o que está pendente e o que já foi recebido." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14, marginBottom: 16 }}>
        <StatCard rotulo="Pendente" valor={brl(totalPendente).replace(",00", "")} icon={IconWallet} />
        <StatCard rotulo="Recebido" valor={brl(totalPago).replace(",00", "")} icon={IconCheck} />
        <StatCard rotulo="Lançamentos pendentes" valor={qtdPendente} icon={IconDoc} />
        <StatCard rotulo="Lançamentos pagos" valor={qtdPago} icon={IconDoc} />
      </div>

      <Panel style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 14 }}>Novo lançamento</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 12 }}>
          <input style={inputBase} placeholder="Nome do paciente" value={form.cliente} onChange={(e) => atualizar("cliente", e.target.value)} />
          <input style={inputBase} placeholder="Telefone" value={form.telefone} onChange={(e) => atualizar("telefone", e.target.value)} />
          <input style={inputBase} placeholder="Descrição (ex: Consulta)" value={form.descricao} onChange={(e) => atualizar("descricao", e.target.value)} />
          <input style={inputBase} type="number" placeholder="Valor (R$)" value={form.valor} onChange={(e) => atualizar("valor", e.target.value)} />
          <Select value={form.forma} onChange={(v) => atualizar("forma", v)} options={FORMAS_PAGAMENTO} />
          <input style={{ ...inputBase, colorScheme: "dark" }} type="date" value={form.data} onChange={(e) => atualizar("data", e.target.value)} />
        </div>
        <GoldButton icon={IconPlus} onClick={adicionar}>Lançar</GoldButton>
      </Panel>

      <Toolbar>
        <SearchInput value={busca} onChange={setBusca} placeholder="Buscar por paciente, telefone ou descrição..." />
        <Select value={status} onChange={setStatus} options={["Todos", "Pendente", "Pago"]} />
        <DateRange de={de} ate={ate} setDe={setDe} setAte={setAte} />
        <ExportBar titulo="Pagamentos" colunas={colunas} linhas={linhas} periodo={periodo} />
      </Toolbar>

      <Table head={[...colunas, "Ações"]} vazio={dados.length === 0}>
        {dados.map((p) => (
          <tr key={p.id}>
            <td style={{ ...td, color: T.text, fontWeight: 500 }}>{p.cliente}</td>
            <td style={td}>{p.descricao}</td>
            <td style={{ ...td, color: T.gold, fontWeight: 600 }}>{brl(p.valor)}</td>
            <td style={td}>{p.forma}</td>
            <td style={td}>{dataBR(p.data)}</td>
            <td style={td}><ChipPagamento>{p.status}</ChipPagamento></td>
            <td style={td}>{p.dataPagamento ? dataBR(p.dataPagamento) : "—"}</td>
            <td style={{ ...td, textAlign: "right" }}>
              {p.status === "Pendente" ? (
                <GhostButton onClick={() => marcarPago(p.id)}>Marcar pago</GhostButton>
              ) : (
                <GhostButton onClick={() => marcarPendente(p.id)}>Reabrir</GhostButton>
              )}
              <button onClick={() => remover(p.id)} style={{ background: "none", border: "none", color: T.red, cursor: "pointer", padding: 5, marginLeft: 6 }} title="Remover">✕</button>
            </td>
          </tr>
        ))}
      </Table>
      <Rodape n={dados.length} total={pagamentos.length} />
    </div>
  );
}
/* ================== KANBAN DE LEADS ================== */

const ETAPAS_KANBAN = ["Novo lead", "Em atendimento", "Follow up", "Agendado", "Paciente", "Sem interesse"];
const COR_ETAPA = {
  "Novo lead": T.gold,
  "Em atendimento": T.blue,
  "Follow up": T.orange,
  "Agendado": T.goldLight,
  "Paciente": T.green,
  "Sem interesse": T.grey,
};

function CartaoLead({ lead, onMover, onRemover, arrastando, setArrastando }) {
  return (
    <div
      draggable
      onDragStart={() => setArrastando(lead.id)}
      onDragEnd={() => setArrastando(null)}
      style={{
        background: T.card,
        border: `1px solid ${T.borderSoft}`,
        borderRadius: 9,
        padding: 12,
        marginBottom: 10,
        cursor: "grab",
        opacity: arrastando === lead.id ? 0.4 : 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 6 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{lead.nome}</div>
        <CopyButton texto={`${lead.nome}\n${lead.telefone}\nOrigem: ${lead.origem}\nEtapa: ${lead.etapa}`} title="Copiar dados" />
      </div>
      <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{lead.telefone}</div>
      {lead.origem && <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>Origem: {lead.origem}</div>}
      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <select
          value={lead.etapa}
          onChange={(e) => onMover(lead.id, e.target.value)}
          style={{ ...inputBase, flex: 1, padding: "5px 8px", fontSize: 11.5 }}
        >
          {ETAPAS_KANBAN.map((e) => (
            <option key={e} value={e}>{e}</option>
          ))}
        </select>
        <button onClick={() => onRemover(lead.id)} style={{ background: "none", border: "none", color: T.red, cursor: "pointer", padding: 4 }} title="Remover">✕</button>
      </div>
    </div>
  );
}

function Kanban() {
  const [leads, setLeads] = useLocalStorage("crm_leads", []);
  const [form, setForm] = useState({ nome: "", telefone: "", origem: "WhatsApp" });
  const [arrastando, setArrastando] = useState(null);

  function atualizar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function adicionar() {
    if (!form.nome || !form.telefone) {
      alert("Preencha ao menos o nome e o telefone do lead.");
      return;
    }
    setLeads((lista) => [...lista, { id: Date.now(), ...form, etapa: "Novo lead" }]);
    setForm({ nome: "", telefone: "", origem: "WhatsApp" });
  }

  function mover(id, etapa) {
    setLeads((lista) => lista.map((l) => (l.id === id ? { ...l, etapa } : l)));
  }

  function remover(id) {
    if (confirm("Remover este lead?")) {
      setLeads((lista) => lista.filter((l) => l.id !== id));
    }
  }

  return (
    <div>
      <PageHead titulo="Kanban de leads" sub="Arraste os cartões entre as colunas ou use o seletor de etapa." />

      <Panel style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 14 }}>Novo lead</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10, marginBottom: 12 }}>
          <input style={inputBase} placeholder="Nome" value={form.nome} onChange={(e) => atualizar("nome", e.target.value)} />
          <input style={inputBase} placeholder="Telefone" value={form.telefone} onChange={(e) => atualizar("telefone", e.target.value)} />
          <Select value={form.origem} onChange={(v) => atualizar("origem", v)} options={["WhatsApp", "Instagram", "Ligação", "Site", "Indicação"]} />
        </div>
        <GoldButton icon={IconPlus} onClick={adicionar}>Adicionar lead</GoldButton>
      </Panel>

      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
        {ETAPAS_KANBAN.map((etapa) => {
          const doEtapa = leads.filter((l) => l.etapa === etapa);
          return (
            <div
              key={etapa}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => arrastando && mover(arrastando, etapa)}
              style={{ minWidth: 230, flex: "0 0 230px", background: T.panel, border: `1px solid ${T.borderSoft}`, borderRadius: 10, padding: 12 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: COR_ETAPA[etapa] }} />
                <span style={{ fontSize: 12.5, fontWeight: 600, color: T.text }}>{etapa}</span>
                <span style={{ fontSize: 11.5, color: T.muted, marginLeft: "auto" }}>{doEtapa.length}</span>
              </div>
              {doEtapa.map((lead) => (
                <CartaoLead key={lead.id} lead={lead} onMover={mover} onRemover={remover} arrastando={arrastando} setArrastando={setArrastando} />
              ))}
              {doEtapa.length === 0 && (
                <div style={{ fontSize: 11.5, color: T.muted, textAlign: "center", padding: "16px 0" }}>Nenhum lead aqui</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Configuracoes() {
  const [prefs, setPrefs] = useState({ email: true, whatsapp: true, escuro: true });
  const toggle = (k) => setPrefs((p) => ({ ...p, [k]: !p[k] }));
  const linhas = [
    ["email", "Notificações por e-mail"],
    ["whatsapp", "Notificações no WhatsApp"],
    ["escuro", "Tema escuro"],
  ];
  return (
    <div>
      <PageHead titulo="Configurações" sub="Personalize o sistema do seu jeito." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
        <Panel>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: T.text }}>Perfil</div>
            <GoldButton>Editar perfil</GoldButton>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11.5, color: T.muted, marginBottom: 5 }}>Nome</div>
              <div style={{ fontSize: 13.5, color: T.text }}>Yasmin</div>
            </div>
            <div>
              <div style={{ fontSize: 11.5, color: T.muted, marginBottom: 5 }}>E-mail</div>
              <div style={{ fontSize: 13.5, color: T.text }}>yasmin@email.com</div>
            </div>
          </div>
        </Panel>

        <Panel>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 16 }}>Preferências</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {linhas.map(([k, rotulo]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                <span style={{ fontSize: 13, color: T.textMid }}>{rotulo}</span>
                <button
                  onClick={() => toggle(k)}
                  aria-pressed={prefs[k]}
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 999,
                    border: "none",
                    background: prefs[k] ? T.gold : T.cardAlt,
                    position: "relative",
                    cursor: "pointer",
                    transition: "background .15s",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 3,
                      left: prefs[k] ? 21 : 3,
                      width: 16,
                      height: 16,
                      borderRadius: 999,
                      background: prefs[k] ? "#14120A" : T.muted,
                      transition: "left .15s",
                    }}
                  />
                </button>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 14 }}>Sobre o sistema</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Butterfly size={22} />
            <div>
              <div style={{ fontSize: 13.5, color: T.text, fontWeight: 600 }}>CRM Vendas v1.00</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>Feito para impulsionar suas vendas.</div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Rodape({ n, total }) {
  return (
    <div style={{ marginTop: 12, fontSize: 12.5, color: T.muted }}>
      Mostrando {n} de {total} registros
    </div>
  );
}

/* ================== LOGO + SHELL ================== */

function Logo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "22px 0 26px" }}>
      <Butterfly size={15} />
      <div style={{ fontSize: 21, fontWeight: 700, color: T.gold, letterSpacing: "0.02em", lineHeight: 1 }}>CRM</div>
      <div style={{ fontSize: 9, fontWeight: 600, color: T.goldDim, letterSpacing: "0.34em", marginLeft: "0.34em" }}>VENDAS</div>
    </div>
  );
}

const MENU = [
  { id: "inicio", rotulo: "Início", icon: IconHome },
  { id: "agenda", rotulo: "Agenda", icon: IconCalendar },
  { id: "kanban", rotulo: "Kanban de leads", icon: IconKanban },
  { id: "pagamentos", rotulo: "Pagamentos", icon: IconWallet },
  { id: "clientes", rotulo: "Clientes", icon: IconUser },
  { id: "contatos", rotulo: "Contatos", icon: IconChat },
  { id: "orcamentos", rotulo: "Orçamentos", icon: IconDoc },
  { id: "funil", rotulo: "Funil de Vendas", icon: IconFunnel },
  { id: "relatorios", rotulo: "Relatórios", icon: IconChart },
];

export default function App() {
  const [aba, setAba] = useState("inicio");
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);

  const props = { de, ate, setDe, setAte };
      const telas = {
    inicio: <Inicio {...props} />,
    agenda: <Agenda />,
    kanban: <Kanban />,
    pagamentos: <Pagamentos {...props} />,
    clientes: <Clientes {...props} />,
    contatos: <Contatos {...props} />,
    orcamentos: <Orcamentos {...props} />,
    funil: <Funil {...props} />,
    relatorios: <Relatorios {...props} />,
    config: <Configuracoes />,
  };
   
  const itemStyle = (ativo) => ({
    display: "flex",
    alignItems: "center",
    gap: 11,
    width: "100%",
    padding: "10px 13px",
    borderRadius: 9,
    border: "none",
    cursor: "pointer",
    background: ativo ? T.gold + "1C" : "transparent",
    color: ativo ? T.gold : T.muted,
    fontSize: 13.5,
    fontWeight: ativo ? 600 : 500,
    textAlign: "left",
    fontFamily: FONT,
    boxShadow: ativo ? `inset 2px 0 0 ${T.gold}` : "none",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg, fontFamily: FONT, color: T.text }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 200,
          background: T.panel,
          borderRight: `1px solid ${T.borderSoft}`,
          display: "flex",
          flexDirection: "column",
          padding: "0 12px 18px",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
        }}
        className="crm-sidebar"
        data-aberto={menuAberto}
      >
        <Logo />
        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {MENU.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setAba(m.id);
                setMenuAberto(false);
              }}
              style={itemStyle(aba === m.id)}
            >
              <m.icon size={16} />
              {m.rotulo}
            </button>
          ))}
        </nav>
        <button onClick={() => setAba("config")} style={itemStyle(aba === "config")}>
          <IconGear size={16} />
          Configurações
        </button>
      </aside>

      {/* Conteúdo */}
      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: 56,
            borderBottom: `1px solid ${T.borderSoft}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 26px",
            gap: 12,
          }}
        >
          <button
            onClick={() => setMenuAberto((v) => !v)}
            className="crm-burger"
            style={{ display: "none", background: "none", border: "none", color: T.gold, cursor: "pointer", fontSize: 20 }}
          >
            ☰
          </button>
          <div style={{ flex: 1 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 13, color: T.textMid }}>
            <span
              style={{
                width: 27,
                height: 27,
                borderRadius: 999,
                background: T.gold + "22",
                border: `1px solid ${T.gold}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: T.gold,
              }}
            >
              <IconUser size={14} />
            </span>
            Yasmin
          </div>
        </header>

        <div style={{ padding: "26px 26px 40px", flex: 1 }}>{telas[aba]}</div>
      </main>

      <style>{`
        *::-webkit-scrollbar{height:8px;width:8px}
        *::-webkit-scrollbar-track{background:${T.panel}}
        *::-webkit-scrollbar-thumb{background:${T.border};border-radius:8px}
        input::placeholder{color:${T.muted}}
        button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid ${T.gold};outline-offset:2px}
        input[type=date]::-webkit-calendar-picker-indicator{filter:invert(.7) sepia(1) saturate(4) hue-rotate(2deg);cursor:pointer}
        @media (max-width: 860px){
          .crm-sidebar{position:fixed;z-index:50;transform:translateX(-100%);transition:transform .2s}
          .crm-sidebar[data-aberto="true"]{transform:translateX(0)}
          .crm-burger{display:block !important}
        }
        @media (prefers-reduced-motion: reduce){*{transition:none !important}}
      `}</style>
    </div>
  );
}
