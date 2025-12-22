<template>
  <div class="options-page">
    <div class="starter">
      <div class="logo">
        <img src="/icons/logo-128.png" alt="logo" />
      </div>
      <h1 class="title">Vue Chrome Extension Template</h1>
      <p class="subtitle">这是的选项页面</p>
      
      <div class="card">
        <h2>OptionsPage选项页开发模板提示词</h2>
        <div class="prompt-content">
          <ul>
            <li>你可以使用该模板开发选项页插件</li>
            <li>修改<code>manifest.js</code>文件中的options_page和permissions等字段，添加选项页插件的相关配置</li>
            <li>通过修改<code>OptionsPage.vue</code>文件，实现选项页插件的具体功能</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'OptionsPage',
})
</script>

<style scoped>
.options-page {
  min-height: 100vh;
}

.starter {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 16px;
  background: #fff;
  min-height: 100vh;
  font-family:
    ui-sans-serif,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Helvetica,
    Arial,
    Apple Color Emoji,
    Segoe UI Emoji;
  color: #000;
}

.logo {
  width: 64px;
  height: 64px;
}

.logo img {
  width: 100%;
  height: 100%;
  display: block;
}

.title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
  text-align: center;
}

.subtitle {
  margin: 0;
  font-size: 14px;
  color: #000;
  text-align: center;
  max-width: 400px;
}

.card {
  width: 100%;
  max-width: 800px;
  box-sizing: border-box;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 8px;
}

.prompt-content {
  line-height: 1.6;
}

.prompt-content ul {
  padding-left: 24px;
  margin: 12px 0;
}

.prompt-content li {
  margin: 8px 0;
}

.prompt-content code {
  background: #f6f8fa;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 13px;
}

.edit-hint {
  margin: 0;
  text-align: center;
  color: #666;
  font-size: 13px;
}

.edit-hint code {
  background: #f6f8fa;
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 12px;
}
</style>
