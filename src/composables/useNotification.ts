export function useNotification() {
  function showSuccess(message: string) {
    alert(message)
  }

  return { showSuccess }
}
