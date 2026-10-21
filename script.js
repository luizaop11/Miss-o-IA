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
      "O governo criou um lote único de uma pílula que duplica a inteligência e o foco de quem a toma. Como escolher os jovens que vão recebê-la?",

    alternativas: [
      {
        texto: "Dar aos alunos com maiores notas, premiando quem já demonstrou esforço e disciplina nos estudos.",
        afirmacao:
          "Você acredita que o potencial máximo deve coroar o mérito e a dedicação prévia do indivíduo."
      },
      {
        texto: "  Dar aos alunos com maior dificuldade de aprendizado, usando a pílula para equilibrar a capacidade de todos.",
        afirmacao:
          "Você considera que a justiça social deve corrigir as desvantagens da natureza antes de cobrar resultados."
      }
    ]
  },

  {
    enunciado:
      "No futuro, cidadãos ganham pontos de "Karma" por boas ações para conseguir morar nos melhores bairros. Um jovem rico passa o dia gravando caridade para a internet e explode no ranking, enquanto um trabalhador braçal não tem tempo nem energia para acumular pontos. O ranking do jovem rico é justo?",

    alternativas: [
      {
        texto:
          " Sim, o ranking é justo. O que importa para a sociedade é o volume final de ajuda entregue, não a facilidade de quem fez.",
        afirmacao:
          "Você acredita que o benefício gerado para o coletivo deve ser premiado de forma fria e objetiva."
      },
      {
        texto:
          "Não, o ranking é injusto. O algoritmo deveria cobrar uma meta muito maior de quem tem facilidade financeira.",
        afirmacao:
          "Você pensa que o mérito real está no tamanho do sacrifício pessoal, e não na facilidade em gerar aparências."
      }
    ]
  },

  {
    enunciado:
      "A Terra está colapsando e a primeira colônia em Marte ficou pronta, mas as vagas são limitadas. Quem deve ir?",

    alternativas: [
      {
        texto:
          "Os bilionários e os maiores cientistas. Quem gerou fortuna ou tecnologia provou que tem capacidade de liderar o novo mundo.",
        afirmacao:
          "Você acredita que a sobrevivência do futuro deve ser financiada e comandada por quem venceu no sistema atual."
      },
      {
        texto:
          "Cidadãos sorteados de forma totalmente igualitária. Misturando todas as classes sociais da Terra para recomeçar do zero.",
        afirmacao:
          "Você pensa que o colapso da Terra provou que o sistema antigo faliu; a dignidade humana deve ser o único passaporte."
      }
    ]
  },

  {
    enunciado:
      "Em um jogo de realidade virtual que gera dinheiro real, um jogador genial passa 10 anos construindo um império e falece. Ele deixa o império (nível 100) para o filho, que nunca jogou. O que o jogo deve fazer?",

    alternativas: [
      {
        texto:
          "Entregar o império ao filho. O direito de passar o fruto do seu trabalho para quem você ama é o maior motor da ambição humana.",
        afirmacao:
          "Você considera que o direito à herança e à propriedade privada deve ser protegido acima de tudo."
      },
      {
        texto:
          "Deletar o império e redistribuir as moedas no servidor. Ninguém deve começar o jogo no topo apenas por ser filho do dono.",
        afirmacao:
          "Você considera que o ambiente virtual deve ser 100% meritocrático, livre dos privilégios do mundo físico."
      }
    ]
  },

  {
    enunciado:
      "Uma inteligência artificial de RH elimina candidatos que usam gírias ou sotaques periféricos em entrevistas de voz, contratando apenas quem fala o "português erudito" das classes altas. A IA deve ser mantida?",

    alternativas: [
      {
        texto:
          "Sim, deve ser mantida. Falar de forma polida é uma competência técnica que depende do esforço e dedicação de cada um.",
        afirmacao:
          "Você considera que o mercado exige padrões de excelência e premia quem se adequou a eles."
      },
      {
        texto:
          "Não, deve ser proibida. A forma como alguém fala depende de onde cresceu, e não de seu talento profissional.",
        afirmacao:
          " Você confia que cobrar erudição mascara o privilégio social como se fosse competência, sabotando o mérito real"
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