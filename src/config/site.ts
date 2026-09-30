export const site = {
  name: '袁飞扬',
  nameEn: 'Finn Yuan',
  role: '复星集团总部高级架构师',
  roleEn: 'AI Architecture & Digital Practice',
  tagline: '把来路写下，向前走。',
  description:
    '袁飞扬，复星集团总部高级架构师。15 年研发与架构实践，覆盖交易系统、支付清结算、公共服务平台与企业 AI，贯通架构设计、核心开发、系统集成和上线交付。',
  email: 'finnyuan9527@gmail.com',
  github: 'https://github.com/finnyuan9527',
  nav: [
    { label: '首页', href: '/' },
    { label: '实践与作品', href: '/projects' },
    { label: '思考与观点', href: '/notes' },
    { label: '关于我', href: '/about' },
    { label: '联系', href: '/contact' },
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
