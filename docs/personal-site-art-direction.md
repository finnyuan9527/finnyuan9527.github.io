# 电影式个人叙事：实施与验收

2026-09-30。此文取代此前纸张与水墨方向。最终选择：电影式个人叙事、抽象光影摄影、强烈沉浸感。

## 视觉与布局

以石墨灰、银白与单一琥珀强调色建立夜读视觉，日读模式使用中性灰白。中文系统无衬线字体、统一尖角、细线和较大留白。设计刻度：DESIGN_VARIANCE 8 / MOTION_INTENSITY 7 / VISUAL_DENSITY 3。

首页大幅摄影首先呈现姓名、真实身份与个人主张。职业历程使用三个章节：2011-2018 业务与交易，2018-2022 平台与连接，2023-2026 企业 AI 与未来探索。代表作品为一个重点案例和两个较轻案例。能力采用横向条目，工作习惯采用文字组，个人回望文章优先展示。

作品归档保留四个筛选和筛选 URL、返回状态。文学标题与业务副标题并列。关于页采用章节布局，并保留四组共 24 个项目节点。文章正文宽度 720px，17-18px 字号。联系页以邮件和代码入口收束。

## 动效与降级

GSAP 与 ScrollTrigger 动态加载，仅首页使用。宽度至少 1024px、高度至少 700px、精细指针且未要求减少动效时启用固定章节，额外滚动跨度为 1.8 个视口。使用原生滚动，只改变透明度和位移，提供跳过入口。手机、平板、减少动效、加载失败及关闭 JavaScript 时显示完整顺序内容。

日读/夜读选择存储于浏览器 localStorage；存储不可用时仍可切换当前页面。无远程字体、视频或 WebGL。

历程动画仅改变视觉透明度与位移，不设置 aria-hidden 或 inert。三个章节的标题、正文与图片保持原有 DOM 顺序，始终留在无障碍树中，屏幕阅读器无需触发滚动即可连续阅读。

## 配图

三张由内置 imagegen 生成的抽象摄影，表达历程而非实际项目截图。原始 PNG 留在工具目录，项目提供 640、1024、1536px JPEG，按屏幕加载。首页图片优先加载，其他图片延迟加载。旧水墨资源保留，但不再用于页面。

### layers

文件：public/images/cinematic-layers.jpg

原始生成文件：/Users/yuanfy/.codex/generated_images/01a0f124-7308-7463-b895-9ea0da3919fa/exec-29d49a73-4bf9-455a-8a58-268f58101b46.png

提示词：A fine-art abstract architectural photograph for a cinematic personal website. Landscape 16:9. Close-up layered brushed graphite metal planes and translucent smoked glass, receding diagonally in quiet deep space, subtle silver edge reflections, one very restrained warm amber light grazing the surfaces. Strong asymmetric composition, rich dark charcoal shadows, tactile real materials, soft lens depth, museum-quality photographic realism. Reflective, poised, mature. No people, text, logos, ink, paper, illustration, neon, glowing balls, circuitry, sci-fi tunnels. Keep details mostly on right and lower half, calm dark negative space upper left.

### connections

文件：public/images/cinematic-connections.jpg

原始生成文件：/Users/yuanfy/.codex/generated_images/01a0f124-7308-7463-b895-9ea0da3919fa/exec-88103bac-f6b8-44bc-b17d-f004fb99ea7c.png

提示词：A fine-art abstract photographic still life for a cinematic personal website, landscape 16:9. Several large smoked glass sheets intersect and refract a thin band of soft warm amber light onto a charcoal studio wall. Off-center geometric fragments of reflection, silver gray translucent surfaces, quiet optical complexity, tangible materials, elegant editorial photography. Broad asymmetrical composition, no central focal orb. Deep graphite and silver with tiny warm highlights, restrained museum installation atmosphere. No people, text, logo, ink, watercolor, paper, illustration, neon, screens, technology icons.

### horizon

文件：public/images/cinematic-horizon.jpg

原始生成文件：/Users/yuanfy/.codex/generated_images/01a0f124-7308-7463-b895-9ea0da3919fa/exec-fd39261d-3959-47cd-936c-a877e2c0857b.png

提示词：A cinematic fine-art abstract architectural photograph, landscape 16:9, for a personal website about saying farewell to the past and welcoming the future. A vast graphite-gray architectural plane opening slightly toward a soft luminous amber horizon at the far right, slanting light gently reflected on dark brushed metal floor. Minimal physical geometry, deep atmospheric space, photographic realism, quiet warmth, hopeful but restrained. Left half nearly dark and calm for white typography, light occupies right third, beautifully composed dramatic negative space. No people, text, logo, ink, paper, painterly strokes, neon, glowing balls, sci-fi tunnel, computer imagery.

## 验收证据

- npm run build：25 个静态页面；RSS 与 sitemap 生成。
- scripts/verify_site.py：25 页面、446 内部链接，标题层级、当前导航、正文跳转、联系入口与案例/文章关系通过。
- 可见 Chromium：25 页面 × 2 主题 × 5 宽度（320、390、768、1440、1920），共 250 次检查；无横向溢出或缺失图片，每页一个 H1。
- 筛选、历史返回、详情返回筛选、手机菜单 Escape、24 个时间线节点、主题跨页保持通过。
- 固定章节的前后滚动、快速跳转、缩放恢复、键盘跳过、减少动效通过；直接禁用脚本后，手机导航默认展开，三个历程章节完整可见。
- 无障碍修复验收：桌面动画启用时，通过 Chromium Accessibility.getFullAXTree 检查第一、第二、第三章及返回第一章的滚动位置，三个标题始终按顺序存在，三段正文均可访问；视觉切换仍正常。
- 按用户要求移除全站配图下的“AI 生成抽象摄影”说明，保留文学短句；图片来源与提示词仅记录于本文档。
- 静态样式审计覆盖 src 和全部 40 个 Astro/MDX 文件，FAIL 0；正文、次要文字和强调色在两个主题均达到 WCAG AA。
- 首页主图 149KB；全部首页外部脚本 gzip 约 46KB。移动设备不加载动画库。这是本地构建资源测量，不是线上网络性能结论。
- Google 验证 HTML 原样进入 dist；保留现有 URL、结构化数据、SEO、RSS 和 sitemap。

截图在 outputs/visual-review/。本轮未部署，未修改用户已有 dist.zip。视觉质量按作品集标准改善，未声称客观排名或完成线上真实用户验证。
