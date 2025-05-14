// Handles application-wide errors in a consistent way
export function useErrorHandler() {
  function handleError(error: unknown, fallbackMessage = 'Something went wrong') {
    console.error('[ErrorHandler]', error)

    // For now we use alert, you can switch to a toast/snackbar later
    alert(fallbackMessage)
  }

  return { handleError }
}
