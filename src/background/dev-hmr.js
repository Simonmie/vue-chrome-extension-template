const url = globalThis.__EXT_HMR__
let es
const connect = () => {
  try {
    es = new EventSource(url)
    es.onmessage = () => {
      const c = globalThis.chrome
      if (c && c.runtime && typeof c.runtime.reload === 'function') c.runtime.reload()
    }
    es.onerror = () => {
      try {
        es.close()
      } catch (e) {
        void e
      }
      setTimeout(connect, 1000)
    }
  } catch {
    setTimeout(connect, 1000)
  }
}
connect()

/*
 * 监听 action 点击事件，打开侧边栏
 */

const c = globalThis.chrome
if (c && c.action && c.sidePanel) {
  c.action.onClicked.addListener(async (tab) => {
    try {
      if (tab && tab.windowId != null) {
        await c.sidePanel.open({ windowId: tab.windowId })
      }
    } catch (e) {
      console.error('sidePanel.open on action click error', e)
    }
  })
}
