import { Project, RenovationComparison, TeamMember, StudioAward } from '../types';

export const STUDIO_INFO = {
  nameEn: 'Atria Architecture & Design Studio',
  nameFa: 'استودیو معماری و طراحی ساختمان آتریا',
  established: 2014,
  founders: 'Arshia Radmanesh & Niloufar Soroush',
  headquarters: 'Tehran & Dubai',
  headquartersFa: 'تهران و دبی',
  phone: '09389951723',
  phoneFormattedFa: '۰۹۳۸ ۹۹۵ ۱۷۲۳',
  phoneFormattedEn: '+98 (938) 995-1723',
  phoneDubai: '+971 4 582 9100',
  email: 'nabikalandar0@gmail.com',
  instagram: '@atria.architecture',
  addressFa: 'تهران، زعفرانیه، خیابان آصف، پلاک ۴۲، ساختمان معماری آتریا',
  addressEn: '42 Assef St, Zaferanieh, Tehran | Downtown Dubai Design District, UAE',
  stats: [
    { labelEn: 'Years of Excellence', labelFa: 'سال سابقه و تجربه تخصصی', value: '12+', numericTarget: 12, suffix: '+' },
    { labelEn: 'Completed Projects', labelFa: 'پروژه شاخص اجرا شده', value: '85+', numericTarget: 85, suffix: '+' },
    { labelEn: 'Built Area Designed', labelFa: 'مترمربع زیربنای طراحی شده', value: '420,000 m²', numericTarget: 420000, suffix: ' m²' },
    { labelEn: 'National & Global Awards', labelFa: 'جوایز ملی و بین‌المللی معماری', value: '18', numericTarget: 18, suffix: '' },
  ]
};

