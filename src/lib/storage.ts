// Shared localStorage JSON access for the persisted UI state (servers,
// dashboard cards, SSH prefs). A corrupt or foreign value must never crash
// startup, so parse failures read as "nothing stored"; validating the shape
// of what comes back stays with the caller.

export function loadStoredJson(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? null : (JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

export function saveStoredJson(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}
