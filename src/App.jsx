import React, { useState, useEffect, useMemo } from "react";

/* ==========================================================
   CRM VENDAS — versão atualizada
   - Tema claro/escuro
   - Contatos funcionando
   - Edição em contatos, clientes, orçamentos, pagamentos e agenda
   - WhatsApp em formato de bolinha
   - Agendamento direto pelo Kanban
   - Agenda visual estilo Google Calendar
   - Agendamentos do Kanban aparecem automaticamente na Agenda
   - Dados persistidos no localStorage
   ========================================================== */

/* ================== TEMAS ================== */

const TEMAS = {
  escuro: {
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
    input: "#0F0F12",
  },
  claro: {
    bg: "#F5F5F7",
    panel: "#FFFFFF",
    card: "#FFFFFF",
    cardAlt: "#F0F0F3",
    border: "#DCDCE2",
    borderSoft: "#E7E7EB",
    gold: "#A87813",
    goldLight: "#C99A31",
    goldDim: "#D8BD78",
    text: "#18181B",
    textMid: "#55555D",
    muted: "#777780",
    green: "#27834E",
    blue: "#3E68B3",
    red: "#B53C3C",
    orange: "#B86B29",
    grey: "#777780",
    input: "#FAFAFB",
  },
};

let T = { ...TEMAS.escuro };
const FONT = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/* ================== ÍCONES ================== */

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

const IconArchiveBox = ic(
  <>
    <rect x="3" y="4" width="18" height="5" rx="1.5" />
    <path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9" />
    <path d="M10 13h4" />
  </>
);

const IconRestore = ic(
  <>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
  </>
);

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

const IconSun = ic(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
  </>
);

const IconMoon = ic(
  <path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
);

const IconX = ic(
  <>
    <path d="m6 6 12 12M18 6 6 18" />
  </>
);

/* ================== LOGO ================== */

function Butterfly({ size = 13, color = T.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
      <path d="M12 6.4c0-.5.4-.9.9-.9.4 0 .7.2.9.5C15.3 4.1 17.4 3 19.2 3c2 0 3.3 1.4 3.3 3.5 0 3-2.4 5.7-6.1 7.2 1.5.5 2.5 1.6 2.5 2.9 0 1.5-1.2 2.6-2.8 2.6-1.6 0-2.9-1-3.6-2.6-.2.1-.3.1-.5.1s-.3 0-.5-.1c-.7 1.6-2 2.6-3.6 2.6-1.6 0-2.8-1.1-2.8-2.6 0-1.3 1-2.4 2.5-2.9C4.4 12.2 2 9.5 2 6.5 2 4.4 3.3 3 5.3 3c1.8 0 3.9 1.1 5.4 3 .2-.3.5-.5.9-.5.5 0 .9.4.9.9Z" />
      <path d="M11.35 7.2h1.3l-.35 11.4h-.6l-.35-11.4Z" fill={T.bg} opacity="0.55" />
    </svg>
  );
}

/* ================== DADOS ================== */

let proximoId = 1000;
const gerarId = () => ++proximoId;

const pacientesIniciais = [
  { id: 1, nome: "Maria Souza", telefone: "(51) 99999-1111", cidade: "Osório", status: "Paciente", data: "2026-08-12", arquivado: false },
  { id: 2, nome: "Carlos Lima", telefone: "(51) 98888-2222", cidade: "Tramandaí", status: "Em atendimento", data: "2026-08-11", arquivado: false },
  { id: 3, nome: "Juliana Alves", telefone: "(51) 97777-3333", cidade: "Imbé", status: "Follow up", data: "2026-08-10", arquivado: false },
  { id: 4, nome: "Roberto Silva", telefone: "(51) 96666-4444", cidade: "Osório", status: "Novo lead", data: "2026-09-16", arquivado: false },
  { id: 5, nome: "Ana Paula", telefone: "(51) 95555-5555", cidade: "Tramandaí", status: "Paciente", data: "2026-08-08", arquivado: false },
  { id: 6, nome: "Fernando Costa", telefone: "(51) 94444-6666", cidade: "Capão da Canoa", status: "Sem interesse", data: "2026-08-07", arquivado: false },
  { id: 7, nome: "Beatriz Rocha", telefone: "(51) 93333-7777", cidade: "Osório", status: "Agendado", data: "2026-09-15", arquivado: false },
  { id: 8, nome: "Rafael Moreira", telefone: "(51) 92222-8888", cidade: "Imbé", status: "Em atendimento", data: "2026-08-30", arquivado: false },
];

const orcamentosIniciais = [];

const agendaInicial = [
  { id: 101, paciente: "Maria Souza", telefone: "(51) 99999-1111", data: "2026-09-18", hora: "09:00", tipo: "Consulta", status: "Agendado", obs: "" },
  { id: 102, paciente: "Beatriz Rocha", telefone: "(51) 93333-7777", data: "2026-09-18", hora: "10:30", tipo: "Avaliação", status: "Agendado", obs: "" },
  { id: 103, paciente: "Ana Paula", telefone: "(51) 95555-5555", data: "2026-09-15", hora: "14:00", tipo: "Retorno", status: "Concluído", obs: "" },
  { id: 104, paciente: "Carlos Lima", telefone: "(51) 98888-2222", data: "2026-09-22", hora: "11:00", tipo: "Consulta", status: "Agendado", obs: "" },
  { id: 105, paciente: "Juliana Alves", telefone: "(51) 97777-3333", data: "2026-09-12", hora: "09:30", tipo: "Consulta", status: "Cancelado", obs: "" },
  { id: 106, paciente: "Rafael Moreira", telefone: "(51) 92222-8888", data: "2026-09-25", hora: "16:00", tipo: "Avaliação", status: "Agendado", obs: "" },
];

const pagamentosIniciais = [
  { id: 201, cliente: "Maria Souza", telefone: "(51) 99999-1111", descricao: "Consulta", valor: 450, data: "2026-09-10", status: "Pago", forma: "Pix", dataPagamento: "2026-09-10" },
  { id: 202, cliente: "Ana Paula", telefone: "(51) 95555-5555", descricao: "Consulta", valor: 680, data: "2026-09-05", status: "Pago", forma: "Cartão", dataPagamento: "2026-09-05" },
  { id: 203, cliente: "Beatriz Rocha", telefone: "(51) 93333-7777", descricao: "Avaliação", valor: 320, data: "2026-09-22", status: "Pendente", forma: "Pix", dataPagamento: null },
  { id: 204, cliente: "Carlos Lima", telefone: "(51) 98888-2222", descricao: "Consulta", valor: 900, data: "2026-09-25", status: "Pendente", forma: "Pix", dataPagamento: null },
  { id: 205, cliente: "Rafael Moreira", telefone: "(51) 92222-8888", descricao: "Retorno", valor: 250, data: "2026-08-30", status: "Pendente", forma: "Pix", dataPagamento: null },
];

const contatosIniciais = [
  { id: 301, nome: "Patrícia Gomes", telefone: "(51) 99111-2233", origem: "WhatsApp", status: "Novo contato", data: "2026-09-17" },
  { id: 302, nome: "Eduardo Nunes", telefone: "(51) 98222-3344", origem: "Instagram", status: "Em atendimento", data: "2026-09-16" },
  { id: 303, nome: "Camila Reis", telefone: "(51) 97333-4455", origem: "Indicação", status: "Retorno agendado", data: "2026-09-14" },
  { id: 304, nome: "Thiago Barros", telefone: "(51) 96444-5566", origem: "Site", status: "Orçamento enviado", data: "2026-09-10" },
  { id: 305, nome: "Larissa Dias", telefone: "(51) 95555-6677", origem: "Ligação", status: "Cliente em potencial", data: "2026-09-05" },
  { id: 306, nome: "Bruno Castro", telefone: "(51) 94666-7788", origem: "WhatsApp", status: "Em retorno", data: "2026-09-01" },
];

/* ================== HELPERS ================== */

