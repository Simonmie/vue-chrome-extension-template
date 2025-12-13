<template>
  <div class="popup-component">
    <img src="/icons/logo-128.png" alt="Logo" class="logo" />
    <p class="subtitle">Vue Chrome Extension Template</p>
    <p class="description">
      一个基于 Vue 3 + Vite 的 Chrome 扩展开发模板，支持热更新、侧边栏、弹窗等功能。
    </p>
  </div>
</template>

<script setup></script>

<style scoped>
.popup-component {
  width: 300px;
  height: 200px;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}

h1 {
  margin: 0 0 10px;
  color: #42b883;
  font-size: 24px;
}

.logo {
  width: 64px;
  height: 64px;
  margin-bottom: 10px;
}

.subtitle {
  margin: 0 0 15px;
  color: #666;
  font-size: 14px;
}

.description {
  margin: 0;
  color: #333;
  font-size: 12px;
  line-height: 1.5;
}
</style>