export const ATRIA_PROJECTS: Project[] = [
  {
    id: 'atria-lavasan-sanctuary',
    title: 'Lavasan Horizon Residence',
    titleFa: 'ویلای افق لواسان (عمارت صخره و نور)',
    slug: 'lavasan-horizon-residence',
    category: 'villa',
    categoryEn: 'Villas & Mansions',
    categoryFa: 'ویلا و عمارت‌های لوکس',
    location: 'Lavasan, Tehran',
    locationFa: 'لواسان، دامنه‌های البرز',
    year: '2024',
    areaSqm: 1450,
    status: 'Completed',
    tagline: 'Sculptural concrete floating cantilever over cascading mountain views.',
    taglineFa: 'معماری تندیس‌گون بتن و شیشه با کنسول‌های معلق بر فراز دره لواسان',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=85',
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'The Lavasan Horizon Residence is embedded seamlessly into a 32-degree steep hillside. Composed of interlocking monolithic exposed concrete volumes and floor-to-ceiling Low-E glass panels, the house creates an unencumbered dialogue between mountain topography and tranquil contemporary living.',
    descriptionFa: 'ویلای افق لواسان بر بستر شیب ۳۲ درجه کوهپایه شکل گرفته است. این پروژه با بهره‌گیری از کنسول‌های بتنی اکسپوز، حیاط‌های میانی آفتاب‌گیر (Atrium) و جداره‌های شیشه‌ای قدی، مرز میان طبیعت بکر کوهستان و فضاهای پالوده داخلی را از میان برداشته است.',
    architecturalPhilosophy: 'Dualism of Solid Rock & Transparent Voids — balancing the protective heavy shelter with boundless panoramic visual extensions.',
    architecturalPhilosophyFa: 'دوگانگی جرم صلب و خلأ شفاف؛ ایجاد مأمنی استوار در دل شیب طبیعی توأم با امتداد سیال نور و چشم‌انداز افق.',
    leadArchitect: 'Arshia Radmanesh',
    leadArchitectFa: 'مهندس آرشیا رادمنش',
    awards: ['Memar Grand Prize 2024 (1st Place)', 'WAF Shortlist 2024'],
    awardsFa: ['رتبه اول جایزه معمار سال ۱۴۰۳ (بخش ویلا)', 'نامزد نهایی فستیوال جهانی معماری WAF'],
    materials: [
      { name: 'Self-Compacting Fair-Faced Concrete', nameFa: 'بتن خودتراکم اکسپوز خاکستری', origin: 'Iran', type: 'Structure & Facade' },
      { name: 'Thermal-Treated Ash Timber', nameFa: 'ترمووود زبان‌گنجشک فنلاندی', origin: 'Nordic', type: 'Soffits & Louvers' },
      { name: 'Silver Travertine Slab', nameFa: 'سنگ تراورتن سیلور آذرشهر', origin: 'Azarshahr', type: 'Flooring & Plinths' },
      { name: 'Acoustic Triple Glazed Low-E Glass', nameFa: 'شیشه‌های سه‌جداره Low-E کنترل نور', origin: 'Guardian Glass', type: 'Curtain Wall' }
    ],
    sustainabilityRating: 'A+ (Passive Solar & Geothermal Cooling)',
    climateApproach: 'Integrated thermal mass retaining winter solar gains, combined with subterranean evaporative cooling courtyards for zero-energy summer comfort.',
    climateApproachFa: 'بهره‌گیری از جرم حرارتی سنگین بتن برای جذب گرمای خورشید در زمستان و حیاط‌های گودال‌باغچه برای تهویه طبیعی خنک‌کننده در تابستان.',
    keyFeatures: [
      '18-meter cantilevered infinity pool projecting into the mountain valley',
      'Central zen atrium with century-old olive tree and retractable glass roof',
      'Subterranean natural wine cellar and private thermal wellness pavilion',
      'Automated solar shading louvers dynamically following the sun path'
    ],
    keyFeaturesFa: [
      'استخر بی‌نهایت با کنسول ۱۸ متری معلق در راستای دره',
      'آتریوم مرکزی با درخت زیتون کهنسال و سقف شیشه‌ای هوشمند متحرک',
      'مجموعه اسپا و آب‌درمانی غارمانند تعبیه‌شده در دل صخره طبیعی',
      'لوورهای دینامیک اتوماتیک متناسب با زاویه تابش آفتاب'
    ],
    isFeatured: true,
    coordinates: { lat: 35.815, lng: 51.642 },
    regionName: 'Lavasan Mountain Foothills',
    regionNameFa: 'دامنه‌های البرز و دره لواسان'
  },
  {
    id: 'atria-zaferanieh-tower',
    title: 'Zaferanieh Cedar Living',
    titleFa: 'مجتمع مسکونی سدر زعفرانیه',
    slug: 'zaferanieh-cedar-living',
    category: 'residential',
    categoryEn: 'Luxury Residential',
    categoryFa: 'برج‌باغ و مسکونی لوکس',
    location: 'Zaferanieh, Tehran',
    locationFa: 'زعفرانیه، تهران',
    year: '2023',
    areaSqm: 8800,
    status: 'Completed',
    tagline: 'Vertical garden residential tower honoring Tehran’s ancient plane and cedar trees.',
    taglineFa: 'برج‌باغ لوکس ۱۲ طبقه با تلفیق بالکن‌های سبز پیوسته و آجرچینی مدرن دست‌ساز',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1800&q=85'
    ],
    description: 'Zaferanieh Cedar Living reinvents high-density urban living. Every residence is granted a 40-square-meter cantilevered sky garden terrace, blurring the boundary between traditional Persian courtyard privacy and contemporary vertical luxury.',
    descriptionFa: 'مجتمع سدر زعفرانیه با مساحت ۸۸۰۰ مترمربع، مفهوم حیاط‌های مطبق سنتی ایرانی را در کالبد معماری مدرن معاصر احیا کرده است. هر واحد دارای تراس-باغ ۴۰ متری با دید ۳۶۰ درجه به شهر و کوهستان است.',
    architecturalPhilosophy: 'Vertical Biophilic Porosity — reintroducing lush green canopy at elevated heights in dense urban fabric.',
    architecturalPhilosophyFa: 'تخلخل سبز عمودی؛ بازآفرینی حس باغ‌های اصیل شمیران در ترازهای ارتفاعی ساختمان.',
    leadArchitect: 'Niloufar Soroush & Arshia Radmanesh',
    leadArchitectFa: 'مهندس نیلوفر سروش و مهندس آرشیا رادمنش',
    awards: ['Middle East Architecture Award 2023', 'Tehran Facade Excellence Recognition'],
    awardsFa: ['جایزه معماری خاورمیانه ۲۰۲۳', 'نشان برتر نما و منظر شهری تهران'],
    materials: [
      { name: 'Custom Hand-Fired Ochre Brick', nameFa: 'آجر دست‌ساز اخرا و شاموتی سفارشی', origin: 'Isfahan', type: 'Facade Texture' },
      { name: 'Bronze Anodized Aluminum', nameFa: 'آلومینیوم آنودایز برنزی مات', origin: 'Schüco', type: 'Window Profiles' },
      { name: 'Pietra Grey Marble', nameFa: 'مرمریت لاشتر بوش‌همر', origin: 'Isfahan', type: 'Lobby & Public Areas' }
    ],
    sustainabilityRating: 'BREEAM Very Good (Greywater recycling system)',
    climateApproach: 'Double-skin microclimate facade with parametric brick rotation reducing solar thermal load by 38%.',
    climateApproachFa: 'نمای دوپوسته پارامتریک با چرخش هوشمند آجرها جهت شکست تابش شدید غرب و کاهش ۳۸ درصدی بار برودتی.',
    keyFeatures: [
      'Biophilic double-height lobby with living moss wall and water mirror',
      'Panoramic rooftop lounge with heated infinity plunge pool and fire pits',
      'Automated subterranean smart car-lift parking system for 40 vehicles',
      'Acoustically isolated private cinema and resident library salon'
    ],
    keyFeaturesFa: [
      'لابی مجلل دوبلکس با دیوار زنده خزه طبیعی و حوض آینه‌ای آب',
      'روف‌گاردن چهارفصل با استخر آب‌گرم، باربیکیو و فضای نشیمن آتش‌دان',
      'سامانه هوشمند مدیریت انرژی BMS با کنترل اختصاصی هر زون',
      'سالن سینمای آکوستیک اختصاصی، سالن اسپا و کتابخانه ساکنین'
    ],
    isFeatured: true,
    coordinates: { lat: 35.808, lng: 51.418 },
    regionName: 'Shemiran & Zaferanieh',
    regionNameFa: 'زعفرانیه و باغ‌های شمیران'
  },
  {
    id: 'atria-downtown-hq',
    title: 'Aura Commercial & Tech Hub',
    titleFa: 'مرکز نوآوری و اداری آئورا',
    slug: 'aura-commercial-tech-hub',
    category: 'commercial',
    categoryEn: 'Commercial & Corporate HQ',
    categoryFa: 'تجاری، اداری و مراکز نوآوری',
    location: 'Nelson Mandela Blvd, Tehran',
    locationFa: 'بلوار نلسون ماندلا (جردن)، تهران',
    year: '2024',
    areaSqm: 6400,
    status: 'Completed',
    tagline: 'Dynamic diagrid crystalline facade redefining contemporary corporate headquarters.',
    taglineFa: 'الگوی هندسی کریستالی با شیشه‌های هوشمند الکتروکرومیک و فضاهای کار تعاملی',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1800&q=85'
    ],
    description: 'A headquarters designed for human-centric collaboration and acoustic serenity. The building features an open central atrium spanning 9 floors with hanging sky-bridges and naturally ventilated collaborative terraces.',
    descriptionFa: 'برج اداری آئورا با سازمان‌دهی حول یک آتریوم مرکزی ۹ طبقه طراحی شده است. پل‌های شیشه‌ای معلق، باغ‌های معلق درون‌ساختمانی و عایق‌بندی صوتی پیشرفته، محیطی پویا و بدون استرس برای بیش از ۵۰۰ نیروی کار فراهم کرده است.',
    architecturalPhilosophy: 'Spatial Agility & Luminosity — empowering spontaneous human encounters while bathing deep floorplates in filtered daylight.',
    architecturalPhilosophyFa: 'سیالیت فضایی و شفافیت نوری؛ ایجاد بستری پویا برای تعاملات اجتماعی همراه با ورود حداکثری نور طبیعی به اعماق پلان.',
    leadArchitect: 'Arshia Radmanesh',
    leadArchitectFa: 'مهندس آرشیا رادمنش',
    awards: ['Iran Architecture of the Year 2024 Nominee'],
    awardsFa: ['نامزد ساختمان اداری سال ایران ۱۴۰۳'],
    materials: [
      { name: 'Ultra-High Performance Concrete (UHPC)', nameFa: 'پنل‌های بتنی فوق‌مقاوم UHPC', origin: 'Custom Cast', type: 'Diagrid Skin' },
      { name: 'Electrochromic Smart Glass', nameFa: 'شیشه‌های هوشمند مات‌شونده الکتروکرومیک', origin: 'Saint-Gobain', type: 'Glazing' },
      { name: 'Brushed Titanium Zinc Cladding', nameFa: 'ورق‌های تیتانیوم زینک مات', origin: 'VMZinc', type: 'Crown Canopy' }
    ],
    sustainabilityRating: 'LEED Gold Standard Target',
    climateApproach: 'Solar-tracking dynamic louvers that dynamically adjust to block intense morning and afternoon heat gain.',
    climateApproachFa: 'نمای متحرک هوشمند با حسگرهای فتوولتائیک برای مدیریت لحظه‌ای حرارت و نور.',
    keyFeatures: [
      '9-story luminous central atrium with sculpted floating spiral staircases',
      'Acoustic reverberation time under 0.45s in all meeting and collaborative zones',
      'Rooftop event amphitheater with 360-degree cityscape views',
      'Zero-contact biometric access and smart climate micro-zoning'
    ],
    keyFeaturesFa: [
      'آتریوم نوری ۹ طبقه با پله‌های مارپیچ تندیس‌گون و آسانسورهای پانوراما',
      'طراحی آکوستیک تخصصی با زمان واخنش زیر ۰.۴۵ ثانیه',
      'آمفی‌تئاتر روباز روی بام با دید کامل به رشته‌کوه توچال و تهران',
      'مدیریت هوشمند تهویه متناسب با تراکم افراد در هر بخش'
    ],
    isFeatured: true,
    coordinates: { lat: 35.772, lng: 51.424 },
    regionName: 'Tehran Corporate Corridor',
    regionNameFa: 'محور اداری و تجاری جردن'
  },
  {
    id: 'atria-kish-coral-villa',
    title: 'Kish Coral Coast Villa',
    titleFa: 'ویلای ساحلی مرجان کیش',
    slug: 'kish-coral-coast-villa',
    category: 'villa',
    categoryEn: 'Coastal Villa & Retreat',
    categoryFa: 'ویلا و اقامتگاه ساحلی',
    location: 'Coral Beach, Kish Island',
    locationFa: 'ساحل مرجان، جزیره کیش',
    year: '2024',
    areaSqm: 980,
    status: 'Completed',
    tagline: 'Aerodynamic wind-catching maritime residence blending white polished stone with Persian Gulf breezes.',
    taglineFa: 'معماری اقلیمی بادگیرپایه با سنگ‌های مرجانی سفید و دید پانورامای خلیج فارس',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=85'
    ],
    description: 'Designed specifically for the hot and humid coastal climate of Kish Island, this residence employs contemporary wind-catchers (Badgirs) and cantilevered deep shade canopies to create a naturally cool, luminous coastal haven.',
    descriptionFa: 'ویلای مرجان کیش با الهام از معماری بومی جنوب ایران و بادگیرهای تاریخی، دارای احجام منحنی آیرودینامیک است که نسیم خنک دریا را جذب کرده و رطوبت را تعدیل می‌کند.',
    architecturalPhilosophy: 'Contemporary Vernacular Microclimate — mastering the elements of salt, wind, and tropical sun.',
    architecturalPhilosophyFa: 'معماری بومی-معاصر اقلیمی؛ همنشینی مصالح ضدخوردگی با نسیم دریایی و هندسه بادگیرهای مدرن.',
    leadArchitect: 'Niloufar Soroush',
    leadArchitectFa: 'مهندس نیلوفر سروش',
    awards: ['Coastal Villa Design Excellence 2024'],
    awardsFa: ['برگزیده جایزه طراحی ویلاهای اقلیمی ۱۴۰۳'],
    materials: [
      { name: 'Polished Coral White Micro-Cement', nameFa: 'میکروسمنت ضدشوره و ضدآب سفید مرجانی', origin: 'Spain', type: 'Exterior Walls' },
      { name: 'Marine-Grade Teak Wood', nameFa: 'چوب ساج برمه‌ای مارین‌گرید ضد رطوبت', origin: 'Myanmar', type: 'Decks & Pergolas' },
      { name: 'White Thassos Marble', nameFa: 'سنگ ماربل تاسوس یونانی با انعکاس بالا', origin: 'Greece', type: 'Pool & Patios' }
    ],
    sustainabilityRating: 'A (Seawater Heat Pump & Solar Desalination)',
    climateApproach: 'Aerodynamic wind scoops funneling maritime sea breezes across sunken shallow water reflecting pools.',
    climateApproachFa: 'کانال‌های بادگیر هدایت‌کننده نسیم روی حوضچه‌های خنک‌کننده آب شیرین برای تهویه طبیعی.',
    keyFeatures: [
      'Direct private boardwalk to the turquoise Persian Gulf waters',
      'Sunken outdoor lounge surrounded by wrap-around swimming lagoon',
      'Automated motorized sliding glass walls creating 100% open-air living',
      'Salt-resistant and hurricane-rated structural engineering'
    ],
    keyFeaturesFa: [
      'دسترسی اختصاصی با عرشه چوبی به آب‌های زلال خلیج فارس',
      'نشیمن گودال‌نشین (Sunken Lounge) محصور در میان استخر لاگون',
      'دیوارهای شیشه‌ای تاشو برقی با امکان یکی‌شدن کامل فضای داخل و خارج',
      'سازه فوق مقاوم در برابر خوردگی یون کلر و رطوبت ۹۰ درصدی'
    ],
    isFeatured: false,
    coordinates: { lat: 26.534, lng: 53.988 },
    regionName: 'Persian Gulf & Kish Island',
    regionNameFa: 'جزیره کیش و سواحل خلیج فارس'
  },
  {
    id: 'atria-niavaran-gallery-loft',
    title: 'Niavaran Art Collector Sanctuary',
    titleFa: 'پنت‌هاوس و گالری مسکونی نیاوران',
    slug: 'niavaran-art-collector-sanctuary',
    category: 'interior',
    categoryEn: 'Luxury Interior & Penthouse',
    categoryFa: 'طراحی داخلی و پنت‌هاوس لوکس',
    location: 'Niavaran, Tehran',
    locationFa: 'نیاوران، تهران',
    year: '2023',
    areaSqm: 620,
    status: 'Completed',
    tagline: 'Museum-grade minimalist penthouse interior designed to showcase curated sculpture and modern art.',
    taglineFa: 'معماری داخلی مینیمال موزه‌ای با نورپردازی متغیر گالری و متریال‌های ارگانیک',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=85'
    ],
    description: 'An expansive penthouse transformation designed around an esteemed contemporary art collection. Features micro-topped seamless basalt flooring, concealed flush doors, custom walnut architectural joinery, and gallery lighting systems.',
    descriptionFa: 'بازطراحی کامل پنت‌هاوس ۶۲۰ متری نیاوران با کانسپت سکونتگاه-گالری. کفپوش بدون درز بازالت، درب‌های مخفی بدون فریم فلوش، کابینت‌های چوب گردوی دست‌ساز و سیستم نورپردازی تخصصی موزه ERCO آلمان.',
    architecturalPhilosophy: 'Restraint as the Ultimate Luxury — providing a serene, silent architectural backdrop where light, shadow, and art converge.',
    architecturalPhilosophyFa: 'سکوت و خلوص فضا به عنوان غایت لوکس‌بودن؛ ایجاد پس‌زمینه‌ای آرام و خالص برای درخشش آثار هنری و نور طبیعی.',
    leadArchitect: 'Niloufar Soroush',
    leadArchitectFa: 'مهندس نیلوفر سروش',
    awards: ['Interior Design of the Year Gold Prize 2023'],
    awardsFa: ['مدال طلای معماری داخلی سال ۱۴۰۲'],
    materials: [
      { name: 'Raw Smoked Iranian Walnut', nameFa: 'چوب گردوی دودی ایرانی دست‌ساز', origin: 'Mazandaran', type: 'Joinery & Paneling' },
      { name: 'Seamless Basalt Micro-Topping', nameFa: 'میکروتاپینگ بدون درز سنگ بازالت', origin: 'Italy', type: 'Continuous Flooring' },
      { name: 'Brushed Raw Brass Accents', nameFa: 'اتصالات و جزئیات برنج مات پتینه‌شده', origin: 'Custom Forge', type: 'Hardware & Fixtures' }
    ],
    sustainabilityRating: 'VOC-Free Certified Materials',
    climateApproach: 'Smart acoustic dampening ceilings absorbing ambient sound, combined with humidity-regulated art conservation air handling.',
    climateApproachFa: 'سقف‌های جاذب صوت آکوستیک با سامانه هوشمند کنترل دما و رطوبت برای نگهداری بهینه تابلوهای نقاشی و مجسمه‌ها.',
    keyFeatures: [
      'Museum-grade CRI 98+ dynamic color-temperature gallery track lighting',
      'Custom monolithic kitchen island carved from a single 6-ton grey quartzite block',
      'Master suite with freestanding Japanese soaking tub facing mountain vistas',
      'Concealed hidden pivot doors creating continuous wall planes'
    ],
    keyFeaturesFa: [
      'نورپردازی استاندارد موزه‌ای با شاخص تفکیک رنگ CRI 98+',
      'جزیره آشپزخانه یکپارچه تراشیده‌شده از سنگ کوارتزیت ۶ تنی',
      'مستر روم رویال با وان ژاپنی چوبی سفارشی رو به کوهستان',
      'درب‌های پیوت مخفی بدون دستگیره با حرکت نرم مغناطیسی'
    ],
    isFeatured: false,
    coordinates: { lat: 35.822, lng: 51.468 },
    regionName: 'Niavaran Royal Foothills',
    regionNameFa: 'ارتفاعات و دامنه‌های نیاوران'
  },
  {
    id: 'atria-darband-pavilion',
    title: 'Darband Cultural & Art Center',
    titleFa: 'کوشک فرهنگی و نگارخانه دربند',
    slug: 'darband-cultural-art-center',
    category: 'cultural',
    categoryEn: 'Cultural & Public Space',
    categoryFa: 'مراکز فرهنگی، نگارخانه و فضاهای عمومی',
    location: 'Darband Foothills, Tehran',
    locationFa: 'دربند، تهران',
    year: '2023',
    areaSqm: 3200,
    status: 'Completed',
    tagline: 'Terraced stone cultural amphitheater and art gallery honoring Persian garden architecture.',
    taglineFa: 'معماری پلکانی سنگی در امتداد رود-دره با تلفیق باغ ایرانی و گالری‌های هنری معاصر',
    heroImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1800&q=85'
    ],
    description: 'A civic landmark weaving cascading waterfalls, stepped public plazas, and subterranean contemporary exhibition spaces seamlessly into the rugged granite landscape of Darband.',
    descriptionFa: 'این کوشک فرهنگی بر پایه مفهوم کوشک-باغ ایرانی و در پیوند با شیب صخره‌ای دربند طراحی شده است. فضاهای گالری در دل زمین جای گرفته‌اند تا منظر طبیعی کوهستان مخدوش نشود.',
    architecturalPhilosophy: 'Architecture as Topography — merging earth, water, and human assembly.',
    architecturalPhilosophyFa: 'معماری در مقام بستر و زمین؛ پیوند کهن‌الگوهای کوشک با نیازهای فرهنگی معاصر.',
    leadArchitect: 'Arshia Radmanesh',
    leadArchitectFa: 'مهندس آرشیا رادمنش',
    awards: ['Aga Khan Architecture Award Nominee 2024'],
    awardsFa: ['نامزد جایزه بین‌المللی معماری آقاخان ۲۰۲۴'],
    materials: [
      { name: 'Local Mountain Granite Fieldstone', nameFa: 'سنگ گرانیت و لاشه کوهی محلی', origin: 'Darband Quarry', type: 'Terrace Retaining Walls' },
      { name: 'Oxidized Weathering Corten Steel', nameFa: 'ورق‌های فولاد کورتن زنگارپذیر', origin: 'Mobarakeh', type: 'Canopies & Bridge' },
      { name: 'Reflective Glass & Water Canals', nameFa: 'شیشه‌های شفاف ضدبازتاب و کانال‌های آب', origin: 'Iran', type: 'Water Mirrors' }
    ],
    sustainabilityRating: 'Platinum Public Realm',
    climateApproach: 'Natural mountain stream water cooled air channeled through stepped amphitheater plazas.',
    climateApproachFa: 'بهره‌گیری از جریان آب طبیعی رودخانه برای خنک‌سازی تبخیری فضای عمومی پلکان‌ها در تابستان.',
    keyFeatures: [
      '300-seat open-air amphitheater with acoustic rock reflection backdrop',
      'Underground climate-stable contemporary art exhibition halls',
      'Cascading water channels traversing through the central cafe pavilion',
      'Green sedum living roofs blending with the mountain hillside'
    ],
    keyFeaturesFa: [
      'آمفی‌تئاتر روباز ۳۰۰ نفره با پس‌زمینه صخره‌های طبیعی',
      'تالارهای نمایشگاهی زیرزمینی با دمای پایدار طبیعی',
      'جویبارهای جاری و حوضچه‌های بازتاب‌دهنده نور در سراسر مجموعه',
      'بام‌های سبز با پوشش گیاهان بومی کوهپایه‌ای'
    ],
    isFeatured: false,
    coordinates: { lat: 35.829, lng: 51.428 },
    regionName: 'Darband Valley & Foothills',
    regionNameFa: 'رود-دره و کوهستان دربند'
  },
  {
    id: 'atria-fereshteh-adaptive-reuse',
    title: 'Fereshteh Heritage Adaptive Revival',
    titleFa: 'بازآفرینی و احیای اقامتگاه میراث فرشته',
    slug: 'fereshteh-heritage-adaptive-revival',
    category: 'renovation',
    categoryEn: 'Adaptive Reuse & Renovation',
    categoryFa: 'بازسازی، احیا و نوسازی',
    location: 'Fereshteh St, Tehran',
    locationFa: 'فرشته، الهیه، تهران',
    year: '2024',
    areaSqm: 1100,
    status: 'Completed',
    tagline: 'Preserving 1970s structural bone while infusing ultra-clean contemporary glazed volumes.',
    taglineFa: 'حفظ استخوان‌بندی و اسکلت سازه‌ای دهه ۵۰ با تلفیق حجم‌های شیشه‌ای و کنسول‌های مینیمال معاصر',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1800&q=85',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85'
    ],
    floorPlanImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'A transformative adaptive-reuse intervention turning a heavy dilapidated residential compound into a light-flooded multi-generation estate with preserved heritage brickwork and carbon-fiber structural jackets.',
    descriptionFa: 'پروژه بازآفرینی عمارت فرشته نمونه‌ای شاخص از مهندسی نوسازی آتریاست. با تقویت سازه توسط الیاف FRP و ژاکت‌های فولادی، دیوارهای میانی تخریب و فضایی یکپارچه با نورگیر سقفی ۱۲ متری و باغ ژاپنی متولد شد.',
    architecturalPhilosophy: 'Memory Meets Minimalist Purity — honoring historical layers while delivering thermal and structural performance.',
    architecturalPhilosophyFa: 'تلاقی حافظه تاریخی با خلوص معاصر؛ احترام به اصالت ساخت در کنار به‌روزرسانی کامل آسایش حرارتی و سازه‌ای.',
    leadArchitect: 'Niloufar Soroush & Arshia Radmanesh',
    leadArchitectFa: 'مهندس نیلوفر سروش و مهندس آرشیا رادمنش',
    awards: ['Iran Renovation of the Year 2024 Winner'],
    awardsFa: ['برنده رتبه برتر بازآفرینی و نوسازی ابنیه ۱۴۰۳'],
    materials: [
      { name: 'Restored Vintage Qajar-Era Bricks', nameFa: 'آجرهای قاجاری احیا و سندبلاست‌شده', origin: 'Tehran Heritage', type: 'Exposed Internal Walls' },
      { name: 'Slim-Profile Corten Steel Glazing', nameFa: 'پروفیل‌های بسیار ظریف کورتن و شیشه سه‌جداره', origin: 'Secco Sistemi', type: 'Garden Facade' },
      { name: 'Cast Terrazzo with River Aggregate', nameFa: 'ترازوی درجا‌ریز با سنگدانه‌های صیقلی رودخانه‌ای', origin: 'Tehran', type: 'Flooring' }
    ],
    sustainabilityRating: 'A (Embodied Carbon Reduction 62%)',
    climateApproach: 'Retaining existing concrete skeleton preventing 480 metric tons of carbon emissions compared to demolition.',
    climateApproachFa: 'حفظ اسکلت بتنی موجود و کاهش ۶۲ درصدی ردپای کربن در مقایسه با تخریب و نوسازی سنتی.',
    keyFeatures: [
      '62% embodied carbon savings through adaptive structural reuse',
      'Continuous 14-meter linear skylight bathing core living spaces with zenithal light',
      'Subterranean heated thermal pool carved under historic vaulted foundations',
      'Smart geothermal climate integration concealed behind restored brick vaults'
    ],
    keyFeaturesFa: [
      'صرفه‌جویی ۶۲ درصدی در مصرف کربن با حفظ و احیای اسکلت اصلی',
      'نورگیر خطی سراسری ۱۴ متری جهت تابش نور طبیعی به مرکز خانه',
      'استخر آب‌گرم در عمق زمین در همجواری طاق‌های آجری سنتی',
      'تأسیسات نامرئی سرمایش و گرمایش ژئوترمال در پشت جداره‌های تاریخی'
    ],
    isFeatured: true,
    coordinates: { lat: 35.794, lng: 51.421 },
    regionName: 'Elahieh & Fereshteh Heritage',
    regionNameFa: 'فرشته، الهیه و بافت تاریخی'
  }
];

