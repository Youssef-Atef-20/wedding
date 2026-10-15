import { useState, useEffect, useRef, type FC, type ReactNode } from 'react';
import { Mail, Users, BookOpen, Calendar, MapPin } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

export const FloatingNav: FC = () => {
  const [activeSection, setActiveSection] = useState('invitation-cover');
  const [isVisible, setIsVisible] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollYRef = useRef(0);

  const navItems: NavItem[] = [
    { id: 'invitation-cover', label: 'الغلاف', icon: <Mail className="w-4 h-4 shrink-0" /> },
    { id: 'couple-reveal', label: 'العروسان', icon: <Users className="w-4 h-4 shrink-0" /> },
    { id: 'quranic-verse', label: 'الآية الكريمة', icon: <BookOpen className="w-4 h-4 shrink-0" /> },
    { id: 'wedding-date', label: 'الموعد', icon: <Calendar className="w-4 h-4 shrink-0" /> },
    { id: 'wedding-details', label: 'المكان', icon: <MapPin className="w-4 h-4 shrink-0" /> },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Show floating nav after passing hero fold
          if (currentScrollY > 150) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }

          // Smart auto-minimize on scroll down, reappear on scroll up
          if (currentScrollY > lastScrollYRef.current + 8 && currentScrollY > 300) {
            setIsScrollingDown(true);
          } else if (currentScrollY < lastScrollYRef.current - 8) {
            setIsScrollingDown(false);
          }
          lastScrollYRef.current = currentScrollY;

          // Detect active section based on viewport intersection
          const sections = navItems.map((item) => document.getElementById(item.id));
          const scrollPosition = currentScrollY + window.innerHeight * 0.4;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(navItems[i].id);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsScrollingDown(false);
    }
  };

  if (!isVisible) return null;

  return (
    <nav
      aria-label="التنقل السريع بين أقسام الدعوة"
      className={`fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out ${
        isScrollingDown
          ? 'translate-y-20 opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 pointer-events-auto'
      }`}
      style={{
        bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-[#182018]/92 backdrop-blur-xl border border-[#B79A66]/40 shadow-2xl max-w-[calc(100vw-1.5rem)]">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              aria-label={item.label}
              title={item.label}
              className={`relative flex items-center justify-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-full text-xs font-sans-ar transition-all duration-200 cursor-pointer select-none min-h-[38px] ${
                isActive
                  ? 'bg-[#B79A66] text-[#1E251E] font-semibold shadow-md'
                  : 'text-[#E8D8BD]/85 hover:text-[#F8F4EC] hover:bg-[#2A3428]/50'
              }`}
            >
              <span className={isActive ? 'text-[#1E251E]' : 'text-[#B79A66]'}>{item.icon}</span>
              {/* Show label on tablet/desktop, and on active item on mobile if space allows */}
              <span className="hidden sm:inline whitespace-nowrap">{item.label}</span>
              {isActive && <span className="inline sm:hidden text-[10px] whitespace-nowrap">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
