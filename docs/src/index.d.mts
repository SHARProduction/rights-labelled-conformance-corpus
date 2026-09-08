export type RightsLabel = { license: "CC-BY-4.0"; source: "authored-synthetic"; status: "cleared-synthetic"; attribution?: string };
export type ConformanceRecord = { id: string; title: string; description: string; stage: string; locale: string; mediaType: string; tags: string[]; synthetic: true; rights: RightsLabel };
export type ValidationError = { code: string; path: string };
export function validateCorpus(records: unknown): { valid: boolean; errors: ValidationError[]; stats: { total: number; synthetic: number; rightsLabelled: number } };
export function queryCorpus(records: ConformanceRecord[], filters?: { text?: string; stage?: string; locale?: string; mediaType?: string; rightsStatus?: string; tags?: string[] }): ConformanceRecord[];