const brl = (n) =>
  "R$ " +
  Number(n || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const dataBR = (iso) => {
  if (!iso) return "";
  const [a, m, d] = iso.split("-");
  return `${d}/${m}/${a}`;
};

function hojeISO() {
  return new Date().toISOString().slice(0, 10);
}

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

function filtrarPorPeriodo(lista, de, ate) {
  return lista.filter((r) => {
    const data = r.data || r.vencimento;
    if (!data) return true;
    if (de && data < de) return false;
    if (ate && data > ate) return false;
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

function exportarExcel(nomeArquivo, colunas, linhas) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [
    colunas.map(esc).join(";"),
    ...linhas.map((l) => l.map(esc).join(";")),
  ].join("\r\n");

  baixarArquivo(`${nomeArquivo}.csv`, csv, "text/csv;charset=utf-8;");
}

function exportarPDF(titulo, colunas, linhas, periodo) {
  const w = window.open("", "_blank");
  if (!w) return alert("Libere os pop-ups do navegador para gerar o PDF.");

  const th = colunas.map((c) => `<th>${c}</th>`).join("");
  const tr = linhas
    .map((l) => `<tr>${l.map((c) => `<td>${c ?? ""}</td>`).join("")}</tr>`)
    .join("");

  w.document.write(`
    <!doctype html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <title>${titulo}</title>
      <style>
        *{box-sizing:border-box}
        body{font-family:Arial,sans-serif;margin:32px;color:#16161a}
        h1{font-size:18px}
        .sub{font-size:11px;color:#6b6b73;margin:8px 0 18px}
        table{width:100%;border-collapse:collapse;font-size:11px}
        th{background:#16161a;color:#fff;text-align:left;padding:8px 10px}
        td{padding:7px 10px;border-bottom:1px solid #e6e6ea}
      </style>
    </head>
    <body>
      <h1>CRM VENDAS · ${titulo}</h1>
      <div class="sub">${periodo || "Todos os registros"} | Gerado em ${new Date().toLocaleString("pt-BR")}</div>
      <table>
        <thead><tr>${th}</tr></thead>
        <tbody>${tr}</tbody>
      </table>
    </body>
    </html>
  `);

  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 350);
}

function linkWhatsApp(telefone) {
  const digitos = String(telefone || "").replace(/\D/g, "");
  if (!digitos) return "#";
  return `https://wa.me/${digitos.length <= 11 ? "55" + digitos : digitos}`;
}

/* ================== CHIP ================== */

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
  "Novo lead": T.blue,
  "Follow up": T.orange,
  Agendado: "#8B5FBF",
  Paciente: T.green,
  "Sem interesse": T.grey,
  Concluído: T.green,
  Cancelado: T.red,
  Pendente: T.gold,
  Pago: T.green,
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
        color: solido ? "#fff" : cor,
        border: solido ? "none" : `1px solid ${cor}55`,
      }}
    >
      {children}
    </span>
  );
}

/* ================== BOTÕES ================== */

function BotaoWhatsApp({ telefone, pequeno = false }) {
  if (!telefone) return null;

  return (
    <a
      href={linkWhatsApp(telefone)}
      target="_blank"
      rel="noopener noreferrer"
      title="Abrir WhatsApp"
      style={{
        width: pequeno ? 29 : 34,
        height: pequeno ? 29 : 34,
        borderRadius: "50%",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: T.green + "18",
        color: T.green,
        border: `1px solid ${T.green}55`,
        textDecoration: "none",
        flexShrink: 0,
      }}
    >
      <IconChat size={pequeno ? 14 : 16} />
    </a>
  );
}

function BotaoAgendarIcon({ onClick, title = "Agendar" }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: T.gold + "18",
        border: `1px solid ${T.gold}55`,
        color: T.gold,
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconCalendar size={15} />
    </button>
  );
}

function GoldButton({ children, onClick, icon: Ic, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
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
        justifyContent: "center",
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

function IconButton({ children, onClick, title, danger = false }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 32,
        height: 32,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        background: "transparent",
        border: `1px solid ${danger ? T.red + "55" : T.border}`,
        color: danger ? T.red : T.muted,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

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
      navigator.clipboard
        .writeText(texto)
        .then(done)
        .catch(() => {
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

/* ================== BASE ================== */

const inputBase = {
  background: T.input,
  border: `1px solid ${T.border}`,
  borderRadius: 8,
  color: T.text,
  fontSize: 13,
  padding: "9px 12px",
  fontFamily: FONT,
  outline: "none",
};

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
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 18,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 26,
            fontWeight: 700,
            color: T.text,
            letterSpacing: "-0.02em",
          }}
        >
          {titulo}
        </h1>
        {sub && (
          <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>
            {sub}
          </div>
        )}
      </div>
      {acao}
    </div>
  );
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
      <span
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: T.muted,
          display: "flex",
        }}
      >
        <IconSearch size={15} />
      </span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          ...inputBase,
          width: "100%",
          paddingLeft: 36,
        }}
      />
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...inputBase,
        minWidth: 140,
        cursor: "pointer",
      }}
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function DateRange({ de, ate, setDe, setAte }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: T.input,
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
        style={{
          ...inputBase,
          border: "none",
          background: "transparent",
          padding: "4px 2px",
          colorScheme: T === TEMAS.escuro ? "dark" : "light",
          width: 126,
        }}
      />

      <span style={{ color: T.muted, fontSize: 12 }}>até</span>

      <input
        type="date"
        value={ate}
        onChange={(e) => setAte(e.target.value)}
        style={{
          ...inputBase,
          border: "none",
          background: "transparent",
          padding: "4px 2px",
          colorScheme: T === TEMAS.escuro ? "dark" : "light",
          width: 126,
        }}
      />

      {(de || ate) && (
        <button
          onClick={() => {
            setDe("");
            setAte("");
          }}
          style={{
            background: "none",
            border: "none",
            color: T.muted,
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}

function Toolbar({ children }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function Table({ head, children, vazio }) {
  return (
    <Panel pad={0} style={{ overflow: "hidden" }}>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
            minWidth: 700,
          }}
        >
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
        <div
          style={{
            padding: "34px 20px",
            textAlign: "center",
            color: T.muted,
            fontSize: 13,
          }}
        >
          Nenhum registro encontrado.
        </div>
      )}
    </Panel>
  );
}

const td = {
  padding: "13px 18px",
  borderBottom: `1px solid ${T.borderSoft}`,
  color: T.textMid,
  whiteSpace: "nowrap",
};

function Rodape({ n, total }) {
  return (
    <div style={{ marginTop: 12, fontSize: 12.5, color: T.muted }}>
      Mostrando {n} de {total} registros
    </div>
  );
}

function ExportBar({ titulo, colunas, linhas, periodo }) {
  const textoTudo = [
    colunas.join("\t"),
    ...linhas.map((l) => l.join("\t")),
  ].join("\n");

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <GhostButton
        icon={IconPdf}
        onClick={() => exportarPDF(titulo, colunas, linhas, periodo)}
      >
        PDF
      </GhostButton>

      <GhostButton
        icon={IconSheet}
        onClick={() =>
          exportarExcel(
            titulo.toLowerCase().replace(/\s+/g, "-"),
            colunas,
            linhas
          )
        }
      >
        Planilha
      </GhostButton>

      <CopyButton texto={textoTudo} label="Copiar tabela" />
    </div>
  );
}

/* ==========================================================
   MODAL DE EDIÇÃO
   ========================================================== */

