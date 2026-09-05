export const site = {
  name: '袁飞扬',
  nameEn: 'Finn Yuan',
  role: '集团总部高级架构师 · AI 产品与技术负责人',
  roleEn: 'AI Architecture & Digital Practice',
  tagline: '把 AI 真正装进业务流程',
  description:
    '15 年技术架构,把 AI 从演示做到算得过账、守得住安全、进得了业务流程。集团 AI 能力中枢与智能体平台技术出品人。',
  email: 'finnyuan9527@gmail.com',
  github: 'https://github.com/finnyuan9527',
  nav: [
    { label: '正片', href: '/' },
    { label: '人物志', href: '/about' },
    { label: '片库', href: '/projects' },
    { label: '观点集', href: '/notes' },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];

// 站点 base 路径(根路径部署为 '',子路径部署需对应前缀)
// 所有内部链接必须通过此函数拼接,否则点击后会丢失前缀导致 404
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export const url = (path: string) => {
  if (path === '/') return `${BASE}/`;
  return `${BASE}${path}`;
};

// 去掉当前路径中的 base 前缀,用于导航高亮等场景
export const stripBase = (path: string) => {
  const normalized = path.replace(/\/$/, '') || '/';
  return BASE && normalized.startsWith(BASE)
    ? normalized.slice(BASE.length) || '/'
    : normalized;
};
