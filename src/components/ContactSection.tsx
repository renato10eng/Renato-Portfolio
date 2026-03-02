import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, Linkedin, Github, Globe, Smartphone, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
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

    setTimeout(() => {
      toast({
        title: t('message_sent'),
        description: t('contact_soon'),
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactMethods = [
    {
      icon: MapPin,
      title: t('location'),
      value: t('location_details'),
      color: 'primary'
    },
    {
      icon: Mail,
      title: t('email'),
      value: t('email_address'),
      color: 'secondary'
    },
    {
      icon: Smartphone,
      title: t('whatsapp'),
      value: t('phone_number'),
      color: 'accent'
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Globe, href: "/", label: "Portfolio" },
    { icon: MessageSquare, href: "https://wa.me/", label: "WhatsApp" },
  ];

  return (
    <section className="py-32 lg:py-40 relative overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[150px] opacity-30 -z-10 animate-float animation-delay-300" />
      <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] opacity-20 -z-10 animate-float animation-delay-500" />

      <div className="container-padding max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/5 border border-primary/30 dark:border-primary/20 text-primary text-xs font-bold tracking-widest uppercase w-fit mx-auto">
            <Sparkles className="h-3.5 w-3.5" />
            {t('contact')}
          </div>
          <h2 className="text-6xl sm:text-7xl lg:text-8xl font-heading font-black text-foreground leading-tight">
            {t('contact_info')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            {t('contact_availability')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-12 animate-slide-up">
            {/* Contact Methods */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => {
                const colorClasses = {
                  primary: 'bg-primary/10 text-primary',
                  secondary: 'bg-secondary/10 text-secondary',
                  accent: 'bg-accent/10 text-accent',
                };
                return (
                  <div key={index} className="group flex gap-5 p-6 rounded-xl glass-card border border-white/10 dark:border-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
                    <div className={`w-12 h-12 rounded-lg ${colorClasses[method.color as keyof typeof colorClasses]} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-foreground">{method.title}</h4>
                      <p className="text-muted-foreground mt-1">{method.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div>
              <h5 className="font-bold mb-4 text-foreground">Conecte-se comigo:</h5>
              <div className="flex gap-3 flex-wrap">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    className="group w-12 h-12 bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary hover:from-primary/10 hover:to-primary/5 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-lg hover:shadow-primary/20"
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="hidden lg:block rounded-2xl overflow-hidden border border-border/50 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0488551516!2d-46.92498673541676!3d-23.681531449428935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1649260974285!5m2!1spt-BR!2sbr"
                className="w-full h-64 opacity-90 hover:opacity-100 transition-opacity"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                title={t('location')}
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card border border-white/10 dark:border-white/5 p-8 md:p-10 h-fit sticky top-24 animate-slide-up animation-delay-200">
            <h3 className="text-3xl font-head bold font-heading mb-2 text-foreground">{t('send_message')}</h3>
            <p className="text-muted-foreground mb-8 font-light">Preencha o formulário e entrarei em contato em breve</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-foreground ml-1">
                  {t('full_name')}
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t('your_name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-lg bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:border-primary h-11 px-4 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-foreground ml-1">
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
                  className="rounded-lg bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:border-primary h-11 px-4 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-semibold text-foreground ml-1">
                  {t('subject')}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t('message_subject')}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="rounded-lg bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:border-primary h-11 px-4 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-foreground ml-1">
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
                  className="rounded-lg bg-background/50 border-border/50 focus-visible:ring-primary focus-visible:border-primary resize-none px-4 py-3 font-medium"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-lg text-base font-bold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-[1.02]"
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
