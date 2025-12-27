# 🎲 Sorteador de Números

Projeto de um **sorteador de números**, simples, responsivo e com animações suaves, desenvolvido com **HTML, CSS e JavaScript puro**.

---

## 📌 Objetivo do Projeto

Criar uma aplicação web que permita ao usuário:

- Definir **quantidade de números** a serem sorteados
- Definir **intervalo mínimo e máximo**
- Escolher se os números podem ou não se repetir
- Visualizar os resultados com **animações**
- Utilizar a aplicação tanto no **desktop quanto no mobile**

---

## 🖥️ Tecnologias Utilizadas

- **HTML5**

  - Estrutura semântica
  - Separação de conteúdo (formulário, resultados, FAQ)

- **CSS3**

  - Flexbox e layout responsivo
  - Animações (`@keyframes`)
  - Transições suaves (`transform`, `opacity`)
  - Gradientes animados
  - Pseudo-elementos e variáveis CSS

- **JavaScript**
  - Manipulação do DOM
  - Validação de formulário
  - Geração de números aleatórios
  - Controle de animações assíncronas
  - Reflow animado (FLIP)
  - Controle de caret customizado

---

## ⚙️ Funcionalidades

### ✔️ Sorteio de números

- Geração aleatória dentro do intervalo definido
- Opção de **não repetir números**
- Validações para evitar intervalos inválidos

### ✔️ Validação inteligente

- Regras diferentes para **desktop e mobile**
- Uso de `setCustomValidity()` e `reportValidity()`
- Feedback direto para o usuário

### ✔️ Animações

- Entrada animada de cada número sorteado
- Animação sequencial usando `async/await`
- Reposicionamento suave dos elementos (FLIP animation)

### ✔️ UX aprimorada

- Caret visual customizado nos inputs
- Cursor sempre centralizado
- Bloqueio de seleções e movimentações inválidas
- Botões com gradiente animado no hover

---

## 🧠 Principais Aprendizados

### 🔹 JavaScript

- Uso de `async/await` para controlar animações em sequência
- Manipulação avançada do DOM
- Uso de `getBoundingClientRect()` para animações de reflow
- Criação de validações dinâmicas baseadas no tamanho da viewport
- Separação de responsabilidades em funções pequenas

### 🔹 CSS

- Animações performáticas usando `transform`
- Gradientes animados com `keyframes`
- Controle visual sem depender de bibliotecas externas
- Layout adaptável sem media queries excessivas

Controle de visibilidade e interação com CSS

Durante o projeto, foi aplicado um padrão importante para exibir e ocultar elementos animados, foi usado o `pointer-events: none` para impedir o click do botão enquando ele estiver tranparente

```css
#draw-again {
  transition: opacity 400ms;
  opacity: 0;
  pointer-events: none;
}

#draw-again.visible {
  opacity: 1;
  pointer-events: auto;
}
```

<br>

O `transform-origin: center` garante que qualquer transformação (scale, rotate, etc.) aconteça a partir do centro visual do elemento, evitando efeitos “quebrados”.

### 🔹 UX/UI

- Importância de feedback visual claro
- Diferença de comportamento entre desktop e mobile
- Controle total do input melhora a experiência do usuário
- Microinterações fazem grande diferença na percepção do produto

---

## 📱 Responsividade

- Layout adaptado para telas menores
- Limite de números sorteados ajustado conforme o dispositivo
- Conteúdo duplicado (FAQ) para melhor organização visual

---

## 📄 Conclusão

Este projeto foi essencial para aprofundar conceitos de:

- JavaScript moderno
- Animações performáticas
- UX focada no detalhe
- Controle fino de layout e interação

Uma base sólida para evoluir para projetos mais complexos sem depender de frameworks.

---

**Projeto desenvolvido para fins de estudo e prática.**
