# 摊主联盟

一个可发布的静态产品原型，定位为“摊主基础设施平台”，用于沉淀摆摊经验、利润计算、摊位情报、真实经营日志和 AI 工具入口。

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
- 深色移动优先产品首页
- 摆摊经验信息流，支持搜索和分类筛选
- 热门分类入口
- 利润计算器：自动计算日利润、月利润、回本周期和利润率
- 成本结构可视化图表
- 摆摊地图/点位情报卡片
- 今日摆摊日志
- AI 工具入口区
- 发布经验原型，本地保存在浏览器 `localStorage`
- SEO 描述、分享图、站点图标、Web App Manifest
- 404 页面和 GitHub Pages `.nojekyll` 配置
- GitHub Pages Actions 自动部署流程
- Vercel 和 Netlify 发布配置
