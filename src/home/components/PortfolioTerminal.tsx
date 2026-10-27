import { themes, type Theme } from "../themes";
import { readDraft } from "../editor-drafts";
import RevealText from "./RevealText";
import avatar from "../../../ascii?raw";
import { lazy, Suspense, useEffect, useId, useRef, useState } from "react";
import { displayPath, fileSystem, getNode, resolvePath, type TerminalDirectory, type TerminalNode } from "../terminal-files";
import { completions, fuzzyDirectory, fuzzyMatch, shellCommands } from "../terminal-interaction";

const VimEditor = lazy(() => import("./VimEditor"));

type Entry = { name: string; path: string[]; type: TerminalNode["type"] };
type Line = { id: number; kind: "command" | "output" | "muted" | "accent" | "error" | "entry" | "profile"; text: string; entry?: Entry; entries?: Entry[]; success?: boolean };

const introCommand = "cat avatar.txt about.txt";
const bootLines: Line[] = [];

function linkedText(value: string) {
  return value.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,})/g).map((part, index) => {
    if (/^https?:\/\//.test(part)) return <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
    if (/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(part)) return <a key={index} href={`mailto:${part}`}>{part}</a>;
    return part;
  });
}

function treeLines(directory: TerminalDirectory, prefix = ""): string[] {
  const entries = Object.entries(directory.children);
  return entries.flatMap(([name, node], index) => {
    const last = index === entries.length - 1;
    const label = `${prefix}${last ? "└── " : "├── "}${name}${node.type === "directory" ? "/" : ""}`;
    return node.type === "directory"
      ? [label, ...treeLines(node, `${prefix}${last ? "    " : "│   "}`)]
      : [label];
  });
}

function ProfileOutput({ instant = false }: { instant?: boolean }) {
  return <div className="profile-output">
          <pre className="ascii-avatar" role="img" aria-label="ASCII portrait of Alberto Sánchez"><RevealText text={avatar} diffusion instant={instant} /></pre>
          <div className="profile-info">
            <p className="profile-comment"><RevealText text="# about.txt" delay={150} instant={instant} /></p>
            <h1><RevealText text="Alberto Sánchez" delay={250} instant={instant} /><span className="profile-surname"><RevealText text="del Álamo" delay={400} instant={instant} /></span></h1>
            <p className="profile-role"><RevealText text="Software Engineer" delay={550} instant={instant} /></p>
            <dl><div><dt>location</dt><dd><RevealText text="Madrid, Spain" delay={650} instant={instant} /></dd></div><div><dt>education</dt><dd><RevealText text="Universidad Carlos III de Madrid" delay={730} instant={instant} /><br /><RevealText text="University of Waterloo" delay={810} instant={instant} /></dd></div><div><dt>work</dt><dd><RevealText text="Software Engineer at GMV" delay={890} instant={instant} /></dd></div></dl>
            <div className="profile-links"><a href="mailto:alberto.sanchez.delalamo@gmail.com">email ↗</a><a href="https://github.com/albertosanchez14" target="_blank" rel="noreferrer">github ↗</a><a href="https://linkedin.com/in/alberto-sanchez-del-alamo" target="_blank" rel="noreferrer">linkedin ↗</a></div>
            <div className="terminal-palette" aria-hidden="true">{["#f38ba8", "#fab387", "#f9e2af", "#a6e3a1", "#89dceb", "#89b4fa", "#cba6f7", "#cdd6f4"].map((color) => <i key={color} style={{ background: color }} />)}</div>
          </div>
        </div>;
}

