import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const Blog = () => {
  // const { t } = useLanguage();

  const blogPosts = [
    {
      id: 1,
      title: "Arquitetura de Microserviços com Node.js",
      titleEn: "Microservices Architecture with Node.js",
      excerpt: "Explorando os benefícios e desafios da implementação de microserviços em aplicações Node.js, com exemplos práticos e melhores práticas.",
      excerptEn: "Exploring the benefits and challenges of implementing microservices in Node.js applications, with practical examples and best practices.",
      date: "15 Dez 2024",
      dateEn: "Dec 15, 2024",
      readTime: "8 min",
      tags: ["Node.js", "Microserviços", "Arquitetura"],
      tagsEn: ["Node.js", "Microservices", "Architecture"],
      category: "Backend"
    },
    {
      id: 2,
      title: "Otimização de Performance em React",
      titleEn: "React Performance Optimization",
      excerpt: "Técnicas avançadas para melhorar a performance de aplicações React, incluindo memoização, lazy loading e otimização de bundle.",
      excerptEn: "Advanced techniques to improve React application performance, including memoization, lazy loading and bundle optimization.",
      date: "10 Dez 2024",
      dateEn: "Dec 10, 2024",
      readTime: "6 min",
      tags: ["React", "Performance", "Otimização"],
      tagsEn: ["React", "Performance", "Optimization"],
      category: "Frontend"
    },
    {
      id: 3,
      title: "CI/CD com GitHub Actions",
      titleEn: "CI/CD with GitHub Actions",
      excerpt: "Implementando pipelines de CI/CD completos usando GitHub Actions para automação de testes, build e deploy.",
      excerptEn: "Implementing complete CI/CD pipelines using GitHub Actions for test automation, build and deployment.",
      date: "5 Dez 2024",
      dateEn: "Dec 5, 2024",
      readTime: "10 min",
      tags: ["DevOps", "CI/CD", "GitHub Actions"],
      tagsEn: ["DevOps", "CI/CD", "GitHub Actions"],
      category: "DevOps"
    }
  ];

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-black text-white py-20 pt-36 relative overflow-hidden">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4 text-center">Blog</h1>
          <p className="text-center text-xl max-w-2xl mx-auto text-white/80">
            Artigos sobre desenvolvimento de software, tecnologias e melhores práticas
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      Ler mais
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;