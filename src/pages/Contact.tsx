
import { Layout } from "@/components/Layout";
import { ContactSection } from "@/components/ContactSection";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary-600 to-primary-900 text-white py-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-[10%] w-32 h-32 rounded-full bg-white/10"></div>
          <div className="absolute bottom-10 right-[10%] w-48 h-48 rounded-full bg-white/5"></div>
          <div className="absolute inset-0 bg-grid-white/[0.03] bg-[length:20px_20px]"></div>
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-5">{t('contact_page_title')}</h1>
            <p className="text-xl text-white/90">
              {t('contact_page_subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      <ContactSection />
    </Layout>
  );
};

export default Contact;
