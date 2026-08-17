# ⛅ Skycast — Dashboard de Previsão do Tempo

Aplicação web responsiva de previsão do tempo construída com **React + TypeScript + Vite**. Consome a **OpenWeatherMap API** para exibir o clima atual, previsão para os próximos dias, alertas meteorológicos e busca por cidade, com suporte a geolocalização, favoritos, estados de carregamento/erro e acessibilidade.

## Índice

- [Problema](#problema)
- [Solução](#solução)
- [Funcionalidades](#funcionalidades)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Decisões técnicas](#decisões-técnicas)
- [Instalação](#instalação)
- [Scripts](#scripts)
- [Testes](#testes)

## Problema

Consultar a previsão do tempo em aplicações genéricas costuma exigir navegação, excesso de dados irrelevantes ou interfaces pouco acessíveis. O objetivo era entregar um **dashboard simples e direto**, focado em leitura rápida, acessível e responsivo, mostrando apenas o essencial: clima atual, próximos dias e alertas.

## Solução

Um dashboard que:

1. Detecta automaticamente a localização do usuário via `navigator.geolocation`;
2. Busca clima por **cidade** (com fallback para São Paulo se a geolocalização falhar ou for negada);
3. Exibe **clima atual**, **previsão de 5 dias** e **alertas meteorológicos**;
4. Permite **salvar cidades favoritas** (persistidas em `localStorage`);
5. Trata **loading**, **erros** e **cidade não encontrada** com feedback claro;
6. Oferece **atualização manual** dos dados com indicador de "última atualização";
7. É **responsivo** e segue boas práticas de **acessibilidade**.

## Funcionalidades

- Clima atual com temperatura, sensação, umidade, vento, pressão e visibilidade
- Previsão para os próximos dias (1 por dia)
- Alertas meteorológicos com ícones contextuais
- Busca por cidade com estados de erro dedicados
- Geolocalização automática com fallback
- Cidades favoritas persistentes (`localStorage`)
- Botão de atualização manual
- Interface responsiva (mobile-first)
- Acessibilidade: `aria-label`, `role`, foco visível, HTML semântico, teclado

## Stack

| Camada | Tecnologia |
| ------ | ---------- |
| UI | React 18 |
| Linguagem | TypeScript 5 |
| Build | Vite 5 |
| HTTP | Axios |
| Testes | Vitest + React Testing Library |
| Ícones | React Icons |
| Dados | OpenWeatherMap API |

## Arquitetura

```
src/
├── components/
│   ├── SearchBar/        # Busca por cidade
│   ├── WeatherCard/      # Clima atual
│   ├── WeatherForecast/  # Previsão dos próximos dias
│   ├── FavoriteCities/   # Lista de favoritos
│   ├── Loading/          # Estado de carregamento
│   ├── ErrorMessage/     # Estado de erro
│   └── WeatherAlert.tsx  # Alertas meteorológicos
├── hooks/
│   ├── useWeather.ts     # Orquestra dados, status e ações
│   ├── useGeolocation.ts # Geolocalização
│   └── useFavorites.ts   # Favoritos + localStorage
├── services/
│   ├── weatherApi.ts     # Cliente Axios + tratamento de erros
│   └── geolocation.ts    # Wrapper da API de geolocalização
├── types/
│   └── weather.ts        # Tipos das respostas da API
├── utils/
│   └── format.ts         # Helpers de formatação
├── test/
│   ├── fixtures.ts       # Mocks de dados
│   └── setup.ts          # Configuração do Vitest
├── App.tsx               # Dashboard (layout + composição)
└── main.tsx              # Entry point
```

### Fluxo de dados

`useWeather` centraliza o estado da aplicação (`status`, `error`, dados). Ao montar, tenta geolocalização; em falha, busca uma cidade padrão. Cada chamada à API passa por `weatherApi.ts`, que tipa as respostas e converte erros HTTP em `WeatherError` com mensagens amigáveis em português.

## Decisões técnicas

- **Vite em vez de Create React App**: build mais rápido, configuração explícita e primeiro-class TS.
- **TypeScript strict**: maior segurança de tipos desde a camada de API até os componentes.
- **Hooks de domínio** (`useWeather`): isola a lógica de dados do componente, facilitando testes e reuso.
- **Camada de serviço tipada**: respostas da OpenWeather são modeladas em `types/weather.ts`.
- **Mensagens de erro em PT-BR** e erros normalizados em `WeatherError` para feedback consistente.
- **Testes orientados a comportamento**: componentes (render + interação), serviços (axios mockado) e hooks (renderHook).

## Instalação

Requisitos: Node.js 18+.

```bash
npm install
```

Crie o arquivo `.env` na raiz com sua chave da OpenWeatherMap:

```
VITE_WEATHER_API_KEY=sua_chave_aqui
```

Obtenha uma chave gratuita em https://openweathermap.org/api.

## Scripts

```bash
npm run dev        # Servidor de desenvolvimento (http://localhost:3000)
npm run build      # Type-check + build de produção em /dist
npm run preview    # Pré-visualiza local do build
npm test           # Executa os testes uma vez
npm run test:watch # Executa os testes em modo watch
```

## Testes

Foram escritos testes para:

- **SearchBar** — submissão, validação de vazio e estado de loading
- **WeatherCard** — renderização de dados e acessibilidade
- **useWeather** — carregamento, fallback de geolocalização e estados de erro
- **weatherApi** — chamadas corretas e tratamento de erros HTTP

```bash
npm test
```

---

Feito por **Manoelah** em 2025. Dados meteorológicos fornecidos por [OpenWeatherMap](https://openweathermap.org).