export const categoryLabels: Record<string, string> = {
  'ai-app': 'AI 应用',
  'ai-platform': 'AI 平台',
  enterprise: '企业系统',
  'dev-efficiency': '研发提效',
};

// 分类标签色相区分,暖色调适配电影主题
export const categoryColors: Record<string, string> = {
  'ai-app': 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
  'ai-platform': 'bg-amber-700/10 text-amber-700',
  enterprise: 'bg-stone-600/10 text-stone-600',
  'dev-efficiency': 'bg-yellow-700/10 text-yellow-700',
};

export const categoryOptions = [
  { id: 'all', label: '全部' },
  { id: 'ai-app', label: 'AI 应用' },
  { id: 'ai-platform', label: 'AI 平台' },
  { id: 'enterprise', label: '企业系统' },
  { id: 'dev-efficiency', label: '研发提效' },
] as const;
