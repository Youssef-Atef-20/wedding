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
    coordinates?: {
      lat: number;
      lng: number;
    };
    valetAvailable: boolean;
  };
  rsvp: {
    whatsappNumber: string; // International format without +
    deadlineText: string;
    defaultMessageTemplate: string;
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
    coupleRevealGroom: string;
    coupleRevealBride: string;
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
    // Set for late 2026 to ensure the live countdown runs dynamically
    date: '2026-11-20T19:00:00',
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
    googleMapsUrl: 'https://maps.app.goo.gl/9uG5eQ5n4qY8t7vE7',
    valetAvailable: true,
  },
  rsvp: {
    whatsappNumber: '201012345678', // Demonstrative phone number
    deadlineText: 'نرجو تأكيد الحضور قبل ١ نوفمبر ٢٠٢٦',
    defaultMessageTemplate: 'مرحباً، أتشرف بتأكيد حضوري لحفل زفاف عمر & ياسمين.',
  },
  messages: {
    quranicVerse: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    quranicReference: 'سورة الروم - الآية ٢١',
    invitationGreeting: 'بسم الله الرحمن الرحيم',
    invitationBody: 'بمشاعر تفيض سروراً وفرحاً، يتشرف أحمد الشريف وخالد المنصوري بدعوتكم لحضور حفل زفاف نجليهما، لتكتمل سعادتنا بحضوركم الكريم ودعواتكم الصادقة لبدء رحلة العمر معاً.',
    dressCode: {
      title: 'الزي الرسمي الأنيق (Black Tie / Formal)',
      description: 'يسعدنا تألقكم بالزي الرسمي الكامل للسادة، وفساتين السهرة الراقية للسيدات.',
      colorsNote: 'نرجو ترك اللون الأبيض الكريمي للعروس الجميلة.',
    },
    closingGreeting: 'ننتظركم بكل محبة وشوق لتضيئوا ليلتنا',
    closingSubtext: 'دامت دياركم عامرة بالأفراح والمسرات والبهجة الدائمة.',
  },
  photos: {
    // High-resolution curated editorial wedding photography
    hero: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85',
    coupleRevealGroom: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=85',
    coupleRevealBride: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      {
        id: 'photo-1',
        url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
        alt: 'لحظة رومانسية بين العروسين',
        caption: 'خطوة أولى نحو الأبدية',
        orientation: 'portrait',
      },
      {
        id: 'photo-2',
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85',
        alt: 'تفاصيل أنيقة لخاتمي الزفاف',
        caption: 'رمز المحبة والوفاء الصادق',
        orientation: 'landscape',
      },
      {
        id: 'photo-3',
        url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1400&q=85',
        alt: 'مسكة العروس من الزهور الطبيعية',
        caption: 'عبق الزهور يرافق فرحتنا',
        orientation: 'landscape',
      },
      {
        id: 'photo-4',
        url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=85',
        alt: 'نظرة حب بين العروسين',
        caption: 'قلبان التقيا على المودة والرحمة',
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
      description: 'موسيقى احتفالية وأوقات لا تُنسى بصحبتكم',
      icon: 'celebration',
    },
  ],
};
