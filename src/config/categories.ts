export const categoryLabels: Record<string, string> = {
  'ai-app': 'AI 应用',
  'ai-platform': 'AI 平台',
  enterprise: '企业系统',
  'dev-efficiency': '研发提效',
};

export const categoryOptions = [
  { id: 'all', label: '全部' },
  { id: 'ai-app', label: 'AI 应用' },
  { id: 'ai-platform', label: 'AI 平台' },
  { id: 'enterprise', label: '企业系统' },
  { id: 'dev-efficiency', label: '研发提效' },
] as const;
