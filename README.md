# finn-site

袁飞扬个人网站 · 企业数字化与 AI 落地架构师

基于 [Astro](https://astro.build) 构建,部署于 GitHub Pages。

## 本地开发

```bash
pnpm install
pnpm dev
```

访问 `http://localhost:4321/finn-site`

## 构建

```bash
pnpm build
```

输出到 `dist/`。

## 部署

**首次部署前置操作**:推送到 GitHub 后,需在仓库 **Settings → Pages** 中将 **Source** 设置为 **GitHub Actions**(而非默认的 Deploy from branch)。

之后推送到 `main` 分支,GitHub Actions 会自动构建并部署到 GitHub Pages。

线上地址:https://finnyuan9527.github.io/finn-site

## 项目结构

```
src/
├── components/    UI 组件
├── config/        站点配置
├── content/       内容(MDX)
│   ├── notes/     思考笔记
│   └── projects/  项目案例
├── layouts/       布局
├── pages/         页面路由
└── styles/        全局样式
```
