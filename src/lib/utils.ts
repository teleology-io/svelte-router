
export function push(url: string, state?: any) {
  history.pushState(state, undefined, url)
}

export function replace(url: string, state?: any) {
  history.replaceState(state, undefined, url)
}

export function back() {
  history.back()
}