/**
 * NEXUS ORACLE LIBRARY V1.0
 * Sistema completo de cartas com animações e designs únicos
 */

class OracleLibrary {
    constructor() {
        this.decks = this.initializeDecks();
        this.cardAnimations = this.initializeAnimations();
        this.cardDesigns = this.initializeCardDesigns();
    }

    // ==================== DECKS COMPLETOS ====================
    initializeDecks() {
        return {
            base: {
                name: "Oráculo Quântico",
                color: "#9d4edd",
                symbol: "🌀",
                cards: [
                    { 
                        id: "fool",
                        name: "O Louco", 
                        meaning: "O vazio antes do salto. A fé no desconhecido.",
                        lore: "O ponto zero da criação, onde todas as possibilidades coexistem.",
                        effect: { q: 50, c: 10 },
                        symbol: "🌀",
                        color: "#00f3ff",
                        animation: "quantum_swirl",
                        revealTime: 1.2,
                        design: "fool_design"
                    },
                    { 
                        id: "magician",
                        name: "O Mago", 
                        meaning: "O gesto que transforma pensamento em realidade.",
                        lore: "Conexão entre os reinos superior e inferior. A consciência que molda a matéria.",
                        effect: { q: 100, c: 20 },
                        symbol: "✨",
                        color: "#ffd60a",
                        animation: "sparkle_burst",
                        revealTime: 1.5,
                        design: "magician_design"
                    },
                    { 
                        id: "priestess",
                        name: "A Sacerdotisa", 
                        meaning: "O silêncio entre os mundos. A sabedoria que não se fala.",
                        lore: "Guardiã dos mistérios. O véu que separa o conhecido do desconhecido.",
                        effect: { q: 20, c: 50 },
                        symbol: "🌙",
                        color: "#4cc9f0",
                        animation: "moon_phase",
                        revealTime: 1.8,
                        design: "priestess_design"
                    },
                    { 
                        id: "empress",
                        name: "A Imperatriz", 
                        meaning: "A terra que recebe a semente. A abundância natural.",
                        lore: "Fertilidade do cosmos. O útero cósmico onde tudo germina.",
                        effect: { q: 80, c: 30 },
                        symbol: "🌿",
                        color: "#06d6a0",
                        animation: "growth_spiral",
                        revealTime: 1.3,
                        design: "empress_design"
                    },
                    { 
                        id: "tower",
                        name: "A Torre", 
                        meaning: "O raio que derruba estruturas velhas.",
                        lore: "Colapso necessário. A destruição que precede a reconstrução.",
                        effect: { q: -50, c: 40 },
                        symbol: "⚡",
                        color: "#ff6b6b",
                        animation: "lightning_strike",
                        revealTime: 0.8,
                        design: "tower_design"
                    },
                    { 
                        id: "star",
                        name: "A Estrela", 
                        meaning: "A luz que atravessa a noite mais densa.",
                        lore: "Guia celeste. A esperança que brilha no vazio cósmico.",
                        effect: { q: 60, c: 60 },
                        symbol: "💫",
                        color: "#7209b7",
                        animation: "star_pulse",
                        revealTime: 1.6,
                        design: "star_design"
                    },
                    { 
                        id: "hermit",
                        name: "O Eremita", 
                        meaning: "A luz que se busca no interior. O silêncio que ensina.",
                        lore: "Sabedoria da solidão. A lanterna que ilumina o caminho interno.",
                        effect: { q: 40, c: 80 },
                        symbol: "🕯️",
                        color: "#ff9e00",
                        animation: "candle_flicker",
                        revealTime: 1.4,
                        design: "hermit_design"
                    },
                    { 
                        id: "wheel",
                        name: "A Roda da Fortuna", 
                        meaning: "O ciclo que gira sem cessar. A sorte que vem e vai.",
                        lore: "Dança cósmica do destino. O eterno retorno.",
                        effect: { q: Math.random() > 0.5 ? 120 : -80, c: 30 },
                        symbol: "🔄",
                        color: "#f72585",
                        animation: "wheel_spin",
                        revealTime: 2.0,
                        design: "wheel_design"
                    },
                    { 
                        id: "strength",
                        name: "A Força", 
                        meaning: "O poder que vem da compaixão. O domar sem quebrar.",
                        lore: "União de opostos. A fera e a donzela num abraço eterno.",
                        effect: { q: 70, c: 50 },
                        symbol: "🦁",
                        color: "#ffb347",
                        animation: "lion_roar",
                        revealTime: 1.7,
                        design: "strength_design"
                    },
                    { 
                        id: "judgement",
                        name: "O Julgamento", 
                        meaning: "O chamado para renascer. O despertar após o sono.",
                        lore: "Trombeta da ressurreição. O despertar da consciência adormecida.",
                        effect: { q: 60, c: 90 },
                        symbol: "⚖️",
                        color: "#a9def9",
                        animation: "trumpet_call",
                        revealTime: 1.9,
                        design: "judgement_design"
                    }
                ]
            },
            norse: {
                name: "Sussurros das Nornas",
                color: "#00f3ff",
                symbol: "ᚦ",
                cards: [
                    { 
                        id: "odin",
                        name: "Odin", 
                        meaning: "O sacrifício por visão total. A dor que abre portais.",
                        lore: "Pai de Todos. Pendurado na Árvore do Mundo por nove noites.",
                        effect: { q: 150, c: -20 }, 
                        symbol: "👁️",
                        color: "#00f3ff",
                        animation: "odin_eye",
                        revealTime: 1.5,
                        design: "odin_design"
                    },
                    { 
                        id: "thor",
                        name: "Thor", 
                        meaning: "O trovão que parte montanhas. A força bruta.",
                        lore: "Deus do Trovão. Defensor de Midgard contra gigantes.",
                        effect: { q: 80, c: 10 }, 
                        symbol: "⚡",
                        color: "#ffd60a",
                        animation: "thor_hammer",
                        revealTime: 1.0,
                        design: "thor_design"
                    },
                    { 
                        id: "frigg",
                        name: "Frigg", 
                        meaning: "O tear que tece destinos. O fio invisível.",
                        lore: "Rainha de Asgard. Conhece o destino de todos, mas nunca fala.",
                        effect: { q: 30, c: 40 }, 
                        symbol: "🧵",
                        color: "#4cc9f0",
                        animation: "weave_threads",
                        revealTime: 1.8,
                        design: "frigg_design"
                    },
                    { 
                        id: "loki",
                        name: "Loki", 
                        meaning: "O fogo que brinca com a ordem. O caos que desata nós.",
                        lore: "Deus do Engano. Tecelor de tramas e desfazedor de certezas.",
                        effect: { q: -100, c: 150 }, 
                        symbol: "🔥",
                        color: "#ff6b6b",
                        animation: "loki_flame",
                        revealTime: 1.3,
                        design: "loki_design"
                    },
                    { 
                        id: "freya",
                        name: "Freya", 
                        meaning: "O amor que transcende mundos. A beleza que é poder.",
                        lore: "Deusa do Amor e da Guerra. Donzela das Brisas e das Lágrimas de Ouro.",
                        effect: { q: 80, c: 70 }, 
                        symbol: "💖",
                        color: "#9d4edd",
                        animation: "freya_necklace",
                        revealTime: 1.6,
                        design: "freya_design"
                    }
                ]
            },
            greek: {
                name: "Ecos do Olimpo",
                color: "#9d4edd",
                symbol: "⚡",
                cards: [
                    { 
                        id: "zeus",
                        name: "Zeus", 
                        meaning: "O raio que decide. O poder absoluto.",
                        lore: "Rei dos Deuses. Senhor do Céu e do Trovão.",
                        effect: { q: 200, c: -30 }, 
                        symbol: "👑",
                        color: "#ffd60a",
                        animation: "zeus_lightning",
                        revealTime: 1.2,
                        design: "zeus_design"
                    },
                    { 
                        id: "athena",
                        name: "Atena", 
                        meaning: "A estratégia que vence sem lutar.",
                        lore: "Deusa da Sabedoria e Guerra Estratégica. Nascida da cabeça de Zeus.",
                        effect: { q: 70, c: 50 }, 
                        symbol: "🦉",
                        color: "#4cc9f0",
                        animation: "athena_owl",
                        revealTime: 1.7,
                        design: "athena_design"
                    },
                    { 
                        id: "apollo",
                        name: "Apolo", 
                        meaning: "A luz que revela e cura. A música que acalma.",
                        lore: "Deus do Sol, Profecia e Música. Arqueiro de raios dourados.",
                        effect: { q: 90, c: 30 }, 
                        symbol: "☀️",
                        color: "#ffb347",
                        animation: "apollo_sun",
                        revealTime: 1.4,
                        design: "apollo_design"
                    },
                    { 
                        id: "hades",
                        name: "Hades", 
                        meaning: "O reino das sombras e riquezas. O que está abaixo sustenta o que está acima.",
                        lore: "Senhor do Submundo. Guardião das Almas e das Riquezas da Terra.",
                        effect: { q: 150, c: -50 }, 
                        symbol: "⚰️",
                        color: "#7209b7",
                        animation: "hades_gate",
                        revealTime: 1.9,
                        design: "hades_design"
                    },
                    { 
                        id: "aphrodite",
                        name: "Afrodite", 
                        meaning: "A atração que move mundos. O desejo que é criação.",
                        lore: "Deusa do Amor e Beleza. Nascida da espuma do mar.",
                        effect: { q: 50, c: 100 }, 
                        symbol: "💘",
                        color: "#ff6b6b",
                        animation: "aphrodite_sea",
                        revealTime: 1.5,
                        design: "aphrodite_design"
                    }
                ]
            },
            egyptian: {
                name: "Vozes das Pirâmides",
                color: "#ffd60a",
                symbol: "𓆓",
                cards: [
                    { 
                        id: "ra",
                        name: "Ra", 
                        meaning: "O sol que nasce todas as manhãs.",
                        lore: "Deus Sol. Criador de todos os deuses e homens.",
                        effect: { q: 120, c: 20 }, 
                        symbol: "🔥",
                        color: "#ffb347",
                        animation: "ra_sunrise",
                        revealTime: 1.3,
                        design: "ra_design"
                    },
                    { 
                        id: "isis",
                        name: "Isis", 
                        meaning: "A magia que reconstrói o quebrado.",
                        lore: "Deusa da Magia e Cura. Reuniu os pedaços de Osíris.",
                        effect: { q: 40, c: 80 }, 
                        symbol: "𓆓",
                        color: "#4cc9f0",
                        animation: "isis_wings",
                        revealTime: 1.8,
                        design: "isis_design"
                    },
                    { 
                        id: "osiris",
                        name: "Osíris", 
                        meaning: "A morte que é apenas porta.",
                        lore: "Deus da Ressurreição. Senhor do Submundo e da Vida Após a Morte.",
                        effect: { q: 60, c: 60 }, 
                        symbol: "☥",
                        color: "#06d6a0",
                        animation: "osiris_regeneration",
                        revealTime: 1.6,
                        design: "osiris_design"
                    },
                    { 
                        id: "anubis",
                        name: "Anúbis", 
                        meaning: "O guardião da passagem. O peso da verdade na balança.",
                        lore: "Deus dos Mortos e Embalmamento. Pesador de Almas.",
                        effect: { q: 90, c: 60 }, 
                        symbol: "🐺",
                        color: "#8d99ae",
                        animation: "anubis_scale",
                        revealTime: 1.9,
                        design: "anubis_design"
                    },
                    { 
                        id: "horus",
                        name: "Hórus", 
                        meaning: "O olho que tudo vê. A justiça que vem das alturas.",
                        lore: "Deus do Céu. O Olho que Tudo Vê, filho de Isis e Osíris.",
                        effect: { q: 110, c: 40 }, 
                        symbol: "👁️",
                        color: "#00f3ff",
                        animation: "horus_eye",
                        revealTime: 1.4,
                        design: "horus_design"
                    }
                ]
            },
            celtic: {
                name: "Murmúrios dos Druidas",
                color: "#00ffaa",
                symbol: "🜔",
                cards: [
                    { 
                        id: "morrigan",
                        name: "Morrígan", 
                        meaning: "O corvo que anuncia o fim.",
                        lore: "Deusa Tríplice da Guerra e Destino. A Fada que se transforma em Corvo.",
                        effect: { q: -30, c: 70 }, 
                        symbol: "⚔️",
                        color: "#7209b7",
                        animation: "morrigan_raven",
                        revealTime: 1.5,
                        design: "morrigan_design"
                    },
                    { 
                        id: "dagda",
                        name: "Dagda", 
                        meaning: "O caldeirão que nunca esvazia.",
                        lore: "Bom Deus. Pai de Todos. Dono do Caldeirão da Abundância.",
                        effect: { q: 100, c: 10 }, 
                        symbol: "🍯",
                        color: "#ffb347",
                        animation: "dagda_cauldron",
                        revealTime: 1.2,
                        design: "dagda_design"
                    },
                    { 
                        id: "brigid",
                        name: "Brigid", 
                        meaning: "O fogo que aquece e inspira.",
                        lore: "Deusa Tripla do Fogo: Fogo da Forja, Fogo do Lar, Fogo da Inspiração.",
                        effect: { q: 50, c: 40 }, 
                        symbol: "🔥",
                        color: "#ff6b6b",
                        animation: "brigid_flame",
                        revealTime: 1.3,
                        design: "brigid_design"
                    },
                    { 
                        id: "cernunnos",
                        name: "Cernunnos", 
                        meaning: "O senhor dos animais. A natureza selvagem que renasce.",
                        lore: "Deus Chifrudo. Senhor dos Animais e da Natureza Selvagem.",
                        effect: { q: 70, c: 80 }, 
                        symbol: "🦌",
                        color: "#06d6a0",
                        animation: "cernunnos_antlers",
                        revealTime: 1.7,
                        design: "cernunnos_design"
                    },
                    { 
                        id: "epona",
                        name: "Epona", 
                        meaning: "A deusa cavalo que leva à terra prometida. A jornada é o destino.",
                        lore: "Deusa Cavalo. Protetora dos Cavalos, Cavaleiros e Viajantes.",
                        effect: { q: 60, c: 90 }, 
                        symbol: "🐎",
                        color: "#9d4edd",
                        animation: "epona_gallop",
                        revealTime: 1.6,
                        design: "epona_design"
                    }
                ]
            }
        };
    }

