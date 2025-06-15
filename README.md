# 🎸 Tributo a **Raul Seixas**

<p align="center">
  <img src="https://github.com/user-attachments/assets/31b7187f-c92e-45f9-bd13-f4cadd57f4b1" />
</p>


> **“Basta ser sincero e desejar profundo, você será capaz de sacudir o mundo.”** ― Raul Seixas

[![GitHub issues](https://img.shields.io/github/issues/theBrunno/raulseixas?style=flat-square)](https://github.com/SEU_USUARIO/raul-seixas-tribute/issues) [![GitHub stars](https://img.shields.io/github/stars/theBrunno/raulseixas?style=flat-square)](https://github.com/SEU_USUARIO/raul-seixas-tribute/stargazers) [![MIT License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](#licenca)

> Um site completo em homenagem ao eterno **Maluco Beleza**, onde fãs podem ouvir suas músicas, explorar álbuns, criar playlists e descobrir curiosidades. Administradores têm total controle sobre o catálogo e dados de engajamento.

---

## 📑 Índice

1. 📖 Sobre o Projeto
2. 🚀 Funcionalidades Principais
3. 🖼️ Screenshots
4. 🛠️ Tecnologias Utilizadas
5. 🐣 Como Rodar Localmente
6. 📂 Estrutura de Pastas (resumida)
7. 📈 Próximos Passos
8. 🤝 Contribuindo
9. 📜 Licença
10. 🎤 Agradecimentos
---

## 📖 Sobre o Projeto

Este repositório contém o código‑fonte de um **site tributo a Raul Seixas**. Na página inicial, os usuários encontram:

* **Todos os álbuns cadastrados** (inclusão via dashboard de administrador)
* **Músicas mais ouvidas** (dados vindos do banco de dados)
* **Biografia resumida** do artista

Cada álbum possui página dedicada com:

1. **Capa & informações** (upload pelo admin)
2. **Player de faixas** ― tocar, pausar, pular para anterior/próxima, adicionar à playlist 🔥
3. **Letra sincronizada** (arquivo `.lrc` enviado pelo admin)
4. **Curiosidades** ilustradas (imagem + descrição)
5. **Avaliações** (usuários dão notas, média calculada no BD)
6. **Comentários** (somente para usuários logados)

> Toda reprodução de faixa incrementa a contagem de *views*.

### Área do Usuário

* **Login & Cadastro** (upload de foto de perfil)
* **Perfil** (nome, e‑mail, imagem)
* **Playlists**: criar, listar e ouvir músicas dentro da própria playlist (letra sincronizada ao lado)

### Dashboard do Administrador ⚙️

* **Visão Geral de Músicas**: filtrar mais/menos ouvidas globalmente ou por álbum
* **Visão por Álbum**: média de avaliações e faixas mais tocadas
* **Visão por Playlist**: músicas mais salvas e álbuns mais presentes em playlists
* **Gestão de Catálogo**: página de cadastro/edição de álbum (uploads de capa, faixas `.mp3`, letras `.lrc`, curiosidades)
* **Gestão de Usuários**: listagem de todos os usuários registrados

---

## 🚀 Funcionalidades Principais

| 📌 | Usuário                                | Administrador                        |
| -- | -------------------------------------- | ------------------------------------ |
| 🎧 | Ouvir músicas e ver letra sincronizada | Upload de faixas e letras            |
| 💬 | Comentar em álbuns                     | Moderação & analytics                |
| ⭐  | Avaliar álbuns                         | Ver médias de avaliação              |
| 📂 | Criar playlists                        | Painel de músicas mais/menos ouvidas |
| 🔍 | Buscar músicas na navbar               | Cadastro completo de álbuns          |
| 👤 | Gerenciar perfil (foto, nome, e‑mail)  | Gerenciar usuários                   |

---

## 🖼️ Screenshots

| Tela                | Preview                                                             |
| ------------------- | ------------------------------------------------------------------- |
| Home                | ![image](https://github.com/user-attachments/assets/8bb0759a-80bb-49e9-894e-f587b2d2357b)|
| Página do Álbum     | ![image](https://github.com/user-attachments/assets/36b56ad3-afac-4462-8011-12e894c63ecf)|
| Player + Letra      | ![image](https://github.com/user-attachments/assets/51dd91e7-5961-4f88-9555-d9f110a1ea3b)|
| Playlist           | ![image](https://github.com/user-attachments/assets/410b264a-0580-4f13-a0f2-b792ecb748d9)|
| Dashboard (Músicas) | ![image](https://github.com/user-attachments/assets/8a03fd32-38d0-40e0-906f-f0a904d20ac0)|
| Dashboard (Álbuns)  | ![image](https://github.com/user-attachments/assets/312e4a13-bb06-4386-8616-897fcbae806e)|

---

## 🛠️ Tecnologias Utilizadas

* **Frontend**: HTML5 • CSS3 • JavaScript
* **Backend**: Node.js • Express.js

  * *Uploads*: **Multer**
* **Banco de Dados**: MySQL
* **Player Áudio**: HTML5 `<audio>` API
* **Sincronização de Letras**: leitura de arquivos **`.lrc`**
* **Gerenciamento de Estado & Requisições**: Fetch API

---

## 🐣 Como Rodar Localmente

```bash
# 1. Clone o repositório
git clone https://github.com/TheBrunno/raulseixas.git
cd raulseixas

# 2. Instale as dependências
npm install

# 3. Crie o arquivo .env.dev
cp .env.example .env.dev
# ➜ ajuste as variáveis de conexão ao banco & porta do servidor

# 4. Rode o servidor
npm start
# por padrão em http://localhost:3333
```

Abra `http://localhost:<porta escolhida>` no navegador e divirta‑se! 🎶

---

## 📂 Estrutura de Pastas (resumida)

```
📦raulseixas
 ┣ 📂public
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📂fonts
 ┃ ┃ ┗ 📂imgs
 ┃ ┣ 📂css
 ┃ ┣ 📂js
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┣ 📂controllers
 ┃ ┣ 📂database
 ┃ ┣ 📂middlewares
 ┃ ┣ 📂models
 ┃ ┗ 📂routes
 ┣ 📂uploads
 ┃ ┣ 📂cards
 ┃ ┣ 📂cover
 ┃ ┣ 📂lrc
 ┃ ┣ 📂songs
 ┃ ┗ 📂user
 ┣ 📜.env
 ┣ 📜.env.dev
 ┣ 📜.env.example
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
```

---

## 📈 Próximos Passos

* [ ] Autenticação JWT
* [ ] Dockerização do ambiente

Sinta‑se à vontade para abrir *issues* com sugestões! 😉

---

## 🤝 Contribuindo

1. **Fork** o projeto
2. Crie uma *branch* (`git checkout -b feature/SuaFeature`)
3. *Commit* suas alterações (`git commit -m 'feat: Minha nova feature'`)
4. *Push* para a branch (`git push origin feature/SuaFeature`)
5. Abra um **Pull Request**

---

## 📜 Licença  <a id="licenca"></a>

Distribuído sob a licença **MIT**. Veja `LICENSE` para mais informações.

---

## 🎤 Agradecimentos

* A **Raul Seixas** (1945‑1989) por seu legado à música brasileira e ao *rock* nacional.
* À faculdade São Paulo Tech School.
* Às pessoas que sempre estiveram comigo e me apoiando durante o desenvolvimento desse projeto.

> “Sonho que se sonha só é só um sonho que se sonha só, mas sonho que se sonha junto é realidade.”


<p align="center">
  <img src="https://github.com/user-attachments/assets/2ac568a4-b62c-4d69-9761-6806d70ef4e1" alt="Raul tocando guitarra" width="300" />
</p>
