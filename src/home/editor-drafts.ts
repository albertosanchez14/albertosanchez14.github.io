export function readDraft(path: string, fallback: string) {
  try { return localStorage.getItem(`portfolio-vim:${path}`) ?? fallback; }
  catch { return fallback; }
}

