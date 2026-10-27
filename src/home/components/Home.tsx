import { useEffect, useRef, useState } from "react";
import PortfolioTerminal from "./PortfolioTerminal";
import { themes, type Theme } from "../themes";

type Window = { id: number; name: string };

export default function Home() {
  const [windows, setWindows] = useState<Window[]>([{ id: 0, name: "zsh" }]);
  const [active, setActive] = useState(0);
  const [theme, setTheme] = useState<Theme>(() => {
    try { const saved = localStorage.getItem("portfolio-theme"); return themes.find((item) => item === saved) ?? "carbon"; }
    catch { return "carbon"; }
  });
  useEffect(() => { try { localStorage.setItem("portfolio-theme", theme); } catch { /* Storage is optional. */ } }, [theme]);
  const [prefix, setPrefix] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState("");
  const nextId = useRef(1);
  const shell = useRef<HTMLElement>(null);
  const lastFocus = useRef(new Map<number, HTMLElement>());

  const create = () => {
    const id = nextId.current++;
    setWindows((items) => [...items, { id, name: "zsh" }]);
    setActive(id);
  };
  const close = () => {
    if (windows.length === 1) return;
    const index = windows.findIndex((item) => item.id === active);
    setWindows(windows.filter((item) => item.id !== active));
    lastFocus.current.delete(active);
    setActive(windows[index > 0 ? index - 1 : 1].id);
  };
  const rename = () => { setName(windows.find((item) => item.id === active)!.name); setRenaming(true); };

  useEffect(() => {
    const panel = shell.current?.querySelector<HTMLElement>(`#window-${active}`);
    const previous = lastFocus.current.get(active);
    const target = previous?.isConnected ? previous : panel?.querySelector<HTMLElement>('.cm-content, input[aria-label="Terminal command"]');
    target?.focus();
    shell.current?.querySelector(`#tab-${active}`)?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [active]);

  useEffect(() => {
    if (!prefix) return;
    const timeout = window.setTimeout(() => setPrefix(false), 3000);
    return () => window.clearTimeout(timeout);
  }, [prefix]);

  return <main ref={shell} className={`site-shell tmux-shell theme-${theme}`} id="top" onKeyDownCapture={(event) => {
    if (event.nativeEvent.isComposing || renaming) return;
    if (event.ctrlKey && event.key.toLowerCase() === "b") {
      event.preventDefault(); event.stopPropagation(); setPrefix(!prefix); return;
    }
    if (!prefix) return;
    event.preventDefault(); event.stopPropagation(); setPrefix(false);
    const index = windows.findIndex((item) => item.id === active);
    if (event.key === "c") create();
    else if (event.key === "n") setActive(windows[(index + 1) % windows.length].id);
    else if (event.key === "p") setActive(windows[(index + windows.length - 1) % windows.length].id);
    else if (event.key === ",") rename();
    else if (/^[0-9]$/.test(event.key) && windows[Number(event.key)]) setActive(windows[Number(event.key)].id);
  }}>
    <div className="tmux-windows">
      {windows.map((item) => <div key={item.id} id={`window-${item.id}`} role="tabpanel" aria-labelledby={`tab-${item.id}`} hidden={active !== item.id} className="tmux-window" onFocusCapture={(event) => { lastFocus.current.set(item.id, event.target as HTMLElement); }}>
        <PortfolioTerminal theme={theme} onThemeChange={setTheme} skipIntro={item.id !== 0} />
      </div>)}
    </div>
    <footer className="tmux-footer">
      {renaming && <form className="tmux-rename" onSubmit={(event) => {
        event.preventDefault();
        if (name.trim()) setWindows(windows.map((item) => item.id === active ? { ...item, name: name.trim() } : item));
        setRenaming(false);
      }}><label htmlFor="window-name">Window name</label><input id="window-name" autoFocus maxLength={32} value={name} onChange={(event) => setName(event.target.value)} onKeyDown={(event) => { if (event.key === "Escape") setRenaming(false); }} /><button type="submit">Save</button><button type="button" onClick={() => setRenaming(false)}>Cancel</button></form>}
      <div className="tmux-bar">
        <span className="tmux-session">[portfolio]</span>
        <div className="tmux-tabs" role="tablist" aria-label="tmux windows">
          {windows.map((item, index) => <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={active === item.id} aria-controls={`window-${item.id}`} tabIndex={active === item.id ? 0 : -1} onClick={() => setActive(item.id)} onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              const next = windows[(index + (event.key === "ArrowRight" ? 1 : windows.length - 1)) % windows.length];
              setActive(next.id);
              requestAnimationFrame(() => document.getElementById(`tab-${next.id}`)?.focus());
            }
          }}>{index}:{item.name}{active === item.id ? "*" : ""}</button>)}
        </div>
        <button onClick={create} aria-label="New window" title="New window · Ctrl+b c">+</button>
        <button onClick={rename} aria-label="Rename window" title="Rename window · Ctrl+b ,">rename</button>
        <button onClick={close} disabled={windows.length === 1} aria-label="Close window" title="Close current window">×</button>
      </div>
      <div className="tmux-hint" role="status">{prefix ? "PREFIX · c new · n/p switch · 0–9 select · , rename · Esc cancel" : "tmux · Ctrl+b then c new · n/p switch · , rename"}</div>
    </footer>
  </main>;
}
