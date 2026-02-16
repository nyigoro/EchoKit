import {
  analyzeText,
  createMetaDescription,
  createSeoTitle,
  diffText,
  extractEmails,
  extractHashtags,
  extractMentions,
  extractSeoKeywords,
  extractUrls,
  getSentiment,
  getReadingEase,
  isEmail,
  isHashtag,
  isMention,
  isSlug,
  isUrl,
  listTemplates,
  pluralize,
  redactPII,
  readingTime,
  renderTemplate,
  similarityScore,
  slugify,
  singularize,
  smartTruncate,
  toCamelCase,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
} from '../index.js';
import type { TemplateVariables } from '../templates/index.js';
import type { TemplateName } from '../templates/index.js';

export type CliResult = {
  code: number;
  stdout: string;
  stderr: string;
};

type ParsedArgs = {
  positionals: string[];
  options: Record<string, string[]>;
};

const usage = () => `EchoKyt CLI

Usage:
  echokyt slug <text>
  echokyt truncate <text> --limit 120
  echokyt camel <text>
  echokyt snake <text>
  echokyt kebab <text>
  echokyt title <text>
  echokyt pluralize <word>
  echokyt singularize <word>
  echokyt reading-time <text> --wpm 200
  echokyt reading-ease <text>
  echokyt analyze <text>
  echokyt sentiment <text>
  echokyt diff --old "<old text>" --new "<new text>"
  echokyt similarity --left "<text1>" --right "<text2>"
  echokyt mentions <text>
  echokyt hashtags <text>
  echokyt emails <text>
  echokyt urls <text>
  echokyt redact-pii <text> [--emails] [--phones] [--ssn] [--replacement "[REDACTED]"]
  echokyt keywords <text> --top 10
  echokyt meta-description <text> --max 160
  echokyt seo-title <text> --brand "EchoKyt" --max 60
  echokyt validate-email <value>
  echokyt validate-url <value> [--allow-no-protocol]
  echokyt validate-slug <value>
  echokyt validate-mention <value>
  echokyt validate-hashtag <value>
  echokyt templates
  echokyt template <name> --vars "key=value,key2=value2"
  echokyt help`;

const parseArgs = (args: string[]): ParsedArgs => {
  const positionals: string[] = [];
  const options: Record<string, string[]> = {};

  for (let i = 0; i < args.length; i += 1) {
    const token = args[i];
    if (!token.startsWith('--')) {
      positionals.push(token);
      continue;
    }

    const key = token.slice(2);
    const next = args[i + 1];
    if (!next || next.startsWith('--')) {
      options[key] = [...(options[key] ?? []), 'true'];
      continue;
    }

    options[key] = [...(options[key] ?? []), next];
    i += 1;
  }

  return { positionals, options };
};

const optionValue = (
  options: Record<string, string[]>,
  key: string,
): string | undefined => {
  const values = options[key];
  return values ? values[values.length - 1] : undefined;
};

const optionFlag = (options: Record<string, string[]>, key: string): boolean => {
  return key in options;
};

const toNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const parseVars = (raw?: string): TemplateVariables => {
  if (!raw) return {};

  return raw.split(',').reduce<TemplateVariables>((acc, segment) => {
    const [key, ...rest] = segment.split('=');
    if (!key) return acc;
    acc[key.trim()] = rest.join('=').trim();
    return acc;
  }, {});
};

const toJson = (value: unknown): string => JSON.stringify(value, null, 2);
const isTemplateName = (value: string): value is TemplateName => {
  return listTemplates().includes(value as TemplateName);
};
const commandTextPair = (
  parsed: ParsedArgs,
  leftKey: string,
  rightKey: string,
): [string, string] => {
  const left = optionValue(parsed.options, leftKey) ?? parsed.positionals[0] ?? '';
  const right = optionValue(parsed.options, rightKey) ?? parsed.positionals.slice(1).join(' ');
  return [left.trim(), right.trim()];
};

