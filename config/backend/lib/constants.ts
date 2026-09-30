/* ═══════════════════════════════════════════════════
   EMOJI MAP & CATEGORY EMOJIS
═══════════════════════════════════════════════════ */

export const EMOJI_MAP: Record<string, string> = {
  // حلويات ساخنة (Hot Desserts)
  'konafa-qeshta.jpg': '🥮', 'konafa-gebna.jpg': '🥮', 'konafa-mokasarat.jpg': '🥮',
  'konafa-nutella.jpg': '🥮', 'konafa-manga.jpg': '🥭', 'konafa-meshmesh.jpg': '🍑',
  'om-ali.jpg': '🫕', 'aysh-saraya.jpg': '🍞', 'hot-cheesecake.jpg': '🧁',

  // حلويات باردة (Cold Desserts)
  'basbousa-qeshta.jpg': '🍰', 'basbousa-coconut.jpg': '🥥', 'hareesa.jpg': '🍮',
  'basbousa-manga.jpg': '🥭', 'basbousa-tamr.jpg': '🌴',
  'baklava-fosto2.jpg': '🧆', 'baklava-goz.jpg': '🧆', 'sawabe3-zeinab.jpg': '🌀',
  'balah-sham.jpg': '🍩', 'qatayef-qeshta.jpg': '🥞', 'qatayef-gebna.jpg': '🥞',
  'mahalabeya-ward.jpg': '🌸', 'roz-belbaban.jpg': '🍚', 'mahalabeya-manga.jpg': '🥭',
  'creme-caramel.jpg': '🍮', 'zalabeya.jpg': '🍯', 'lokaimat.jpg': '🟡', 'awwama.jpg': '🔵',
  'galash-3asal.jpg': '🍫', 'mix-tray-big.jpg': '🎁', 'mix-tray-small.jpg': '🎀',

  // مشروبات ساخنة (Hot Drinks)
  'hot-tea.jpg': '🍵', 'turkish-coffee.jpg': '☕', 'french-coffee.jpg': '☕',
  'hot-choco-classic.jpg': '🍫', 'hot-choco-nutella.jpg': '🍫', 'hot-choco-white.jpg': '🍫',
  'cocoa.jpg': '🥤', 'sahlab.jpg': '☕',
  // مشروبات ساخنة — NEW
  'ganzabil-lemon.jpg': '🍋', 'green-tea.jpg': '🍃', 'karkade.jpg': '🌺',
  'sahlab-sada.jpg': '☕', 'sahlab-fruits.jpg': '🍒', 'hazelnut-coffee.jpg': '🌰',
  'cofree-mix.jpg': '☕', 'espresso.jpg': '☕', 'mocha-hot.jpg': '🍫',
  'cafe-latte.jpg': '☕', 'nescafe-milk.jpg': '☕', 'nescafe-black.jpg': '☕',
  'cappuccino.jpg': '☕', 'macchiato.jpg': '☕', 'tea-milk.jpg': '🍵',
  'yansoon.jpg': '🌟', 'hot-mint.jpg': '🌿', 'cinnamon-drink.jpg': '🟤',

  // مشروبات مثلجة (Iced Drinks)
  'ayran.jpg': '🥛', 'laban-strawberry.jpg': '🍓',
  'juice-mango.jpg': '🥭', 'mohito.jpg': '🍹', 'strawberry-milkshake.jpg': '🍓',
  'iced-coffee-classic.jpg': '🧋', 'iced-coffee-caramel.jpg': '🧋',
  'iced-coffee-mocha.jpg': '🧋', 'iced-coffee-vanilla.jpg': '🧋',
  'iced-tea-lemon.jpg': '🧊', 'iced-tea-peach.jpg': '🍑',
  'pepsi.jpg': '🥤', 'miranda.jpg': '🥤', 'sevenup.jpg': '🥤',

  // جاتوه وكيك (Cakes)
  'torta-krema.jpg': '🎂', 'cake-chocolate.jpg': '🍫', 'cheesecake.jpg': '🧁',
  'brownies.jpg': '🍫', 'cake-red-velvet.jpg': '❤️',

  // عصائر طبيعية (Natural Juices) — NEW CATEGORY
  'juice-orange.jpg': '🍊', 'juice-lemon.jpg': '🍋', 'lemon-mint-juice.jpg': '🍋',
  'banana-milk-juice.jpg': '🍌', 'cantaloupe-juice.jpg': '🍈', 'sunshine-juice.jpg': '☀️',
  'blueberry-juice.jpg': '🫐',

  // سموزوي (Smoothies) — NEW CATEGORY
  'smoothie-blueberry.jpg': '🫐', 'smoothie-raspberry.jpg': '🫐', 'smoothie-mango.jpg': '🥭',
  'smoothie-lemon.jpg': '🍋', 'smoothie-mint.jpg': '🌿', 'smoothie-watermelon.jpg': '🍉',
  'smoothie-kiwi.jpg': '🥝', 'smoothie-orange.jpg': '🍊', 'smoothie-yogurt-fruit.jpg': '🥣',

  // آيس كوفي (Iced Coffee) — NEW CATEGORY
  'freddo-espresso.jpg': '🧋', 'iced-spanish-latte.jpg': '🧋', 'iced-latte.jpg': '🧋',
  'iced-mocha.jpg': '🧋', 'iced-cappuccino.jpg': '🧋', 'iced-nescafe-milk.jpg': '🧋',
  'iced-french.jpg': '🧋', 'iced-turkish.jpg': '🧋', 'iced-hazelnut-coffee.jpg': '🧋',
  // مشروبات ساخنة — additional items
  'hot-burbo.jpg': '🔥', 'indomie.jpg': '🍜',
  'cinnamon-roll': '🥐', 'cinnamon-roll.svg': '🥐',
};

export const CAT_EMOJI: Record<string, string> = {
  'الكل': '🍮', 'حلويات ساخنة': '🔥', 'حلويات باردة': '❄️',
  'مشروبات ساخنة': '☕', 'مشروبات مثلجة': '🧊', 'جاتوه وكيك': '🎂',
  'عصائر طبيعية': '🍊', 'سموزوي': '🥤', 'آيس كوفي': '🧋',
};

export const CAT_ORDER = [
  'حلويات ساخنة', 'حلويات باردة', 'مشروبات ساخنة', 'مشروبات مثلجة',
  'عصائر طبيعية', 'سموزوي', 'آيس كوفي', 'جاتوه وكيك'
];

export const getEmoji = (img: string) => EMOJI_MAP[img] || '🍮';
