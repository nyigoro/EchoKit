import { extractMentions } from './mentions.js';
import { extractHashtags } from './hashtags.js';

export { extractMentions } from './mentions.js';
export type { MentionToken } from './mentions.js';
export { extractHashtags } from './hashtags.js';
export type { HashtagToken } from './hashtags.js';

export const parseMentionsAndHashtags = (text: string) => ({
  mentions: extractMentions(text),
  hashtags: extractHashtags(text),
});