export const RENOVATION_STUDIES: RenovationComparison[] = [
  {
    id: 'elahiyeh-mansion-renovation',
    title: 'Elahiyeh 1980s Villa Transformation',
    titleFa: 'بازآفرینی و نوسازی عمارت الهیه (تبدیل ویلای دهه ۶۰ به شاهکار مینیمال)',
    location: 'Elahiyeh, Tehran',
    locationFa: 'الهیه، خیابان فرشته',
    beforeImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    beforeDescriptionEn: 'Dark, fragmented 1980s interior with low ceilings, heavy load-bearing partitions, poor insulation, and completely disconnected from the 1200m² private garden.',
    afterDescriptionEn: 'Complete structural reinforcement, removal of non-bearing walls to create a soaring 6.5m double-height living room with frameless floor-to-ceiling glass looking onto a minimalist reflecting pool.',
    beforeDescriptionFa: 'ساختمان قدیمی و فرسوده دهه شصت با پلان‌های تفکیک‌شده و تاریک، ارتفاع سقف کوتاه، مصرف انرژی بسیار بالا و عدم پیوند با حیاط و باغ مشجر.',
    afterDescriptionFa: 'تقویت سازه‌ای با ژاکت بتنی و فولادی، حذف دیوارهای باربر میانی، خلق سالن نشیمن دوبلکس با ارتفاع ۶.۵ متر، پنجره‌های قدی بدون فریم و ارتباط بی‌واسطه با استخر و فضای سبز.',
    areaSqm: 750,
    durationMonths: 11
  },
  {
    id: 'lavasan-stone-revival',
    title: 'Lavasan Brutalist Estate Renovation',
    titleFa: 'بازسازی و توسعه اقامتگاه ویلایی آبسرد و لواسان',
    location: 'Lavasan Valley',
    locationFa: 'دره لواسان، تهران',
    beforeImage: 'https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80',
    afterImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    beforeDescriptionEn: 'Dated classic masonry exterior with outdated mechanical systems and dysfunctional thermal envelope causing extreme winter heat loss.',
    afterDescriptionEn: 'Transformed into a warm minimalist sculptural estate with triple-glazed thermal envelope, geothermal floor heating, and cantilevered viewing terraces.',
    beforeDescriptionFa: 'ویلای کلاسیک نیمه‌کاره با تأسیسات غیراصولی، عایق‌بندی نامناسب و هدررفت شدید انرژی در فصول سرد سال.',
    afterDescriptionFa: 'تبدیل به اقامتگاه لوکس مینیمال با استفاده از بتن اکسپوز، گرمایش از کف ژئوترمال، تراس‌های معلق و روف‌گاردن چهارفصل.',
    areaSqm: 920,
    durationMonths: 14
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'arshia-radmanesh',
    name: 'Arshia Radmanesh',
    nameFa: 'مهندس آرشیا رادمنش',
    role: 'Co-Founder & Principal Design Director',
    roleFa: 'هم‌بنیان‌گذار و مدیر ارشد طراحی معماری',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bio: 'Educated at Politecnico di Milano and University of Tehran. With over 18 years of visionary architectural leadership, Arshia specializes in sculptural monolithic forms and sustainable luxury residential design.',
    bioFa: 'فارغ‌التحصیل دانشگاه پلی‌تکنیک میلان و دانشگاه تهران. با بیش از ۱۸ سال سابقه در طراحی و هدایت پروژه‌های فاخر مسکونی، ویلایی و تجاری با رویکرد فرم‌های تندیس‌گون و پایداری زیست‌محیطی.',
    education: 'M.Arch, Politecnico di Milano | B.Arch, University of Tehran',
    educationFa: 'کارشناسی ارشد معماری از پلی‌تکنیک میلان | کارشناسی معماری دانشگاه تهران'
  },
  {
    id: 'niloufar-soroush',
    name: 'Niloufar Soroush',
    nameFa: 'مهندس نیلوفر سروش',
    role: 'Co-Founder & Head of Interior Architecture',
    roleFa: 'هم‌بنیان‌گذار و مدیر معماری داخلی و متریال',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: 'Specialist in sensory materials, acoustic design, and bespoke architectural detailing. Niloufar has led interior curation for ultra-luxury penthouses and cultural embassies across the Middle East and Europe.',
    bioFa: 'متخصص معماری حسی، متریال‌شناسی پیشرفته، جزئیات اجرایی لوکس و نورپردازی استاندارد موزه‌ای با سابقه طراحی پروژه‌های برتر در ایران، دبی و اروپا.',
    education: 'M.Sc Interior Architecture, AA School of Architecture, London',
    educationFa: 'کارشناسی ارشد معماری داخلی از مدرسه معماری AA لندن'
  },
  {
    id: 'farhad-dolatabadi',
    name: 'Dr. Farhad Dolatabadi',
    nameFa: 'دکتر فرهاد دولت‌آبادی',
    role: 'Partner & Chief Structural & Technical Engineer',
    roleFa: 'پارتنر و مدیر ارشد مهندسی سازه و تکنولوژی ساخت',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=80',
    bio: 'Pioneer in post-tensioned long cantilevers, earthquake-resistant high-ductility frames, and complex parametric structural analysis.',
    bioFa: 'پیشگام در طراحی سازه‌های پیش‌تنیده با کنسول‌های بلند، سیستم‌های لرزه‌ای فوق‌پیشرفته و مدلسازی سازه‌های پیچیده و فرم‌های آزاد.',
    education: 'Ph.D Structural Engineering, Sharif University of Technology',
    educationFa: 'دکترای مهندسی سازه و زلزله از دانشگاه صنعتی شریف'
  }
];