    // ==================== ANIMAÇÕES ====================
    initializeAnimations() {
        return {
            quantum_swirl: function(cardElement) {
                return new Promise((resolve) => {
                    const swirl = document.createElement('div');
                    swirl.className = 'quantum-swirl-animation';
                    swirl.style.cssText = `
                        position: absolute;
                        width: 200%;
                        height: 200%;
                        background: conic-gradient(from 0deg, 
                            transparent, ${cardElement.style.color || '#00f3ff'}, transparent);
                        border-radius: 50%;
                        animation: swirl-reveal 1.2s ease-out forwards;
                        z-index: -1;
                    `;
                    
                    cardElement.appendChild(swirl);
                    
                    setTimeout(() => {
                        swirl.remove();
                        resolve();
                    }, 1200);
                });
            },

            sparkle_burst: function(cardElement) {
                return new Promise((resolve) => {
                    const sparks = 15;
                    for (let i = 0; i < sparks; i++) {
                        const spark = document.createElement('div');
                        spark.className = 'spark-particle';
                        spark.style.cssText = `
                            position: absolute;
                            width: 4px;
                            height: 4px;
                            background: ${cardElement.style.color || '#ffd60a'};
                            border-radius: 50%;
                            left: 50%;
                            top: 50%;
                            animation: spark-burst 1.5s ease-out ${i * 0.1}s forwards;
                            z-index: 10;
                        `;
                        cardElement.appendChild(spark);
                        
                        setTimeout(() => spark.remove(), 1500);
                    }
                    setTimeout(resolve, 1500);
                });
            },

            moon_phase: function(cardElement) {
                return new Promise((resolve) => {
                    const moon = document.createElement('div');
                    moon.className = 'moon-phase-animation';
                    moon.style.cssText = `
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        border-radius: 50%;
                        box-shadow: inset 0 0 0 999px rgba(76, 201, 240, 0.1);
                        animation: moon-phase 1.8s ease-in-out forwards;
                        z-index: -1;
                    `;
                    
                    cardElement.appendChild(moon);
                    setTimeout(() => {
                        moon.remove();
                        resolve();
                    }, 1800);
                });
            },

            lightning_strike: function(cardElement) {
                return new Promise((resolve) => {
                    const lightning = document.createElement('div');
                    lightning.className = 'lightning-animation';
                    lightning.style.cssText = `
                        position: absolute;
                        width: 4px;
                        height: 0;
                        background: linear-gradient(to bottom, 
                            transparent, 
                            ${cardElement.style.color || '#ff6b6b'}, 
                            transparent);
                        left: 50%;
                        top: 0;
                        transform: translateX(-50%);
                        animation: lightning-strike 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                        z-index: 10;
                    `;
                    
                    cardElement.appendChild(lightning);
                    setTimeout(() => {
                        lightning.remove();
                        resolve();
                    }, 800);
                });
            },

            // Mais animações podem ser adicionadas aqui...
        };
    }

