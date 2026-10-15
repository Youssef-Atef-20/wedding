import { useState, useEffect, type FC, type ReactNode } from 'react';
import { Mail, Users, Image as ImageIcon, Calendar, MapPin, CheckCircle } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export const FloatingNav: FC = () => {
  const [activeSection, setActiveSection] = useState('invitation-cover');
  const [isVisible, setIsVisible] = useState(false);

  const navItems: NavItem[] = [
    { id: 'invitation-cover', label: 'الغلاف', icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 'couple-reveal', label: 'العروسان', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'cinematic-gallery', label: 'الصور', icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'wedding-date', label: 'الموعد', icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'wedding-details', label: 'التفاصيل', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'rsvp-section', label: 'تأكيد الحضور', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Show floating nav after scrolling down 200px
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Check current section
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <nav
      aria-label="التنقل السريع بين أقسام الدعوة"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[94vw] transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-[#1E251E]/85 backdrop-blur-2xl border border-[#B79A66]/35 shadow-2xl">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              aria-label={item.label}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full text-xs font-sans-ar transition-all duration-300 cursor-pointer select-none ${
                isActive
                  ? 'bg-[#B79A66] text-[#1E251E] font-semibold shadow-md'
                  : 'text-[#E8D8BD]/80 hover:text-[#F8F4EC] hover:bg-[#2A3428]/60'
              }`}
            >
              <span className={isActive ? 'text-[#1E251E]' : 'text-[#B79A66]'}>{item.icon}</span>
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
