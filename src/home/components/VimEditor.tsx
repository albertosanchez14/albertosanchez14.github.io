import { readDraft } from "../editor-drafts";
import { useEffect, useRef, useState } from "react";
import { basicSetup, EditorView } from "codemirror";
import { panels } from "@codemirror/view";
import { getCM, Vim, vim } from "@replit/codemirror-vim";

const actions = new WeakMap<object, { save: () => boolean; close: (force?: boolean) => void; help: () => void }>();
Vim.defineEx("write", "w", (cm) => { actions.get(cm)?.save(); });
Vim.defineEx("quit", "q", (cm, params) => { actions.get(cm)?.close(params.argString?.trim() === "!"); });
Vim.defineEx("wq", "wq", (cm) => { const action = actions.get(cm); if (action?.save()) action.close(); });

Vim.defineEx("xit", "x", (cm) => { const action = actions.get(cm); if (action?.save()) action.close(); });
Vim.defineEx("exit", "exi", (cm) => { const action = actions.get(cm); if (action?.save()) action.close(); });

Vim.defineEx("help", "h", (cm) => { actions.get(cm)?.help(); });

type Props = { path: string; content: string; onClose: () => void };

export default function VimEditor({ path, content, onClose }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const commandHost = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>();
  const [mode, setMode] = useState("NORMAL");
  const [position, setPosition] = useState("1:1");
  const [message, setMessage] = useState("");
  const [help, setHelp] = useState(false);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    if (!host.current || !commandHost.current) return;
    let savedContent = readDraft(path, content);
    const save = () => {
      try {
        localStorage.setItem(`portfolio-vim:${path}`, view.state.doc.toString());
        savedContent = view.state.doc.toString();
        setMessage("Saved locally in this browser");
        return true;
      } catch { setMessage("Browser storage unavailable — keep this editor open to retain changes"); return false; }
    };
    const view = new EditorView({
      parent: host.current,
      doc: savedContent,
      extensions: [
        vim(), basicSetup, EditorView.lineWrapping,
        panels({ bottomContainer: commandHost.current }),
        EditorView.contentAttributes.of({ "aria-label": `Edit ${path}`, spellcheck: "false" }),
        EditorView.theme({
          "&": { height: "100%", color: "var(--ink)", backgroundColor: "var(--background)" },
          ".cm-scroller": { fontFamily: "inherit", overflow: "auto" },
          ".cm-content": { padding: "20px 0", caretColor: "var(--accent)" },
          ".cm-line": { padding: "0 20px" },
          ".cm-gutters": { backgroundColor: "var(--background)", color: "var(--muted)", border: "none", padding: "0 0 0 12px" },
          ".cm-activeLine, .cm-activeLineGutter": { backgroundColor: "var(--surface)" },
          "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": { backgroundColor: "var(--line) !important" },
          ".cm-cursor": { borderLeftColor: "var(--accent)" },
          ".cm-panels": { backgroundColor: "var(--surface)", color: "var(--ink)" },
          ".cm-textfield": { backgroundColor: "var(--background)", color: "var(--ink)", border: "1px solid var(--line)" },
          ".cm-button": { background: "var(--surface-0)", color: "var(--ink)" },
          ".cm-searchMatch": { backgroundColor: "#40345f" },
          ".cm-searchMatch-selected": { backgroundColor: "#4e4e88" },
        }, { dark: true }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) setMessage("");
          if (update.selectionSet || update.docChanged) {
            const head = update.state.selection.main.head;
            const line = update.state.doc.lineAt(head);
            setPosition(`${line.number}:${head - line.from + 1}`);
          }
        }),
      ],
    });
    viewRef.current = view;
    const cm = getCM(view)!;
    const changeMode = (event: { mode: string }) => setMode(event.mode.toUpperCase());
    cm.on("vim-mode-change", changeMode);
    actions.set(cm, { save, help: () => setHelp(true), close: (force = false) => {
      if (!force && view.state.doc.toString() !== savedContent) {
        setMessage("E37: No write since last change (add ! to override)");
        return;
      }
      closeRef.current();
    } });
    view.focus();
    return () => { cm.off("vim-mode-change", changeMode); actions.delete(cm); view.destroy(); viewRef.current = undefined; };
  }, [path, content]);

  const key = (value: string) => {
    const view = viewRef.current;
    if (view) { view.focus(); const cm = getCM(view); if (cm) Vim.handleKey(cm, value, "user"); }
  };

  const command = (value: string) => {
    key("<Esc>");
    const cm = viewRef.current && getCM(viewRef.current);
    // The vim() extension initializes Vim state before these controls are used.
    if (cm?.state.vim) Vim.handleEx(cm as Parameters<typeof Vim.handleEx>[0], value);
  };

  return <div className="vim-workspace">
    <div className="vim-toolbar">
      <span className="vim-title">▤ {path}</span>
      <button onClick={() => key(mode === "INSERT" ? "<Esc>" : "i")}>{mode === "INSERT" ? "Esc · normal" : "i · edit"}</button>
      <button onClick={() => setHelp(!help)} aria-expanded={help}>:help · keys</button>
      <button onClick={() => command("w")}>:w · write</button>
      <button onClick={() => command("q")}>:q · quit</button>
      <button onClick={() => command("wq")}>:wq · write & quit</button>
      <button onClick={() => command("q!")}>:q! · discard & quit</button>
    </div>
    {help && <div className="vim-help"><span>h j k l · move</span><span>w / b · words</span><span>0 / $ · line start / end</span><span>gg / G · first / last line</span><span>i / a / o · insert</span><span>Esc · normal</span><span>v · select</span><span>dd / yy / p · cut / copy / paste</span><span>u / Ctrl+r · undo / redo</span><span>/text ↵ · search forward</span><span>?text ↵ · search backward</span><span>n / N · next / previous match</span><span>:help · keys</span><span>:w · save locally</span><span>:q · quit if unchanged</span><span>:q! · discard & quit</span><span>:wq / :x · write & quit</span></div>}
    <div className="vim-editor" ref={host} />
    <footer className="editor-footer">
      <div className="editor-status"><span className="editor-mode">{mode}</span><span className="editor-file">{path}</span><span className="status-detail">utf-8</span><span>vim</span><span aria-label="Cursor position">{position}</span></div>
      <div className="vim-command-area">
        <div className="vim-command-host" ref={commandHost} />
        <div className="vim-command-message" role="status">{message}</div>
      </div>
    </footer>
  </div>;
}