    // ==================== DESIGNS DE CARTAS ====================
    initializeCardDesigns() {
        return {
            fool_design: function(cardElement, cardData) {
                cardElement.innerHTML = `
                    <div class="card-back custom-design">
                        <div class="card-border" style="border-color: ${cardData.color}"></div>
                        <div class="card-symbol-large" style="color: ${cardData.color}">${cardData.symbol}</div>
                        <div class="card-glow" style="background: radial-gradient(circle, ${cardData.color}22 0%, transparent 70%)"></div>
                        <div class="card-particles"></div>
                        <div class="card-content">
                            <div class="card-name" style="color: ${cardData.color}">${cardData.name}</div>
                            <div class="card-meaning">${cardData.meaning}</div>
                            <div class="card-lore">${cardData.lore}</div>
                        </div>
                    </div>
                `;
            },

            magician_design: function(cardElement, cardData) {
                cardElement.innerHTML = `
                    <div class="card-back custom-design">
                        <div class="card-border" style="border-color: ${cardData.color}"></div>
                        <div class="card-symbol-large animate-float" style="color: ${cardData.color}">${cardData.symbol}</div>
                        <div class="magician-tools">
                            <div class="tool" style="animation-delay: 0.2s">⚗️</div>
                            <div class="tool" style="animation-delay: 0.4s">📜</div>
                            <div class="tool" style="animation-delay: 0.6s">🗡️</div>
                            <div class="tool" style="animation-delay: 0.8s">🪙</div>
                        </div>
                        <div class="card-content">
                            <div class="card-name" style="color: ${cardData.color}">${cardData.name}</div>
                            <div class="card-meaning">${cardData.meaning}</div>
                            <div class="card-lore">${cardData.lore}</div>
                        </div>
                    </div>
                `;
            },

            // Adicionar mais designs conforme necessário...
        };
    }

