
import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import GlassCard from './components/GlassCard';
import SplashScene from './components/SplashScene';
import { Capacitor } from '@capacitor/core';
import { PushNotifications, PushNotificationSchema } from '@capacitor/push-notifications';
import { StatusBar, Style } from '@capacitor/status-bar';

const translations = {
  ar: {
    loading: 'OWL STORE...',
    storeName: 'بومة ستور',
    tagline: 'الخدمات الرقمية المتطورة',
    description: 'خيارك الأول للخدمات الرقمية والبرمجية. جودة، دقة، وسرعة في التنفيذ مع مراعاة أدق التفاصيل التقنية.',
    offersTitle: 'مركز العروض والتنبيهات ⚡',
    specialOffer: 'خصم 20% على خدمات الموشن جرافيك لفترة محدودة!',
    servicesTitle: 'خدماتنا: حيث تلتقي التكنولوجيا بالإبداع',
    more: 'المزيد',
    services: [
      { id: '1', title: 'الإعلانات (Ads)', value: 'لا نكتفي بالوصول إلى جمهورك، بل نصنع أثراً لا يُنسى. أطلق حملتك الآن ودع العالم يتحدث عنك بثقة.' },
      { id: '2', title: 'العملات الرقمية (Crypto Services)', value: 'بوابتك الآمنة لمستقبل المال. استثمر بذكاء مع حلول رقمية متطورة تضعك دائماً في صدارة السوق.' },
      { id: '3', title: 'موشن جرافيك (Motion Graphics)', value: 'نحول أفكارك الجامدة إلى قصص تنبض بالحياة. إبداع بصري يأسر القلوب ويحقق أهدافك في ثوانٍ.' },
      { id: '4', title: 'إنشاء التطبيقات (App Development)', value: 'فكرتك تستحق تطبيقاً يتنفس الابتكار. نبني لك تجربة مستخدم استثنائية تجمع بين سلاسة الأداء وفخامة التصميم.' },
      { id: '5', title: 'الترويج (Promotion)', value: 'نمو مشروعك ليس صدفة، بل خطة مدروسة. نحن نضع علامتك التجارية في المكان الصحيح أمام العين الصحيحة.' },
      { id: '6', title: 'التصميم (Design)', value: 'التصميم هو السفير الصامت لعلامتك. نمنحك هوية بصرية تعكس احترافيتك وتجعلك مميزاً وسط المنافسين.' },
      { id: '7', title: 'بيع وشراء الحسابات (Accounts Trading)', value: 'منصتك الموثوقة لتداول الأصول الرقمية. ضمان، سرعة، وشفافية تجعل من كل عملية تبادل خطوة ناجحة.' },
      { id: '8', title: 'عمل ويب لمشروعك (Web Development)', value: 'موقعك الإلكتروني هو مقرك الرقمي العالمي. نصمم لك واجهة زجاجية عصرية تعكس حجم طموحك وتجذب عملاءك.' },
      { id: '9', title: 'خدمات الرشق/الدعم (Social Support)', value: 'عزز تواجدك الرقمي واصنع هيبتك في السوشيال ميديا. قاعدة جماهيرية قوية تبدأ من هنا لدعم انتشارك السريع.' }
    ]
  },
  en: {
    loading: 'OWL STORE...',
    storeName: 'OWL STORE',
    tagline: 'ADVANCED DIGITAL SERVICES',
    description: 'Your premier destination for digital and software services. Quality, precision, and speed in execution.',
    offersTitle: 'Offers & Notifications Center ⚡',
    specialOffer: '20% OFF on Motion Graphics for a limited time!',
    servicesTitle: 'Our Services: Where Technology Meets Creativity',
    more: 'Discover More',
    services: [
      { id: '1', title: 'Ads', value: 'We don\'t just reach your audience; we create an unforgettable impact.' },
      { id: '2', title: 'Crypto Services', value: 'Your secure gateway to the future of money. Invest smartly.' },
      { id: '3', title: 'Motion Graphics', value: 'We turn your static ideas into stories pulsing with life.' },
      { id: '4', title: 'App Development', value: 'Your idea deserves an app that breathes innovation.' },
      { id: '5', title: 'Promotion', value: 'The growth of your project is a deliberate plan.' },
      { id: '6', title: 'Design', value: 'Design is the silent ambassador of your brand.' },
      { id: '7', title: 'Accounts Trading', value: 'Your reliable platform for trading digital assets.' },
      { id: '8', title: 'Web Development', value: 'Your website is your global digital headquarters.' },
      { id: '9', title: 'Social Support', value: 'Boost your digital presence and build your prestige.' }
    ]
  }
};

