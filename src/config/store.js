export function loadState(key) {
  try {
    const serializedState = localStorage.getItem(key);

    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export function saveState(key, state) {  
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {}
}

export function removeState(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {}
}