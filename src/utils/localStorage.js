export const loadState = (key, defaultValue) => {
  try {
    const serialized = localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : defaultValue;
  } catch (e) {
    console.warn(`loadState(${key}) failed:`, e);
    return defaultValue;
  }
};

export const saveState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.warn(`saveState(${key}) failed:`, e);
  }
};
