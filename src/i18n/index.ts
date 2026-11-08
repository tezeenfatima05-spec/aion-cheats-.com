export type { Translations } from './types';
export { en as t } from './en';

export function avatarSrc(style: string, seed: string) {
  return `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&size=28&backgroundColor=0a0d10,7f3dee,181f26,e9a82f,11161b`;
}
