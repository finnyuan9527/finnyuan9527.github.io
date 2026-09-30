// 主分类按建设方向划分；业务目的通过项目标签表达。
export const categoryLabels: Record<string, string> = {
  'ai-app': '业务智能化',
  'ai-platform': 'AI 平台与治理',
  enterprise: '企业系统与集成',
};
export const categoryColors: Record<string, string> = {
  'ai-app': 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
  'ai-platform': 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
  enterprise: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
};
export const categoryOptions = [
  { id: 'all', label: '全部' },
  { id: 'ai-platform', label: 'AI 平台与治理' },
  { id: 'ai-app', label: '业务智能化' },
  { id: 'enterprise', label: '企业系统与集成' },
] as const;
