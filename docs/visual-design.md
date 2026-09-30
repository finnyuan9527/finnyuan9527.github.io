# 视觉升级方案

2026-09-30，个人技术作品网站。面向企业 AI 合作方、技术负责人和同行，主要任务是判断专业经验并找到相关案例。

## 设计方向

从原有暖白、铜色、电影章节式排版，转向建筑结构与材料质感。保留铜色作为品牌连续性，减少电影标签和同质卡片，采用更宽的网格与更清楚的文字层级。主视觉只承担记忆点，不替代项目证据。

- 色彩：矿物白 #f6f7f5、表面白 #fcfcfa、石墨 #25312e、次级灰 #606b66、铜色 #91602f、边界灰 #dce1dd。
- 字体：中文与正文使用本机 PingFang SC / Microsoft YaHei，标题采用同一无衬线字族，避免远程字体；个人名字采用宋体，延续原有个人署名气质。
- 布局：桌面首页 1160px 主网格，首屏文字与建筑主视觉左右配置；精选案例构成有主次的横向展示；能力以横向条目呈现，文章以阅读列表呈现。正文内页维持可阅读的窄行宽。
- 原则：一张主视觉承担辨识度；其余界面用留白、文字、真实内容与细边界组织。图片不冒充现场或项目成果。
- 动效：只在首屏做一次轻微显现；按钮、链接和卡片提供短促操作反馈；减少动态效果时关闭位移动画。不引入新动画库。
- 尺度：设计差异 6/10，动效强度 3/10，视觉密度 3/10。轻色主题用于专业作品阅读；不是面向消费者的双主题产品。

## 对初稿的修正

不采用通用科技蓝紫辉光、装饰序号或满屏相同圆角卡片。保留原有铜色，但改为偏中性的矿物背景；标题以无衬线为主，宋体仅用于署名；建筑图片作为唯一大视觉，不添加虚构产品截图。

## 素材

使用内置 GPT 生图工具生成，非 CLI。生成图为概念主视觉，非真实项目照片。

- 网页素材：`public/images/architecture-hero.webp`，1536 × 1024，266,292 字节（约 260KB）。仅转换编码，未改变构图。
- 原始素材：`assets/source/architecture-hero.png`。
- 网页图注明确标注“AI 生成概念视觉”。图片使用高优先级加载及明确尺寸，其他页面不加载该素材。

最终生成提示词：

```text
Use case: stylized-concept. Asset type: hero visual for a Chinese enterprise AI architect's personal portfolio. Primary request: a beautifully crafted architectural study of interconnected brushed aluminium beams forming a continuous structured bridge across a pale mineral stone space, with one subtle warm bronze junction; express systems architecture, connection and engineering through real materials. Style: photorealistic editorial architectural photography, quiet precision, sculptural but plausible physical construction, fine brushed metal texture, subtle imperfections, museum-grade light, not a sci-fi render. Composition: landscape 3:2, close architectural detail with overlapping horizontal and vertical members, strong diagonal perspective and deep soft shadows, ample breathing room, no skyline. Palette: pale limestone, silver grey, charcoal shadows, small bronze reflection. Lighting: warm late-afternoon side light with distinct architectural shadow, refined restrained contrast. No text, no people, no logos, no computer screens, no holograms, no glowing circuitry, no blue or purple neon, no infinite metallic knots. Produce a finished standalone raster photograph concept.
```

## 完成与验证

- 首页：桌面文字与图片双栏，非等宽的精选案例；能力条目、人物介绍、文章列表采用不同版式节奏。
- 栏目页：项目首个案例在奇数结果时采用横向卡片，避免末行空洞；切换分类同步恢复布局。文章使用日期与摘要的阅读列表。
- 详情、关于、联系：统一文字层级、表面颜色、圆角、留白与交流入口；正文保持窄行宽，列表恢复项目符号。
- 全部 13 个页面在 320、768、1440px 检查，未发现横向溢出，图片正常加载。桌面导航高度 77px，手机 65px。
- 人工截图审查：首页桌面与手机、项目栏目桌面与手机、关于页手机、联系页桌面、案例与长文章详情。
- 分类计数与显示正确，打开案例后返回保留分类；移动菜单开关、Escape 与按钮焦点正常。
- 关键配色对比度：铜色文字在底色上 4.99:1，次级文字 5.15:1，主要按钮文字 13.13:1。不是全站无障碍认证。
- 构建与结构验证通过：13 个页面、221 个内部链接与锚点、案例与文章关系。视觉技能扫描包含 Astro 与 MDX 转存文本，未发现 FAIL。
- 轻微首屏入场与悬停反馈仅在未选择减少动态效果时启用。导航与正文始终可访问。
- 保留现有 URL、主导航标签、内容证据与分类功能。没有引入第三方字体或新运行时库，也未发布到线上。

