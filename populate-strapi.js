const axios = require('axios');

// Configuração do Strapi
const STRAPI_URL = 'http://localhost:1337';
const STRAPI_API_TOKEN = '722bc66942b3655d5c2f09184cad7991e268feac1bab9e15fe88d462a85e4f41523d32cc746de3af3e0c7e1fd7a0874935c225008e671923fdd4e5bfacef550f5572dfade8dfede3bca7316759889baf3e457bf32e04068c16b38b86823c40ccd570c6cdbff3b8b187d1a062b7a5ec2e6d82ab10739512d54d23767887ed34a9'; // Você precisará definir isso depois de criar no Strapi

// Dados do portfólio
const translations = require('./src/data/translations.ts');
const projects = require('./src/data/projects.ts');

async function createContent() {
  try {
    console.log('🚀 Iniciando criação de conteúdo no Strapi...');

    // 1. Criar Hero
    console.log('📝 Criando conteúdo Hero...');
    await axios.post(`${STRAPI_URL}/api/heroes`, {
      data: {
        title: translations.translations.pt.portfolio_title,
        subtitle: translations.translations.pt.production_engineer,
        description: translations.translations.pt.transform_challenges,
        cta_primary_text: translations.translations.pt.explore_projects,
        cta_secondary_text: translations.translations.pt.contact_me,
        publishedAt: new Date()
      }
    }, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // 2. Criar About
    console.log('👤 Criando conteúdo About...');
    await axios.post(`${STRAPI_URL}/api/abouts`, {
      data: {
        title: translations.translations.pt.about_title,
        subtitle: translations.translations.pt.about_subtitle,
        description: translations.translations.pt.about_description,
        experience_years: 6,
        experience_description: translations.translations.pt.experience_description,
        certifications: translations.translations.pt.certifications_list,
        education: translations.translations.pt.education_details,
        projects_count: translations.translations.pt.projects_count,
        clients: translations.translations.pt.clients_type,
        publishedAt: new Date()
      }
    }, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // 3. Criar Services
    console.log('🛠️ Criando serviços...');
    const services = [
      {
        title: translations.translations.pt.process_optimization,
        description: translations.translations.pt.process_optimization_desc,
        icon: 'optimization'
      },
      {
        title: translations.translations.pt.supply_chain_management_service,
        description: translations.translations.pt.scm_service_desc,
        icon: 'supply-chain'
      },
      {
        title: translations.translations.pt.data_analysis,
        description: translations.translations.pt.data_analysis_desc,
        icon: 'data-analysis'
      },
      {
        title: translations.translations.pt.production_planning,
        description: translations.translations.pt.production_planning_desc,
        icon: 'planning'
      },
      {
        title: translations.translations.pt.quality_management,
        description: translations.translations.pt.quality_management_desc,
        icon: 'quality'
      },
      {
        title: translations.translations.pt.indicators_modeling,
        description: translations.translations.pt.indicators_desc,
        icon: 'indicators'
      }
    ];

    for (const service of services) {
      await axios.post(`${STRAPI_URL}/api/services`, {
        data: {
          title: service.title,
          description: service.description,
          icon: service.icon,
          publishedAt: new Date()
        }
      }, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    }

    // 4. Criar Stats
    console.log('📊 Criando estatísticas...');
    await axios.post(`${STRAPI_URL}/api/stats`, {
      data: {
        years_experience: 6,
        projects_completed: 30,
        satisfied_clients: 15,
        success_rate: 98,
        publishedAt: new Date()
      }
    }, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    // 5. Criar Technologies
    console.log('💻 Criando tecnologias...');
    const technologies = [
      { name: 'React', category: 'frontend' },
      { name: 'TypeScript', category: 'frontend' },
      { name: 'Next.js', category: 'frontend' },
      { name: 'Node.js', category: 'backend' },
      { name: 'Express', category: 'backend' },
      { name: 'PostgreSQL', category: 'database' },
      { name: 'MongoDB', category: 'database' },
      { name: 'AWS', category: 'cloud' },
      { name: 'Docker', category: 'devops' },
      { name: 'Git', category: 'tools' }
    ];

    for (const tech of technologies) {
      await axios.post(`${STRAPI_URL}/api/technologies`, {
        data: {
          name: tech.name,
          category: tech.category,
          publishedAt: new Date()
        }
      }, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    }

    // 6. Criar Projects
    console.log('📁 Criando projetos...');
    for (const project of projects.projects) {
      await axios.post(`${STRAPI_URL}/api/projects`, {
        data: {
          title: project.title,
          title_en: project.titleEn,
          description: project.description,
          description_en: project.descriptionEn,
          image_url: project.image,
          tags: project.tags,
          tags_en: project.tagsEn,
          external_url: project.externalUrl,
          category: project.category,
          date: project.date,
          date_en: project.dateEn,
          publishedAt: new Date()
        }
      }, {
        headers: {
          'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json'
        }
      });
    }

    // 7. Criar Contact
    console.log('📞 Criando informações de contato...');
    await axios.post(`${STRAPI_URL}/api/contacts`, {
      data: {
        title: translations.translations.pt.contact_info,
        subtitle: translations.translations.pt.contact_availability,
        location: translations.translations.pt.location_details,
        email: translations.translations.pt.email_address,
        phone: translations.translations.pt.phone_number,
        whatsapp: translations.translations.pt.phone_number,
        publishedAt: new Date()
      }
    }, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('✅ Todos os conteúdos foram criados com sucesso!');
    console.log('🔑 IMPORTANTE: Você precisa configurar o API Token no Strapi Admin > Settings > API Tokens');

  } catch (error) {
    console.error('❌ Erro ao criar conteúdo:', error.response?.data || error.message);
  }
}

createContent();