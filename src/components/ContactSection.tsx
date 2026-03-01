
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, Linkedin, Github, Globe, Smartphone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export function ContactSection() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulação de envio de formulário
    setTimeout(() => {
      toast({
        title: t('message_sent'),
        description: t('contact_soon'),
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] -z-10" />

      <div className="container-padding max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mt-6">
          <div className="space-y-10">
            <div>
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold tracking-wide mb-4 inline-block">
                {t('contact')}
              </span>
              <h3 className="text-4xl font-bold font-heading mb-4 text-foreground">{t('contact_info')}</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('contact_availability')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-xl text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t('location')}</h4>
                  <p className="text-muted-foreground leading-relaxed">{t('location_details')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-xl text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t('email')}</h4>
                  <p className="text-muted-foreground">{t('email_address')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-xl text-primary">
                  <Smartphone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{t('whatsapp')}</h4>
                  <p className="text-muted-foreground">{t('phone_number')}</p>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                {[
                  { icon: Linkedin, href: "https://linkedin.com" },
                  { icon: Github, href: "https://github.com" },
                  { icon: Globe, href: "/" },
                  { icon: Smartphone, href: "https://wa.me/" },
                ].map((item, idx) => (
                  <a key={idx} href={item.href} target="_blank" rel="noopener noreferrer" className="bg-surface border border-border p-3.5 rounded-full hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm">
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0488551516!2d-46.92498673541676!3d-23.681531449428935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1649260974285!5m2!1spt-BR!2sbr"
              className="w-full h-64 rounded-2xl border border-border shadow-md opacity-90 hover:opacity-100 transition-opacity"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title={t('location')}
            ></iframe>
          </div>

          <div className="glass-card p-8 md:p-10 h-fit sticky top-24">
            <h3 className="text-2xl font-bold font-heading mb-6 text-foreground">{t('send_message')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold ml-1">
                  {t('full_name')}
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t('your_name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-xl bg-background/50 border-primary/20 focus-visible:ring-primary h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold ml-1">
                  {t('email')}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t('your_email')}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-xl bg-background/50 border-primary/20 focus-visible:ring-primary h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold ml-1">
                  {t('subject')}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t('message_subject')}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="rounded-xl bg-background/50 border-primary/20 focus-visible:ring-primary h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold ml-1">
                  {t('message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t('message_placeholder')}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="rounded-xl bg-background/50 border-primary/20 focus-visible:ring-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 rounded-full text-base font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? t('sending') : t('send_message_button')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
