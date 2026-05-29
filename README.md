# 摊主联盟

一个可发布的静态互动网站，用于让小吃、手作、鲜花、修理、二手、饮品等不同类型摊主分享经验和心得。

## 本地预览

直接打开 `index.html` 即可预览。

如果本机可以运行 Node.js，也可以启动本地服务器：

```bash
npm start
```

然后访问 `http://localhost:4173`。

## 发布方式

这是纯静态网站，不需要后端和构建产物。把整个目录上传到任意静态托管平台即可。

推荐平台：

- Vercel：导入该目录或 Git 仓库，Framework Preset 选择 `Other`，Build Command 填 `npm run build`，Output Directory 填 `.`。
- Netlify：Publish directory 填 `.`，Build command 填 `npm run build`。
- GitHub Pages：直接发布仓库根目录。
- GitHub Pages Actions：把仓库默认分支设为 `main`，在 Settings → Pages → Build and deployment 选择 `GitHub Actions`，每次推送后会自动发布。
- Cloudflare Pages：Build command 填 `npm run build`，Output directory 填 `.`。

## 已包含

- 响应式页面
- 经验筛选、搜索、排序
- 经验详情弹窗
- 收藏和发布心得，本地保存在浏览器 `localStorage`
- SEO 描述、分享图、站点图标、Web App Manifest
- 404 页面和 GitHub Pages `.nojekyll` 配置
- GitHub Pages Actions 自动部署流程
- Vercel 和 Netlify 发布配置
