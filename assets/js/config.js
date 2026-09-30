/* ============================================================
   ALCANÇAR — Configuração e dados de apoio
   ============================================================ */

// Dados oficiais (fonte única da verdade — seção 1 do briefing)
const CONFIG = {
  nome: "ALCANÇAR – Clínica de Fisioterapia Integrada",
  lema: "Cuidar • Acolher • Transformar",
  whatsappAlmenara: "5533999423675",
  whatsappJacinto: "5533999193564",
  horario: "Segunda a sexta, das 7h às 21h (domingo e sábado fechados)",
  convNIO: "Unimed Três Vales",
  instagram: "@alcancarfisio",
  instagramUrl: "https://www.instagram.com/alcancarfisio",
  showTestimonials: false, // desliga depoimentos reais — só substitua com [depoimento de paciente: substituir]

  // Regras da ferramenta guiada (seção 5 / sec 10 — TODAS as combinações)
  guideRules: [
    // dus para quem é + o que sente
    // formato: [para, sente, resultado]
    // para: mim, filho, idoso, gestante
    // sente: dor, recuperacao, desenvolvimento, emocional, nutricion, estetica, atividade
    { para: "mim", sente: "dor", res: "Fisioterapia ortopédica" },
    { para: "mim", sente: "recuperacao", res: "Fisioterapia ortopédica" },
    { para: "mim", sente: "desenvolvimento", res: "Psicopedagogia e Neuropsicopedagogia" },
    { para: "mim", sente: "emocional", res: "Psicologia (adulto)" },
    { para: "mim", sente: "nutricion", res: "Nutrição" },
    { para: "mim", sente: "estetica", res: "Estética" },
    { para: "mim", sente: "atividade", res: "Pilates, Hidroginástica e Natação" },

    { para: "filho", sente: "dor", res: "Fisioterapia infantil" },
    { para: "filho", sente: "recuperacao", res: "Fisioterapia infantil" },
    { para: "filho", sente: "desenvolvimento", res: "Terapeuta CME, Psicopedagogia e Neuropsicopedagogia" },
    { para: "filho", sente: "emocional", res: "Psicologia (infantil)" },
    { para: "filho", sente: "nutricion", res: "Nutrição" },
    { para: "filho", sente: "estetica", res: "Estética" },
    { para: "filho", sente: "atividade", res: "Pilates, Hidroginástica e Natação" },

    { para: "idoso", sente: "dor", res: "Fisioterapia para idosos" },
    { para: "idoso", sente: "recuperacao", res: "Fisioterapia para idosos" },
    { para: "idoso", sente: "desenvolvimento", res: "Terapeuta CME, Psicopedagogia e Neuropsicopedagogia" },
    { para: "idoso", sente: "emocional", res: "Psicologia (adulto)" },
    { para: "idoso", sente: "nutricion", res: "Nutrição" },
    { para: "idoso", sente: "estetica", res: "Estética" },
    { para: "idoso", sente: "atividade", res: "Hidroginástica e Pilates (destacado)" },

    { para: "gestante", sente: "dor", res: "Fisioterapia pélvica" },
    { para: "gestante", sente: "recuperacao", res: "Fisioterapia pélvica" },
    { para: "gestante", sente: "desenvolvimento", res: "Terapeuta CME, Psicopedagogia e Neuropsicopedagogia" },
    { para: "gestante", sente: "emocional", res: "Psicologia (adulto)" },
    { para: "gestante", sente: "nutricion", res: "Nutrição" },
    { para: "gestante", sente: "estetica", res: "Estética" },
    { para: "gestante", sente: "atividade", res: "Pilates, Hidroterapia e Hidroginástica" },
  ],

  // Dados do mapa do corpo (áreas clicáveis + cards)
  bodyMap: [
    { id: "pescoço", label: "Pescoço e cabeça", text: "Dor e tensão no pescoço e na região da cabeça.", service: "Fisioterapia ortopédica" },
    { id: "ombro", label: "Ombro e braço", text: "Dor ao levantar o braço, lesões e recuperação de cirurgia.", service: "Fisioterapia ortopédica" },
    { id: "coluna", label: "Coluna", text: "Dor nas costas e má postura.", service: "Fisioterapia ortopédica e Pilates" },
    { id: "quadril", label: "Quadril e região pélvica", text: "Dor no quadril, gestação, pós-parto e cuidados com a saúde íntima.", service: "Fisioterapia pélvica" },
    { id: "joelho", label: "Joelho", text: "Dor, inchaço e recuperação após lesões ou cirurgia.", service: "Fisioterapia ortopédica e Hidroterapia" },
    { id: "pé", label: "Pé e tornozelo", text: "Torções, dor ao caminhar e recuperação de lesões.", service: "Fisioterapia ortopédica" },
  ],

  // Serviços organizados por aba (todos existem nas duas unidades)
  servicesByTab: {
    todos: [
      { name: "Fisioterapia geral", tag: "Corpo e movimento", desc: "Avaliação completa e tratamento individual para dores e limitações do dia a dia.", impact: "Movimento sem dor" },
      { name: "Fisioterapia adulto", tag: "Corpo e movimento", desc: "Tratamento para dores, lesões e recuperação depois de cirurgias.", impact: "Volte a fazer o que você gosta" },
      { name: "Fisioterapia infantil", tag: "Crianças", desc: "Acompanha o desenvolvimento motor de bebês e crianças, com atividades que viram brincadeira.", impact: "Cada passo conta" },
      { name: "Fisioterapia para idosos", tag: "Corpo e movimento", desc: "Exercícios e cuidados para manter força, equilíbrio e independência.", impact: "Autonomia e segurança" },
      { name: "Fisioterapia pélvica", tag: "Corpo e movimento", desc: "Cuidado com a região pélvica, indicado em várias fases da vida, como gestação e pós-parto.", impact: "Cuidado íntimo, com respeito" },
      { name: "Ortopedia", tag: "Corpo e movimento", desc: "Tratamento de dores, lesões e recuperação de cirurgias na coluna, ombro, joelho e outras articulações.", impact: "Ossos, músculos e articulações" },
      { name: "Pilates", tag: "Corpo e movimento", desc: "Exercícios que fortalecem o corpo, melhoram a postura e ajudam na flexibilidade.", impact: "Melhore sua postura com Pilates" },
      { name: "Hidroterapia", tag: "Na água", desc: "Exercícios na água, com menos impacto nas articulações.", impact: "Bem-estar e relaxamento" },
      { name: "Hidroginástica", tag: "Na água", desc: "Aulas na água para se exercitar com menos impacto nas articulações.", impact: "Exercício leve e divertido" },
      { name: "Natação", tag: "Na água", desc: "Aulas para aprender, melhorar a técnica e se movimentar na água.", impact: "Nade com orientação" },
      { name: "Psicologia", tag: "Mente e aprendizado", desc: "Atendimento psicológico com acolhimento, para adultos e crianças.", impact: "Um espaço para cuidar da mente" },
      { name: "Psicopedagogia", tag: "Mente e aprendizado", desc: "Identifica o que está dificultando o aprendizado e ajuda a criança a aprender com mais confiança.", impact: "Aprender fica mais fácil" },
      { name: "Neuropsicopedagogia", tag: "Mente e aprendizado", desc: "Avaliação e acompanhamento das dificuldades de aprendizagem, atenção e desenvolvimento.", impact: "Entendendo como o cérebro aprende" },
      { name: "Terapeuta CME", tag: "Crianças", desc: "Descubra detalhes que fazem toda a diferença no desenvolvimento motor da criança.", impact: "Desenvolvimento motor infantil" },
      { name: "Nutrição", tag: "Nutrição", desc: "Avaliação nutricional completa, plano alimentar individual e acompanhamento contínuo.", impact: "Comer bem, viver melhor" },
      { name: "Estética", tag: "Estética", desc: "Botox, limpeza de pele, depilação a laser e outros procedimentos.", impact: "Cuidado por dentro e por fora" },
    ],
    "corpo-e-movimento": [
      "Fisioterapia geral", "Fisioterapia adulto", "Fisioterapia infantil", "Fisioterapia para idosos", "Fisioterapia pélvica", "Ortopedia", "Pilates", "Hidroterapia", "Hidroginástica", "Natação"
    ],
    criancas: ["Fisioterapia infantil", "Terapeuta CME", "Psicopedagogia", "Neuropsicopedagogia"],
    "mente-e-aprendizado": ["Psicologia", "Psicopedagogia", "Neuropsicopedagogia"],
    nutricion: ["Nutrição"],
    "na-agua": ["Hidroterapia", "Hidroginástica", "Natação"],
    estetica: ["Estética"],
  },

  // Unidades
  unidades: [
    { nome: "Almenara", endereco: "Rua Henrique Heitman, 288 – São Judas – Almenara/MG", whats: "5533999423675", hora: "Segunda a sexta, das 7h às 21h", badge: "Nova localização", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..." },
    { nome: "Jacinto", endereco: "Rua Clarindo Barbosa, 92 – Centro – Jacinto/MG", whats: "5533999193564", hora: "Segunda a sexta, das 7h às 21h", badge: "Nova unidade", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..." },
  ]
};

// Exportar globalmente (sem módulos — puro JS)
try { if (typeof window !== "undefined") window.ALCANCAR_CONFIG = CONFIG; } catch (e) {}
