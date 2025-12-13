const c = globalThis.chrome
if (c && c.sidePanel) {
  try {
    c.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => void 0)
  } catch (e) {
    void e
  }
}
if (c && c.action && c.sidePanel) {
  c.action.onClicked.addListener(async (tab) => {
    try {
      if (tab && tab.windowId != null) {
        await c.sidePanel.open({ windowId: tab.windowId })
      }
    } catch (e) {
      void e
    }
  })
}