export const runCli = (argv: string[]): CliResult => {
  const [command, ...rest] = argv;
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    return { code: 0, stdout: usage(), stderr: '' };
  }

  const parsed = parseArgs(rest);
  const text = parsed.positionals.join(' ').trim();

  switch (command) {
    case 'slug':
      return { code: 0, stdout: slugify(text), stderr: '' };
    case 'truncate':
      return {
        code: 0,
        stdout: smartTruncate(text, toNumber(optionValue(parsed.options, 'limit'), 120)),
        stderr: '',
      };
    case 'camel':
      return { code: 0, stdout: toCamelCase(text), stderr: '' };
    case 'snake':
      return { code: 0, stdout: toSnakeCase(text), stderr: '' };
    case 'kebab':
      return { code: 0, stdout: toKebabCase(text), stderr: '' };
    case 'title':
      return { code: 0, stdout: toTitleCase(text), stderr: '' };
    case 'pluralize':
      return { code: 0, stdout: pluralize(text), stderr: '' };
    case 'singularize':
      return { code: 0, stdout: singularize(text), stderr: '' };
    case 'reading-time':
      return {
        code: 0,
        stdout: String(readingTime(text, toNumber(optionValue(parsed.options, 'wpm'), 200))),
        stderr: '',
      };
    case 'reading-ease':
      return { code: 0, stdout: String(getReadingEase(text)), stderr: '' };
    case 'analyze':
      return { code: 0, stdout: toJson(analyzeText(text)), stderr: '' };
    case 'sentiment':
      return { code: 0, stdout: toJson(getSentiment(text)), stderr: '' };
    case 'diff': {
      const [left, right] = commandTextPair(parsed, 'old', 'new');
      return { code: 0, stdout: toJson(diffText(left, right)), stderr: '' };
    }
    case 'similarity': {
      const [left, right] = commandTextPair(parsed, 'left', 'right');
      return { code: 0, stdout: String(similarityScore(left, right)), stderr: '' };
    }
    case 'mentions':
      return { code: 0, stdout: toJson(extractMentions(text)), stderr: '' };
    case 'hashtags':
      return { code: 0, stdout: toJson(extractHashtags(text)), stderr: '' };
    case 'emails':
      return { code: 0, stdout: toJson(extractEmails(text)), stderr: '' };
    case 'urls':
      return { code: 0, stdout: toJson(extractUrls(text)), stderr: '' };
    case 'redact-pii':
      {
        const flagEmails = optionFlag(parsed.options, 'emails');
        const flagPhones = optionFlag(parsed.options, 'phones');
        const flagSsn = optionFlag(parsed.options, 'ssn');
        const hasScopedFlags = flagEmails || flagPhones || flagSsn;
        return {
          code: 0,
          stdout: redactPII(text, {
            detectEmails: hasScopedFlags ? flagEmails : undefined,
            detectPhones: hasScopedFlags ? flagPhones : undefined,
            detectSSN: hasScopedFlags ? flagSsn : undefined,
            replacement: optionValue(parsed.options, 'replacement'),
          }),
          stderr: '',
        };
      }
    case 'keywords':
      return {
        code: 0,
        stdout: toJson(
          extractSeoKeywords(text, { topN: toNumber(optionValue(parsed.options, 'top'), 10) }),
        ),
        stderr: '',
      };
    case 'meta-description':
      return {
        code: 0,
        stdout: createMetaDescription(text, toNumber(optionValue(parsed.options, 'max'), 160)),
        stderr: '',
      };
    case 'seo-title':
      return {
        code: 0,
        stdout: createSeoTitle(text, {
          brand: optionValue(parsed.options, 'brand'),
          maxLength: toNumber(optionValue(parsed.options, 'max'), 60),
        }),
        stderr: '',
      };
    case 'validate-email':
      return { code: 0, stdout: String(isEmail(text)), stderr: '' };
    case 'validate-url':
      return {
        code: 0,
        stdout: String(isUrl(text, { allowNoProtocol: optionFlag(parsed.options, 'allow-no-protocol') })),
        stderr: '',
      };
    case 'validate-slug':
      return { code: 0, stdout: String(isSlug(text)), stderr: '' };
    case 'validate-mention':
      return { code: 0, stdout: String(isMention(text)), stderr: '' };
    case 'validate-hashtag':
      return { code: 0, stdout: String(isHashtag(text)), stderr: '' };
    case 'templates':
      return { code: 0, stdout: toJson(listTemplates()), stderr: '' };
    case 'template': {
      const name = parsed.positionals[0];
      if (!name) {
        return {
          code: 1,
          stdout: '',
          stderr: 'Missing template name. Use: echokyt template <name> --vars "key=value"',
        };
      }
      if (!isTemplateName(name)) {
        return {
          code: 1,
          stdout: '',
          stderr: `Unknown template: ${name}`,
        };
      }
      return {
        code: 0,
        stdout: renderTemplate(name, parseVars(optionValue(parsed.options, 'vars'))),
        stderr: '',
      };
    }
    default:
      return {
        code: 1,
        stdout: '',
        stderr: `Unknown command: ${command}\n\n${usage()}`,
      };
  }
};
