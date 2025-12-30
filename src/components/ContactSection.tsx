
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
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 mt-6">
          <div className="space-y-8">
            <h3 className="text-2xl font-semibold font-heading">{t('contact_info')}</h3>
            <p className="text-muted-foreground">
              {t('contact_availability')}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 dark:bg-primary-500/20 p-3 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('location')}</h4>
                  <p className="text-muted-foreground">{t('location_details')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 dark:bg-primary-500/20 p-3 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('email')}</h4>
                  <p className="text-muted-foreground">{t('email_address')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 dark:bg-primary-500/20 p-3 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('phone')}</h4>
                  <p className="text-muted-foreground">{t('phone_number')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 dark:bg-primary-500/20 p-3 rounded-full">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium">{t('whatsapp')}</h4>
                  <p className="text-muted-foreground">{t('phone_number')}</p>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                  <Linkedin className="h-5 w-5 text-primary" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                  <Github className="h-5 w-5 text-primary" />
                </a>
                <a href="/" target="_blank" rel="noopener noreferrer" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                  <Globe className="h-5 w-5 text-primary" />
                </a>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors">
                  <Smartphone className="h-5 w-5 text-primary" />
                </a>
              </div>
            </div>
            
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d467692.0488551516!2d-46.92498673541676!3d-23.681531449428935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce448183a461d1%3A0x9ba94b08ff335bae!2zU8OjbyBQYXVsbywgU1A!5e0!3m2!1spt-BR!2sbr!4v1649260974285!5m2!1spt-BR!2sbr"
              className="w-full h-64 rounded-lg border border-border shadow-md"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              title={t('location')}
            ></iframe>
          </div>
          
          <div className="bg-white dark:bg-card p-8 rounded-lg shadow-sm border border-border">
            <h3 className="text-2xl font-semibold font-heading mb-6">{t('send_message')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  {t('full_name')}
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t('your_name')}
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="rounded-md"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="email" className="block text-sm font-medium">
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
                  className="rounded-md"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="subject" className="block text-sm font-medium">
                  {t('subject')}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t('message_subject')}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="rounded-md"
                />
              </div>
              
              <div className="space-y-4">
                <label htmlFor="message" className="block text-sm font-medium">
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
                  className="rounded-md"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-500 transition-colors rounded-md"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" /> 
                {isSubmitting ? t('sending') : t('send_message_button')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
