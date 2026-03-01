# 🚀 Scripts para Popular Strapi com Dados do Portfólio

Estes scripts automatizam a criação de todo o conteúdo do seu portfólio no Strapi CMS, evitando que você tenha que copiar e colar manualmente cada texto.

## 📋 Pré-requisitos

1. **Strapi deve estar rodando**: Execute `npm run develop` na pasta `strapi-portfolio-cms`
2. **Acesse o painel admin**: Vá para http://localhost:1337/admin
3. **Crie uma conta admin** (na primeira vez)
4. **Configure API Token**:
   - Vá em Settings > API Tokens
   - Clique em "Create new API Token"
   - Nome: "Portfolio Population"
   - Token type: "Full access"
   - Salve e copie o token gerado

## 🔧 Como Usar

### Passo 1: Configure o Token
Edite os arquivos `.ps1` e adicione seu token na variável `$API_TOKEN`:

```powershell
$API_TOKEN = "seu_token_aqui"  # Cole o token gerado no Strapi
```

### Passo 2: Execute os Scripts

#### Opção A: Executar todos os scripts (Recomendado)
```powershell
# Execute na pasta do portfólio
.\populate-strapi.ps1
.\populate-projects.ps1
```

#### Opção B: Executar individualmente
```powershell
# Conteúdo básico (Hero, About, Services, Stats, Technologies, Contact)
.\populate-strapi.ps1

# Projetos (arquivo separado por ser muitos)
.\populate-projects.ps1
```

## 📁 O que Cada Script Cria

### `populate-strapi.ps1`
- ✅ **Hero**: Título, subtítulo e descrição da página inicial
- ✅ **About**: Informações pessoais e experiência profissional
- ✅ **Services**: 6 serviços oferecidos (otimização, supply chain, etc.)
- ✅ **Stats**: Estatísticas (6 anos exp., 30 projetos, etc.)
- ✅ **Technologies**: 10 tecnologias (React, Node.js, AWS, etc.)
- ✅ **Contact**: Informações de contato completas

### `populate-projects.ps1`
- ✅ **Projects**: Todos os 10 projetos do portfólio com:
  - Títulos e descrições em PT/EN
  - Tags e categorias
  - URLs externas
  - Datas de criação

## 🎯 Resultado Final

Após executar os scripts, seu Strapi terá **conteúdo completo** baseado no seu portfólio atual. Você pode:

1. **Editar no painel**: Modificar qualquer texto diretamente no Strapi Admin
2. **Adicionar imagens**: Upload de imagens para projetos e outros conteúdos
3. **Testar integração**: Seu portfólio React agora carrega dados do CMS
4. **Gerenciar conteúdo**: Atualizações futuras são feitas apenas no Strapi

## 🔄 Próximos Passos

1. Execute os scripts acima
2. Acesse http://localhost:1337/admin para ver o conteúdo
3. Teste seu portfólio React: `npm run dev`
4. Faça ajustes visuais e adicione imagens conforme necessário

## 🛠️ Troubleshooting

- **Erro 401**: Verifique se o API token está correto
- **Erro 404**: Certifique-se que o Strapi está rodando
- **Erro de CORS**: Normalmente não afeta scripts locais
- **Dados não aparecem**: Verifique se os content-types foram criados corretamente

## 📝 Notas Técnicas

- Os scripts usam PowerShell e Invoke-RestMethod
- Todo conteúdo é criado como "published" (visível)
- Mantém compatibilidade com i18n (PT/EN)
- Preserva estrutura de dados do portfólio original