export const STUDIO_AWARDS: StudioAward[] = [
  {
    year: '2024',
    title: '1st Place Grand Winner — Residential Villas',
    titleFa: 'رتبه اول جایزه بزرگ معمار (بخش ویلا)',
    organization: 'Memar Award 2024',
    projectName: 'Lavasan Horizon Residence',
    projectNameFa: 'ویلای افق لواسان',
    badge: '🏆 1st Prize'
  },
  {
    year: '2024',
    title: 'World Architecture Festival (WAF) Finalist',
    titleFa: 'فینالیست فستیوال جهانی معماری WAF',
    organization: 'WAF Singapore',
    projectName: 'Atria Lavasan Sanctuary',
    projectNameFa: 'پروژه افق لواسان',
    badge: '🌍 Global Finalist'
  },
  {
    year: '2023',
    title: 'Middle East Architecture Award of the Year',
    titleFa: 'جایزه معماری خاورمیانه در بخش برج مسکونی',
    organization: 'Middle East Architect',
    projectName: 'Zaferanieh Cedar Living',
    projectNameFa: 'مجتمع مسکونی سدر زعفرانیه',
    badge: '✨ Excellence Award'
  },
  {
    year: '2023',
    title: 'Gold Trophy — Interior Design Excellence',
    titleFa: 'تندیس طلایی برترین طراحی داخلی پنت‌هاوس',
    organization: 'Iran Interior Architecture Awards',
    projectName: 'Niavaran Art Collector Sanctuary',
    projectNameFa: 'پنت‌هاوس گالری نیاوران',
    badge: '🥇 Gold Award'
  }
];
