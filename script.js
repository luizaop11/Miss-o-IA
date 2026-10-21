const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaFeedback = document.querySelector(".caixa-feedback");
const textoFeedback = document.querySelector(".texto-feedback");
const botaoProxima = document.querySelector(".botao-proxima");

const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const resumoEscolhas = document.querySelector(".resumo-escolhas");
const botaoReiniciar = document.querySelector(".botao-reiniciar");

const progresso = document.querySelector(".progresso");
const numeroPergunta = document.querySelector("#numero-pergunta");
const porcentagem = document.querySelector("#porcentagem");
const barraProgresso = document.querySelector(".barra-progresso-preenchida");

const perguntas = [
  {
    enunciado:
      "Se você está muito estressado ou com raiva de alguém, o que você faz?",

    alternativas: [
      {
        texto: "Desconta a frustração na primeira pessoa que aparece ou quebra algum objeto.",
        afirmacao:
          " A agressividade não resolve o problema e prejudica suas relações sociais e sua própria saúde."
      },
      {
        texto: " Tira um momento para respirar, afasta-se da situação e tenta se acalmar.",
        afirmacao:
          " Você prioriza o seu bem-estar e resolve a situação de forma madura, sem machucar os outros."
      }
    ]
  },

  {
    enunciado:
      "Quando um amigo compartilha um problema triste com você, qual é sua reação?",

    alternativas: [
      {
        texto:
          "Escuta com atenção e oferece apoio.",
        afirmacao:
          "Praticar a empatia fortalece os laços sociais e contribui para construir uma rede de apoio saudável."
      },
      {
        texto:
          "Você diz que é bobagem ou que a pessoa está dramatizando e muda logo de assunto.",
        afirmacao:
          "Validar os sentimentos dos outros é uma forma de empatia, fortalece os vínculos sociais e ajuda a pessoa."
      }
    ]
  },

  {
    enunciado:
      "Se você percebe que cometeu um erro grave, como você reage?",

    alternativas: [
      {
        texto:
          "Você finge que nada aconteceu ou joga a culpa na outra pessoa para não admitir que errou.",
        afirmacao:
          "Não assumir os próprios erros impede o desenvolvimento pessoal e gera desconfiança."
      },
      {
        texto:
          "Reconhece a falha, pede desculpas sinceramente e tenta consertar a situação.",
        afirmacao:
          "Ter responsabilidade afetiva mostra maturidade emocional e respeito pelo próximo."
      }
    ]
  },

  {
    enunciado:
      "Diante de uma opinião totalmente diferente da sua em uma discussão, o que você faz?",

    alternativas: [
      {
        texto:
          "Você começa a gritar, ofende a pessoa e tenta impor o seu ponto de vista a qualquer custo.",
        afirmacao:
          "O respeito à diversidade de ideias é fundamental para a vida em sociedade. A agressividade anula o diálogo."
      },
      {
        texto:
          "Ouve o argumento do outro com respeito, expressa sua opinião calmamente e aceita que as pessoas pensam diferente.",
        afirmacao:
          "O diálogo pacífico e a tolerância são essenciais para um convívio social saudável."
      }
    ]
  },

  {
    enunciado:
      "Quando você sente que está sobrecarregado e não está bem mentalmente, qual atitude você toma?",

    alternativas: [
      {
        texto:
          "Você aceita seus limites, conversa com alguém de confiança ou procura a ajuda de um profissional.",
        afirmacao:
          "Reconhecer que precisa de ajuda é um sinal de força e autocuidado com a sua mente."
      },
      {
        texto:
          "Guarda tudo para si, finge que está bem e continua acumulando emoções até explodir.",
        afirmacao:
          " Ignorar a própria saúde mental pode levar ao esgotamento extremo e a problemas mais graves."
      }
    ]
  }
];

let atual = 0;
let escolhas = [];

function atualizarProgresso() {
  const total = perguntas.length;
  const numeroAtual = Math.min(atual + 1, total);
  const percentual = Math.round((atual / total) * 100);

  numeroPergunta.textContent =
    `Pergunta ${numeroAtual} de ${total}`;

  porcentagem.textContent = `${percentual}%`;
  barraProgresso.style.width = `${percentual}%`;
}

function mostraPergunta() {
  if (atual >= perguntas.length) {
    mostraResultado();
    return;
  }

  const perguntaAtual = perguntas[atual];

  caixaResultado.hidden = true;
  caixaFeedback.hidden = true;
  caixaAlternativas.hidden = false;

  caixaPerguntas.textContent = perguntaAtual.enunciado;
  caixaAlternativas.replaceChildren();

  botaoProxima.textContent =
    atual === perguntas.length - 1
      ? "Ver resultado →"
      : "Próxima pergunta →";

  atualizarProgresso();

  perguntaAtual.alternativas.forEach((alternativa, indice) => {
    const botao = document.createElement("button");

    const letra = document.createElement("span");
    letra.className = "letra-alternativa";
    letra.textContent = String.fromCharCode(65 + indice);

    const texto = document.createElement("span");
    texto.textContent = alternativa.texto;

    botao.append(letra, texto);

    botao.addEventListener("click", () => {
      selecionarAlternativa(alternativa);
    });

    caixaAlternativas.appendChild(botao);
  });
}

function selecionarAlternativa(alternativa) {
  escolhas[atual] = alternativa;

  caixaAlternativas.hidden = true;
  caixaFeedback.hidden = false;

  textoFeedback.textContent = alternativa.afirmacao;
}

function proximaPergunta() {
  atual++;
  mostraPergunta();
}

function mostraResultado() {
  caixaPerguntas.textContent = "";
  caixaAlternativas.hidden = true;
  caixaFeedback.hidden = true;
  progresso.hidden = true;

  caixaResultado.hidden = false;
  resumoEscolhas.replaceChildren();

  textoResultado.textContent =
    "Ao longo desta jornada, você refletiu sobre os riscos, as oportunidades e a responsabilidade no uso da Inteligência Artificial. O futuro não depende apenas da tecnologia, mas também das decisões das pessoas que a desenvolvem e utilizam.";

  escolhas.forEach((escolha, indice) => {
    const item = document.createElement("article");
    item.className = "item-resumo";

    const titulo = document.createElement("strong");
    titulo.textContent = `Pergunta ${indice + 1}: ${escolha.texto}`;

    const mensagem = document.createElement("p");
    mensagem.textContent = escolha.afirmacao;

    item.append(titulo, mensagem);
    resumoEscolhas.appendChild(item);
  });

  barraProgresso.style.width = "100%";
  porcentagem.textContent = "100%";
  numeroPergunta.textContent = "Jornada concluída";
}

function reiniciarJogo() {
  atual = 0;
  escolhas = [];

  progresso.hidden = false;
  mostraPergunta();
}

botaoProxima.addEventListener("click", proximaPergunta);
botaoReiniciar.addEventListener("click", reiniciarJogo);

mostraPergunta();