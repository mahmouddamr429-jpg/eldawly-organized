import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

/* Mock database with a local file store for Next.js development. */

const initialProducts = [
  { id: 1, name: 'كنافة بالقشطة', description: 'كنافة ناعمة محشوة بالقشطة البلدي الطازجة', price: 33, category: 'حلويات ساخنة', image: 'konafa-qeshta.jpg', stock: 80, featured: true, rating: 5 },
  { id: 2, name: 'كنافة بالجبن', description: 'كنافة مقرمشة محشوة بالجبن العكاوي', price: 29, category: 'حلويات ساخنة', image: 'konafa-gebna.jpg', stock: 80, featured: true, rating: 4.9 },
  { id: 3, name: 'كنافة بالمكسرات', description: 'كنافة محشوة بمزيج الفستق والجوز واللوز', price: 37, category: 'حلويات ساخنة', image: 'konafa-mokasarat.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 4, name: 'كنافة بالنوتيلا', description: 'كنافة عصرية محشوة بكريمة النوتيلا', price: 39, category: 'حلويات ساخنة', image: 'konafa-nutella.jpg', stock: 50, featured: true, rating: 4.9 },
  { id: 5, name: 'كنافة بالمانجو', description: 'كنافة صيفية بكريمة المانجو والقشطة', price: 42, category: 'حلويات ساخنة', image: 'konafa-manga.jpg', stock: 40, featured: false, rating: 4.7 },
  { id: 6, name: 'كنافة ب المشمش', description: 'كنافة مقرمشة بطعم المشمش', price: 35, category: 'حلويات ساخنة', image: 'konafa-meshmesh.jpg', stock: 50, featured: false, rating: 4.6 },
  { id: 7, name: 'أم علي', description: 'أم علي المصرية الأصيلة — خبز فينو بالحليب والمكسرات', price: 26, category: 'حلويات ساخنة', image: 'om-ali.jpg', stock: 70, featured: true, rating: 5 },
  { id: 8, name: 'عيش السرايا', description: 'عيش السرايا اللبناني بالقشطة والقطر', price: 23, category: 'حلويات ساخنة', image: 'aysh-saraya.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 9, name: 'تشيز كيك ساخن', description: 'تشيز كيك دافئ بصوص التوت', price: 46, category: 'حلويات ساخنة', image: 'hot-cheesecake.jpg', stock: 40, featured: true, rating: 4.9 },
  { id: 10, name: 'بسبوسة بالقشطة', description: 'بسبوسة سميد طرية مغطاة بالقشطة', price: 20, category: 'حلويات باردة', image: 'basbousa-qeshta.jpg', stock: 100, featured: true, rating: 5 },
  { id: 11, name: 'بسبوسة بجوز الهند', description: 'بسبوسة بنكهة جوز الهند', price: 16, category: 'حلويات باردة', image: 'basbousa-coconut.jpg', stock: 100, featured: false, rating: 4.8 },
  { id: 12, name: 'هريسة بالسمن', description: 'هريسة قمح بالسمن البلدي والشراب', price: 18, category: 'حلويات باردة', image: 'hareesa.jpg', stock: 80, featured: true, rating: 4.9 },
  { id: 13, name: 'بسبوسة بالمانجو', description: 'بسبوسة بنكهة المانجو الاستوائية', price: 23, category: 'حلويات باردة', image: 'basbousa-manga.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 14, name: 'بسبوسة ب التمر', description: 'بسبوسة محشوة بمعجون التمر', price: 21, category: 'حلويات باردة', image: 'basbousa-tamr.jpg', stock: 70, featured: false, rating: 4.8 },
  { id: 15, name: 'مهلبية بالورد', description: 'مهلبية بنكهة ماء الورد والفستق', price: 16, category: 'حلويات باردة', image: 'mahalabeya-ward.jpg', stock: 100, featured: true, rating: 4.9 },
  { id: 16, name: 'أرز بلبن', description: 'أرز بلبن مصري بالقرفة والزبيب', price: 13, category: 'حلويات باردة', image: 'roz-belbaban.jpg', stock: 100, featured: false, rating: 4.8 },
  { id: 17, name: 'مهلبية بالمانجو', description: 'مهلبية ناعمة بكريمة المانجو', price: 20, category: 'حلويات باردة', image: 'mahalabeya-manga.jpg', stock: 80, featured: true, rating: 4.8 },
  { id: 18, name: 'كريم كراميل', description: 'كريم كراميل بالفانيليا وصلصة الكراميل', price: 17, category: 'حلويات باردة', image: 'creme-caramel.jpg', stock: 80, featured: false, rating: 4.7 },
  { id: 19, name: 'بقلاوة بالفستق', description: 'بقلاوة شامية بالفستق الحلبي', price: 46, category: 'حلويات باردة', image: 'baklava-fosto2.jpg', stock: 60, featured: true, rating: 5 },
  { id: 20, name: 'بقلاوة بالجوز', description: 'بقلاوة بالجوز والقرفة', price: 39, category: 'حلويات باردة', image: 'baklava-goz.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 21, name: 'صوابع زينب', description: 'لفافات عجين مقلية بالمكسرات والشراب', price: 26, category: 'حلويات باردة', image: 'sawabe3-zeinab.jpg', stock: 80, featured: true, rating: 4.9 },
  { id: 22, name: 'بلح الشام', description: 'عجينة شو مقلية ومغطاة بالشراب', price: 23, category: 'حلويات باردة', image: 'balah-sham.jpg', stock: 90, featured: true, rating: 4.9 },
  { id: 23, name: 'قطايف بالقشطة', description: 'قطايف مقلية بالقشطة والمكسرات', price: 29, category: 'حلويات باردة', image: 'qatayef-qeshta.jpg', stock: 70, featured: true, rating: 4.9 },
  { id: 24, name: 'قطايف بالجبن', description: 'قطايف طازجة بالجبن العكاوي', price: 26, category: 'حلويات باردة', image: 'qatayef-gebna.jpg', stock: 70, featured: false, rating: 4.8 },
  { id: 25, name: 'زلابية بالشراب', description: 'زلابية مقرمشة مع شراب العسل', price: 13, category: 'حلويات باردة', image: 'zalabeya.jpg', stock: 100, featured: true, rating: 4.9 },
  { id: 26, name: 'لقيمات بالعسل', description: 'لقيمات ذهبية هشة بالعسل', price: 16, category: 'حلويات باردة', image: 'lokaimat.jpg', stock: 100, featured: false, rating: 4.8 },
  { id: 27, name: 'عوامة', description: 'عوامة مصرية كلاسيكية بشراب القطر', price: 13, category: 'حلويات باردة', image: 'awwama.jpg', stock: 100, featured: true, rating: 4.9 },
  { id: 28, name: 'حلاوة الجلاش بالعسل', description: 'طبقات جلاش مقرمشة بالعسل والمكسرات', price: 37, category: 'حلويات باردة', image: 'galash-3asal.jpg', stock: 50, featured: false, rating: 4.7 },
  { id: 29, name: 'طبق حلوى مشكل (كبير)', description: 'تشكيلة فاخرة من الحلويات المصرية', price: 104, category: 'حلويات باردة', image: 'mix-tray-big.jpg', stock: 30, featured: true, rating: 5 },
  { id: 30, name: 'طبق حلوى مشكل (صغير)', description: 'طبق حلوى مشكل اقتصادي', price: 59, category: 'حلويات باردة', image: 'mix-tray-small.jpg', stock: 50, featured: false, rating: 4.8 },
  { id: 31, name: 'شاي', description: 'شاي أسود بالليمون والنعناع', price: 7, category: 'مشروبات ساخنة', image: 'hot-tea.jpg', stock: 100, featured: false, rating: 4.7 },
  { id: 32, name: 'سحلب', description: 'سحلب دافئ بالحليب والمكسرات', price: 13, category: 'مشروبات ساخنة', image: 'sahlab.jpg', stock: 80, featured: true, rating: 4.9 },
  { id: 33, name: 'قهوة تركي', description: 'قهوة تركي غليظة بالهيل', price: 13, category: 'مشروبات ساخنة', image: 'turkish-coffee.jpg', stock: 100, featured: true, rating: 4.9 },
  { id: 34, name: 'قهوة فرنساوي', description: 'قهوة فرنساوية بالفانيليا والكريمة', price: 16, category: 'مشروبات ساخنة', image: 'french-coffee.jpg', stock: 80, featured: false, rating: 4.8 },
  { id: 35, name: 'هوت شوكولاتة كلاسيك', description: 'شوكولاتة بلجيكي غنية بالحليب', price: 20, category: 'مشروبات ساخنة', image: 'hot-choco-classic.jpg', stock: 80, featured: true, rating: 4.9 },
  { id: 36, name: 'هوت شوكولاتة بالنوتيلا', description: 'شوكولاتة دافئة بالنوتيلا والفستق', price: 23, category: 'مشروبات ساخنة', image: 'hot-choco-nutella.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 37, name: 'هوت شوكولاتة بيضاء', description: 'شوكولاتة بيضاء كريمية بالفانيليا', price: 20, category: 'مشروبات ساخنة', image: 'hot-choco-white.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 38, name: 'كاكاو', description: 'كاكاو بالحليب والمارشميلو', price: 16, category: 'مشروبات ساخنة', image: 'cocoa.jpg', stock: 80, featured: false, rating: 4.6 },
  { id: 39, name: 'جنزيل بالليمون', description: 'مشروب جنزيل بالليمون والزنجبيل', price: 55, category: 'مشروبات ساخنة', image: 'ganzabil-lemon.jpg', stock: 80, featured: false, rating: 4.7 },
  { id: 40, name: 'شاي أخضر', description: 'شاي أخضر بالياسمين', price: 50, category: 'مشروبات ساخنة', image: 'green-tea.jpg', stock: 100, featured: false, rating: 4.6 },
  { id: 41, name: 'كركديه', description: 'كركديه مصري طازج', price: 50, category: 'مشروبات ساخنة', image: 'karkade.jpg', stock: 100, featured: false, rating: 4.7 },
  { id: 42, name: 'سحلب ساده', description: 'سحلب ساده بالحليب وجوز الهند', price: 55, category: 'مشروبات ساخنة', image: 'sahlab-sada.jpg', stock: 80, featured: false, rating: 4.8 },
  { id: 43, name: 'سحلب فواكه', description: 'سحلب بالفواكه المشكلة والمكسرات', price: 60, category: 'مشروبات ساخنة', image: 'sahlab-fruits.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 44, name: 'هوت بوربو', description: 'مشروب ساخن بالبرتقال والتوابل', price: 55, category: 'مشروبات ساخنة', image: 'hot-burbo.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 45, name: 'إندومي', description: 'إندومي بنكهة الدجاج', price: 50, category: 'مشروبات ساخنة', image: 'indomie.jpg', stock: 100, featured: false, rating: 4.5 },
  { id: 46, name: 'قهوة بندق', description: 'قهوة بنكهة البندق المحمص', price: 65, category: 'مشروبات ساخنة', image: 'hazelnut-coffee.jpg', stock: 60, featured: true, rating: 4.9 },
  { id: 47, name: 'كوفري ميكس', description: 'تشكيلة قهوة بنكهات متعددة', price: 60, category: 'مشروبات ساخنة', image: 'cofree-mix.jpg', stock: 50, featured: false, rating: 4.7 },
  { id: 48, name: 'إسبريسو', description: 'إسبريسو إيطالي أصيل', price: 55, category: 'مشروبات ساخنة', image: 'espresso.jpg', stock: 100, featured: true, rating: 4.9 },
  { id: 49, name: 'موك', description: 'قهوة بالشوكولاتة والكريمة', price: 65, category: 'مشروبات ساخنة', image: 'mocha-hot.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 50, name: 'كافيه لاتيه', description: 'إسبريسو مع حليب مبخر', price: 60, category: 'مشروبات ساخنة', image: 'cafe-latte.jpg', stock: 80, featured: false, rating: 4.8 },
  { id: 51, name: 'نسكافيه باللبن', description: 'نسكافيه بالحليب الساخن', price: 55, category: 'مشروبات ساخنة', image: 'nescafe-milk.jpg', stock: 100, featured: false, rating: 4.7 },
  { id: 52, name: 'نسكافيه بلاك', description: 'نسكافيه أسود بدون حليب', price: 50, category: 'مشروبات ساخنة', image: 'nescafe-black.jpg', stock: 100, featured: false, rating: 4.6 },
  { id: 53, name: 'كابتشينو', description: 'كابتشينو بالرغوة الكريمية', price: 60, category: 'مشروبات ساخنة', image: 'cappuccino.jpg', stock: 80, featured: true, rating: 4.9 },
  { id: 54, name: 'ميكات', description: 'إسبريسو بطبقة حليب رغوي', price: 65, category: 'مشروبات ساخنة', image: 'macchiato.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 55, name: 'شاي باللبن', description: 'شاي بالحليب الساخن', price: 50, category: 'مشروبات ساخنة', image: 'tea-milk.jpg', stock: 100, featured: false, rating: 4.7 },
  { id: 56, name: 'ينيس', description: 'مشروب حار باليانسون والزنجبيل', price: 50, category: 'مشروبات ساخنة', image: 'yansoon.jpg', stock: 80, featured: false, rating: 4.6 },
  { id: 57, name: 'نعناع ساخن', description: 'شاي النعناع الساخن', price: 50, category: 'مشروبات ساخنة', image: 'hot-mint.jpg', stock: 100, featured: false, rating: 4.7 },
  { id: 58, name: 'قرفة', description: 'مشروب القرفة الساخن بالحليب', price: 50, category: 'مشروبات ساخنة', image: 'cinnamon-drink.jpg', stock: 80, featured: false, rating: 4.7 },
  { id: 59, name: 'عيران', description: 'عيران بارد بالنعناع', price: 10, category: 'مشروبات مثلجة', image: 'ayran.jpg', stock: 100, featured: false, rating: 4.6 },
  { id: 60, name: 'لبن بالفراولة', description: 'لبن كريمي بعصير الفراولة', price: 12, category: 'مشروبات مثلجة', image: 'laban-strawberry.jpg', stock: 100, featured: false, rating: 4.7 },
  { id: 61, name: 'عصير مانجو', description: 'عصير مانجو طازجة ١٠٠٪', price: 16, category: 'مشروبات مثلجة', image: 'juice-mango.jpg', stock: 80, featured: false, rating: 4.8 },
  { id: 62, name: 'موهيتو', description: 'موهيتو بالنعناع والليمون', price: 20, category: 'مشروبات مثلجة', image: 'mohito.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 63, name: 'فراولة بندق', description: 'ميلك شيك الفراولة بالبندق', price: 23, category: 'مشروبات مثلجة', image: 'strawberry-milkshake.jpg', stock: 50, featured: true, rating: 4.9 },
  { id: 64, name: 'آيس كوفي كلاسيك', description: 'قهوة مثلجة بالحليب والثلج', price: 20, category: 'مشروبات مثلجة', image: 'iced-coffee-classic.jpg', stock: 80, featured: true, rating: 4.8 },
  { id: 65, name: 'آيس كوفي كراميل', description: 'آيس كوفي بصلصة الكراميل', price: 23, category: 'مشروبات مثلجة', image: 'iced-coffee-caramel.jpg', stock: 60, featured: true, rating: 4.9 },
  { id: 66, name: 'آيس كوفي موكا', description: 'آيس كوفي بالشوكولاتة', price: 23, category: 'مشروبات مثلجة', image: 'iced-coffee-mocha.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 67, name: 'آيس كوفي فانيلا', description: 'آيس كوفي بالفانيليا', price: 21, category: 'مشروبات مثلجة', image: 'iced-coffee-vanilla.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 68, name: 'آيس تي ليمون', description: 'شاي مثلج بالليمون والنعناع', price: 16, category: 'مشروبات مثلجة', image: 'iced-tea-lemon.jpg', stock: 100, featured: false, rating: 4.7 },
  { id: 69, name: 'آيس تي خوخ', description: 'شاي مثلج بنكهة الخوخ', price: 18, category: 'مشروبات مثلجة', image: 'iced-tea-peach.jpg', stock: 80, featured: false, rating: 4.8 },
  { id: 70, name: 'بيبسي', description: 'بيبسي بارد', price: 10, category: 'مشروبات مثلجة', image: 'pepsi.jpg', stock: 200, featured: false, rating: 4.5 },
  { id: 71, name: 'ميرندا برتقان', description: 'ميرندا بنكهة البرتقان', price: 10, category: 'مشروبات مثلجة', image: 'miranda.jpg', stock: 200, featured: false, rating: 4.5 },
  { id: 72, name: 'سفن أب', description: 'سفن أب بارد بالليمون', price: 10, category: 'مشروبات مثلجة', image: 'sevenup.jpg', stock: 200, featured: false, rating: 4.5 },
  { id: 73, name: 'تورتة الكريمة', description: 'تورتة إسفنجية بالكريمة والفراولة', price: 72, category: 'جاتوه وكيك', image: 'torta-krema.jpg', stock: 25, featured: true, rating: 4.9 },
  { id: 74, name: 'كيك شوكولاتة', description: 'كيك شوكولاتة بلجيكي بالجناش', price: 46, category: 'جاتوه وكيك', image: 'cake-chocolate.jpg', stock: 40, featured: true, rating: 4.9 },
  { id: 75, name: 'تشيز كيك', description: 'تشيز كيك كريمي بالفانيليا', price: 39, category: 'جاتوه وكيك', image: 'cheesecake.jpg', stock: 40, featured: false, rating: 4.8 },
  { id: 76, name: 'براونيز', description: 'براونيز فدج بالشوكولاتة والجوز', price: 26, category: 'جاتوه وكيك', image: 'brownies.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 77, name: 'كيك ريد فيلفيت', description: 'كيك ريد فيلفيت بكريمة الجبن', price: 52, category: 'جاتوه وكيك', image: 'cake-red-velvet.jpg', stock: 30, featured: true, rating: 5 },
  { id: 78, name: 'برتقال', description: 'عصير برتقال طازج ١٠٠٪', price: 50, category: 'عصائر طبيعية', image: 'juice-orange.jpg', stock: 100, featured: true, rating: 4.9 },
  { id: 79, name: 'ليمون', description: 'عصير ليمون طازج بالنعناع', price: 50, category: 'عصائر طبيعية', image: 'juice-lemon.jpg', stock: 100, featured: false, rating: 4.7 },
  { id: 80, name: 'ليمون نعناع', description: 'عصير ليمون بالنعناع الأكثر طلباً', price: 55, category: 'عصائر طبيعية', image: 'lemon-mint-juice.jpg', stock: 80, featured: true, rating: 5 },
  { id: 81, name: 'موز باللبن', description: 'موز بالحليب الطازج', price: 55, category: 'عصائر طبيعية', image: 'banana-milk-juice.jpg', stock: 80, featured: false, rating: 4.8 },
  { id: 82, name: 'كنترالوب', description: 'عصير شمام طازج', price: 55, category: 'عصائر طبيعية', image: 'cantaloupe-juice.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 83, name: 'صن شاين', description: 'مشروب صن شاين بالفواكه الاستوائية', price: 60, category: 'عصائر طبيعية', image: 'sunshine-juice.jpg', stock: 60, featured: true, rating: 4.9 },
  { id: 84, name: 'بلوبيري', description: 'عصير بلوبيري الطازج', price: 65, category: 'عصائر طبيعية', image: 'blueberry-juice.jpg', stock: 50, featured: false, rating: 4.8 },
  { id: 85, name: 'توت أزرق', description: 'سموزي التوت الأزرق بالزبادي', price: 70, category: 'سموزوي', image: 'smoothie-blueberry.jpg', stock: 50, featured: true, rating: 4.9 },
  { id: 86, name: 'توت أحمر', description: 'سموزي التوت الأحمر بالفراولة', price: 70, category: 'سموزوي', image: 'smoothie-raspberry.jpg', stock: 50, featured: false, rating: 4.8 },
  { id: 87, name: 'مانجو', description: 'سموزي المانجو الاستوائي', price: 65, category: 'سموزوي', image: 'smoothie-mango.jpg', stock: 60, featured: true, rating: 5 },
  { id: 88, name: 'ليمون', description: 'سموزي الليمون بالنعناع', price: 60, category: 'سموزوي', image: 'smoothie-lemon.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 89, name: 'نعناع', description: 'سموزي النعناع بالزبادي', price: 60, category: 'سموزوي', image: 'smoothie-mint.jpg', stock: 60, featured: false, rating: 4.6 },
  { id: 90, name: 'بطيخ', description: 'سموزي البطيخ الأحمر', price: 60, category: 'سموزوي', image: 'smoothie-watermelon.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 91, name: 'كيوي', description: 'سموزي الكيوي بالفراولة', price: 70, category: 'سموزوي', image: 'smoothie-kiwi.jpg', stock: 50, featured: true, rating: 4.9 },
  { id: 92, name: 'برتقال', description: 'سموزي البرتقال بالجزر', price: 65, category: 'سموزوي', image: 'smoothie-orange.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 93, name: 'زبادي فواكه', description: 'سموزي الزبادي بالفواكه والعسل', price: 65, category: 'سموزوي', image: 'smoothie-yogurt-fruit.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 94, name: 'فريدو إسبريسو', description: 'قهوة يونانية مثلجة مركزة', price: 75, category: 'آيس كوفي', image: 'freddo-espresso.jpg', stock: 60, featured: true, rating: 5 },
  { id: 95, name: 'آيس إسبانش لاتيه', description: 'حليب مكثف مع إسبريسو مثلج', price: 80, category: 'آيس كوفي', image: 'iced-spanish-latte.jpg', stock: 50, featured: true, rating: 4.9 },
  { id: 96, name: 'آيس لاتيه', description: 'إسبريسو مع حليب بارد وثلج', price: 75, category: 'آيس كوفي', image: 'iced-latte.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 97, name: 'آيس موك', description: 'قهوة مثلجة بالشوكولاتة والكريمة', price: 75, category: 'آيس كوفي', image: 'iced-mocha.jpg', stock: 60, featured: false, rating: 4.8 },
  { id: 98, name: 'آيس كابتشينو', description: 'كابتشينو مثلج بالرغوة الكريمية', price: 75, category: 'آيس كوفي', image: 'iced-cappuccino.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 99, name: 'آيس نسكافيه باللبن', description: 'نسكافيه بالحليب البارد', price: 70, category: 'آيس كوفي', image: 'iced-nescafe-milk.jpg', stock: 80, featured: false, rating: 4.7 },
  { id: 100, name: 'آيس فرنساوي', description: 'قهوة فرنساوية مثلجة بالفانيليا', price: 70, category: 'آيس كوفي', image: 'iced-french.jpg', stock: 60, featured: false, rating: 4.6 },
  { id: 101, name: 'آيس تركي', description: 'قهوة تركي مثلجة بالهيل', price: 70, category: 'آيس كوفي', image: 'iced-turkish.jpg', stock: 60, featured: false, rating: 4.7 },
  { id: 102, name: 'آيس كوفي بندق', description: 'قهوة مثلجة بنكهة البندق', price: 80, category: 'آيس كوفي', image: 'iced-hazelnut-coffee.jpg', stock: 50, featured: true, rating: 4.9 },
  { id: 103, name: 'سينابون', description: 'رول قرفة طري محشو بالسكر والقرفة ومغطى بصوص كريمي', price: 35, category: 'حلويات ساخنة', image: 'cinnamon-roll.svg', stock: 50, featured: true, rating: 4.9 },
];

const initialUsers: any[] = [
  { id: 1, username: 'Amrmahmoud', password: 'Asd@2580', role: 'admin', displayName: 'المدير', email: '', phone: '', totalSpent: 0, loyaltyGift: false, createdAt: new Date() },
  { id: 2, username: 'Amr', password: '246810', role: 'cashier', displayName: 'الكاشير', email: '', phone: '', totalSpent: 0, loyaltyGift: false, createdAt: new Date() },
];

interface MockDatabaseState {
  products: any[];
  users: any[];
  orders: any[];
  nextId: number;
  nextUserId: number;
}

const databaseFile = resolve(process.cwd(), '../config/backend/db/db/mock-data.json');
const globalDatabase = globalThis as typeof globalThis & { __eldawlyMockDatabase?: MockDatabaseState };

function readPersistedState(): MockDatabaseState | null {
  if (!existsSync(databaseFile)) return null;

  try {
    const saved = JSON.parse(readFileSync(databaseFile, 'utf8'));
    if (!Array.isArray(saved.products) || !Array.isArray(saved.users) || !Array.isArray(saved.orders)) {
      throw new Error('Mock database file has an invalid format');
    }
    return {
      products: saved.products,
      users: saved.users,
      orders: saved.orders,
      nextId: Number.isInteger(saved.nextId) ? saved.nextId : Math.max(0, ...saved.products.map((product: any) => product.id)) + 1,
      nextUserId: Number.isInteger(saved.nextUserId) ? saved.nextUserId : Math.max(0, ...saved.users.map((user: any) => user.id)) + 1,
    };
  } catch (error) {
    throw new Error(`Unable to load mock database at ${databaseFile}`, { cause: error });
  }
}

const state = globalDatabase.__eldawlyMockDatabase ?? readPersistedState() ?? {
  products: initialProducts,
  users: initialUsers,
  orders: [],
  nextId: initialProducts.length + 1,
  nextUserId: initialUsers.length + 1,
};
globalDatabase.__eldawlyMockDatabase = state;

const { products, users, orders } = state;

function persistState() {
  mkdirSync(dirname(databaseFile), { recursive: true });
  const temporaryFile = `${databaseFile}.${process.pid}.tmp`;
  writeFileSync(temporaryFile, JSON.stringify(state), 'utf8');
  renameSync(temporaryFile, databaseFile);
}

function matchesWhere(item: any, where: any): boolean {
  if (!where || typeof where !== 'object') return true;
  for (const [key, value] of Object.entries(where)) {
    if (key === 'OR') { if (!(value as any[]).some((or: any) => matchesWhere(item, or))) return false; continue; }
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const fieldVal = item[key], filterObj = value as Record<string, any>;
      for (const [op, opVal] of Object.entries(filterObj)) {
        if (op === 'contains') { const mode = filterObj.mode; if (!(mode === 'insensitive' ? String(fieldVal ?? '').toLowerCase().includes(String(opVal).toLowerCase()) : String(fieldVal ?? '').includes(String(opVal)))) return false; }
        else if (op === 'lte' && (fieldVal as number) > (opVal as number)) return false;
        else if (op === 'gte' && (fieldVal as number) < (opVal as number)) return false;
      }
    } else { if (item[key] !== value) return false; }
  }
  return true;
}

function sortResult(result: any[], orderBy: any): any[] {
  const obs = Array.isArray(orderBy) ? orderBy : [orderBy];
  for (const ob of [...obs].reverse()) {
    for (const [field, dir] of Object.entries(ob)) {
      result.sort((a: any, b: any) => {
        const va = a[field], vb = b[field];
        let cmp = field === 'createdAt' ? new Date(va).getTime() - new Date(vb).getTime() : typeof va === 'string' ? va.localeCompare(vb) : (va || 0) - (vb || 0);
        return dir === 'desc' ? -cmp : cmp;
      });
    }
  }
  return result;
}

export const mockDb = {
  product: {
    deleteMany: async () => {
      const count = products.length;
      products.splice(0, products.length);
      state.nextId = 1;
      persistState();
      return { count };
    },
    findMany: async (args?: any) => {
      let r = [...products];
      if (args?.where) r = r.filter(p => matchesWhere(p, args.where));
      if (args?.distinct) { const seen = new Set<string>(); r = r.filter(p => { const k = args.distinct.map((d: string) => String((p as unknown as Record<string, unknown>)[d])).join('|'); if (seen.has(k)) return false; seen.add(k); return true; }); }
      if (args?.orderBy) sortResult(r, args.orderBy);
      if (args?.skip) r = r.slice(args.skip);
      if (args?.take) r = r.slice(0, args.take);
      if (args?.select) r = r.map(p => { const o: any = {}; for (const [k, v] of Object.entries(args.select)) { if (v && k in p) o[k] = (p as unknown as Record<string, unknown>)[k]; } return o; });
      return r;
    },
    findUnique: async (args: any) => products.find(p => p.id === args.where.id) ?? null,
    count: async (args?: any) => args?.where ? products.filter(p => matchesWhere(p, args.where)).length : products.length,
    create: async (args: any) => { const p = { id: state.nextId++, ...args.data }; products.push(p); persistState(); return p; },
    update: async (args: any) => {
      const product = products.find(p => p.id === args.where.id);
      if (!product) throw new Error('Product not found');
      Object.assign(product, args.data);
      persistState();
      return product;
    },
  },
  user: {
    deleteMany: async () => {
      const count = users.length;
      users.splice(0, users.length);
      state.nextUserId = 1;
      persistState();
      return { count };
    },
    findMany: async (args?: any) => {
      let r = [...users];
      if (args?.where) r = r.filter(u => matchesWhere(u, args.where));
      if (args?.select) r = r.map(u => { const o: any = {}; for (const [k, v] of Object.entries(args.select)) { if (v && k in u) o[k] = u[k]; } return o; });
      if (args?.skip) r = r.slice(args.skip);
      if (args?.take) r = r.slice(0, args.take);
      if (args?.orderBy) sortResult(r, args.orderBy);
      return r;
    },
    findUnique: async (args: any) => 'id' in args.where ? users.find(u => u.id === args.where.id) ?? null : 'username' in args.where ? users.find(u => u.username === args.where.username) ?? null : null,
    findFirst: async (args: any) => { let r = [...users]; if (args?.where) r = r.filter(u => matchesWhere(u, args.where)); return r[0] ?? null; },
    create: async (args: any) => { const u = { id: state.nextUserId++, createdAt: new Date(), ...args.data }; users.push(u); persistState(); return u; },
    update: async (args: any) => {
      let u: any;
      if ('id' in args.where) u = users.find((x: any) => x.id === args.where.id);
      else if ('username' in args.where) u = users.find((x: any) => x.username === args.where.username);
      if (!u) throw new Error('User not found');
      Object.assign(u, args.data);
      persistState();
      return u;
    },
    count: async (args?: any) => args?.where ? users.filter(u => matchesWhere(u, args.where)).length : users.length,
  },
  order: {
    deleteMany: async () => {
      const count = orders.length;
      orders.splice(0, orders.length);
      persistState();
      return { count };
    },
    findMany: async (args?: any) => {
      let r = [...orders];
      if (args?.where) r = r.filter(o => matchesWhere(o, args.where));
      if (args?.orderBy) sortResult(r, args.orderBy);
      if (args?.skip) r = r.slice(args.skip);
      if (args?.take) r = r.slice(0, args.take);
      return r;
    },
    findUnique: async (args: any) => orders.find((o: any) => o.id === args.where.id) ?? null,
    count: async (args?: any) => args?.where ? orders.filter(o => matchesWhere(o, args.where)).length : orders.length,
    create: async (args: any) => { const o = { createdAt: new Date(), paid: 0, status: 'pending', orderType: 'delivery', ...args.data }; orders.push(o); persistState(); return o; },
    update: async (args: any) => { const o = orders.find((x: any) => x.id === args.where.id); if (!o) throw new Error('Order not found'); Object.assign(o, args.data); persistState(); return o; },
  },
  $disconnect: async () => {},
};
