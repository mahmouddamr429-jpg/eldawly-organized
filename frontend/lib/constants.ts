// Map image filenames to emojis
const emojiMap: Record<string, string> = {
  'kanafa': '🥐',
  'baklava': '🥜',
  'basboosa': '🍪',
  'konafa': '🥐',
  'om-ali': '🍮',
  'mahallabia': '🍮',
  'halva': '🟤',
  'brownies': '🍫',
  'cake': '🎂',
  'donut': '🍩',
  'pie': '🥧',
  'cookie': '🍪',
  'bread': '🍞',
  'cinnamon-roll': '🥐',
};

export function getEmoji(filename: string): string {
  const lower = filename.toLowerCase();
  for (const [key, emoji] of Object.entries(emojiMap)) {
    if (lower.includes(key)) return emoji;
  }
  return '🍰';
}
