export const categoryLabels: Record<string, string> = {
  'ai-app': 'AI 应用',
  'ai-platform': 'AI 平台',
  enterprise: '企业系统',
  'dev-efficiency': '研发提效',
};

// 分类标签色相区分,避免全站标签同色导致的信息层级扁平
export const categoryColors: Record<string, string> = {
  'ai-app': 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
  'ai-platform': 'bg-sky-500/10 text-sky-600',
  enterprise: 'bg-indigo-500/10 text-indigo-600',
  'dev-efficiency': 'bg-amber-500/10 text-amber-600',
};

export const categoryOptions = [
  { id: 'all', label: '全部' },
  { id: 'ai-app', label: 'AI 应用' },
  { id: 'ai-platform', label: 'AI 平台' },
  { id: 'enterprise', label: '企业系统' },
  { id: 'dev-efficiency', label: '研发提效' },
] as const;