const serviceIcons = [
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.017.511.025.77.025h3a.75.75 0 00.75-.75V8.25a.75.75 0 00-.75-.75h-3c-.259 0-.517.008-.77.025m0 9.18a44.603 44.603 0 01-3.061 3.51c-.501.486-1.33.144-1.33-.547V8.25c0-.691.83-1.033 1.33-.547a44.632 44.632 0 013.061 3.51m7.5 7.5v-1.5m0-10.5v1.5M21 12h-1.5" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125V6.375c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v12a1.125 1.125 0 01-1.125 1.125m-17.25 0h17.25m-17.25 0h17.25M6.75 7.5v2.25m10.5-2.25v2.25m-10.5 4.5v2.25m10.5-2.25v2.25" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.01 1.912a15.998 15.998 0 013.388-1.62m1.246-3.704a11.249 11.249 0 00-3.614-2.155m1.584 1.432c-.006.007-.012.013-.018.02a15.994 15.994 0 00-1.566 1.412m9.239-9.239a1.5 1.5 0 112.121 2.121L12.75 20.512l-7.319 1.127 1.127-7.319 9.17-9.17z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0112 2.714z" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" /></svg>'
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  
  // State for dynamic offers (Notifications Tray)
  const [activeOffer, setActiveOffer] = useState("");
  const [isNewNotification, setIsNewNotification] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    // Initial default offer
    if (!activeOffer) {
      setActiveOffer(t.specialOffer);
    }
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: theme === 'dark' ? Style.Dark : Style.Light });
    }
  }, [theme]);

  // Handle Android 13+ Push Notifications & Live Update for "Offers"
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    
    const initNotifications = async () => {
      try {
        let permStatus = await PushNotifications.checkPermissions();
        if (permStatus.receive === 'prompt') {
          permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive === 'granted') {
          await PushNotifications.register();
          
          // Listener for received notifications while app is in foreground
          PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
            console.log('Push received: ', notification);
            if (notification.body) {
              setActiveOffer(notification.body);
              setIsNewNotification(true);
              // Clear the "new" highlight after some time
              setTimeout(() => setIsNewNotification(false), 5000);
            }
          });

          // Listener for when user clicks a notification
          PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
            if (notification.notification.body) {
              setActiveOffer(notification.notification.body);
              setShowDashboard(true);
            }
          });
        }
      } catch (err) {
        console.warn("Notification init failed:", err);
      }
    };

    initNotifications();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="min-h-screen bg-black" />;
  if (!showDashboard) return <SplashScene onComplete={() => setShowDashboard(true)} />;

  return (
    <div className={`min-h-screen transition-colors duration-500 animate-fade-in ${theme === 'dark' ? 'bg-black' : 'bg-slate-50'}`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Background isDark={theme === 'dark'} />
      <div className="w-full flex justify-center px-4 pt-[calc(env(safe-area-inset-top)+1.5rem)] lg:p-12 pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <div className="w-full max-w-md flex flex-col gap-10">
          
          <div className={`flex items-center gap-3 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
            <a href="https://www.instagram.com/boma.stoore" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl flex items-center justify-center matte-card text-yellow-500 active:scale-90 transition-transform">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-10 h-10 rounded-xl flex items-center justify-center matte-card text-yellow-500 active:scale-90 transition-transform">
              {theme === 'dark' ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>}
            </button>
            <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="px-5 h-10 rounded-xl matte-card text-yellow-500 font-black text-[10px] tracking-widest">{lang === 'ar' ? 'EN' : 'AR'}</button>
          </div>

          <header className="relative w-full p-8 rounded-[2.5rem] matte-card shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-3xl bg-black border border-yellow-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.15)] group overflow-hidden">
                  <svg className="w-11 h-11 text-yellow-500 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 15L15 45V75C15 86.0457 23.9543 95 35 95H65C76.0457 95 85 86.0457 85 75V45L50 15Z" fill="rgba(250, 204, 21, 0.05)" />
                    <path d="M15 45L50 15L85 45" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="35" cy="55" r="10" stroke="currentColor" strokeWidth="5"/><circle cx="65" cy="55" r="10" stroke="currentColor" strokeWidth="5"/>
                    <path d="M50 65L42 75H58L50 65Z" fill="currentColor"/><path d="M20 95H80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.2"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-black tracking-tight text-[var(--text-main)]">{t.storeName}</h1>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-500">{t.tagline}</p>
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[var(--text-dim)] font-medium opacity-80 mb-8 max-w-[90%]">{t.description}</p>
            
            {/* Dynamic Offers Center (The Notification Screen) */}
            <div className={`mt-4 p-5 rounded-[1.5rem] bg-gradient-to-br from-yellow-500/10 to-transparent border transition-all duration-700 ${isNewNotification ? 'border-yellow-500 shadow-[0_0_20px_rgba(250,204,21,0.2)]' : 'border-yellow-500/20'}`}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 block">{t.offersTitle}</span>
                {isNewNotification && <span className="w-2 h-2 bg-yellow-500 rounded-full animate-ping" />}
              </div>
              <p className={`text-sm font-bold text-[var(--text-main)] ${!isNewNotification ? 'opacity-90' : 'animate-pulse'}`}>
                {activeOffer || t.specialOffer}
              </p>
            </div>
          </header>

          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="mb-8 px-2">
              <h3 className="text-xl font-black text-[var(--text-main)] leading-relaxed mb-1">{t.servicesTitle}</h3>
              <div className="w-12 h-1 bg-yellow-500 rounded-full opacity-30" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {t.services.map((item, index) => (
                <GlassCard key={item.id} isDark={theme === 'dark'} data={{ ...item, icon: serviceIcons[index % serviceIcons.length], color: '#facc15' }} />
              ))}
            </div>
          </div>
          <div className="w-16 h-1 bg-yellow-500 rounded-full mx-auto opacity-20 mt-4 mb-8" />
        </div>
      </div>
    </div>
  );
};

export default App;
