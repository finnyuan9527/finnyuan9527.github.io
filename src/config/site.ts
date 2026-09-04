export const site = {
  name: '袁飞扬',
  nameEn: 'Finn Yuan',
  role: '企业数字化与 AI 落地架构师',
  roleEn: 'AI Architecture & Digital Practice',
  tagline: '把前沿 AI 带进真实业务',
  description:
    '长期实践企业数字化与 AI 落地的架构师,关注如何把模型、数据、系统和流程连接起来,让 AI 真正进入业务。',
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
