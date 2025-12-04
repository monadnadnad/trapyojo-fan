const STORAGE_KEY = "trapyojo_safe_mode"

export const useSafeMode = () => {
  const safeMode = useCookie<boolean>(STORAGE_KEY, {
    default: () => true,
  })

  return {
    safeMode,
  }
}
