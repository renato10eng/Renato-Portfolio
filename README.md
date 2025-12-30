# Renato Dev – Portfólio de Desenvolvimento de Software

Bem-vindo ao **Renato Dev**, um portfólio moderno e interativo que reúne projetos e soluções nas áreas de Desenvolvimento Front-End, Back-End e Full-Stack. Este projeto foi desenvolvido para apresentar de forma visual e acessível os trabalhos realizados, incluindo aplicações web, APIs, dashboards e muito mais. Ideal para profissionais, recrutadores e interessados em desenvolvimento de software.

## Sobre o Projeto

O Renato Dev é um site de portfólio single-page application (SPA) construído com tecnologias modernas para oferecer uma experiência fluida e responsiva. Ele inclui:

- **Exibição de Projetos**: Detalhes interativos sobre tecnologias, desafios enfrentados, soluções implementadas e resultados obtidos.
- **Análises Visuais**: Gráficos, mapas interativos e painéis informativos.
- **CV Integrado**: Download direto do currículo em PDF via o componente `CVDocument`.
- **Multilíngue**: Suporte a idiomas (português e inglês) usando contexto de tradução.
- **Design Responsivo**: Compatível com dispositivos móveis, tablets e desktops, seguindo princípios de acessibilidade (WCAG 2.1 AA).

Este portfólio serve como uma vitrine profissional, demonstrando habilidades em desenvolvimento web, arquitetura de software e análise de dados.

## Funcionalidades Principais

- **Seções do Portfólio**: Hero, Sobre, Serviços, Projetos em Destaque, Habilidades, Contato, etc.
- **Mapa Interativo**: Visualize dados sobre modais de transporte no Brasil (projeto legado).
- **Projetos de Software**: Detalhes sobre aplicações web, APIs e sistemas distribuídos.
- **Tema Dinâmico**: Alternância entre modo claro e escuro.
- **Navegação Intuitiva**: Menu responsivo com links para seções e projetos.
- **Formulário de Contato**: Integração para envio de mensagens (configurável).

## Tecnologias Utilizadas

