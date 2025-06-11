# ReciclaMente

Um jogo da memória interativo desenvolvido com React e Node.js. O jogo inclui diferentes níveis de dificuldade, pontuações, e um placar para os melhores jogadores.

## Funcionalidades

- Tela inicial com botões para jogar e ver créditos
- Três níveis de dificuldade: Fácil (8 cartas), Médio (12 cartas) e Difícil (16 cartas)
- Sistema de pontuação baseado em tempo e movimentos
- Armazenamento de pontuações em um banco de dados Firebase
- Placar com as 10 melhores pontuações
- Interface responsiva com React

## Tecnologias Utilizadas

- Frontend: React
- Backend: Node.js, Express
- Banco de Dados: Firebase

## Pré-requisitos

- Node.js (versão 14.x ou superior)
- npm (versão 6.x ou superior)

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/memory-game.git
cd memory-game
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Este comando inicia tanto o servidor backend (na porta 5000) quanto o frontend (na porta 3000).

## Scripts Disponíveis

- `npm start`: Inicia o servidor em modo de produção

## Como Jogar

1. Na tela inicial, clique em "Jogar" para iniciar o jogo
2. Selecione o nível de dificuldade desejado
3. Clique nas cartas para virá-las e encontrar os pares
4. Complete o jogo encontrando todos os pares
5. Se você fizer uma das 10 melhores pontuações, poderá registrar seu nome
6. Veja sua posição no placar de líderes

## Desenvolvimento

Para contribuir com o projeto:

1. Crie um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona minha feature'`)
4. Faça push para a branch (`git push origin feature/minha-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