function Modal({ titulo, children, onClose, largura = 600 }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.62)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: largura,
          maxHeight: "90vh",
          overflowY: "auto",
          background: T.card,
          border: `1px solid ${T.border}`,
          borderRadius: 14,
          boxShadow: "0 25px 80px rgba(0,0,0,.35)",
        }}
      >
        <div
          style={{
            padding: "16px 18px",
            borderBottom: `1px solid ${T.borderSoft}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <strong style={{ color: T.text, fontSize: 16 }}>{titulo}</strong>

          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: T.muted,
              cursor: "pointer",
            }}
          >
            <IconX size={18} />
          </button>
        </div>

        <div style={{ padding: 18 }}>{children}</div>
      </div>
    </div>
  );
}

function Campo({ label, children }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 11.5, color: T.muted }}>{label}</span>
      {children}
    </label>
  );
}

/* ==========================================================
   INÍCIO
   ========================================================== */

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

        <span style={{ fontSize: 12.5, color: T.muted }}>
          {rotulo}
        </span>

        <div style={{ display: "flex", alignItems: "baseline", gap: 9 }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: T.text,
            }}
          >
            {valor}
          </span>

          {delta && (
            <span
              style={{
                fontSize: 12,
                color: T.green,
                fontWeight: 600,
              }}
            >
              <IconArrowUp size={11} /> {delta}
            </span>
          )}
        </div>
      </div>
    </Panel>
  );
}

function Donut({ dados, total, legendaCentro }) {
  const R = 52;
  const SW = 16;
  const C = 2 * Math.PI * R;
  let acc = 0;
  const soma = dados.reduce((s, d) => s + d.valor, 0) || 1;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 26,
        flexWrap: "wrap",
      }}
    >
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle
          cx="70"
          cy="70"
          r={R}
          fill="none"
          stroke={T.cardAlt}
          strokeWidth={SW}
        />

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
            />
          );

          acc += frac;
          return el;
        })}

        <text
          x="70"
          y="66"
          textAnchor="middle"
          fill={T.text}
          fontSize="24"
          fontWeight="700"
          fontFamily={FONT}
        >
          {total}
        </text>

        <text
          x="70"
          y="83"
          textAnchor="middle"
          fill={T.muted}
          fontSize="10.5"
          fontFamily={FONT}
        >
          {legendaCentro}
        </text>
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {dados.map((d, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              fontSize: 12.5,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: d.cor,
              }}
            />

            <span style={{ color: T.textMid }}>{d.rotulo}</span>
            <strong style={{ color: T.text }}>{d.valor}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function Inicio({ de, ate, setDe, setAte }) {
  const [clientes] = useLocalStorage("crm_pacientes", pacientesIniciais);
  const [orcamentos] = useLocalStorage("crm_orcamentos", orcamentosIniciais);

  const cli = filtrarPorPeriodo(clientes, de, ate);
  const orc = filtrarPorPeriodo(orcamentos, de, ate);

  const fechadas = orc.filter((o) => o.status === "Aprovado").length;
  const negoc =
    cli.filter((c) => c.status === "Em atendimento").length +
    orc.filter((o) => o.status === "Em negociação").length;

  return (
    <div>
      <PageHead
        titulo="Olá, Yasmin!"
        sub="Aqui está um resumo do seu dia."
        acao={
          <DateRange
            de={de}
            ate={ate}
            setDe={setDe}
            setAte={setAte}
          />
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))",
          gap: 14,
          marginBottom: 16,
        }}
      >
        <StatCard rotulo="Total de clientes" valor={cli.length} icon={IconUser} />
        <StatCard rotulo="Em atendimento" valor={negoc} icon={IconChat} />
        <StatCard rotulo="Orçamentos enviados" valor={orc.length} icon={IconDoc} />
        <StatCard rotulo="Vendas fechadas" valor={fechadas} icon={IconCheck} />
      </div>

      <Panel>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: T.text,
            marginBottom: 18,
          }}
        >
          Resumo de vendas
        </div>

        <Donut
          total={fechadas}
          legendaCentro="fechadas"
          dados={[
            { rotulo: "Fechadas", valor: fechadas, cor: T.gold },
            { rotulo: "Em atendimento", valor: negoc, cor: T.blue },
            {
              rotulo: "Outros",
              valor: Math.max(cli.length - negoc, 0),
              cor: T.grey,
            },
          ]}
        />
      </Panel>
    </div>
  );
}

/* ==========================================================
   CLIENTES
   ========================================================== */

function Pacientes({ de, ate, setDe, setAte, aoAgendar }) {
  const [pacientes, setPacientes] = useLocalStorage(
    "crm_pacientes",
    pacientesIniciais
  );

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("Todos");
  const [verArquivados, setVerArquivados] = useState(false);
  const [editando, setEditando] = useState(null);

  function novoPaciente() {
    setEditando({
      id: null,
      nome: "",
      telefone: "",
      cidade: "",
      status: "Novo lead",
      data: hojeISO(),
      arquivado: false,
    });
  }

  function salvar() {
    if (!editando.nome.trim()) {
      alert("Informe o nome.");
      return;
    }

    if (editando.id) {
      setPacientes((lista) =>
        lista.map((p) =>
          p.id === editando.id
            ? { ...editando, data: hojeISO() }
            : p
        )
      );
    } else {
      setPacientes((lista) => [
        ...lista,
        {
          ...editando,
          id: gerarId(),
          data: hojeISO(),
        },
      ]);
    }

    setEditando(null);
  }

  const dados = useMemo(() => {
    let l = pacientes.filter((p) =>
      verArquivados ? p.arquivado : !p.arquivado
    );

    l = filtrarPorPeriodo(l, de, ate);

    if (status !== "Todos") {
      l = l.filter((c) => c.status === status);
    }

    const q = busca.trim().toLowerCase();

    if (q) {
      l = l.filter((c) =>
        [c.nome, c.telefone, c.cidade]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    return l;
  }, [pacientes, busca, status, de, ate, verArquivados]);

  return (
    <div>
      <PageHead
        titulo="Clientes"
        sub="Gerencie seus clientes."
        acao={
          <div style={{ display: "flex", gap: 8 }}>
            <GhostButton
              icon={verArquivados ? IconRestore : IconArchiveBox}
              onClick={() => setVerArquivados((v) => !v)}
            >
              {verArquivados ? "Ver ativos" : "Ver arquivados"}
            </GhostButton>

            <GoldButton icon={IconPlus} onClick={novoPaciente}>
              Novo cliente
            </GoldButton>
          </div>
        }
      />

      <Toolbar>
        <SearchInput
          value={busca}
          onChange={setBusca}
          placeholder="Buscar cliente..."
        />

        <Select
          value={status}
          onChange={setStatus}
          options={[
            "Todos",
            "Novo lead",
            "Em atendimento",
            "Follow up",
            "Agendado",
            "Paciente",
            "Sem interesse",
          ]}
        />

        <DateRange
          de={de}
          ate={ate}
          setDe={setDe}
          setAte={setAte}
        />
      </Toolbar>

      <Table
        head={[
          "Nome",
          "Telefone",
          "Cidade",
          "Status",
          "Último contato",
          "Ações",
        ]}
        vazio={!dados.length}
      >
        {dados.map((c) => (
          <tr key={c.id}>
            <td style={{ ...td, color: T.text, fontWeight: 600 }}>
              {c.nome}
            </td>

            <td style={td}>{c.telefone}</td>
            <td style={td}>{c.cidade}</td>
            <td style={td}>
              <Chip>{c.status}</Chip>
            </td>
            <td style={td}>{dataBR(c.data)}</td>

            <td style={{ ...td, textAlign: "right" }}>
              <span
                style={{
                  display: "inline-flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <BotaoWhatsApp telefone={c.telefone} pequeno />

                               <BotaoAgendarIcon
                  title="Agendar atendimento"
                  onClick={() => aoAgendar(c.nome, c.telefone)}
                />

                <IconButton
                  title="Editar cliente"
                  onClick={() => setEditando({ ...c })}
                >
                  <IconPen size={14} />
                </IconButton>

                <IconButton
                  danger
                  title={verArquivados ? "Restaurar" : "Arquivar"}
                  onClick={() =>
                    setPacientes((lista) =>
                      lista.map((p) =>
                        p.id === c.id
                          ? { ...p, arquivado: !p.arquivado }
                          : p
                      )
                    )
                  }
                >
                  {verArquivados ? (
                    <IconRestore size={14} />
                  ) : (
                    <IconArchiveBox size={14} />
                  )}
                </IconButton>
              </span>
            </td>
          </tr>
        ))}
      </Table>

      <Rodape n={dados.length} total={pacientes.length} />

      {editando && (
        <Modal
          titulo={editando.id ? "Editar cliente" : "Novo cliente"}
          onClose={() => setEditando(null)}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Campo label="Nome">
              <input
                style={inputBase}
                value={editando.nome}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    nome: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Telefone / WhatsApp">
              <input
                style={inputBase}
                value={editando.telefone}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    telefone: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Cidade">
              <input
                style={inputBase}
                value={editando.cidade}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    cidade: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Status">
              <Select
                value={editando.status}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    status: v,
                  })
                }
                options={[
                  "Novo lead",
                  "Em atendimento",
                  "Follow up",
                  "Agendado",
                  "Paciente",
                  "Sem interesse",
                ]}
              />
            </Campo>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 18,
            }}
          >
            <GhostButton onClick={() => setEditando(null)}>
              Cancelar
            </GhostButton>

            <GoldButton onClick={salvar}>
              Salvar alterações
            </GoldButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ==========================================================
   CONTATOS — BOTÃO AGORA FUNCIONA
   ========================================================== */

function Contatos({ de, ate, setDe, setAte, aoAgendar }) {
  const [contatos, setContatos] = useLocalStorage(
    "crm_contatos",
    contatosIniciais
  );

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("Todos");
  const [origem, setOrigem] = useState("Todas as origens");
  const [editando, setEditando] = useState(null);

  function novoContato() {
    setEditando({
      id: null,
      nome: "",
      telefone: "",
      origem: "WhatsApp",
      status: "Novo contato",
      data: hojeISO(),
    });
  }

  function salvarContato() {
    if (!editando.nome.trim()) {
      alert("Informe o nome.");
      return;
    }

    if (editando.id) {
      setContatos((lista) =>
        lista.map((c) =>
          c.id === editando.id ? editando : c
        )
      );
    } else {
      setContatos((lista) => [
        ...lista,
        {
          ...editando,
          id: gerarId(),
          data: hojeISO(),
        },
      ]);
    }

    setEditando(null);
  }

  const dados = useMemo(() => {
    let l = filtrarPorPeriodo(contatos, de, ate);

    if (status !== "Todos") {
      l = l.filter((c) => c.status === status);
    }

    if (origem !== "Todas as origens") {
      l = l.filter((c) => c.origem === origem);
    }

    const q = busca.trim().toLowerCase();

    if (q) {
      l = l.filter((c) =>
        [c.nome, c.telefone, c.origem]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    return l;
  }, [contatos, busca, status, origem, de, ate]);

  return (
    <div>
      <PageHead
        titulo="Contatos"
        sub="Todos os seus contatos em um só lugar."
        acao={
          <GoldButton icon={IconPlus} onClick={novoContato}>
            Novo contato
          </GoldButton>
        }
      />

      <Toolbar>
        <SearchInput
          value={busca}
          onChange={setBusca}
          placeholder="Buscar por nome, telefone ou origem..."
        />

        <Select
          value={status}
          onChange={setStatus}
          options={[
            "Todos",
            "Novo contato",
            "Em atendimento",
            "Retorno agendado",
            "Orçamento enviado",
            "Cliente em potencial",
            "Em retorno",
          ]}
        />

        <Select
          value={origem}
          onChange={setOrigem}
          options={[
            "Todas as origens",
            "WhatsApp",
            "Instagram",
            "Ligação",
            "Site",
            "Indicação",
          ]}
        />

        <DateRange
          de={de}
          ate={ate}
          setDe={setDe}
          setAte={setAte}
        />
      </Toolbar>

      <Table
        head={[
          "Nome",
          "Telefone",
          "Origem",
          "Status",
          "Data",
          "Ações",
        ]}
        vazio={!dados.length}
      >
        {dados.map((c) => (
          <tr key={c.id}>
            <td style={{ ...td, color: T.text, fontWeight: 600 }}>
              {c.nome}
            </td>

            <td style={td}>{c.telefone}</td>
            <td style={td}>{c.origem}</td>

            <td style={td}>
              <Chip>{c.status}</Chip>
            </td>

            <td style={td}>{dataBR(c.data)}</td>

            <td style={{ ...td, textAlign: "right" }}>
              <span
                style={{
                  display: "inline-flex",
                  gap: 5,
                  alignItems: "center",
                }}
              >
                <BotaoWhatsApp telefone={c.telefone} pequeno />

                                <BotaoAgendarIcon
                  onClick={() => aoAgendar(c.nome, c.telefone)}
                />

                <IconButton
                  title="Editar contato"
                  onClick={() => setEditando({ ...c })}
                >
                  <IconPen size={14} />
                </IconButton>

                <IconButton
                  danger
                  title="Excluir contato"
                  onClick={() => {
                    if (confirm("Excluir este contato?")) {
                      setContatos((lista) =>
                        lista.filter((x) => x.id !== c.id)
                      );
                    }
                  }}
                >
                  <IconX size={14} />
                </IconButton>
              </span>
            </td>
          </tr>
        ))}
      </Table>

      <Rodape n={dados.length} total={contatos.length} />

      {editando && (
        <Modal
          titulo={editando.id ? "Editar contato" : "Novo contato"}
          onClose={() => setEditando(null)}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Campo label="Nome">
              <input
                style={inputBase}
                value={editando.nome}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    nome: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Telefone / WhatsApp">
              <input
                style={inputBase}
                value={editando.telefone}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    telefone: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Origem">
              <Select
                value={editando.origem}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    origem: v,
                  })
                }
                options={[
                  "WhatsApp",
                  "Instagram",
                  "Ligação",
                  "Site",
                  "Indicação",
                ]}
              />
            </Campo>

            <Campo label="Status">
              <Select
                value={editando.status}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    status: v,
                  })
                }
                options={[
                  "Novo contato",
                  "Em atendimento",
                  "Retorno agendado",
                  "Orçamento enviado",
                  "Cliente em potencial",
                  "Em retorno",
                ]}
              />
            </Campo>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              marginTop: 18,
            }}
          >
            <GhostButton onClick={() => setEditando(null)}>
              Cancelar
            </GhostButton>

            <GoldButton onClick={salvarContato}>
              Salvar
            </GoldButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ==========================================================
   ORÇAMENTOS
   ========================================================== */

function Orcamentos({ de, ate, setDe, setAte }) {
  const [orcamentos, setOrcamentos] = useLocalStorage(
    "crm_orcamentos",
    orcamentosIniciais
  );

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("Todos");
  const [editando, setEditando] = useState(null);

  function novoOrcamento() {
    setEditando({
      numero: `ORC-${Date.now()}`,
      cliente: "",
      produto: "",
      valor: "",
      status: "Enviado",
      data: hojeISO(),
    });
  }

  function salvar() {
    if (!editando.cliente || !editando.produto) {
      alert("Preencha cliente e produto/serviço.");
      return;
    }

    const item = {
      ...editando,
      valor: Number(editando.valor || 0),
    };

    setOrcamentos((lista) => {
      const existe = lista.some(
        (o) => o.numero === item.numero
      );

      return existe
        ? lista.map((o) =>
            o.numero === item.numero ? item : o
          )
        : [...lista, item];
    });

    setEditando(null);
  }

  const dados = useMemo(() => {
    let l = filtrarPorPeriodo(orcamentos, de, ate);

    if (status !== "Todos") {
      l = l.filter((o) => o.status === status);
    }

    const q = busca.trim().toLowerCase();

    if (q) {
      l = l.filter((o) =>
        [o.numero, o.cliente, o.produto]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    return l;
  }, [orcamentos, busca, status, de, ate]);

  return (
    <div>
      <PageHead
        titulo="Orçamentos"
        sub="Acompanhe e gerencie todos os orçamentos."
        acao={
          <GoldButton icon={IconPlus} onClick={novoOrcamento}>
            Novo orçamento
          </GoldButton>
        }
      />

      <Toolbar>
        <SearchInput
          value={busca}
          onChange={setBusca}
          placeholder="Buscar orçamento..."
        />

        <Select
          value={status}
          onChange={setStatus}
          options={[
            "Todos",
            "Enviado",
            "Em negociação",
            "Aprovado",
            "Perdido",
          ]}
        />

        <DateRange
          de={de}
          ate={ate}
          setDe={setDe}
          setAte={setAte}
        />
      </Toolbar>

      <Table
        head={[
          "Nº",
          "Cliente",
          "Produto/Serviço",
          "Valor",
          "Status",
          "Data",
          "Ações",
        ]}
        vazio={!dados.length}
      >
        {dados.map((o) => (
          <tr key={o.numero}>
            <td style={td}>{o.numero}</td>

            <td style={{ ...td, color: T.text, fontWeight: 600 }}>
              {o.cliente}
            </td>

            <td style={td}>{o.produto}</td>

            <td style={{ ...td, color: T.gold, fontWeight: 600 }}>
              {brl(o.valor)}
            </td>

            <td style={td}>
              <Chip>{o.status}</Chip>
            </td>

            <td style={td}>{dataBR(o.data)}</td>

            <td style={{ ...td, textAlign: "right" }}>
              <span
                style={{
                  display: "inline-flex",
                  gap: 5,
                }}
              >
                <IconButton
                  title="Editar orçamento"
                  onClick={() => setEditando({ ...o })}
                >
                  <IconPen size={14} />
                </IconButton>

                <IconButton
                  danger
                  title="Excluir orçamento"
                  onClick={() => {
                    if (confirm("Excluir este orçamento?")) {
                      setOrcamentos((lista) =>
                        lista.filter(
                          (x) => x.numero !== o.numero
                        )
                      );
                    }
                  }}
                >
                  <IconX size={14} />
                </IconButton>
              </span>
            </td>
          </tr>
        ))}
      </Table>

      <Rodape n={dados.length} total={orcamentos.length} />

      {editando && (
        <Modal
          titulo="Editar orçamento"
          onClose={() => setEditando(null)}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Campo label="Cliente">
              <input
                style={inputBase}
                value={editando.cliente}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    cliente: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Produto / Serviço">
              <input
                style={inputBase}
                value={editando.produto}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    produto: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Valor">
              <input
                style={inputBase}
                type="number"
                value={editando.valor}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    valor: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Status">
              <Select
                value={editando.status}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    status: v,
                  })
                }
                options={[
                  "Enviado",
                  "Em negociação",
                  "Aprovado",
                  "Perdido",
                ]}
              />
            </Campo>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 18,
            }}
          >
            <GoldButton onClick={salvar}>
              Salvar alterações
            </GoldButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ==========================================================
   AGENDA — VISUAL ESTILO GOOGLE CALENDAR
   ========================================================== */

const STATUS_AGENDA = [
  "Agendado",
  "Concluído",
  "Cancelado",
];

function Agenda({ prefil, limparPrefil }) {
  const [compromissos, setCompromissos] = useLocalStorage(
    "crm_agenda",
    agendaInicial
  );

  const [dataAtual, setDataAtual] = useState(hojeISO());
  const [modo, setModo] = useState("dia");
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    if (!prefil) return;

    setEditando({
      id: null,
      cliente: prefil.cliente || "",
      telefone: prefil.telefone || "",
      data: dataAtual,
      hora: "09:00",
      tipo: "Consulta",
      status: "Agendado",
      obs: "",
    });

    limparPrefil();
  }, [prefil]);

  function mudarDia(delta) {
    const d = new Date(`${dataAtual}T12:00:00`);
    d.setDate(d.getDate() + delta);
    setDataAtual(d.toISOString().slice(0, 10));
  }

  function salvar() {
    if (
      !editando.cliente ||
      !editando.data ||
      !editando.hora
    ) {
      alert("Preencha cliente, data e horário.");
      return;
    }

    if (editando.id) {
      setCompromissos((lista) =>
        lista.map((c) =>
          c.id === editando.id ? editando : c
        )
      );
    } else {
      setCompromissos((lista) => [
        ...lista,
        {
          ...editando,
          id: Date.now(),
        },
      ]);
    }

    setEditando(null);
  }

  function remover(id) {
    if (confirm("Remover este agendamento?")) {
      setCompromissos((lista) =>
        lista.filter((c) => c.id !== id)
      );
    }
  }

  function mudarStatus(id, status) {
    setCompromissos((lista) =>
      lista.map((c) =>
        c.id === id ? { ...c, status } : c
      )
    );
  }

  const eventosDia = compromissos
    .filter((c) => c.data === dataAtual)
    .sort((a, b) =>
      String(a.hora).localeCompare(String(b.hora))
    );

  const horas = Array.from(
    { length: 13 },
    (_, i) => i + 8
  );

  const eventosDaHora = (hora) =>
    eventosDia.filter(
      (c) => Number(String(c.hora).split(":")[0]) === hora
    );

  const tituloData = new Date(
    `${dataAtual}T12:00:00`
  ).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div>
      <PageHead
        titulo="Agenda"
        sub="Sua agenda de atendimentos."
        acao={
          <GoldButton
            icon={IconPlus}
            onClick={() =>
              setEditando({
                id: null,
                cliente: "",
                telefone: "",
                data: dataAtual,
                hora: "09:00",
                tipo: "Consulta",
                status: "Agendado",
                obs: "",
              })
            }
          >
            Novo agendamento
          </GoldButton>
        }
      />

      {/* CONTROLES */}

      <Panel
        pad={12}
        style={{
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          <GhostButton onClick={() => setDataAtual(hojeISO())}>
            Hoje
          </GhostButton>

          <IconButton
            title="Dia anterior"
            onClick={() => mudarDia(-1)}
          >
            ‹
          </IconButton>

          <IconButton
            title="Próximo dia"
            onClick={() => mudarDia(1)}
          >
            ›
          </IconButton>
        </div>

        <div
          style={{
            color: T.text,
            fontSize: 15,
            fontWeight: 600,
            textTransform: "capitalize",
          }}
        >
          {tituloData}
        </div>

        <div style={{ display: "flex", gap: 6 }}>
          <input
            type="date"
            value={dataAtual}
            onChange={(e) => setDataAtual(e.target.value)}
            style={{
              ...inputBase,
              colorScheme:
                T === TEMAS.escuro ? "dark" : "light",
            }}
          />

          <Select
            value={modo}
            onChange={setModo}
            options={["dia", "lista"]}
          />
        </div>
      </Panel>

      {modo === "dia" ? (
        <Panel pad={0} style={{ overflow: "hidden" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "72px 1fr",
              minWidth: 600,
            }}
          >
            <div
              style={{
                background: T.cardAlt,
                borderRight: `1px solid ${T.border}`,
              }}
            >
              {horas.map((h) => (
                <div
                  key={h}
                  style={{
                    height: 72,
                    borderBottom: `1px solid ${T.borderSoft}`,
                    padding: "8px 10px",
                    color: T.muted,
                    fontSize: 11,
                    textAlign: "right",
                  }}
                >
                  {String(h).padStart(2, "0")}:00
                </div>
              ))}
            </div>

            <div>
              {horas.map((h) => {
                const eventos = eventosDaHora(h);

                return (
                  <div
                    key={h}
                    onDoubleClick={() =>
                      setEditando({
                        id: null,
                        cliente: "",
                        telefone: "",
                        data: dataAtual,
                        hora: `${String(h).padStart(
                          2,
                          "0"
                        )}:00`,
                        tipo: "Reunião",
                        status: "Agendado",
                        obs: "",
                      })
                    }
                    style={{
                      height: 72,
                      borderBottom: `1px solid ${T.borderSoft}`,
                      position: "relative",
                      padding: 5,
                      cursor: "pointer",
                    }}
                  >
                    {eventos.map((c) => (
                      <div
                        key={c.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditando({ ...c });
                        }}
                        style={{
                          background:
                            c.status === "Cancelado"
                              ? T.red + "22"
                              : T.gold + "20",
                          borderLeft: `4px solid ${
                            c.status === "Cancelado"
                              ? T.red
                              : c.status === "Concluído"
                              ? T.green
                              : T.gold
                          }`,
                          borderRadius: 7,
                          padding: "7px 9px",
                          height: 60,
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            color: T.text,
                            fontWeight: 700,
                            fontSize: 12,
                          }}
                        >
                          {c.hora} · {c.cliente}
                        </div>

                        <div
                          style={{
                            color: T.textMid,
                            fontSize: 11,
                            marginTop: 3,
                          }}
                        >
                          {c.tipo}
                          {c.obs ? ` · ${c.obs}` : ""}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {eventosDia.map((c) => (
            <Panel
              key={c.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
              }}
              onClick={() => setEditando({ ...c })}
            >
              <div
                style={{
                  width: 65,
                  color: T.gold,
                  fontWeight: 700,
                }}
              >
                {c.hora}
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: T.text,
                    fontWeight: 600,
                  }}
                >
                  {c.cliente}
                </div>

                <div
                  style={{
                    color: T.muted,
                    fontSize: 12,
                    marginTop: 3,
                  }}
                >
                  {c.tipo} · {c.telefone}
                </div>
              </div>

              <Chip>{c.status}</Chip>

              <IconButton
                danger
                onClick={(e) => {
                  e.stopPropagation();
                  remover(c.id);
                }}
              >
                <IconX size={14} />
              </IconButton>
            </Panel>
          ))}

          {!eventosDia.length && (
            <Panel
              style={{
                textAlign: "center",
                color: T.muted,
                padding: 50,
              }}
            >
              Nenhum agendamento neste dia.
            </Panel>
          )}
        </div>
      )}

      {editando && (
        <Modal
          titulo={
            editando.id
              ? "Editar agendamento"
              : "Novo agendamento"
          }
          onClose={() => setEditando(null)}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Campo label="Cliente / Paciente">
              <input
                style={inputBase}
                value={editando.cliente}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    cliente: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Telefone">
              <input
                style={inputBase}
                value={editando.telefone}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    telefone: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Data">
              <input
                type="date"
                style={inputBase}
                value={editando.data}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    data: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Horário">
              <input
                type="time"
                style={inputBase}
                value={editando.hora}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    hora: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Tipo">
              <Select
                value={editando.tipo}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    tipo: v,
                  })
                }
                options={[
                  "Reunião",
                  "Consulta",
                  "Retorno",
                  "Avaliação",
                  "Procedimento",
                ]}
              />
            </Campo>

            <Campo label="Status">
              <Select
                value={editando.status}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    status: v,
                  })
                }
                options={STATUS_AGENDA}
              />
            </Campo>

            <div style={{ gridColumn: "1 / -1" }}>
              <Campo label="Observações">
                <textarea
                  style={{
                    ...inputBase,
                    width: "100%",
                    minHeight: 80,
                    resize: "vertical",
                  }}
                  value={editando.obs}
                  onChange={(e) =>
                    setEditando({
                      ...editando,
                      obs: e.target.value,
                    })
                  }
                />
              </Campo>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              marginTop: 18,
            }}
          >
            {editando.id ? (
              <GhostButton
                onClick={() => remover(editando.id)}
              >
                Excluir
              </GhostButton>
            ) : (
              <span />
            )}

            <div style={{ display: "flex", gap: 8 }}>
              <GhostButton
                onClick={() => setEditando(null)}
              >
                Cancelar
              </GhostButton>

              <GoldButton onClick={salvar}>
                Salvar agendamento
              </GoldButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ==========================================================
   PAGAMENTOS
   ========================================================== */

function Pagamentos({ de, ate, setDe, setAte }) {
  const [pagamentos, setPagamentos] = useLocalStorage(
    "crm_pagamentos",
    pagamentosIniciais
  );

  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("Todos");
  const [editando, setEditando] = useState(null);

  function novoPagamento() {
    setEditando({
      id: null,
      cliente: "",
      telefone: "",
      descricao: "",
      valor: "",
      forma: "Pix",
      data: hojeISO(),
      status: "Pendente",
      dataPagamento: null,
    });
  }

  function salvar() {
    if (!editando.cliente || !editando.valor || !editando.data) {
      alert("Preencha cliente, valor e vencimento.");
      return;
    }

    const item = {
      ...editando,
      valor: Number(editando.valor),
    };

    setPagamentos((lista) => {
      const existe = lista.some(
        (p) => p.id === item.id
      );

      return existe
        ? lista.map((p) => (p.id === item.id ? item : p))
        : [...lista, { ...item, id: Date.now() }];
    });

    setEditando(null);
  }

  function marcarPago(id) {
    setPagamentos((lista) =>
      lista.map((p) =>
        p.id === id
          ? {
              ...p,
              status: "Pago",
              dataPagamento: hojeISO(),
            }
          : p
      )
    );
  }

  const dados = useMemo(() => {
    let l = filtrarPorPeriodo(pagamentos, de, ate);

    if (status !== "Todos") {
      l = l.filter((p) => p.status === status);
    }

    const q = busca.trim().toLowerCase();

    if (q) {
      l = l.filter((p) =>
        [p.cliente, p.telefone, p.descricao]
          .join(" ")
          .toLowerCase()
          .includes(q)
      );
    }

    return l;
  }, [pagamentos, busca, status, de, ate]);

  return (
    <div>
      <PageHead
        titulo="Pagamentos"
        sub="Controle seus lançamentos."
        acao={
          <GoldButton
            icon={IconPlus}
            onClick={novoPagamento}
          >
            Novo lançamento
          </GoldButton>
        }
      />

      <Toolbar>
        <SearchInput
          value={busca}
          onChange={setBusca}
          placeholder="Buscar pagamento..."
        />

        <Select
          value={status}
          onChange={setStatus}
          options={["Todos", "Pendente", "Pago"]}
        />

        <DateRange
          de={de}
          ate={ate}
          setDe={setDe}
          setAte={setAte}
        />
      </Toolbar>

      <Table
        head={[
          "Cliente",
          "Descrição",
          "Valor",
          "Forma",
          "Vencimento",
          "Status",
          "Ações",
        ]}
        vazio={!dados.length}
      >
        {dados.map((p) => (
          <tr key={p.id}>
            <td style={{ ...td, color: T.text, fontWeight: 600 }}>
              {p.cliente}
            </td>

            <td style={td}>{p.descricao}</td>

            <td
              style={{
                ...td,
                color: T.gold,
                fontWeight: 600,
              }}
            >
              {brl(p.valor)}
            </td>

            <td style={td}>{p.forma}</td>
            <td style={td}>{dataBR(p.data)}</td>

            <td style={td}>
              <Chip>{p.status}</Chip>
            </td>

            <td style={{ ...td, textAlign: "right" }}>
              <span
                style={{
                  display: "inline-flex",
                  gap: 5,
                }}
              >
                {p.status === "Pendente" && (
                  <GhostButton
                    onClick={() => marcarPago(p.id)}
                  >
                    Marcar pago
                  </GhostButton>
                )}

                <IconButton
                  title="Editar pagamento"
                  onClick={() => setEditando({ ...p })}
                >
                  <IconPen size={14} />
                </IconButton>

                <IconButton
                  danger
                  title="Excluir pagamento"
                  onClick={() => {
                    if (confirm("Excluir este lançamento?")) {
                      setPagamentos((lista) =>
                        lista.filter(
                          (x) => x.id !== p.id
                        )
                      );
                    }
                  }}
                >
                  <IconX size={14} />
                </IconButton>
              </span>
            </td>
          </tr>
        ))}
      </Table>

      <Rodape n={dados.length} total={pagamentos.length} />

      {editando && (
        <Modal
          titulo="Editar pagamento"
          onClose={() => setEditando(null)}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Campo label="Cliente">
              <input
                style={inputBase}
                value={editando.cliente}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    cliente: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Telefone">
              <input
                style={inputBase}
                value={editando.telefone}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    telefone: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Descrição">
              <input
                style={inputBase}
                value={editando.descricao}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    descricao: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Valor">
              <input
                style={inputBase}
                type="number"
                value={editando.valor}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    valor: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Forma de pagamento">
              <Select
                value={editando.forma}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    forma: v,
                  })
                }
                options={[
                  "Pix",
                  "Cartão",
                  "Dinheiro",
                  "Boleto",
                ]}
              />
            </Campo>

            <Campo label="Vencimento">
              <input
                type="date"
                style={inputBase}
                value={editando.data}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    data: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Status">
              <Select
                value={editando.status}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    status: v,
                  })
                }
                options={["Pendente", "Pago"]}
              />
            </Campo>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 18,
            }}
          >
            <GoldButton onClick={salvar}>
              Salvar alterações
            </GoldButton>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ==========================================================
   KANBAN
   ========================================================== */

const ETAPAS_KANBAN = [
  "Novo lead",
  "Em atendimento",
  "Follow up",
  "Agendado",
  "Paciente",
  "Sem interesse",
];

const COR_ETAPA = {
  "Novo lead": T.gold,
  "Em atendimento": T.blue,
  "Follow up": T.orange,
  Agendado: T.goldLight,
  Paciente: T.green,
  "Sem interesse": T.grey,
};

function CartaoLead({
  lead,
  onMover,
  onRemover,
  onEditar,
  onAgendar,
  arrastando,
  setArrastando,
}) {
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 6,
        }}
      >
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: T.text,
          }}
        >
          {lead.nome}
        </div>

        <IconButton
          title="Editar lead"
          onClick={() => onEditar(lead)}
        >
          <IconPen size={13} />
        </IconButton>
      </div>

      <div
        style={{
          fontSize: 12,
          color: T.muted,
          marginTop: 2,
        }}
      >
        {lead.telefone}
      </div>

      {lead.origem && (
        <div
          style={{
            fontSize: 11,
            color: T.muted,
            marginTop: 4,
          }}
        >
          Origem: {lead.origem}
        </div>
      )}

                 <div
        style={{
          display: "flex",
          gap: 6,
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <BotaoWhatsApp
          telefone={lead.telefone}
          pequeno
        />

        <BotaoAgendarIcon
          title="Agendar reunião"
          onClick={() => onAgendar(lead)}
        />
      </div>

      <select
        value={lead.etapa}
        onChange={(e) =>
          onMover(lead.id, e.target.value)
        }
        style={{
          ...inputBase,
          width: "100%",
          marginTop: 8,
          padding: "7px 9px",
          fontSize: 11.5,
        }}
      >
        {ETAPAS_KANBAN.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>
       
        <IconButton
          danger
          title="Excluir lead"
          onClick={() => onRemover(lead.id)}
        >
          <IconX size={13} />
        </IconButton>
      </div>
}

function Kanban({ aoAgendar }) {
  const [leads, setLeads] = useLocalStorage(
    "crm_leads",
    []
  );

  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    origem: "WhatsApp",
  });

  const [arrastando, setArrastando] = useState(null);
  const [editando, setEditando] = useState(null);

  function adicionar() {
    if (!form.nome || !form.telefone) {
      alert("Preencha nome e telefone.");
      return;
    }

    setLeads((lista) => [
      ...lista,
      {
        id: Date.now(),
        ...form,
        etapa: "Novo lead",
      },
    ]);

    setForm({
      nome: "",
      telefone: "",
      origem: "WhatsApp",
    });
  }

  function salvarLead() {
    if (!editando.nome || !editando.telefone) {
      alert("Preencha nome e telefone.");
      return;
    }

    setLeads((lista) =>
      lista.map((l) =>
        l.id === editando.id ? editando : l
      )
    );

    setEditando(null);
  }

  function mover(id, etapa) {
    setLeads((lista) =>
      lista.map((l) =>
        l.id === id ? { ...l, etapa } : l
      )
    );
  }

  function remover(id) {
    if (confirm("Remover este lead?")) {
      setLeads((lista) =>
        lista.filter((l) => l.id !== id)
      );
    }
  }

   function agendar(lead) {
    aoAgendar(lead.nome, lead.telefone);
  }

  return (
    <div>
      <PageHead
        titulo="Kanban de leads"
        sub="Organize seus clientes e leads por etapa."
      />

      <Panel style={{ marginBottom: 16 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: T.text,
            marginBottom: 14,
          }}
        >
          Novo lead
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(160px,1fr))",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <input
            style={inputBase}
            placeholder="Nome"
            value={form.nome}
            onChange={(e) =>
              setForm({
                ...form,
                nome: e.target.value,
              })
            }
          />

          <input
            style={inputBase}
            placeholder="Telefone"
            value={form.telefone}
            onChange={(e) =>
              setForm({
                ...form,
                telefone: e.target.value,
              })
            }
          />

          <Select
            value={form.origem}
            onChange={(v) =>
              setForm({
                ...form,
                origem: v,
              })
            }
            options={[
              "WhatsApp",
              "Instagram",
              "Ligação",
              "Site",
              "Indicação",
            ]}
          />
        </div>

        <GoldButton icon={IconPlus} onClick={adicionar}>
          Adicionar lead
        </GoldButton>
      </Panel>

      <div
        style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          paddingBottom: 8,
        }}
      >
        {ETAPAS_KANBAN.map((etapa) => {
          const doEtapa = leads.filter(
            (l) => l.etapa === etapa
          );

          return (
            <div
              key={etapa}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() =>
                arrastando &&
                mover(arrastando, etapa)
              }
              style={{
                minWidth: 250,
                flex: "0 0 250px",
                background: T.panel,
                border: `1px solid ${T.borderSoft}`,
                borderRadius: 10,
                padding: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background:
                      COR_ETAPA[etapa],
                  }}
                />

                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: T.text,
                  }}
                >
                  {etapa}
                </span>

                <span
                  style={{
                    fontSize: 11.5,
                    color: T.muted,
                    marginLeft: "auto",
                  }}
                >
                  {doEtapa.length}
                </span>
              </div>

              {doEtapa.map((lead) => (
                <CartaoLead
                  key={lead.id}
                  lead={lead}
                  onMover={mover}
                  onRemover={remover}
                  onEditar={(l) =>
                    setEditando({ ...l })
                  }
                  onAgendar={agendar}
                  arrastando={arrastando}
                  setArrastando={
                    setArrastando
                  }
                />
              ))}

              {!doEtapa.length && (
                <div
                  style={{
                    fontSize: 11.5,
                    color: T.muted,
                    textAlign: "center",
                    padding: "16px 0",
                  }}
                >
                  Nenhum lead aqui
                </div>
              )}
            </div>
          );
        })}
      </div>

      {editando && (
        <Modal
          titulo="Editar lead"
          onClose={() => setEditando(null)}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            <Campo label="Nome">
              <input
                style={inputBase}
                value={editando.nome}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    nome: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Telefone">
              <input
                style={inputBase}
                value={editando.telefone}
                onChange={(e) =>
                  setEditando({
                    ...editando,
                    telefone: e.target.value,
                  })
                }
              />
            </Campo>

            <Campo label="Origem">
              <Select
                value={editando.origem}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    origem: v,
                  })
                }
                options={[
                  "WhatsApp",
                  "Instagram",
                  "Ligação",
                  "Site",
                  "Indicação",
                ]}
              />
            </Campo>

            <Campo label="Etapa">
              <Select
                value={editando.etapa}
                onChange={(v) =>
                  setEditando({
                    ...editando,
                    etapa: v,
                  })
                }
                options={ETAPAS_KANBAN}
              />
            </Campo>
          </div>

                   <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 8,
              marginTop: 18,
            }}
          >
            <GhostButton
              onClick={() => {
                remover(editando.id);
                setEditando(null);
              }}
            >
              Excluir lead
            </GhostButton>

            <div style={{ display: "flex", gap: 8 }}>
              <GhostButton onClick={() => setEditando(null)}>
                Cancelar
              </GhostButton>

              <GoldButton onClick={salvarLead}>
                Salvar alterações
              </GoldButton>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* ==========================================================
   FUNIL

function Funil({ de, ate, setDe, setAte }) {
  const [clientes] = useLocalStorage(
    "crm_pacientes",
    pacientesIniciais
  );

  const [orcamentos] = useLocalStorage(
    "crm_orcamentos",
    orcamentosIniciais
  );

  const cli = filtrarPorPeriodo(clientes, de, ate);
  const orc = filtrarPorPeriodo(orcamentos, de, ate);

  const etapas = [
    {
      rotulo: "Contato inicial",
      valor: cli.length,
    },
    {
      rotulo: "Em atendimento",
      valor: cli.filter(
        (c) => c.status === "Em atendimento"
      ).length,
    },
    {
      rotulo: "Proposta",
      valor: orc.filter(
        (o) => o.status === "Enviado"
      ).length,
    },
    {
      rotulo: "Fechados",
      valor: orc.filter(
        (o) => o.status === "Aprovado"
      ).length,
    },
  ];

  const topo = etapas[0].valor || 1;

  return (
    <div>
      <PageHead
        titulo="Funil de vendas"
        sub="Visualize as etapas dos seus leads."
        acao={
          <DateRange
            de={de}
            ate={ate}
            setDe={setDe}
            setAte={setAte}
          />
        }
      />

      <Panel>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {etapas.map((e, i) => (
            <div
              key={e.rotulo}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 150,
                  height: 38,
                  background: [
                    T.goldLight,
                    T.gold,
                    T.goldDim,
                    T.grey,
                  ][i],
                  clipPath:
                    "polygon(0 0,100% 0,90% 100%,10% 100%)",
                }}
              />

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    color: T.textMid,
                    fontSize: 13,
                  }}
                >
                  {e.rotulo}
                </div>

                <strong
                  style={{
                    color: T.text,
                    fontSize: 20,
                  }}
                >
                  {e.valor}
                </strong>
              </div>

              <span style={{ color: T.muted }}>
                {Math.round(
                  (e.valor / topo) * 100
                )}
                %
              </span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

/* ==========================================================
   RELATÓRIOS
   ========================================================== */

function Relatorios({ de, ate, setDe, setAte }) {
  const [orcamentos] = useLocalStorage(
    "crm_orcamentos",
    orcamentosIniciais
  );

  const [clientes] = useLocalStorage(
    "crm_pacientes",
    pacientesIniciais
  );

  const aprovados = orcamentos.filter(
    (o) => o.status === "Aprovado"
  );

  const receita = aprovados.reduce(
    (s, o) => s + Number(o.valor || 0),
    0
  );

  const ticket = aprovados.length
    ? receita / aprovados.length
    : 0;

  return (
    <div>
      <PageHead
        titulo="Relatórios"
        sub="Acompanhe seus números."
        acao={
          <DateRange
            de={de}
            ate={ate}
            setDe={setDe}
            setAte={setAte}
          />
        }
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(190px,1fr))",
          gap: 14,
        }}
      >
        <StatCard
          rotulo="Vendas"
          valor={brl(receita)}
          icon={IconTrend}
        />

        <StatCard
          rotulo="Orçamentos"
          valor={orcamentos.length}
          icon={IconDoc}
        />

        <StatCard
          rotulo="Clientes"
          valor={clientes.length}
          icon={IconUser}
        />

        <StatCard
          rotulo="Ticket médio"
          valor={brl(ticket)}
          icon={IconChart}
        />
      </div>
    </div>
  );
}

/* ==========================================================
   CONFIGURAÇÕES
   ========================================================== */

function Configuracoes({ tema, setTema }) {
  const [prefs, setPrefs] = useLocalStorage(
    "crm_prefs",
    {
      email: true,
      whatsapp: true,
    }
  );

  function toggle(k) {
    setPrefs((p) => ({
      ...p,
      [k]: !p[k],
    }));
  }

  const escuro = tema === "escuro";

  return (
    <div>
      <PageHead
        titulo="Configurações"
        sub="Personalize o sistema."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: 14,
        }}
      >
        <Panel>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: T.text,
              marginBottom: 18,
            }}
          >
            Aparência
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 20,
            }}
          >
            <div>
              <div
                style={{
                  color: T.text,
                  fontWeight: 600,
                }}
              >
                Tema do CRM
              </div>

              <div
                style={{
                  color: T.muted,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Alterne entre modo escuro e claro.
              </div>
            </div>

            <button
              onClick={() =>
                setTema(
                  escuro ? "claro" : "escuro"
                )
              }
              style={{
                width: 52,
                height: 28,
                borderRadius: 999,
                border: `1px solid ${T.border}`,
                background: escuro
                  ? T.gold
                  : T.cardAlt,
                position: "relative",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 3,
                  left: escuro ? 26 : 3,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: escuro
                    ? "#17130A"
                    : T.gold,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {escuro ? (
                  <IconMoon size={12} />
                ) : (
                  <IconSun size={12} />
                )}
              </span>
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 18,
            }}
          >
            <GhostButton
              onClick={() => setTema("claro")}
              icon={IconSun}
            >
              Modo claro
            </GhostButton>

            <GhostButton
              onClick={() => setTema("escuro")}
              icon={IconMoon}
            >
              Modo escuro
            </GhostButton>
          </div>
        </Panel>

        <Panel>
          <div
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: T.text,
              marginBottom: 16,
            }}
          >
            Notificações
          </div>

          {[
            ["email", "Notificações por e-mail"],
            ["whatsapp", "Notificações no WhatsApp"],
          ].map(([key, label]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "11px 0",
              }}
            >
              <span
                style={{
                  color: T.textMid,
                  fontSize: 13,
                }}
              >
                {label}
              </span>

              <button
                onClick={() => toggle(key)}
                style={{
                  width: 40,
                  height: 22,
                  borderRadius: 999,
                  border: "none",
                  background: prefs[key]
                    ? T.gold
                    : T.cardAlt,
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 3,
                    left: prefs[key] ? 21 : 3,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: prefs[key]
                      ? "#14120A"
                      : T.muted,
                  }}
                />
              </button>
            </div>
          ))}
        </Panel>

        <Panel>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <Butterfly size={22} />

            <div>
              <div
                style={{
                  color: T.text,
                  fontWeight: 600,
                }}
              >
                CRM Vendas v2.00
              </div>

              <div
                style={{
                  color: T.muted,
                  fontSize: 12,
                  marginTop: 3,
                }}
              >
                Sistema de gestão de clientes.
              </div>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

/* ==========================================================
   MENU
   ========================================================== */

const MENU = [
  {
    id: "inicio",
    rotulo: "Início",
    icon: IconHome,
  },
  {
    id: "agenda",
    rotulo: "Agenda",
    icon: IconCalendar,
  },
  {
    id: "kanban",
    rotulo: "Kanban de leads",
    icon: IconKanban,
  },
  {
    id: "pagamentos",
    rotulo: "Pagamentos",
    icon: IconWallet,
  },
  {
    id: "clientes",
    rotulo: "Clientes",
    icon: IconUser,
  },
  {
    id: "contatos",
    rotulo: "Contatos",
    icon: IconChat,
  },
  {
    id: "orcamentos",
    rotulo: "Orçamentos",
    icon: IconDoc,
  },
  {
    id: "funil",
    rotulo: "Funil de Vendas",
    icon: IconFunnel,
  },
  {
    id: "relatorios",
    rotulo: "Relatórios",
    icon: IconChart,
  },
];

/* ==========================================================
   APP
   ========================================================== */

export default function App() {
  const [aba, setAba] = useState("inicio");
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");
  const [menuAberto, setMenuAberto] = useState(false);
  const [prefilAgenda, setPrefilAgenda] = useState(null);

  function irParaAgenda(cliente, telefone) {
    setPrefilAgenda({ cliente, telefone, ts: Date.now() });
    setAba("agenda");
  }

  const [tema, setTema] = useLocalStorage(
    "crm_tema",
    "escuro"
  );

  /*
    IMPORTANTE:
    Mantemos T como objeto mutável para que todas as telas
    existentes utilizem imediatamente as cores do tema.
  */
  T = {
    ...TEMAS[tema],
  };

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.background = T.bg;
    document.body.style.color = T.text;
    document.body.style.fontFamily = FONT;
  }, [tema]);

  const props = {
    de,
    ate,
    setDe,
    setAte,
  };

  const telas = {
    inicio: <Inicio {...props} />,
    agenda: <Agenda prefil={prefilAgenda} limparPrefil={() => setPrefilAgenda(null)} />,
    kanban: <Kanban aoAgendar={irParaAgenda} />,
    pagamentos: <Pagamentos {...props} />,
    clientes: <Pacientes {...props} aoAgendar={irParaAgenda} />,
    contatos: <Contatos {...props} aoAgendar={irParaAgenda} />,
    orcamentos: <Orcamentos {...props} />,
    funil: <Funil {...props} />,
    relatorios: <Relatorios {...props} />,
    config: (
      <Configuracoes
        tema={tema}
        setTema={setTema}
      />
    ),
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
    background: ativo
      ? T.gold + "1C"
      : "transparent",
    color: ativo ? T.gold : T.muted,
    fontSize: 13.5,
    fontWeight: ativo ? 600 : 500,
    textAlign: "left",
    fontFamily: FONT,
    boxShadow: ativo
      ? `inset 2px 0 0 ${T.gold}`
      : "none",
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: T.bg,
        fontFamily: FONT,
        color: T.text,
      }}
    >
      {/* SIDEBAR */}

      <aside
        style={{
          width: 210,
          background: T.panel,
          borderRight: `1px solid ${T.borderSoft}`,
          display: "flex",
          flexDirection: "column",
          padding: "0 12px 18px",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          boxSizing: "border-box",
        }}
        className="crm-sidebar"
        data-aberto={menuAberto}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            padding: "22px 0 26px",
          }}
        >
          <Butterfly size={15} />

          <div
            style={{
              fontSize: 21,
              fontWeight: 700,
              color: T.gold,
            }}
          >
            CRM
          </div>

          <div
            style={{
              fontSize: 9,
              fontWeight: 600,
              color: T.goldDim,
              letterSpacing: ".34em",
              marginLeft: ".34em",
            }}
          >
            VENDAS
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            flex: 1,
          }}
        >
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

        <button
          onClick={() => setAba("config")}
          style={itemStyle(aba === "config")}
        >
          <IconGear size={16} />
          Configurações
        </button>
      </aside>

      {/* CONTEÚDO */}

      <main
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            height: 56,
            borderBottom: `1px solid ${T.borderSoft}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 26px",
            gap: 12,
            background: T.panel,
          }}
        >
          <button
            onClick={() =>
              setMenuAberto((v) => !v)
            }
            className="crm-burger"
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: T.gold,
              cursor: "pointer",
              fontSize: 20,
            }}
          >
            ☰
          </button>

          <div style={{ flex: 1 }} />

          {/* BOTÃO RÁPIDO DE TEMA */}

          <button
            title={
              tema === "escuro"
                ? "Modo claro"
                : "Modo escuro"
            }
            onClick={() =>
              setTema(
                tema === "escuro"
                  ? "claro"
                  : "escuro"
              )
            }
            style={{
              width: 34,
              height: 34,
              borderRadius: 50,
              border: `1px solid ${T.border}`,
              background: T.cardAlt,
              color: T.gold,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            {tema === "escuro" ? (
              <IconSun size={16} />
            ) : (
              <IconMoon size={16} />
            )}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              fontSize: 13,
              color: T.textMid,
            }}
          >
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

        <div
          style={{
            padding: "26px 26px 40px",
            flex: 1,
          }}
        >
          {telas[aba]}
        </div>
      </main>

      <style>{`
        * {
          box-sizing: border-box;
        }

        *::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }

        *::-webkit-scrollbar-track {
          background: ${T.panel};
        }

        *::-webkit-scrollbar-thumb {
          background: ${T.border};
          border-radius: 8px;
        }

        input::placeholder,
        textarea::placeholder {
          color: ${T.muted};
        }

        button:focus-visible,
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible {
          outline: 2px solid ${T.gold};
          outline-offset: 2px;
        }

        input[type=date]::-webkit-calendar-picker-indicator,
        input[type=time]::-webkit-calendar-picker-indicator {
          cursor: pointer;
        }

        @media (max-width: 860px) {
          .crm-sidebar {
            position: fixed !important;
            z-index: 50;
            transform: translateX(-100%);
            transition: transform .2s;
          }

          .crm-sidebar[data-aberto="true"] {
            transform: translateX(0);
          }

          .crm-burger {
            display: block !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
