import { extractMentions } from './mentions.js';
import { extractHashtags } from './hashtags.js';
import { extractEmails } from './emails.js';
import { extractUrls } from './urls.js';

export { extractMentions } from './mentions.js';
export type { MentionToken } from './mentions.js';
export { extractHashtags } from './hashtags.js';
export type { HashtagToken } from './hashtags.js';
export { extractEmails } from './emails.js';
export type { EmailToken } from './emails.js';
export { extractUrls } from './urls.js';
export type { UrlToken } from './urls.js';
export { getKeywordDensity } from './keywordDensity.js';
export type { KeywordDensityOptions } from './keywordDensity.js';
export { DEFAULT_STOP_WORDS } from './stopWords.js';

export type ParseResult = {
  mentions: ReturnType<typeof extractMentions>;
  hashtags: ReturnType<typeof extractHashtags>;
  emails: ReturnType<typeof extractEmails>;
  urls: ReturnType<typeof extractUrls>;
};

export const parseTextEntities = (text: string): ParseResult => ({
  mentions: extractMentions(text),
  hashtags: extractHashtags(text),
  emails: extractEmails(text),
  urls: extractUrls(text),
});

export const parseMentionsAndHashtags = (text: string): ParseResult => {
  return parseTextEntities(text);
};
