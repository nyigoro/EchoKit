import { extractMentions } from './mentions.js';
import { extractHashtags } from './hashtags.js';

export { extractMentions } from './mentions.js';
export type { MentionToken } from './mentions.js';
export { extractHashtags } from './hashtags.js';
export type { HashtagToken } from './hashtags.js';
export { getKeywordDensity } from './keywordDensity.js';
export type { KeywordDensityOptions } from './keywordDensity.js';
export { DEFAULT_STOP_WORDS } from './stopWords.js';

export type ParseResult = {
  mentions: ReturnType<typeof extractMentions>;
  hashtags: ReturnType<typeof extractHashtags>;
};

export const parseMentionsAndHashtags = (text: string): ParseResult => ({
  mentions: extractMentions(text),
  hashtags: extractHashtags(text),
});
