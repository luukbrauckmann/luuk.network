export function showBackdrop() {
  document.dispatchEvent(new CustomEvent('backdrop', { detail: {
    show: true
  } }))
}

export function hideBackdrop() {
  document.dispatchEvent(new CustomEvent('backdrop', { detail: {
    show: false
  } }))
}
