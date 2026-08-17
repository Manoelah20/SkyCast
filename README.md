# Skycast - Aplicativo de Previsão do Tempo

Aplicativo de previsão do tempo em tempo real com dados meteorológicos detalhados e previsão para os próximos 5 dias.

## Funcionalidades

- Previsão do tempo atual com dados detalhados
- Previsão para os próximos 5 dias
- Geolocalização automática
- Busca por cidade
- Cidades favoritas com salvamento automático
- Interface responsiva e moderna
- Dados em português

## Tecnologias Utilizadas

### Frontend Framework
- **React 18.2.0** - Biblioteca JavaScript para construção de interfaces de usuário
- **React DOM 18.2.0** - Renderização do React no DOM

### Bibliotecas
- **Axios 1.11.0** - Cliente HTTP para requisições à API
- **React Icons 4.7.1** - Biblioteca de ícones para React

### Ferramentas de Desenvolvimento
- **React Scripts 5.0.1** - Configuração do Create React App
- **ESLint** - Ferramenta de linting para código JavaScript
- **TypeScript ESLint** - Análise estática de código

### APIs Externas
- **OpenWeatherMap API** - Dados meteorológicos

### Armazenamento
- **localStorage** - Salvamento de favoritas e última cidade pesquisada

### Estilização
- **CSS puro** - Estilização sem frameworks

## Por que estas tecnologias?

**React 18** é uma das bibliotecas mais modernas e populares para desenvolvimento web, com:
- Hooks modernos para gerenciamento de estado
- Performance otimizada com Concurrent Mode
- Grande comunidade e suporte
- Componentização eficiente

**Axios** é a escolha padrão para requisições HTTP em projetos React devido a:
- Suporte a Promises
- Interceptadores de requisição/resposta
- Cancelamento de requisições
- Melhor tratamento de erros que fetch nativo

**CSS puro** foi escolhido por:
- Performance superior sem overhead de frameworks
- Simplicidade para este projeto
- Curva de aprendizado menor
- Menor bundle size

## Tecnologias Alternativas Modernas

Para projetos maiores ou mais complexos, considere:

- **Next.js** - Framework React com SSR e otimizações
- **TypeScript** - Tipagem estática para maior segurança
- **Tailwind CSS** - Framework CSS utilitário
- **React Query** - Gerenciamento de cache e estado de servidor
- **Zustand** - Gerenciamento de estado global

## Instalação

```bash
npm install
```

## Como Executar

```bash
npm start
```

O app estará disponível em http://localhost:3000

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```
REACT_APP_WEATHER_API_KEY=sua_chave_aqui
```

Obtenha sua chave gratuita em https://openweathermap.org/api

## Autor

Feito por Manoelah em 2025 - Todos os direitos reservados

## Fonte de Dados

Dados meteorológicos fornecidos por OpenWeatherMap

## Como Fazer Upload para GitHub

### Passo 1: Criar Repositório no GitHub
1. Acesse https://github.com
2. Clique em "+" no canto superior direito
3. Selecione "New repository"
4. Nomeie o repositório (ex: skycast-app)
5. Torne público ou privado conforme preferência
6. Clique em "Create repository"

### Passo 2: Conectar Repositório Local ao GitHub
Execute os seguintes comandos no terminal:

```bash
git remote add origin https://github.com/SEU_USUARIO/skycast-app.git
git branch -M main
git push -u origin main
```

Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.

### Passo 3: Atualizar Código
Para fazer alterações e atualizar no GitHub:

```bash
git add .
git commit -m "Sua mensagem de commit"
git push
```

## Como Deploy no Vercel

### Opção 1: Deploy via GitHub (Recomendado)
1. Acesse https://vercel.com
2. Faça login com sua conta GitHub
3. Clique em "Add New Project"
4. Selecione o repositório skycast-app do GitHub
5. Configure as variáveis de ambiente:
   - Nome: `REACT_APP_WEATHER_API_KEY`
   - Valor: sua chave da OpenWeatherMap
6. Clique em "Deploy"
7. Aguarde o deploy completar

### Opção 2: Deploy via Vercel CLI
Instale o Vercel CLI:

```bash
npm install -g vercel
```

Execute na pasta do projeto:

```bash
vercel
```

Siga as instruções no terminal. Quando perguntado sobre variáveis de ambiente, adicione:
- `REACT_APP_WEATHER_API_KEY` = sua chave da OpenWeatherMap

### Atualizar Deploy no Vercel
Após fazer alterações e commitar no GitHub, o Vercel fará deploy automático. Se usar CLI:

```bash
vercel --prod
```

### URL do App
Após o deploy, o Vercel fornecerá uma URL como:
- `https://skycast-app.vercel.app`

Você pode personalizar o domínio nas configurações do projeto Vercel.
