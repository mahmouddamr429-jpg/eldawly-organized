import { db } from '../lib/db';

const PRODUCTS = [
  // ======= حلويات ساخنة (Hot Desserts) — 30% price increase =======
  { name: 'كنافة بالقشطة', description: 'كنافة ناعمة محشوة بالقشطة البلدي الطازجة، مقلية بالسمن وسكرها بشراب العسل', price: 33.00, category: 'حلويات ساخنة', image: 'konafa-qeshta.jpg', stock: 80, featured: true, rating: 5.0 },
  { name: 'كنافة بالجبن', description: 'كنافة مقرمشة محشوة بالجبن العكاوي المذاب مع شراب الليمون والزهر', price: 29.00, category: 'حلويات ساخنة', image: 'konafa-gebna.jpg', stock: 80, featured: true, rating: 4.9 },
  { name: 'كنافة بالمكسرات', description: 'كنافة مجففة محشوة بمزيج الفستق والجوز واللوز مع الشراب والقرفة', price: 37.00, category: 'حلويات ساخنة', image: 'konafa-mokasarat.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'كنافة بالنوتيلا', description: 'كنافة عصرية محشوة بكريمة النوتيلا مع الفستق المطحون', price: 39.00, category: 'حلويات ساخنة', image: 'konafa-nutella.jpg', stock: 50, featured: true, rating: 4.9 },
  { name: 'كنافة بالمانجو', description: 'كنافة صيفية بكريمة المانجو الطازجة والقشطة، من إبداعات المحل', price: 42.00, category: 'حلويات ساخنة', image: 'konafa-manga.jpg', stock: 40, featured: false, rating: 4.7 },
  { name: 'كنافة ب المشمش', description: 'كنافة مقرمشة بطعم المشمش الحامض الحلو مع شراب القرفة', price: 35.00, category: 'حلويات ساخنة', image: 'konafa-meshmesh.jpg', stock: 50, featured: false, rating: 4.6 },
  { name: 'أم علي', description: 'أم علي المصرية الأصيلة — طبقات الخبز الفينو بالحليب والمكسرات وجوز الهند والزبيب', price: 26.00, category: 'حلويات ساخنة', image: 'om-ali.jpg', stock: 70, featured: true, rating: 5.0 },
  { name: 'عيش السرايا', description: 'عيش السرايا اللبناني — خبز محمص بالقشطة وشراب القطر والفستق', price: 23.00, category: 'حلويات ساخنة', image: 'aysh-saraya.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'تشيز كيك ساخن', description: 'تشيز كيك دافئ بصوص التوت الطازج', price: 46.00, category: 'حلويات ساخنة', image: 'hot-cheesecake.jpg', stock: 40, featured: true, rating: 4.9 },

  // ======= حلويات باردة (Cold Desserts) — 30% price increase =======
  { name: 'بسبوسة بالقشطة', description: 'بسبوسة سميد طرية مغطاة بطبقة قشطة بلدي سميكة، محلاة بشراب السكر والزهر', price: 20.00, category: 'حلويات باردة', image: 'basbousa-qeshta.jpg', stock: 100, featured: true, rating: 5.0 },
  { name: 'بسبوسة بجوز الهند', description: 'بسبوسة كلاسيكية بنكهة جوز الهند الطبيعي مع لوز محمص فوقها', price: 16.00, category: 'حلويات باردة', image: 'basbousa-coconut.jpg', stock: 100, featured: false, rating: 4.8 },
  { name: 'هريسة بالسمن', description: 'هريسة قمح مصرية أصيلة مصنوعة بالسمن البلدي والشراب والمكسرات', price: 18.00, category: 'حلويات باردة', image: 'hareesa.jpg', stock: 80, featured: true, rating: 4.9 },
  { name: 'بسبوسة بالمانجو', description: 'بسبوسة بنكهة المانجو الاستوائية مع كريمة المانجو الطازجة فوقها', price: 23.00, category: 'حلويات باردة', image: 'basbousa-manga.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'بسبوسة ب التمر', description: 'بسبوسة محشوة بمعجون التمر والقرفة مع رشة جوزة الطيب', price: 21.00, category: 'حلويات باردة', image: 'basbousa-tamr.jpg', stock: 70, featured: false, rating: 4.8 },
  { name: 'مهلبية بالورد', description: 'مهلبية حليب كريمية بنكهة ماء الورد مع الفستق المطحون والقشطة', price: 16.00, category: 'حلويات باردة', image: 'mahalabeya-ward.jpg', stock: 100, featured: true, rating: 4.9 },
  { name: 'أرز بلبن', description: 'أرز بلبن مصري كريمي بالقرفة والزبيب، وصفة الجدة الأصلية', price: 13.00, category: 'حلويات باردة', image: 'roz-belbaban.jpg', stock: 100, featured: false, rating: 4.8 },
  { name: 'مهلبية بالمانجو', description: 'مهلبية ناعمة بكريمة المانجو الطازجة فوقها مكسرات وشراب', price: 20.00, category: 'حلويات باردة', image: 'mahalabeya-manga.jpg', stock: 80, featured: true, rating: 4.8 },
  { name: 'كريم كراميل', description: 'كريم كراميل ناعم بالفانيليا مع صلصة الكراميل الذهبية، منعش ورائع', price: 17.00, category: 'حلويات باردة', image: 'creme-caramel.jpg', stock: 80, featured: false, rating: 4.7 },
  { name: 'بقلاوة بالفستق', description: 'بقلاوة شامية بالفستق الحلبي الأخضر بعجينة الفيلو المقرمشة والسمن العربي', price: 46.00, category: 'حلويات باردة', image: 'baklava-fosto2.jpg', stock: 60, featured: true, rating: 5.0 },
  { name: 'بقلاوة بالجوز', description: 'بقلاوة بالجوز والقرفة والهيل مع شراب العسل والليمون', price: 39.00, category: 'حلويات باردة', image: 'baklava-goz.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'صوابع زينب', description: 'لفافات العجين المقلية بالمكسرات والشراب — حلوى مصرية كلاسيكية لا تقاوم', price: 26.00, category: 'حلويات باردة', image: 'sawabe3-zeinab.jpg', stock: 80, featured: true, rating: 4.9 },
  { name: 'بلح الشام', description: 'بلح الشام — عجينة شو مقلية ومغطاة بالشراب والسكر البودرة، خفيفة وهشة', price: 23.00, category: 'حلويات باردة', image: 'balah-sham.jpg', stock: 90, featured: true, rating: 4.9 },
  { name: 'قطايف بالقشطة', description: 'قطايف مقلية محشوة بالقشطة والمكسرات، تقليد رمضاني أصيل', price: 29.00, category: 'حلويات باردة', image: 'qatayef-qeshta.jpg', stock: 70, featured: true, rating: 4.9 },
  { name: 'قطايف بالجبن', description: 'قطايف طازجة محشوة بالجبن العكاوي مع شراب الزهر والعسل', price: 26.00, category: 'حلويات باردة', image: 'qatayef-gebna.jpg', stock: 70, featured: false, rating: 4.8 },
  { name: 'زلابية بالشراب', description: 'زلابية مقرمشة مصنوعة يدوياً مقلية بالزيت الطازج مع شراب العسل والسمسم', price: 13.00, category: 'حلويات باردة', image: 'zalabeya.jpg', stock: 100, featured: true, rating: 4.9 },
  { name: 'لقيمات بالعسل', description: 'لقيمات ذهبية هشة بالخارج ناعمة بالداخل مع عسل النحل الطبيعي', price: 16.00, category: 'حلويات باردة', image: 'lokaimat.jpg', stock: 100, featured: false, rating: 4.8 },
  { name: 'عوامة', description: 'عوامة مصرية كلاسيكية — كرات عجين مقلية ومحلاة بشراب القطر والقرفة', price: 13.00, category: 'حلويات باردة', image: 'awwama.jpg', stock: 100, featured: true, rating: 4.9 },
  { name: 'حلاوة الجلاش بالعسل', description: 'طبقات من عجينة الجلاش المقرمشة مع العسل والسمن والمكسرات', price: 37.00, category: 'حلويات باردة', image: 'galash-3asal.jpg', stock: 50, featured: false, rating: 4.7 },
  { name: 'طبق حلوى مشكل (كبير)', description: 'تشكيلة فاخرة من أشهى الحلويات المصرية في طبق واحد — مثالي للمناسبات', price: 104.00, category: 'حلويات باردة', image: 'mix-tray-big.jpg', stock: 30, featured: true, rating: 5.0 },
  { name: 'طبق حلوى مشكل (صغير)', description: 'طبق حلوى مشكل اقتصادي مناسب للعيلة الصغيرة والإهداء', price: 59.00, category: 'حلويات باردة', image: 'mix-tray-small.jpg', stock: 50, featured: false, rating: 4.8 },

  // ======= مشروبات ساخنة (Hot Drinks) — original items with 30% price increase + new items =======
  { name: 'شاي', description: 'شاي أسود بطعم الليمون الطازج والنعناع', price: 7.00, category: 'مشروبات ساخنة', image: 'hot-tea.jpg', stock: 100, featured: false, rating: 4.7 },
  { name: 'سحلب', description: 'سحلب دافئ بالحليب والمكسرات وجوز الهند — مشروب شتوي مصري أصيل', price: 13.00, category: 'مشروبات ساخنة', image: 'sahlab.jpg', stock: 80, featured: true, rating: 4.9 },
  { name: 'قهوة تركي', description: 'قهوة تركي غليظة بالهيل المحمصة يدوياً', price: 13.00, category: 'مشروبات ساخنة', image: 'turkish-coffee.jpg', stock: 100, featured: true, rating: 4.9 },
  { name: 'قهوة فرنساوي', description: 'قهوة فرنساوية بنكهة الفانيليا والكريمة', price: 16.00, category: 'مشروبات ساخنة', image: 'french-coffee.jpg', stock: 80, featured: false, rating: 4.8 },
  { name: 'هوت شوكولاتة كلاسيك', description: 'شوكولاتة بلجيكي غنية بالحليب الدافئ', price: 20.00, category: 'مشروبات ساخنة', image: 'hot-choco-classic.jpg', stock: 80, featured: true, rating: 4.9 },
  { name: 'هوت شوكولاتة بالنوتيلا', description: 'شوكولاتة دافئة بكريمة النوتيلا والفستق', price: 23.00, category: 'مشروبات ساخنة', image: 'hot-choco-nutella.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'هوت شوكولاتة بيضاء', description: 'شوكولاتة بيضاء كريمية بالفانيليا', price: 20.00, category: 'مشروبات ساخنة', image: 'hot-choco-white.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'كاكاو', description: 'كاكاو كلاسيكي بالحليب الدافئ والمارشميلو', price: 16.00, category: 'مشروبات ساخنة', image: 'cocoa.jpg', stock: 80, featured: false, rating: 4.6 },

  // ======= مشروبات ساخنة — NEW ITEMS =======
  { name: 'جنزيل بالليمون', description: 'مشروب جنزيل المنعش بالليمون الطازج والزنجبيل', price: 55.00, category: 'مشروبات ساخنة', image: 'ganzabil-lemon.jpg', stock: 80, featured: false, rating: 4.7 },
  { name: 'شاي أخضر', description: 'شاي أخضر صيني فاخر بنكهة الياسمين الطبيعية', price: 50.00, category: 'مشروبات ساخنة', image: 'green-tea.jpg', stock: 100, featured: false, rating: 4.6 },
  { name: 'كركديه', description: 'كركديه مصري طازج بارد أو ساخن — مليان فيتامينات ومنعش', price: 50.00, category: 'مشروبات ساخنة', image: 'karkade.jpg', stock: 100, featured: false, rating: 4.7 },
  { name: 'سحلب ساده', description: 'سحلب ساده بالحليب الدافئ وجوز الهند — بسيط ولذيذ', price: 55.00, category: 'مشروبات ساخنة', image: 'sahlab-sada.jpg', stock: 80, featured: false, rating: 4.8 },
  { name: 'سحلب فواكه', description: 'سحلب بالفواكه المشكلة والمكسرات — مشروب شتوي فاخر', price: 60.00, category: 'مشروبات ساخنة', image: 'sahlab-fruits.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'هوت بوربو', description: 'هوت بوربو — مشروب ساخن منعش بالبرتقال والتوابل', price: 55.00, category: 'مشروبات ساخنة', image: 'hot-burbo.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'إندومي', description: 'إندومي سريع التحضير بنكهة الدجاج — وجبة سريعة ولذيذة', price: 50.00, category: 'مشروبات ساخنة', image: 'indomie.jpg', stock: 100, featured: false, rating: 4.5 },
  { name: 'قهوة بندق', description: 'قهوة بنكهة البندق المحمص الغنية — للعشاق', price: 65.00, category: 'مشروبات ساخنة', image: 'hazelnut-coffee.jpg', stock: 60, featured: true, rating: 4.9 },
  { name: 'كوفري ميكس', description: 'كوفري ميكس — تشكيلة قهوة مميزة بنكهات متعددة', price: 60.00, category: 'مشروبات ساخنة', image: 'cofree-mix.jpg', stock: 50, featured: false, rating: 4.7 },
  { name: 'إسبريسو', description: 'إسبريسو إيطالي أصيل — كوب مركز من القهوة الغنية', price: 55.00, category: 'مشروبات ساخنة', image: 'espresso.jpg', stock: 100, featured: true, rating: 4.9 },
  { name: 'موك', description: 'موك — قهوة بالشوكولاتة والكريمة المخفوقة', price: 65.00, category: 'مشروبات ساخنة', image: 'mocha-hot.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'كافيه لاتيه', description: 'كافيه لاتيه — إسبريسو مع حليب مبخر كريمي', price: 60.00, category: 'مشروبات ساخنة', image: 'cafe-latte.jpg', stock: 80, featured: false, rating: 4.8 },
  { name: 'نسكافيه باللبن', description: 'نسكافيه بالحليب الساخن — كلاسيكي ومحبوب', price: 55.00, category: 'مشروبات ساخنة', image: 'nescafe-milk.jpg', stock: 100, featured: false, rating: 4.7 },
  { name: 'نسكافيه بلاك', description: 'نسكافيه أسود بدون حليب — لللي بيحب القهوة قوية', price: 50.00, category: 'مشروبات ساخنة', image: 'nescafe-black.jpg', stock: 100, featured: false, rating: 4.6 },
  { name: 'كابتشينو', description: 'كابتشينو بالرغوة الكريمية — إيطالي أصيل', price: 60.00, category: 'مشروبات ساخنة', image: 'cappuccino.jpg', stock: 80, featured: true, rating: 4.9 },
  { name: 'ميكات', description: 'ميكات — إسبريسو بطبقة خفيفة من الحليب الرغوي', price: 65.00, category: 'مشروبات ساخنة', image: 'macchiato.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'شاي باللبن', description: 'شاي بالحليب الساخن — مشروب مصري أصيل ومحبوب', price: 50.00, category: 'مشروبات ساخنة', image: 'tea-milk.jpg', stock: 100, featured: false, rating: 4.7 },
  { name: 'ينيس', description: 'ينيس — مشروب حار باليانسون والزنجبيل دافئ ومنعش', price: 50.00, category: 'مشروبات ساخنة', image: 'yansoon.jpg', stock: 80, featured: false, rating: 4.6 },
  { name: 'نعناع ساخن', description: 'شاي النعناع الساخن — منعش ومهدئ للأعصاب', price: 50.00, category: 'مشروبات ساخنة', image: 'hot-mint.jpg', stock: 100, featured: false, rating: 4.7 },
  { name: 'قرفة', description: 'مشروب القرفة الساخن بالحليب — دافئ ومفيد', price: 50.00, category: 'مشروبات ساخنة', image: 'cinnamon-drink.jpg', stock: 80, featured: false, rating: 4.7 },

  // ======= مشروبات مثلجة (Iced Drinks) — 30% price increase =======
  { name: 'عيران', description: 'عيران بارد مصنوع من اللبن الزبادي الطازج مع النعناع — منعش ولذيذ', price: 10.00, category: 'مشروبات مثلجة', image: 'ayran.jpg', stock: 100, featured: false, rating: 4.6 },
  { name: 'لبن بالفراولة', description: 'مشروب لبن كريمي بعصير الفراولة الطازجة والسكر — للأطفال والكبار', price: 12.00, category: 'مشروبات مثلجة', image: 'laban-strawberry.jpg', stock: 100, featured: false, rating: 4.7 },
  { name: 'عصير مانجو', description: 'عصير مانجو طازجة ١٠٠٪ طبيعي بدون سكر مضاف', price: 16.00, category: 'مشروبات مثلجة', image: 'juice-mango.jpg', stock: 80, featured: false, rating: 4.8 },
  { name: 'موهيتو', description: 'موهيتو منعش بالنعناع والليمون والسفن أب', price: 20.00, category: 'مشروبات مثلجة', image: 'mohito.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'فراولة بندق', description: 'ميلك شيك الفراولة بالبندق والكريمة', price: 23.00, category: 'مشروبات مثلجة', image: 'strawberry-milkshake.jpg', stock: 50, featured: true, rating: 4.9 },
  { name: 'آيس كوفي كلاسيك', description: 'قهوة مثلجة بالحليب والثلج', price: 20.00, category: 'مشروبات مثلجة', image: 'iced-coffee-classic.jpg', stock: 80, featured: true, rating: 4.8 },
  { name: 'آيس كوفي كراميل', description: 'آيس كوفي بصلصة الكراميل الغنية', price: 23.00, category: 'مشروبات مثلجة', image: 'iced-coffee-caramel.jpg', stock: 60, featured: true, rating: 4.9 },
  { name: 'آيس كوفي موكا', description: 'آيس كوفي بالشوكولاتة والقهوة المثلجة', price: 23.00, category: 'مشروبات مثلجة', image: 'iced-coffee-mocha.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'آيس كوفي فانيلا', description: 'آيس كوفي بنكهة الفانيليا والكريمة', price: 21.00, category: 'مشروبات مثلجة', image: 'iced-coffee-vanilla.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'آيس تي ليمون', description: 'شاي مثلج بالليمون الطازج والنعناع', price: 16.00, category: 'مشروبات مثلجة', image: 'iced-tea-lemon.jpg', stock: 100, featured: false, rating: 4.7 },
  { name: 'آيس تي خوخ', description: 'شاي مثلج بنكهة الخوخ الطبيعي', price: 18.00, category: 'مشروبات مثلجة', image: 'iced-tea-peach.jpg', stock: 80, featured: false, rating: 4.8 },
  { name: 'بيبسي', description: 'بيبسي بارد', price: 10.00, category: 'مشروبات مثلجة', image: 'pepsi.jpg', stock: 200, featured: false, rating: 4.5 },
  { name: 'ميرندا برتقان', description: 'ميرندا بنكهة البرتقان', price: 10.00, category: 'مشروبات مثلجة', image: 'miranda.jpg', stock: 200, featured: false, rating: 4.5 },
  { name: 'سفن أب', description: 'سفن أب بارد بالليمون', price: 10.00, category: 'مشروبات مثلجة', image: 'sevenup.jpg', stock: 200, featured: false, rating: 4.5 },

  // ======= جاتوه وكيك (Cakes) — 30% price increase =======
  { name: 'تورتة الكريمة', description: 'تورتة إسفنجية بكريمة الشنتيلي والفراولة الطازجة — مناسبة للأعياد', price: 72.00, category: 'جاتوه وكيك', image: 'torta-krema.jpg', stock: 25, featured: true, rating: 4.9 },
  { name: 'كيك شوكولاتة', description: 'كيك شوكولاتة بلجيكي غني بالجناش والكاكاو', price: 46.00, category: 'جاتوه وكيك', image: 'cake-chocolate.jpg', stock: 40, featured: true, rating: 4.9 },
  { name: 'تشيز كيك', description: 'تشيز كيك كريمي بنكهة الفانيليا والفراولة الطازجة', price: 39.00, category: 'جاتوه وكيك', image: 'cheesecake.jpg', stock: 40, featured: false, rating: 4.8 },
  { name: 'براونيز', description: 'براونيز فدج بالشوكولاتة الداكنة والجوز المحمص', price: 26.00, category: 'جاتوه وكيك', image: 'brownies.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'كيك ريد فيلفيت', description: 'كيك ريد فيلفيت بكريمة الجبن والقشطة', price: 52.00, category: 'جاتوه وكيك', image: 'cake-red-velvet.jpg', stock: 30, featured: true, rating: 5.0 },

  // ======= عصائر طبيعية (Natural Juices) — NEW CATEGORY =======
  { name: 'برتقال', description: 'عصير برتقال طازج ١٠٠٪ طبيعي — فيتامين سي بكميات', price: 50.00, category: 'عصائر طبيعية', image: 'juice-orange.jpg', stock: 100, featured: true, rating: 4.9 },
  { name: 'ليمون', description: 'عصير ليمون طازج بالنعناع — منعش وصحي', price: 50.00, category: 'عصائر طبيعية', image: 'juice-lemon.jpg', stock: 100, featured: false, rating: 4.7 },
  { name: 'ليمون نعناع', description: 'عصير ليمون بالنعناع الطازج والثلج — الأكثر طلباً في الصيف', price: 55.00, category: 'عصائر طبيعية', image: 'lemon-mint-juice.jpg', stock: 80, featured: true, rating: 5.0 },
  { name: 'موز باللبن', description: 'موز بالحليب الطازج — مشروب مغذي ومشبع', price: 55.00, category: 'عصائر طبيعية', image: 'banana-milk-juice.jpg', stock: 80, featured: false, rating: 4.8 },
  { name: 'كنترالوب', description: 'عصير شمام طازج — حلو ومنعش وفيه فيتامينات كتير', price: 55.00, category: 'عصائر طبيعية', image: 'cantaloupe-juice.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'صن شاين', description: 'مشروب صن شاين المنعش بمزيج الفواكه الاستوائية', price: 60.00, category: 'عصائر طبيعية', image: 'sunshine-juice.jpg', stock: 60, featured: true, rating: 4.9 },
  { name: 'بلوبيري', description: 'عصير بلوبيري الطازج — غني بمضادات الأكسدة ولذيذ', price: 65.00, category: 'عصائر طبيعية', image: 'blueberry-juice.jpg', stock: 50, featured: false, rating: 4.8 },

  // ======= سموزوي (Smoothies) — NEW CATEGORY =======
  { name: 'توت أزرق', description: 'سموزي التوت الأزرق بالزبادي والعسل — كريمي وصحي', price: 70.00, category: 'سموزوي', image: 'smoothie-blueberry.jpg', stock: 50, featured: true, rating: 4.9 },
  { name: 'توت أحمر', description: 'سموزي التوت الأحمر بالفراولة والزبادي — طعم خرافي', price: 70.00, category: 'سموزوي', image: 'smoothie-raspberry.jpg', stock: 50, featured: false, rating: 4.8 },
  { name: 'مانجو', description: 'سموزي المانجو الاستوائي بالحليب — الأحلى والأطعم', price: 65.00, category: 'سموزوي', image: 'smoothie-mango.jpg', stock: 60, featured: true, rating: 5.0 },
  { name: 'ليمون', description: 'سموزي الليمون بالنعناع والثلج — منعش ومقوي', price: 60.00, category: 'سموزوي', image: 'smoothie-lemon.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'نعناع', description: 'سموزي النعناع بالزبادي — منعش ومهدئ', price: 60.00, category: 'سموزوي', image: 'smoothie-mint.jpg', stock: 60, featured: false, rating: 4.6 },
  { name: 'بطيخ', description: 'سموزي البطيخ الأحمر الطازج — مشروب الصيف الأول', price: 60.00, category: 'سموزوي', image: 'smoothie-watermelon.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'كيوي', description: 'سموزي الكيوي بالفراولة — طعم استوائي لا يقاوم', price: 70.00, category: 'سموزوي', image: 'smoothie-kiwi.jpg', stock: 50, featured: true, rating: 4.9 },
  { name: 'برتقال', description: 'سموزي البرتقال بالجزر — صحي ومغذي', price: 65.00, category: 'سموزوي', image: 'smoothie-orange.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'زبادي فواكه', description: 'سموزي الزبادي بالفواكه المشكلة والعسل — فطار صحي', price: 65.00, category: 'سموزوي', image: 'smoothie-yogurt-fruit.jpg', stock: 60, featured: false, rating: 4.8 },

  // ======= آيس كوفي (Iced Coffee) — NEW CATEGORY =======
  { name: 'فريدو إسبريسو', description: 'فريدو إسبريسو مثلج — قهوة يونانية أصيلة باردة ومركزة', price: 75.00, category: 'آيس كوفي', image: 'freddo-espresso.jpg', stock: 60, featured: true, rating: 5.0 },
  { name: 'آيس إسبانش لاتيه', description: 'آيس إسبانش لاتيه — حليب مكثف مع إسبريسو مثلج', price: 80.00, category: 'آيس كوفي', image: 'iced-spanish-latte.jpg', stock: 50, featured: true, rating: 4.9 },
  { name: 'آيس لاتيه', description: 'آيس لاتيه — إسبريسو مع حليب بارد وثلج', price: 75.00, category: 'آيس كوفي', image: 'iced-latte.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'آيس موك', description: 'آيس موك — قهوة مثلجة بالشوكولاتة والكريمة', price: 75.00, category: 'آيس كوفي', image: 'iced-mocha.jpg', stock: 60, featured: false, rating: 4.8 },
  { name: 'آيس كابتشينو', description: 'آيس كابتشينو — كابتشينو مثلج بالرغوة الكريمية', price: 75.00, category: 'آيس كوفي', image: 'iced-cappuccino.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'آيس نسكافيه باللبن', description: 'آيس نسكافيه بالحليب البارد — كلاسيكي بارد ومنعش', price: 70.00, category: 'آيس كوفي', image: 'iced-nescafe-milk.jpg', stock: 80, featured: false, rating: 4.7 },
  { name: 'آيس فرنساوي', description: 'آيس فرنساوي — قهوة فرنساوية مثلجة بالفانيليا', price: 70.00, category: 'آيس كوفي', image: 'iced-french.jpg', stock: 60, featured: false, rating: 4.6 },
  { name: 'آيس تركي', description: 'آيس تركي — قهوة تركي مثلجة بطعم الهيل الفريد', price: 70.00, category: 'آيس كوفي', image: 'iced-turkish.jpg', stock: 60, featured: false, rating: 4.7 },
  { name: 'آيس كوفي بندق', description: 'آيس كوفي بالبندق — قهوة مثلجة بنكهة البندق الغنية', price: 80.00, category: 'آيس كوفي', image: 'iced-hazelnut-coffee.jpg', stock: 50, featured: true, rating: 4.9 },
  { name: 'سينابون', description: 'رول قرفة طري محشو بالسكر والقرفة ومغطى بصوص كريمي', price: 35.00, category: 'حلويات ساخنة', image: 'cinnamon-roll.svg', stock: 50, featured: true, rating: 4.9 },
];

async function seed() {
  console.log('Seeding database...');
  
  // Clear existing data
  await db.order.deleteMany();
  await db.product.deleteMany();
  await db.user.deleteMany();
  
  // Seed products
  for (const product of PRODUCTS) {
    await db.product.create({ data: product });
  }
  console.log(`✅ ${PRODUCTS.length} products seeded!`);

  // Seed default users
  await db.user.create({ data: { username: 'Amrmahmoud', password: 'Asd@2580', role: 'admin', displayName: 'المدير' } });
  await db.user.create({ data: { username: 'Amr', password: '246810', role: 'cashier', displayName: 'الكاشير' } });
  console.log('✅ Default users seeded (admin, Cashier)!');
}

seed()
  .catch(console.error)
  .finally(() => db.$disconnect());