- **React 18**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Tipagem estática para maior robustez e manutenção.
- **Vite**: Ferramenta de build rápida para desenvolvimento e produção.
- **Tailwind CSS**: Framework CSS utilitário para estilização moderna e responsiva.
- **ESLint**: Linting para manter a qualidade e consistência do código.
- **React Router**: Navegação entre páginas e seções.
- **Context API**: Gerenciamento de estado para idioma e tema.
- **Outros**: Componentes UI com shadcn/ui, ícones com Lucide React, etc.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior): [Download aqui](https://nodejs.org/).
- **Git**: Para controle de versão e clonagem do repositório.
- **Navegador Moderno**: Chrome, Firefox ou Edge para visualização.

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/renato10eng/Renato-Portfolio-.git
   cd Renato-portfolio
   ```

2. **Instale as Dependências**:
   ```bash
   npm install
   # ou
   npm ci  # Para instalação limpa baseada no package-lock.json
   ```

3. **Execute o Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   - O site será aberto em `http://localhost:5173` (porta padrão do Vite).
   - Qualquer alteração no código será refletida automaticamente (hot reload).

4. **Build para Produção**:
   ```bash
   npm run build
   ```
   - Os arquivos otimizados serão gerados na pasta `dist/`.

5. **Preview do Build**:
   ```bash
   npm run preview
   ```
   - Visualize o build localmente antes do deploy.

## Atualização e Manutenção

Para manter o projeto atualizado e sincronizado, use estes comandos:

### Clonagem Inicial (para Novos Usuários)
Se você ainda não tem o projeto localmente:
```bash
git clone https://github.com/renato10eng/Renato-Portfolio-.git
cd Renato-portfolio
npm ci  # Instala dependências
```

### Atualizar Dependências
Se o `package.json` foi alterado:
```bash
npm install  # ou npm ci para versão exata
```

### Sincronizar com o Repositório Remoto (Pull)
Para baixar as últimas mudanças do GitHub:
```bash
git pull origin master  # Atualiza a branch master
# Se estiver em outra branch: git pull origin <nome-da-branch>
```

### Fazer Push de Mudanças
Após fazer alterações e commits:
```bash
git add .  # Adiciona todos os arquivos modificados
git commit -m "Descrição das mudanças"
git push origin master  # Envia para a branch master
# Para uma nova branch: git push -u origin nova-branch
```

### Outros Comandos Úteis
- **Verificar Status**: `git status`
- **Ver Branches**: `git branch -a`
- **Trocar de Branch**: `git checkout <nome-da-branch>`
- **Mesclar Branches**: `git merge <branch-a-mesclar>`
- **Resolver Conflitos**: Edite os arquivos conflitantes, depois `git add` e `git commit`.
- **Resetar Mudanças Locais**: `git reset --hard` (cuidado, perde mudanças não commitadas).

## Como Funciona a Esteira de Deploy (GitHub Actions)

Este projeto usa **GitHub Actions** para automatizar o deploy do site no GitHub Pages. A "esteira" é um workflow que roda automaticamente sempre que você faz push ou abre um Pull Request para a branch `main`. Ela evita que você tenha que fazer o build e deploy manualmente.

### Quando a Esteira É Acionada?
- **Apenas em eventos na branch `main`:**
  - Push direto para `main` (ex.: `git push origin main`).
  - Pull Request (PR) para `main` (para testar builds antes do merge).
- **Não roda em outras branches!** Se você trabalha em `feature/desenvolvimento`, push para ela não aciona a esteira – perfeito para desenvolvimento sem afetar o site.

### O Que a Esteira Faz? (Passo a Passo Simplificado)
1. **Checkout**: Baixa o código da branch `main`.
2. **Setup Node.js**: Instala Node.js (versão 18) e configura cache.
3. **Instalar Dependências**: Roda `npm ci` para instalar pacotes.
4. **Build**: Executa `npm run build` para gerar a pasta `dist` com arquivos otimizados.
5. **Deploy**: Publica a `dist` na branch `gh-pages` usando um token seguro (PAT).

- **Duração**: 1-3 minutos.
- **Resultado**: O site é atualizado automaticamente em https://renato10eng.github.io/Renato-Portfolio-.

### Cenários Comuns
- **Trabalhando em uma Branch**: Push para `feature/xyz` → Código vai para GitHub, mas esteira não roda (site não muda).
- **Testar sem Merge**: Abra um PR para `main` → Esteira roda como teste.
- **Deploy Final**: Merge o PR em `main` → Esteira roda e atualiza o site.
- **Subir Código sem Deploy**: Push para qualquer branch não-`main`.

### Como Monitorar
- Vá para https://github.com/renato10eng/Renato-Portfolio-/actions.
- Veja logs de runs passados. Clique em "Re-run jobs" se precisar repetir.

Essa automação garante que o site esteja sempre atualizado após mudanças em produção!

## Como Contribuir

Contribuições são bem-vindas! Se você quiser adicionar funcionalidades, corrigir bugs ou melhorar a documentação, siga estes passos:

1. **Fork o Repositório**: Clique em "Fork" no GitHub.

2. **Crie uma Branch para sua Feature**:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```

3. **Faça suas Alterações**: Edite os arquivos conforme necessário. Certifique-se de seguir os padrões de código (ESLint).

4. **Teste suas Mudanças**: Rode `npm run dev` e verifique se tudo funciona.

5. **Commit e Push**:
   ```bash
   git add .
   git commit -m "Descrição clara da mudança"
   git push origin feature/nova-funcionalidade
   ```

6. **Abra um Pull Request**: No GitHub, crie um PR descrevendo suas alterações. Aguarde revisão.

### Comandos Git Essenciais
- **Ver Status**: `git status`
- **Adicionar Arquivos**: `git add .` (todos) ou `git add arquivo-especifico`
- **Commit**: `git commit -m "Mensagem descritiva"`
- **Push para Branch Atual**: `git push origin <nome-da-branch>`
- **Pull (Atualizar do Remoto)**: `git pull origin main` (para a branch main)
- **Criar Branch**: `git checkout -b nova-branch`
- **Trocar de Branch**: `git checkout nome-da-branch`
- **Mesclar Branches**: `git merge nome-da-branch` (esteja na branch alvo)

## Deploy

O projeto está configurado para deploy no GitHub Pages. Para fazer o deploy:

1. **Build o Projeto**:
   ```bash
   npm run build
   ```

2. **Deploy para GitHub Pages**:
   ```bash
   npm run deploy
   ```
   - Isso usa o `gh-pages` para publicar na branch `gh-pages`.

Alternativamente, você pode usar plataformas como Vercel, Netlify ou Surge para deploy automático via integração com GitHub.

## Estrutura do Projeto

```
Renato-portfolio/
├── public/                 # Arquivos estáticos (imagens, robots.txt)
├── src/
│   ├── assets/             # Recursos (imagens, ícones)
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── ui/             # Componentes de UI (botões, cards, etc.)
│   │   └── ...             # Outros componentes (Hero, About, etc.)
│   ├── context/            # Contextos (LanguageContext)
│   ├── data/               # Dados estáticos (projetos, traduções)
│   ├── hooks/              # Hooks customizados
│   ├── lib/                # Utilitários (utils.ts)
│   ├── pages/              # Páginas principais
│   ├── styles/             # Estilos adicionais
│   └── types/              # Definições de tipos TypeScript
├── .github/                # Configurações do GitHub (agent-instructions)
├── package.json            # Dependências e scripts
├── tailwind.config.ts      # Configuração do Tailwind
├── vite.config.ts          # Configuração do Vite
└── README.md               # Este arquivo
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera os arquivos de produção.
- `npm run preview`: Preview do build local.
- `npm run deploy`: Publica no GitHub Pages.
- `npm run lint`: Executa o ESLint para verificação de código.

## Licença

Este projeto é licenciado sob a [MIT License](LICENSE). Sinta-se à vontade para usar, modificar e distribuir.

## Contato

Para dúvidas ou sugestões, entre em contato via o formulário no site ou pelo LinkedIn/GitHub.

---

Desenvolvido com ❤️ por Renato.

