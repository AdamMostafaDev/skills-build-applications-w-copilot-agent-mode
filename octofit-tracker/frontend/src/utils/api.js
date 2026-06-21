const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME
const PORT = 8000

export const getApiBaseUrl = () => {
  if (CODESPACE_NAME && typeof CODESPACE_NAME === 'string' && CODESPACE_NAME.trim().length > 0) {
    return `https://${CODESPACE_NAME}-${PORT}.app.github.dev`
  }
  return `http://localhost:${PORT}`
}

export const getApiUrl = (path) => `${getApiBaseUrl()}${path}`