    // ==================== MÉTODOS PÚBLICOS ====================
    getDeck(field = 'base') {
        return this.decks[field] || this.decks.base;
    }

    getCard(field = 'base', cardId = null) {
        const deck = this.getDeck(field);
        if (cardId) {
            return deck.cards.find(card => card.id === cardId) || deck.cards[0];
        }
        return deck.cards[Math.floor(Math.random() * deck.cards.length)];
    }

    getRandomCard(field = 'base') {
        const deck = this.getDeck(field);
        return deck.cards[Math.floor(Math.random() * deck.cards.length)];
    }

    getMultipleCards(field = 'base', count = 3) {
        const deck = this.getDeck(field);
        const shuffled = [...deck.cards].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    async revealCardWithAnimation(cardElement, cardData) {
        // 1. Aplicar design personalizado
        if (this.cardDesigns[cardData.design]) {
            this.cardDesigns[cardData.design](cardElement, cardData);
        }

        // 2. Executar animação
        if (this.cardAnimations[cardData.animation]) {
            await this.cardAnimations[cardData.animation](cardElement, cardData);
        }

        // 3. Adicionar efeitos pós-revelação
        this.addCardEffects(cardElement, cardData);

        return cardData;
    }

    addCardEffects(cardElement, cardData) {
        // Efeito de brilho pós-revelação
        const glow = document.createElement('div');
        glow.className = 'post-reveal-glow';
        glow.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, ${cardData.color}22 0%, transparent 70%);
            animation: pulse-glow 2s ease-in-out infinite;
            z-index: -1;
            pointer-events: none;
        `;
        cardElement.appendChild(glow);
    }
}

// ==================== ANIMAÇÕES CSS DINÂMICAS ====================
function injectCardAnimationsCSS() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes swirl-reveal {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1) rotate(180deg); opacity: 0.8; }
            100% { transform: scale(1.5) rotate(360deg); opacity: 0; }
        }

        @keyframes spark-burst {
            0% { transform: translate(0, 0) scale(0); opacity: 1; }
            100% { 
                transform: translate(
                    ${Math.random() * 100 - 50}px, 
                    ${Math.random() * 100 - 50}px
                ) scale(1); 
                opacity: 0;
            }
        }

        @keyframes moon-phase {
            0% { box-shadow: inset 0 0 0 999px rgba(76, 201, 240, 0); }
            50% { box-shadow: inset 0 0 0 0 rgba(76, 201, 240, 0.3); }
            100% { box-shadow: inset 0 0 0 999px rgba(76, 201, 240, 0); }
        }

        @keyframes lightning-strike {
            0% { height: 0; opacity: 0; }
            10% { height: 100%; opacity: 1; }
            20% { height: 100%; opacity: 0.5; }
            30% { height: 100%; opacity: 1; }
            100% { height: 100%; opacity: 0; }
        }

        @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-float {
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }

        /* Estilos para designs personalizados */
        .custom-design {
            position: relative;
            overflow: hidden;
            padding: 20px;
        }

        .card-border {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 2px solid;
            border-radius: 12px;
            pointer-events: none;
        }

        .card-symbol-large {
            font-size: 48px;
            text-align: center;
            margin: 20px 0;
            filter: drop-shadow(0 0 10px currentColor);
        }

        .card-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 150%;
            height: 150%;
            pointer-events: none;
            z-index: -1;
        }

        .card-content {
            position: relative;
            z-index: 2;
        }

        .card-name {
            font-family: 'Share Tech Mono', monospace;
            font-size: 18px;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 15px;
            text-align: center;
        }

        .card-meaning {
            font-size: 14px;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 10px;
            font-style: italic;
            text-align: center;
        }

        .card-lore {
            font-size: 11px;
            color: rgba(255, 255, 255, 0.6);
            line-height: 1.4;
            text-align: center;
            margin-top: 15px;
            padding-top: 10px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .magician-tools {
            display: flex;
            justify-content: space-around;
            margin: 20px 0;
            opacity: 0.7;
        }

        .magician-tools .tool {
            animation: tool-appear 0.5s ease-out forwards;
            opacity: 0;
        }

        @keyframes tool-appear {
            to { opacity: 1; transform: translateY(0); }
        }

        /* Efeitos de partículas */
        .card-particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        }

        .card-particles::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 80%, rgba(0, 243, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(157, 78, 221, 0.1) 0%, transparent 50%);
            animation: quantum-particles 8s linear infinite;
        }

        @keyframes quantum-particles {
            0% { 
                background-position: 0% 0%;
                filter: hue-rotate(0deg);
            }
            25% { 
                background-position: 100% 50%;
                filter: hue-rotate(90deg);
            }
            50% { 
                background-position: 50% 100%;
                filter: hue-rotate(180deg);
            }
            75% { 
                background-position: 0% 50%;
                filter: hue-rotate(270deg);
            }
            100% { 
                background-position: 0% 0%;
                filter: hue-rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Injetar CSS quando a biblioteca carrega
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectCardAnimationsCSS);
} else {
    injectCardAnimationsCSS();
}

// Exportar para uso global
window.OracleLibrary = OracleLibrary;