export default function PortfolioTerminal({ theme, onThemeChange, skipIntro = false }: { theme: Theme; onThemeChange: (theme: Theme) => void; skipIntro?: boolean }) {
  const instanceId = useId();
  const [introDone, setIntroDone] = useState(() => skipIntro || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [skipReveal, setSkipReveal] = useState(skipIntro);
  const [listingTyped, setListingTyped] = useState(() => skipIntro || window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 3 : -1);
  const [typed, setTyped] = useState(0);
  const [showProfile, setShowProfile] = useState(true);
  const [editor, setEditor] = useState<{ path: string; content: string } | null>(null);
  const [lines, setLines] = useState<Line[]>(bootLines);
  const [path, setPath] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [completionItems, setCompletionItems] = useState<string[]>([]);
  const [completionIndex, setCompletionIndex] = useState(0);
  const [historySearchOpen, setHistorySearchOpen] = useState(false);
  const [historyQuery, setHistoryQuery] = useState("");
  const [historyResultIndex, setHistoryResultIndex] = useState(0);
  const [lastSuccess, setLastSuccess] = useState(true);
  const nextId = useRef(bootLines.length + 1);
  const inputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const historyQueryRef = useRef<{ prefix: string; index: number } | null>(null);
  const visits = useRef<Record<string, number>>({});
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (introDone) return;
    const timer = window.setTimeout(() => {
      if (typed < introCommand.length) setTyped((value) => value + 1);
      else setIntroDone(true);
    }, typed === 0 ? 350 : typed === introCommand.length ? 250 : 48);
    return () => window.clearTimeout(timer);
  }, [typed, introDone]);

  useEffect(() => {
    if (!introDone || listingTyped >= 3) return;
    if (skipReveal || window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setListingTyped(3); return; }
    const timer = window.setTimeout(() => setListingTyped((value) => value + 1), listingTyped === -1 ? 1600 : 120);
    return () => window.clearTimeout(timer);
  }, [introDone, listingTyped, skipReveal]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { if (media.matches) setIntroDone(true); };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines, completionItems, historySearchOpen]);

  useEffect(() => {
    if (historySearchOpen) searchRef.current?.focus();
  }, [historySearchOpen]);

  const completion = completions(input, path);
  const suggestion = input && !completionItems.length
    ? [...history].reverse().find((item) => item.toLowerCase().startsWith(input.toLowerCase()) && item.length > input.length)
      ?? completion.find((item) => item.toLowerCase().startsWith(input.toLowerCase()) && item.length > input.length)
      ?? ""
    : "";
  const searchResults = [...new Set([...history].reverse())].filter((item) => fuzzyMatch(item, historyQuery)).slice(0, 8);

  const run = (value: string) => {
    setIntroDone(true);
    const command = value.trim();
    setInput("");
    setHistoryIndex(null);
    setCompletionItems([]);
    historyQueryRef.current = null;
    if (!command) return;

    setHistory((previous) => [...previous, command]);
    const [operation, ...args] = command.split(/\s+/);
    if (operation === "clear" || operation === "c") {
      setShowProfile(false);
      setLines([]);
      setLastSuccess(true);
      inputRef.current?.focus();
      return;
    }

    const added: Line[] = [];
    const add = (kind: Line["kind"], text: string, entry?: Entry, success?: boolean) => {
      added.push({ id: nextId.current++, kind, text, entry, success });
    };
    add("command", command, undefined, lastSuccess);

    const target = operation === "ls" ? args.find((argument) => !argument.startsWith("-")) ?? "." : args[0] ?? ".";
    const targetPath = resolvePath(path, target);
    const node = getNode(targetPath);

    switch (operation) {
      case "theme": {
        if (args.length === 1 && ["-l", "--list"].includes(args[0])) {
          themes.forEach((item) => add(item === theme ? "accent" : "output", `${item === theme ? "*" : " "} ${item}${item === theme ? " (active)" : ""}`));
        } else if (args.length === 2 && ["-s", "--set"].includes(args[0])) {
          const selected = themes.find((item) => item === args[1]);
          if (!selected) add("error", `Unknown theme: ${args[1]}. Run theme --list to see available themes.`);
          else { onThemeChange(selected); add("output", `Theme set to ${selected}`); }
        } else add("error", "Usage: theme -l / --list · theme -s / --set <name>");
        break;
      }
      case "help":
        add("accent", "Available commands");
        add("output", "ls [path]     list files and folders");
        add("output", "cd [path]     change folder · fuzzy matching enabled");
        add("output", "z <folder>    jump to a folder");
        add("output", "cat <file>    read a file");
        add("output", "v / nvim <file>  edit a file with Vim · saves locally");
        add("output", "tree [path]   show the folder structure");
        add("output", "pwd           show current path");
        add("output", "whoami        show profile");
        add("output", "history       show commands from this session");
        add("output", "clear / c     clear the terminal");
        add("output", "theme -l, --list  list color themes · * marks the active theme");
        add("output", "theme -s, --set <name>  change color theme · saved locally");
        add("muted", "Tab: fuzzy completion · →: accept suggestion · Ctrl+R: search history");
        break;
      case "ls":
        if (!node) add("error", `ls: ${target}: No such file or directory`);
        else if (node.type === "file") {
          const name = targetPath[targetPath.length - 1] ?? target;
          add("entry", name, { name, path: targetPath, type: "file" });
        }
        else {
          const entries = Object.entries(node.children).sort(([a], [b]) => a.localeCompare(b));
          if (entries.length) added.push({ id: nextId.current++, kind: "entry", text: "", entries: entries.map(([name, child]) => ({ name, path: [...targetPath, name], type: child.type })) });
        }
        break;
      case "cd":
      case "z": {
        const destination = !args.length ? [] : node?.type === "directory" ? targetPath : fuzzyDirectory(target, visits.current);
        if (node?.type === "file") add("error", `${operation}: ${target}: Not a directory`);
        else if (!destination) add("error", `${operation}: ${target}: No such directory`);
        else {
          setPath(destination);
          const key = destination.join("/");
          visits.current[key] = (visits.current[key] ?? 0) + 1;
        }
        break;
      }
      case "v":
      case "vim":
      case "nvim": {
        const editorPath = args.length ? targetPath : ["about.txt"];
        const file = getNode(editorPath);
        if (file?.type === "directory") add("error", `${operation}: ${target}: Is a directory`);
        else if (!file) add("error", `${operation}: ${target}: No such file`);
        else setEditor({ path: displayPath(editorPath), content: file.content });
        break;
      }
      case "cat":
        if (args.length === 2 && resolvePath(path, args[0]).join("/") === "avatar.txt" && resolvePath(path, args[1]).join("/") === "about.txt") {
          add("profile", "");
          break;
        }
        if (!args.length) add("error", "cat: Missing file. Try cat about.txt");
        else if (!node) add("error", `cat: ${target}: No such file`);
        else if (node.type !== "file") add("error", `cat: ${target}: Is a directory`);
        else {
          for (const filename of args) {
            const file = getNode(resolvePath(path, filename));
            if (!file) add("error", `cat: ${filename}: No such file`);
            else if (file.type !== "file") add("error", `cat: ${filename}: Is a directory`);
            else add("output", readDraft(displayPath(resolvePath(path, filename)), file.content));
          }
        }
        break;
      case "tree":
        if (!node) add("error", `tree: ${target}: No such directory`);
        else if (node.type !== "directory") add("error", `tree: ${target}: Not a directory`);
        else add("output", [displayPath(targetPath), ...treeLines(node)].join("\n"));
        break;
      case "pwd":
        add("output", displayPath(path));
        break;
      case "whoami":
        add("output", fileSystem.children["about.txt"].type === "file" ? fileSystem.children["about.txt"].content : "Alberto Sánchez del Álamo");
        break;
      case "history":
        [...history, command].slice(-15).forEach((item, index) => add("output", `${String(index + 1).padStart(2, " ")}  ${item}`));
        break;
      default:
        add("error", `${operation}: command not found. Type help for available commands.`);
    }

    setLastSuccess(!added.some((line) => line.kind === "error"));
    setLines((previous) => [...previous, ...added]);
    inputRef.current?.focus();
  };

  const acceptCompletion = (value: string) => {
    setInput(value);
    setCompletionItems([]);
    historyQueryRef.current = null;
    inputRef.current?.focus();
  };

  const searchHistoryByPrefix = (direction: -1 | 1) => {
    const state = historyQueryRef.current ?? { prefix: input, index: history.length };
    let index = state.index + direction;
    while (index >= 0 && index < history.length && !history[index].startsWith(state.prefix)) index += direction;
    if (index < 0 || index >= history.length) return;
    historyQueryRef.current = { ...state, index };
    setInput(history[index]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (event.ctrlKey && event.key.toLowerCase() === "r") {
      event.preventDefault();
      setCompletionItems([]);
      setHistoryQuery("");
      setHistoryResultIndex(0);
      setHistorySearchOpen(true);
      return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === "p") {
      event.preventDefault();
      searchHistoryByPrefix(-1);
      return;
    }
    if (event.ctrlKey && event.key.toLowerCase() === "n") {
      event.preventDefault();
      searchHistoryByPrefix(1);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      if (!completionItems.length) {
        if (completion.length === 1) acceptCompletion(completion[0]);
        else if (completion.length > 1) { setCompletionItems(completion.slice(0, 8)); setCompletionIndex(0); }
      } else setCompletionIndex((current) => (current + (event.shiftKey ? completionItems.length - 1 : 1)) % completionItems.length);
      return;
    }
    if (event.key === "Escape" && completionItems.length) {
      event.preventDefault();
      setCompletionItems([]);
      return;
    }
    if (completionItems.length && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      event.preventDefault();
      setCompletionIndex((current) => (current + (event.key === "ArrowUp" ? completionItems.length - 1 : 1)) % completionItems.length);
      return;
    }
    if (event.key === "Enter" && completionItems.length) {
      event.preventDefault();
      acceptCompletion(completionItems[completionIndex]);
      return;
    }
    if (event.key === "ArrowRight" && suggestion && event.currentTarget.selectionStart === input.length) {
      event.preventDefault();
      acceptCompletion(suggestion);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const next = Math.max(0, (historyIndex ?? history.length) - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndex === null) return;
      const next = historyIndex + 1;
      setHistoryIndex(next >= history.length ? null : next);
      setInput(next >= history.length ? "" : history[next]);
    }
  };

  const firstSpace = input.search(/\s/);
  const commandToken = firstSpace === -1 ? input : input.slice(0, firstSpace);
  const commandTail = firstSpace === -1 ? "" : input.slice(firstSpace);
  const selectedCompletion = completionItems[completionIndex];
  const previewPath = selectedCompletion?.startsWith("cd ") ? resolvePath(path, selectedCompletion.slice(3).trim()) : undefined;
  const previewNode = previewPath ? getNode(previewPath) : undefined;

  return (
    <section className={`terminal-window theme-${theme}`} aria-label="Interactive portfolio terminal">
      <div className="terminal-viewport" style={editor ? { display: "none" } : undefined} ref={outputRef} onClick={(event) => {
        if (introDone && !window.getSelection()?.toString() && !(event.target as HTMLElement).closest("a, button, input")) inputRef.current?.focus();
      }}>
      {showProfile && <div className="terminal-intro">
        <div className="boot-command"><span className="shell-user">asanch@portfolio</span><span className="shell-path">~</span><span className="command-symbol">❯</span> <span>{introDone ? introCommand : introCommand.slice(0, typed)}</span>{!introDone && <span className="block-cursor" aria-hidden="true" />}</div>
        {!introDone && <button className="skip-intro" onClick={() => { setSkipReveal(true); setIntroDone(true); }}>skip intro ↵</button>}
        {introDone && <ProfileOutput instant={skipReveal} />}
        {introDone && listingTyped >= 0 && <div className="intro-listing">
          <div className="boot-list-command"><span className="shell-user">asanch@portfolio</span><span className="shell-path">~</span><span className="command-symbol">❯</span> {"ls".slice(0, listingTyped)}{listingTyped < 3 && <span className="block-cursor" aria-hidden="true" />}</div>
          {listingTyped === 3 && <div className="terminal-listing">{Object.entries(fileSystem.children).sort(([a], [b]) => a.localeCompare(b)).map(([name, node]) => <span key={name} className={node.type === "directory" ? "terminal-entry--directory" : ""}>{name}{node.type === "directory" ? "/" : ""}</span>)}</div>}
        </div>}
      </div>}
      <div className="terminal-content" aria-live="polite" aria-relevant="additions text">
        {lines.map((line) => (
          <div className={line.kind === "profile" ? "terminal-profile-result" : `terminal-line terminal-line--${line.kind}`} key={line.id}>
            {line.kind === "profile" ? <ProfileOutput /> : line.entries || line.entry ? (
              <div className="terminal-listing">{(line.entries ?? [line.entry!]).map((entry) => <button key={entry.name} type="button" className={`terminal-entry ${entry.type === "directory" ? "terminal-entry--directory" : ""}`} onClick={() => run(`${entry.type === "directory" ? "cd" : "cat"} ${displayPath(entry.path)}`)}>{entry.name}{entry.type === "directory" ? "/" : ""}</button>)}</div>
            ) : line.kind === "command" ? <><span className={`command-symbol ${line.success === false ? "command-symbol--error" : ""}`}>❯</span> {linkedText(line.text)}</> : linkedText(line.text)}
          </div>
        ))}
      </div>
      {completionItems.length > 0 && <div className="completion-list" id={`${instanceId}-completions`} role="listbox" aria-label="Completions">
        <span className="completion-heading">fzf-tab / completions</span>
        <div className={`completion-body ${previewNode?.type === "directory" ? "completion-body--preview" : ""}`}>
          <div>{completionItems.map((item, index) => <button type="button" role="option" aria-selected={index === completionIndex} className={index === completionIndex ? "completion-active" : ""} key={item} onClick={() => acceptCompletion(item)}>{item}</button>)}</div>
          {previewNode?.type === "directory" && <div className="completion-preview"><span>ls --color {displayPath(previewPath!)}</span>{Object.entries(previewNode.children).slice(0, 6).map(([name, node]) => <div className={node.type === "directory" ? "preview-directory" : ""} key={name}>{name}{node.type === "directory" ? "/" : ""}</div>)}</div>}
        </div>
      </div>}
      {historySearchOpen && <div className="history-search">
        <label htmlFor={`${instanceId}-history`}>reverse history search</label>
        <input id={`${instanceId}-history`} ref={searchRef} value={historyQuery} onChange={(event) => { setHistoryQuery(event.target.value); setHistoryResultIndex(0); }} onKeyDown={(event) => {
          if (event.key === "Escape") { event.preventDefault(); setHistorySearchOpen(false); inputRef.current?.focus(); }
          else if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setHistoryResultIndex((current) => (current + (event.key === "ArrowUp" ? searchResults.length - 1 : 1)) % Math.max(searchResults.length, 1)); }
          else if (event.key === "Enter") { event.preventDefault(); if (searchResults.length) acceptCompletion(searchResults[historyResultIndex]); setHistorySearchOpen(false); }
        }} autoComplete="off" aria-label="Search command history" />
        <div className="history-results">{searchResults.length ? searchResults.map((item, index) => <button type="button" className={index === historyResultIndex ? "completion-active" : ""} key={item} onClick={() => { acceptCompletion(item); setHistorySearchOpen(false); }}>{item}</button>) : <span>No matching commands</span>}</div>
      </div>}
      <div className="terminal-prompt-area" hidden={!introDone || listingTyped < 3}>
        <div className="terminal-current-path">{displayPath(path)}</div>
        <form className="terminal-input-row" onSubmit={(event) => { event.preventDefault(); run(input); }}>
          <span className={`prompt-symbol ${lastSuccess ? "" : "prompt-symbol--error"}`} aria-hidden="true">❯</span>
          <div className="terminal-input-wrap">
            <div className="input-highlight" ref={mirrorRef} aria-hidden="true"><span className={shellCommands.includes(commandToken) ? "syntax-valid" : commandToken ? "syntax-invalid" : ""}>{commandToken}</span><span>{commandTail}</span>{suggestion && <span className="syntax-suggestion">{suggestion.slice(input.length)}</span>}</div>
            <input id={`${instanceId}-command`} ref={inputRef} value={input} onChange={(event) => { setInput(event.target.value); setCompletionItems([]); historyQueryRef.current = null; }} onScroll={(event) => { if (mirrorRef.current) mirrorRef.current.scrollLeft = event.currentTarget.scrollLeft; }} onKeyDown={handleKeyDown} autoComplete="off" autoCapitalize="off" spellCheck={false} role="combobox" aria-label="Terminal command" aria-autocomplete="list" aria-expanded={completionItems.length > 0} aria-controls={completionItems.length ? `${instanceId}-completions` : undefined} />
          </div>
          <button type="submit" className="terminal-submit" aria-label="Run command">↵</button>
        </form>
      </div>
      </div>
      {editor && <Suspense fallback={<div className="vim-workspace">Opening editor…</div>}><VimEditor key={editor.path} {...editor} onClose={() => { setEditor(null); requestAnimationFrame(() => inputRef.current?.focus()); }} /></Suspense>}
      {!editor && <footer className="editor-footer">
        
        <div className="editor-command"><span>{introDone ? "Type help to explore" : "Opening your session…"}</span></div>
      </footer>}
    </section>
  );
}
