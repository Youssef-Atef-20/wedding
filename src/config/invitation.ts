export interface WeddingTimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: 'welcome' | 'ceremony' | 'dinner' | 'celebration';
}

export interface WeddingPhotoItem {
  id: string;
  url: string;
  alt: string;
  caption: string;
  orientation: 'portrait' | 'landscape';
}

export interface WeddingConfig {
  couple: {
    groom: {
      name: string;
      fullName: string;
      title: string;
      father: string;
    };
    bride: {
      name: string;
      fullName: string;
      title: string;
      father: string;
    };
    monogramArabic: string;
    monogramLatin: string;
  };
  event: {
    date: string; // ISO format: YYYY-MM-DDTHH:mm:ss
    endDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss
    timezone: string;
    dateArabicFormatted: string;
    dayOfWeekArabic: string;
    timeArabicFormatted: string;
    hijriDateFormatted?: string;
  };
  venue: {
    name: string;
    nameEn: string;
    hall: string;
    address: string;
    city: string;
    country: string;
    googleMapsUrl: string;
    valetAvailable: boolean;
  };
  messages: {
    quranicVerse: string;
    quranicReference: string;
    invitationGreeting: string;
    invitationBody: string;
    dressCode: {
      title: string;
      description: string;
      colorsNote: string;
    };
    closingGreeting: string;
    closingSubtext: string;
  };
  photos: {
    hero: string;
    groomMotif: string;
    brideMotif: string;
    gallery: WeddingPhotoItem[];
  };
  timeline: WeddingTimelineEvent[];
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      name: 'عمر',
      fullName: 'عمر أحمد الشريف',
      title: 'العريس',
      father: 'أحمد الشريف',
    },
    bride: {
      name: 'ياسمين',
      fullName: 'ياسمين خالد المنصوري',
      title: 'العروس',
      father: 'خالد المنصوري',
    },
    monogramArabic: 'ع & ي',
    monogramLatin: 'O & Y',
  },
  event: {
    date: '2026-11-20T19:00:00',
    endDate: '2026-11-21T01:00:00',
    timezone: 'Africa/Cairo',
    dateArabicFormatted: '٢٠ نوفمبر ٢٠٢٦',
    dayOfWeekArabic: 'يوم الجمعة',
    timeArabicFormatted: 'السابعة مساءً',
    hijriDateFormatted: '١١ جمادى الأولى ١٤٤٨ هـ',
  },
  venue: {
    name: 'قصر البارون إمبان الأثري',
    nameEn: 'The Historic Baron Empain Palace',
    hall: 'حديقة القصر الملكية - The Royal Gardens',
    address: 'شارع العروبة، مصر الجديدة',
    city: 'القاهرة',
    country: 'مصر',
    googleMapsUrl: 'https://maps.app.goo.gl/ZmZuEhL1fhSQf7qKA',
    valetAvailable: true,
  },
  messages: {
    quranicVerse: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنْفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ',
    quranicReference: 'سورة الروم، الآية ٢١',
    invitationGreeting: 'بسم الله الرحمن الرحيم',
    invitationBody: 'بمشاعر تفيض سروراً وفرحاً، يتشرف أحمد الشريف وخالد المنصوري بدعوتكم لحضور حفل زفاف نجليهما، لتكتمل سعادتنا بحضوركم الكريم ودعواتكم الصادقة لبدء رحلة العمر معاً.',
    dressCode: {
      title: 'الزي الرسمي الأنيق (Black Tie / Formal)',
      description: 'يسعدنا تشريفكم بالزي الرسمي الكامل للسادة، وفساتين السهرة الأنيقة والمحتشمة للسيدات.',
      colorsNote: 'نرجو ترك اللون الأبيض الكريمي للعروس الجميلة.',
    },
    closingGreeting: 'ننتظركم بكل محبة وشوق لتضيئوا ليلتنا',
    closingSubtext: 'دامت دياركم عامرة بالأفراح والمسرات والبهجة الدائمة.',
  },
  photos: {
    // Strictly verified modest, elegant Islamic imagery: Palace architecture, luxury floral arrangements, wedding bands
    hero: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b10d?auto=format&fit=crop&w=1920&q=85', // Palace architecture & evening lights
    groomMotif: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=85', // Elegant formal groom tuxedo detail
    brideMotif: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1200&q=85', // Pure white bridal floral bouquet & pearls
    gallery: [
      {
        id: 'photo-1',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85',
        alt: 'تفاصيل أنيقة لخاتمي الزفاف الذهبيين',
        caption: 'رمز المودة والعهد الأبدي',
        orientation: 'landscape',
      },
      {
        id: 'photo-2',
        url: 'https://images.unsplash.com/photo-1545232979-fbf68fe9b10d?auto=format&fit=crop&w=1400&q=85',
        alt: 'العمارة الملكية والأضواء الاحتفالية',
        caption: 'أجواء أسطورية تحت سماء القاهرة',
        orientation: 'landscape',
      },
      {
        id: 'photo-3',
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85',
        alt: 'باقة زهور العروس من الورد الطبيعي الأبيض',
        caption: 'عبق الزهور يرافق فرحتنا',
        orientation: 'landscape',
      },
      {
        id: 'photo-4',
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
        alt: 'حدائق القصر الملكية المضاءة بالشموع',
        caption: 'ليلة من ألف ليلة وليلة',
        orientation: 'portrait',
      },
    ],
  },
  timeline: [
    {
      time: '٠٧:٠٠ م',
      title: 'استقبال الضيوف الكرام',
      description: 'مشروبات الترحيب والضيافة في حديقة القصر',
      icon: 'welcome',
    },
    {
      time: '٠٨:٠٠ م',
      title: 'الزفة ومراسم الحفل',
      description: 'دخول العروسين وبداية الاحتفال الأسطوري',
      icon: 'ceremony',
    },
    {
      time: '٠٩:٣٠ م',
      title: 'مأدبة العشاء الفاخرة',
      description: 'عشاء ملكي مختار بأشهى الأطباق الشرقية والغربية',
      icon: 'dinner',
    },
    {
      time: '١١:٠٠ م',
      title: 'تقطيع التورتة وبداية السهرة',
      description: 'أجواء احتفالية وأوقات لا تُنسى بصحبتكم',
      icon: 'celebration',
    },
  ],
};
