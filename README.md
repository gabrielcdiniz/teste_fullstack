# Sobre

Projeto destinado à vaga FullStack - Sua Música

Com o propósito de criar uma [SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA) à partir da [PokeAPI](https://pokeapi.co/) usando [NextJS](https://nextjs.org/) e deploy em nuvem utilizando [Serverless](https://www.serverless.com/framework/docs) com provedor da [AWS](https://aws.amazon.com/pt/)

## Configurando o Projeto

Faça o download do repositório GIT para pasta de sua preferência e entre nela através da linha de comando

```sh
gabrielcdiniz ❯ git clone https://github.com/gabrielcdiniz/teste_fullstack.git

gabrielcdiniz ❯ cd teste_fullstack
```

Após ter feito o download, instale as dependências do projeto

com yarn:

```sh
gabrielcdiniz ❯ yarn
```

com npm

```sh
gabrielcdiniz ❯ npm i
```

## Executando o Projeto

Após concluir as instalações, execute o projeto localmente

```sh
gabrielcdiniz ❯ yarn dev
```

Agora é só abrir seu navegador no endereço `http://localhost:3000` e pronto.

## Deploy para AWS

Para efetuar o deploy usando _serverless_, primeiro instale-o globalmente em sua máquina

```sh
gabrielcdiniz ❯ npm install -g serverless
```

Após feito a instalação do _serverless_, exporte as credenciais de acesso AWS em seu terminal

caso esteja usando linux

```sh
gabrielcdiniz ❯ export AWS_ACCESS_KEY_ID="your_key_id"

gabrielcdiniz ❯ export AWS_SECRET_ACCESS_KEY="your_secret_key"
```

caso esteja usando windows

```sh
gabrielcdiniz ❯ set AWS_ACCESS_KEY_ID="your_key_id"

gabrielcdiniz ❯ set AWS_SECRET_ACCESS_KEY="your_secret_key"
```

Agora, faça o _build_ da aplicação

```sh
gabrielcdiniz ❯ yarn build
```

Por fim, faça o _deploy_ da aplicação

```sh
gabrielcdiniz ❯ serverless
```

> (Opcional) Caso queira alterar o nome do _bucket_ e/ou _descrição_ no _deploy_, antes de fazer o _deploy_, basta abrir o arquivo **serverless.yml** e ajustar os valores das propriedades **_bucketName_** e **_description_**

<!-- # Vaga de desenvolvedor fullstack

Efetue um fork deste projeto para então iniciar o desenvolvimento. Após a conclusão do teste, você deverá efetuar um pull-request para este repositório e enviar um e-mail para brunoc@suamusica.com.br, confirmando a entrega.

# Sobre o teste

Crie um SPA que deverá consumir a [PokeAPI](https://pokeapi.co/) usando [NextJS](https://nextjs.org/).

#### O web app deverá permitir:

- Busca por pokemons (Nome, tipo, habilidade);
- Listar pokemons (com seus respectivos thumbnails);
- Permitir a visualização detalhada de cada pokemon;
- Permitir criar uma lista de pokemons favoritos e adicionar/remover pokemons a esta lista. (Não é necessário salvar no banco de dados);

#### O que iremos avaliar?

- Documentação (Explique para nós como utilizar o seu projeto);
- Boas práticas de desenvolvimento;
- Cleancode;
- Controle correto de [rotas](https://nextjs.org/docs/routing/introduction) da aplicação;
- Estrutura HTML, Componentes, Responsividade;
- Utilização de [SCSS](https://sass-lang.com/);
- [React Hooks](https://pt-br.reactjs.org/docs/hooks-intro.html), [Context API](https://pt-br.reactjs.org/docs/context.html);

#### É um diferencial, se você adicionar ao seu projeto:

- Deploy, utilizando [Serverless Framework](https://www.serverless.com/).
- Testes, utilizando [playwright](https://playwright.dev/) ou [Cypress](https://www.cypress.io/). -->
