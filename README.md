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
