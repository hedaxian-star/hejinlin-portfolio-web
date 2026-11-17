# 1114 独立预览

入口：http://127.0.0.1:4173/v6/index.html

基于 preview-dust-v5.html，旧版文件未覆盖。

## 本轮文件
- index.html、works.html、case-*.html：独立页面副本及内部导航。
- home.js、update.css：卡片轮播、悬停与触屏切换、五类导航、左右项目说明、Connect 左右拼合和真实二维码。
- hero.js：保留原变形算法，移除旧标题首帧，解码时将素材黑底转成透明画布。
- dust.js：共享首屏与第二屏粒子层，提高细颗粒可见度。
- panels.js：保留 About/Brands 结构，修复新版跨页锚点。
- bootstrap.js、shared.js：标题初始化和新版路径。
- ../assets/latest/wechat-qr-1114.png：用户原始二维码，逐字节一致，未裁剪压缩。

## 验证
- 六个 JS 文件语法通过。
- 13 个 HTML 页共 254 个本地资源/链接存在。
- 入口 HTTP 200。
- 浏览器控制工具连续超时，未完成浏览器视觉和真实触屏验收；二维码仍需手机实际扫码确认。
- AI Lab 无现有项目，选择后显示空状态；未编造案例。
- 当前原站内页导航为 HJL / ABOUT / WORK / CONTACT，本版保留现有语义。PDF 中的 PDF 导航未替换，因实际作品集下载文件尚未提供。

## 重启本机预览
在 portfolio-demo/dist 目录执行：
python3 -m http.server 4173 --bind 127.0.0.1
