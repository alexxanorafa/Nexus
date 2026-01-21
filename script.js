/**
 * NEXUS 2126 - CORE ENGINE V3.0
 * Sistema Unificado com Memória, Progressão e Feedback
 */

class UniverseState {
    constructor() {
        this.position = { x: 50, y: 50 };
        this.velocity = { x: 0, y: 0 };
        this.throttle = 0;
        this.field = null;
        
        this.energy = { 
            quantum: 1000, 
            maxQ: 2000, 
            consciousness: 200,
            maxC: 1000,
            entropy: 0.05
        };
        
        this.influence = {
            norse: { level: 0, unlocked: [], color: '#00f3ff' },
            greek: { level: 0, unlocked: [], color: '#9d4edd' },
            egyptian: { level: 0, unlocked: [], color: '#ffd60a' },
            celtic: { level: 0, unlocked: [], color: '#00ffaa' }
        };
        
        this.history = [];
        this.lastOracleDraws = [];
        this.lastEventTime = Date.now();
        this.phase = 'explore'; // explore, alter, receive, choose
        
        // Desbloqueios por nível
        this.unlockThresholds = [5, 15, 30, 50];
        
        // Modificadores por campo
        this.fieldMods = {
            norse: { speed: 0.8, energyCost: 1.2, oracleWeight: 2, stability: 0.9 },
            greek: { speed: 1.5, energyCost: 0.8, oracleWeight: 1, stability: 0.6 },
            egyptian: { speed: 0.6, energyCost: 0.5, oracleWeight: 3, stability: 1.0 },
            celtic: { speed: 1.0, energyCost: 1.0, oracleWeight: 0.5, stability: 0.7 }
        };
    }

    getCurrentField(pos) {
        if (pos.x < 50 && pos.y < 50) return 'norse';
        if (pos.x >= 50 && pos.y < 50) return 'greek';
        if (pos.x < 50 && pos.y >= 50) return 'egyptian';
        return 'celtic';
    }

    updatePosition(x, y) {
        this.position.x = Math.max(0, Math.min(100, x));
        this.position.y = Math.max(0, Math.min(100, y));
        
        const newField = this.getCurrentField(this.position);
        if (newField !== this.field) {
            this.field = newField;
            this.onFieldChange();
        }
        
        // Ganhar influência no campo atual
        this.addInfluence(this.field, 0.01);
    }

    addInfluence(field, amount = 1) {
        if (!this.influence[field]) return null;
        
        const oldLevel = this.influence[field].level;
        this.influence[field].level += amount;
        
        // Verificar desbloqueios
        for (const threshold of this.unlockThresholds) {
            if (oldLevel < threshold && this.influence[field].level >= threshold) {
                if (!this.influence[field].unlocked.includes(threshold)) {
                    this.influence[field].unlocked.push(threshold);
                    return {
                        field,
                        threshold,
                        index: this.unlockThresholds.indexOf(threshold)
                    };
                }
            }
        }
        
        return null;
    }

    onFieldChange() {
        // Aumentar entropia ao mudar de campo
        this.energy.entropy = Math.min(0.3, this.energy.entropy + 0.02);
        
        // Registrar na história
        this.history.push({
            type: 'field_change',
            field: this.field,
            time: Date.now(),
            pos: { ...this.position }
        });
    }

    getFieldColor(field) {
        return this.influence[field]?.color || '#ffffff';
    }

    getFieldModifier(field) {
        return this.fieldMods[field] || this.fieldMods.celtic;
    }

    consumeEnergy(amount, type = 'quantum') {
        if (this.energy[type] >= amount) {
            this.energy[type] -= amount;
            return true;
        }
        return false;
    }

    addEnergy(amount, type = 'quantum') {
        this.energy[type] = Math.min(
            this.energy[`max${type.charAt(0).toUpperCase() + type.slice(1)}`],
            this.energy[type] + amount
        );
    }
}

class MovementEngine {
    constructor(universe) {
        this.universe = universe;
        this.driftAngle = 0;
        this.celticDirection = { x: 0, y: 0 };
        this.lastVector = { x: 0, y: 0 };
    }

    update(throttle, touchVector = null) {
        const field = this.universe.field;
        if (!field) return;
        
        const mod = this.universe.getFieldModifier(field);
        let vector = { x: 0, y: 0 };
        
        // Se houver toque, usar vetor de toque
        if (touchVector) {
            vector = touchVector;
        } else {
            // Campo vetorial baseado na mitologia
            switch(field) {
                case 'norse':
                    // Atração espiral para centro (25,25)
                    const center = { x: 25, y: 25 };
                    const dx = center.x - this.universe.position.x;
                    const dy = center.y - this.universe.position.y;
                    const distance = Math.sqrt(dx*dx + dy*dy);
                    
                    // Força de atração (mais forte perto do centro)
                    const attraction = Math.max(0.01, 0.5 - distance/100);
                    vector.x = dx * attraction * 0.01;
                    vector.y = dy * attraction * 0.01;
                    
                    // Componente angular para espiral
                    this.driftAngle += 0.02;
                    vector.x += Math.sin(this.driftAngle) * 0.03;
                    vector.y += Math.cos(this.driftAngle) * 0.03;
                    break;
                    
                case 'greek':
                    // Movimento errático rápido
                    vector.x = (Math.random() - 0.5) * 0.3;
                    vector.y = (Math.random() - 0.5) * 0.3;
                    
                    // Tendência a ir para direita
                    vector.x += 0.1;
                    break;
                    
                case 'egyptian':
                    // Movimento lento e circular
                    this.driftAngle += 0.01;
                    vector.x = Math.sin(this.driftAngle) * 0.02;
                    vector.y = Math.cos(this.driftAngle) * 0.02;
                    break;
                    
                case 'celtic':
                    // Mudanças aleatórias de direção
                    if (Math.random() < 0.05) {
                        this.celticDirection = {
                            x: (Math.random() - 0.5) * 0.4,
                            y: (Math.random() - 0.5) * 0.4
                        };
                    }
                    vector = this.celticDirection;
                    break;
            }
        }
        
        // Aplicar throttle e modificadores
        const speed = (throttle / 100) * 0.25 * mod.speed;
        vector.x *= speed;
        vector.y *= speed;
        
        // Suavizar transições
        const smooth = 0.3;
        this.lastVector.x = this.lastVector.x * (1-smooth) + vector.x * smooth;
        this.lastVector.y = this.lastVector.y * (1-smooth) + vector.y * smooth;
        
        // Atualizar posição
        this.universe.updatePosition(
            this.universe.position.x + this.lastVector.x,
            this.universe.position.y + this.lastVector.y
        );
        
        // Consumo energético
        if (throttle > 10 && Math.random() > 0.9) {
            const cost = mod.energyCost * (throttle/100);
            this.universe.consumeEnergy(cost);
        }
        
        return this.lastVector;
    }
}

class OracleEngine {
    constructor(universe) {
        this.universe = universe;
        
        this.decks = {
            base: [
                { 
                    name: "O Louco", 
                    meaning: "Novos começos, liberdade, aventura",
                    effect: { q: 50, c: 10 },
                    symbol: "🃏"
                },
                { 
                    name: "O Mago", 
                    meaning: "Poder, manifestação, habilidade",
                    effect: { q: 100, c: 20 },
                    symbol: "🧙"
                },
                { 
                    name: "A Sacerdotisa", 
                    meaning: "Intuição, mistério, sabedoria oculta",
                    effect: { q: 20, c: 50 },
                    symbol: "🌙"
                },
                { 
                    name: "A Imperatriz", 
                    meaning: "Fertilidade, abundância, criação",
                    effect: { q: 80, c: 30 },
                    symbol: "👑"
                },
                { 
                    name: "A Torre", 
                    meaning: "Mudança súbita, caos, revelação",
                    effect: { q: -50, c: 40 },
                    symbol: "⚡"
                },
                { 
                    name: "A Estrela", 
                    meaning: "Esperança, renovação, inspiração",
                    effect: { q: 60, c: 60 },
                    symbol: "⭐"
                }
            ],
            norse: [
                { name: "Odin", meaning: "Sacrifício pela sabedoria", effect: { q: 150, c: -20 }, symbol: "👁️" },
                { name: "Thor", meaning: "Força bruta e proteção", effect: { q: 80, c: 10 }, symbol: "⚡" },
                { name: "Frigg", meaning: "Destino e intuição", effect: { q: 30, c: 40 }, symbol: "🔮" }
            ],
            greek: [
                { name: "Zeus", meaning: "Poder absoluto", effect: { q: 200, c: -30 }, symbol: "👑" },
                { name: "Atena", meaning: "Sabedoria estratégica", effect: { q: 70, c: 50 }, symbol: "🦉" },
                { name: "Apolo", meaning: "Luz e profecia", effect: { q: 90, c: 30 }, symbol: "☀️" }
            ],
            egyptian: [
                { name: "Ra", meaning: "Criação e poder solar", effect: { q: 120, c: 20 }, symbol: "🔥" },
                { name: "Isis", meaning: "Magia e cura", effect: { q: 40, c: 80 }, symbol: "𓆓" },
                { name: "Osíris", meaning: "Renascimento", effect: { q: 60, c: 60 }, symbol: "☥" }
            ],
            celtic: [
                { name: "Morrígan", meaning: "Destino e guerra", effect: { q: -30, c: 70 }, symbol: "⚔️" },
                { name: "Dagda", meaning: "Abundância", effect: { q: 100, c: 10 }, symbol: "🍯" },
                { name: "Brigid", meaning: "Cura e inspiração", effect: { q: 50, c: 40 }, symbol: "🔥" }
            ]
        };
    }

    draw(field = null) {
        const actualField = field || this.universe.field || 'base';
        const deck = this.getDeckForField(actualField);
        
        // Penalizar cartas recentes
        const weightedDeck = deck.map(card => {
            let weight = 1;
            const recentDraws = this.universe.lastOracleDraws.filter(d => 
                d.card.name === card.name && Date.now() - d.time < 30000
            );
            weight /= (recentDraws.length + 1);
            return { card, weight };
        });
        
        // Seleção ponderada
        const totalWeight = weightedDeck.reduce((sum, w) => sum + w.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const { card, weight } of weightedDeck) {
            if (random < weight) {
                // Aplicar modificadores do campo
                const mod = this.universe.getFieldModifier(actualField);
                const adjustedEffect = {
                    q: card.effect.q * mod.oracleWeight,
                    c: card.effect.c * (actualField === 'base' ? 1 : 1.5)
                };
                
                // Registrar no histórico
                this.universe.lastOracleDraws.unshift({
                    card: { ...card, effect: adjustedEffect },
                    field: actualField,
                    time: Date.now()
                });
                
                if (this.universe.lastOracleDraws.length > 5) {
                    this.universe.lastOracleDraws.pop();
                }
                
                return {
                    ...card,
                    effect: adjustedEffect,
                    field: actualField
                };
            }
            random -= weight;
        }
        
        return deck[0];
    }

    drawTriple() {
        const field = this.universe.field || 'base';
        return [
            this.draw(field),
            this.draw(field),
            this.draw(field)
        ];
    }

    getDeckForField(field) {
        let deck = [...this.decks.base];
        
        // Adicionar cartas específicas do campo se desbloqueado
        if (field !== 'base' && this.universe.influence[field].level >= 10) {
            deck = [...deck, ...this.decks[field]];
        }
        
        return deck;
    }
}

class UIManager {
    constructor(nexus) {
        this.nexus = nexus;
        this.universe = nexus.universe;
        this.microFeedbacks = [];
    }

    update() {
        this.updatePosition();
        this.updateEnergy();
        this.updateInfluence();
        this.updatePhase();
        this.checkCriticalEnergy();
        this.cleanMicroFeedbacks();
    }

    updatePosition() {
        const pos = this.universe.position;
        const vehicle = document.getElementById('playerVehicle');
        
        vehicle.style.left = `${pos.x}%`;
        vehicle.style.top = `${pos.y}%`;
        
        // Atualizar HUD
        const qX = pos.x < 50 ? 'L' : 'R';
        const qY = pos.y < 50 ? 'T' : 'B';
        document.getElementById('hudPos').textContent = `${qY}${qX}-${Math.floor(pos.x)}`;
        
        // Atualizar campo atual
        const field = this.universe.field;
        if (field) {
            document.getElementById('fieldDisplay').textContent = `FIELD: ${field.toUpperCase()}`;
            
            // Adicionar classe ao body para modos
            document.body.classList.remove('norse-field', 'greek-field', 'egyptian-field', 'celtic-field');
            document.body.classList.add(`${field}-field`);
        }
    }

    updateEnergy() {
        const qPct = (this.universe.energy.quantum / this.universe.energy.maxQ) * 100;
        const cPct = (this.universe.energy.consciousness / this.universe.energy.maxC) * 100;
        
        document.getElementById('barQuantum').style.width = `${qPct}%`;
        document.getElementById('valQuantum').textContent = Math.floor(this.universe.energy.quantum);
        
        document.getElementById('barConsciousness').style.width = `${cPct}%`;
        document.getElementById('valConsciousness').textContent = Math.floor(this.universe.energy.consciousness);
        
        // Velocidade
        const throttle = this.universe.throttle;
        document.getElementById('velocityDisplay').textContent = `SPD: ${Math.floor(throttle)}%`;
    }

    updateInfluence() {
        const fields = ['norse', 'greek', 'egyptian', 'celtic'];
        fields.forEach(field => {
            const influence = this.universe.influence[field];
            const pct = Math.min(100, influence.level);
            const bar = document.getElementById(`inf${field.charAt(0).toUpperCase() + field.slice(1)}`);
            
            if (bar) {
                bar.style.width = `${pct}%`;
                bar.style.backgroundColor = influence.color;
            }
            
            // Atualizar zonas desbloqueadas
            const zone = document.querySelector(`.district-zone[data-field="${field}"]`);
            if (zone) {
                if (influence.level >= 5) {
                    zone.classList.add('unlocked');
                }
                zone.style.opacity = 0.3 + (influence.level / 100) * 0.5;
            }
        });
    }

    updatePhase() {
        const phase = this.universe.phase;
        document.getElementById('phaseDisplay').textContent = phase.toUpperCase();
        document.body.classList.remove('explore-mode', 'alter-mode', 'receive-mode', 'choose-mode');
        document.body.classList.add(`${phase}-mode`);
    }

    checkCriticalEnergy() {
        const critical = this.universe.energy.quantum < 100;
        if (critical && !document.body.classList.contains('critical-energy')) {
            document.body.classList.add('critical-energy');
            this.showTransmission('SYSTEM', 'Warning: Quantum energy critical. Seek recharge zone.');
        } else if (!critical && document.body.classList.contains('critical-energy')) {
            document.body.classList.remove('critical-energy');
        }
    }

    showTransmission(god, message) {
        const tx = document.getElementById('divineTransmission');
        document.getElementById('txGodName').textContent = god;
        document.getElementById('txMessage').textContent = message;
        
        tx.classList.add('active');
        setTimeout(() => tx.classList.remove('active'), 5000);
        
        this.log(`Transmission: ${god} - ${message}`);
    }

    showOracle(cards) {
        const overlay = document.getElementById('oracleDeckOverlay');
        const display = document.getElementById('cardDisplay');
        const field = this.universe.field || 'base';
        
        // Atualizar título
        const fieldNames = {
            norse: 'RÚNICO',
            greek: 'OLÍMPICO',
            egyptian: 'FARAÔNICO',
            celtic: 'DRUIDA',
            base: 'QUÂNTICO'
        };
        
        document.getElementById('currentDeckTitle').textContent = 
            `SISTEMA ${fieldNames[field]}`;
        
        // Limpar e criar cartas
        display.innerHTML = '';
        cards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'oracle-card unrevealed';
            cardEl.dataset.index = index;
            cardEl.innerHTML = `
                <div class="card-front">?</div>
                <div class="card-back">
                    <div class="card-name">${card.name}</div>
                    <div class="card-meaning">${card.meaning}</div>
                    <div class="card-effects">
                        <small>Q: ${card.effect.q > 0 ? '+' : ''}${card.effect.q}</small>
                        <small>C: ${card.effect.c > 0 ? '+' : ''}${card.effect.c}</small>
                    </div>
                </div>
            `;
            
            cardEl.addEventListener('click', () => this.revealCard(cardEl, card));
            display.appendChild(cardEl);
        });
        
        overlay.classList.add('active');
        document.body.classList.add('ritual-mode');
    }

    revealCard(cardEl, card) {
        if (cardEl.classList.contains('flipped')) return;
        
        cardEl.classList.remove('unrevealed');
        cardEl.classList.add('flipped');
        
        // Aplicar efeitos
        this.universe.addEnergy(card.effect.q, 'quantum');
        this.universe.addEnergy(card.effect.c, 'consciousness');
        
        // Mostrar interpretação
        document.getElementById('destinyText').textContent = 
            `${card.name}: ${card.meaning}`;
        
        // Feedback visual
        cardEl.classList.add('revelation');
        setTimeout(() => cardEl.classList.remove('revelation'), 2000);
        
        this.log(`Oracle: ${card.name} revealed.`);
        this.createMicroFeedback(cardEl, `+${card.effect.q}Ω`, this.universe.influence[this.universe.field]?.color || '#ffffff');
    }

    closeOracle() {
        document.getElementById('oracleDeckOverlay').classList.remove('active');
        document.body.classList.remove('ritual-mode');
    }

    showHoloInfo(data) {
        const modal = document.getElementById('holoModal');
        const title = document.getElementById('holoTitle');
        const content = document.getElementById('holoContent');
        const footer = document.getElementById('holoFooter');
        
        title.textContent = data.name.toUpperCase();
        
        let html = '';
        if (data.desc) html += `<p>${data.desc}</p>`;
        if (data.power) html += `<div class="stat">POWER: ${data.power}</div>`;
        if (data.cost) html += `<div class="stat">COST: ${data.cost}Ω</div>`;
        if (data.type) html += `<div class="stat">TYPE: ${data.type}</div>`;
        
        content.innerHTML = html;
        footer.textContent = `ID: ${data.id || 'ENTITY'} // NEXUS.REF`;
        
        modal.classList.add('active');
    }

    log(message) {
        const feed = document.getElementById('logFeed');
        const div = document.createElement('div');
        div.className = 'log-entry';
        const ts = new Date().toLocaleTimeString('pt-BR', { hour12: false }).substring(0,5);
        div.innerHTML = `<span class="log-ts">[${ts}]</span> ${message}`;
        feed.prepend(div);
        
        // Limitar log a 15 entradas
        if (feed.children.length > 15) {
            feed.removeChild(feed.lastChild);
        }
    }

    createMicroFeedback(element, text, color = '#00f3ff') {
        const rect = element.getBoundingClientRect();
        const feedback = document.createElement('div');
        feedback.className = 'micro-feedback';
        feedback.textContent = text;
        feedback.style.color = color;
        feedback.style.left = `${rect.left + rect.width/2}px`;
        feedback.style.top = `${rect.top}px`;
        
        document.body.appendChild(feedback);
        this.microFeedbacks.push(feedback);
        
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 1000);
    }

    cleanMicroFeedbacks() {
        this.microFeedbacks = this.microFeedbacks.filter(fb => {
            if (!fb.parentNode) return false;
            const opacity = parseFloat(getComputedStyle(fb).opacity);
            return opacity > 0;
        });
    }

    showUnlockEffect(field, threshold) {
        const zone = document.querySelector(`.district-zone[data-field="${field}"]`);
        if (!zone) return;
        
        const effect = document.createElement('div');
        effect.className = 'unlock-effect';
        effect.style.color = this.universe.getFieldColor(field);
        
        zone.appendChild(effect);
        
        // Mostrar mensagem
        const messages = {
            5: `Nível ${threshold}: ${field.toUpperCase()} acessível`,
            15: `Nível ${threshold}: Deuses menores disponíveis`,
            30: `Nível ${threshold}: Rituais desbloqueados`,
            50: `Nível ${threshold}: ASCENSÃO ${field.toUpperCase()}`
        };
        
        this.showTransmission('SYSTEM', messages[threshold] || `Nível ${threshold} alcançado em ${field}`);
        
        // Remover efeito após animação
        setTimeout(() => {
            if (effect.parentNode) {
                effect.parentNode.removeChild(effect);
            }
        }, 2000);
    }

    showPhaseHint(text) {
        const hint = document.createElement('div');
        hint.className = 'phase-hint';
        hint.textContent = text;
        
        document.body.appendChild(hint);
        setTimeout(() => {
            if (hint.parentNode) {
                hint.parentNode.removeChild(hint);
            }
        }, 3000);
    }
}

class NexusCore {
    constructor() {
        this.universe = new UniverseState();
        this.movement = new MovementEngine(this.universe);
        this.oracle = new OracleEngine(this.universe);
        this.ui = new UIManager(this);
        
        this.isDragging = false;
        this.touchStart = null;
        this.lastTouchTime = 0;
        
        this.init();
    }

    init() {
        this.simulateBoot();
        this.setupBackground();
        this.renderBoard();
        this.setupControls();
        this.setupEcosystemMenu();
        this.setupMobileControls();
        this.gameLoop();
        
        // Restaurar estado salvo
        this.loadState();
    }

    simulateBoot() {
        const loader = document.getElementById('loader');
        const bar = document.getElementById('bootBar');
        const log = document.getElementById('bootLog');
        
        let progress = 0;
        const messages = [
            "Initializing Quantum Core...",
            "Loading Mythological Database...",
            "Calibrating Oracles...",
            "Connecting to Nexus...",
            "Booting UI Systems...",
            "Ready for Quantum Travel"
        ];
        
        const interval = setInterval(() => {
            progress += Math.random() * 4 + 1;
            if (progress > 100) progress = 100;
            
            bar.style.width = progress + "%";
            
            // Atualizar mensagem a cada 20%
            if (progress % 20 < 4) {
                const msgIndex = Math.min(Math.floor(progress / 20), messages.length - 1);
                log.textContent = messages[msgIndex];
            }
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = '0';
                    setTimeout(() => {
                        loader.style.display = 'none';
                        this.ui.log("System Online. Welcome to Nexus 2126.");
                        this.ui.showTransmission("SYSTEM", "Quantum field stable. Begin exploration.");
                    }, 500);
                }, 500);
            }
        }, 40);
    }

    setupBackground() {
        const canvas = document.getElementById('quantumField');
        const ctx = canvas.getContext('2d');
        
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resize);
        resize();
        
        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            speed: Math.random() * 0.5 + 0.1,
            color: Math.random() > 0.5 ? '#00f3ff' : '#9d4edd',
            opacity: Math.random() * 0.3 + 0.1
        }));
        
        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.y -= p.speed;
                if (p.y < 0) {
                    p.y = canvas.height;
                    p.x = Math.random() * canvas.width;
                }
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
            });
            
            requestAnimationFrame(drawParticles);
        };
        
        drawParticles();
    }

    renderBoard() {
        const districtLayer = document.getElementById('districtLayer');
        const entityLayer = document.getElementById('entityLayer');
        
        // Render districts
        const mythologies = [
            { id: "norse", name: "NÓRDICO", field: "norse", quadrant: {x:0, y:0, w:50, h:50} },
            { id: "greek", name: "GREGO", field: "greek", quadrant: {x:50, y:0, w:50, h:50} },
            { id: "egyptian", name: "EGÍPCIO", field: "egyptian", quadrant: {x:0, y:50, w:50, h:50} },
            { id: "celtic", name: "CELTA", field: "celtic", quadrant: {x:50, y:50, w:50, h:50} }
        ];
        
        mythologies.forEach(myth => {
            const el = document.createElement('div');
            el.className = 'district-zone';
            el.dataset.field = myth.field;
            el.style.left = myth.quadrant.x + '%';
            el.style.top = myth.quadrant.y + '%';
            el.style.width = myth.quadrant.w + '%';
            el.style.height = myth.quadrant.h + '%';
            el.style.color = this.universe.getFieldColor(myth.field);
            el.innerHTML = `<div class="district-name">${myth.name}</div>`;
            districtLayer.appendChild(el);
        });
        
        // Render gods
        const gods = [
            { id: "odin", name: "Odin", field: "norse", power: 9, cost: 300, desc: "Pai de todos e senhor da sabedoria." },
            { id: "thor", name: "Thor", field: "norse", power: 8, cost: 250, desc: "Deus do trovão e força bruta." },
            { id: "frigg", name: "Frigg", field: "norse", power: 7, cost: 200, desc: "Deusa do destino e intuição." },
            { id: "zeus", name: "Zeus", field: "greek", power: 10, cost: 400, desc: "Rei dos deuses e senhor dos céus." },
            { id: "athena", name: "Atena", field: "greek", power: 7, cost: 200, desc: "Sabedoria estratégica e guerra justa." },
            { id: "apollo", name: "Apolo", field: "greek", power: 8, cost: 250, desc: "Luz, música e profecia." },
            { id: "ra", name: "Ra", field: "egyptian", power: 9, cost: 300, desc: "Deus solar e criador primordial." },
            { id: "isis", name: "Isis", field: "egyptian", power: 8, cost: 250, desc: "Magia, cura e maternidade." },
            { id: "osiris", name: "Osíris", field: "egyptian", power: 7, cost: 200, desc: "Senhor da vida após a morte." },
            { id: "morrigan", name: "Morrígan", field: "celtic", power: 7, cost: 200, desc: "Deusa da guerra e do destino." },
            { id: "dagda", name: "Dagda", field: "celtic", power: 8, cost: 250, desc: "Senhor da terra e abundância." },
            { id: "brigid", name: "Brigid", field: "celtic", power: 6, cost: 150, desc: "Cura, poesia e forja." }
        ];
        
        // Distribuir deuses nos quadrantes
        gods.forEach(god => {
            const quadrant = mythologies.find(m => m.field === god.field).quadrant;
            const x = quadrant.x + 10 + Math.random() * 30;
            const y = quadrant.y + 10 + Math.random() * 30;
            
            const el = document.createElement('div');
            el.className = 'entity-node';
            el.style.left = `${x}%`;
            el.style.top = `${y}%`;
            el.style.color = this.universe.getFieldColor(god.field);
            el.innerHTML = `<div class="entity-label">${god.name}</div>`;
            
            el.addEventListener('click', () => {
                this.ui.showHoloInfo(god);
                this.universe.addInfluence(god.field, 5);
                this.ui.createMicroFeedback(el, `+5 Influence`, this.universe.getFieldColor(god.field));
            });
            
            entityLayer.appendChild(el);
        });
        
        // Render chakras no centro
        const chakras = [
            { id: "root", name: "Raiz", color: "#ff0000", freq: 396 },
            { id: "sacral", name: "Sacral", color: "#ff5500", freq: 417 },
            { id: "solar", name: "Plexo", color: "#ffff00", freq: 528 },
            { id: "heart", name: "Coração", color: "#00ff00", freq: 639 },
            { id: "throat", name: "Garganta", color: "#0000ff", freq: 741 },
            { id: "third", name: "3º Olho", color: "#4b0082", freq: 852 },
            { id: "crown", name: "Coroa", color: "#9400d3", freq: 960 }
        ];
        
        chakras.forEach((chakra, i) => {
            const angle = (i / 7) * Math.PI * 2;
            const radius = 20;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            
            const el = document.createElement('div');
            el.className = 'entity-node';
            el.style.left = `${x}%`;
            el.style.top = `${y}%`;
            el.style.color = chakra.color;
            el.style.border = '1px solid white';
            el.innerHTML = `<div class="entity-label">${chakra.name}</div>`;
            
            el.addEventListener('click', () => {
                this.ui.showHoloInfo({
                    name: chakra.name,
                    desc: `Frequência: ${chakra.freq}Hz. Centro energético vital.`,
                    type: 'Chakra'
                });
                this.universe.addEnergy(50, 'consciousness');
                this.ui.createMicroFeedback(el, `+50 Consciousness`, chakra.color);
            });
            
            entityLayer.appendChild(el);
        });
    }

    setupEcosystemMenu() {
        const icon = document.getElementById('menuIcon');
        const menu = document.getElementById('ecosystemMenu');
        const close = document.getElementById('closeMenu');
        
        const toggleMenu = () => {
            const isOpen = menu.classList.contains('active');
            if (isOpen) {
                menu.classList.remove('active');
                icon.classList.remove('open');
            } else {
                menu.classList.add('active');
                icon.classList.add('open');
            }
        };
        
        icon.addEventListener('click', toggleMenu);
        close.addEventListener('click', toggleMenu);
        
        // Fechar ao clicar fora
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('active') && 
                !menu.contains(e.target) && 
                !icon.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    setupControls() {
        // Botão do oráculo
        document.getElementById('btnOraclePanel').addEventListener('click', () => this.triggerOracle());
        document.getElementById('btnOracleMobile').addEventListener('click', () => this.triggerOracle());
        
        // Botão de pausa
        document.getElementById('btnPause').addEventListener('click', () => this.togglePause());
        
        // Painel direito mobile
        document.getElementById('toggleDataPanel').addEventListener('click', () => {
            document.getElementById('rightPanel').classList.toggle('open');
        });
        
        document.getElementById('closeRightPanel').addEventListener('click', () => {
            document.getElementById('rightPanel').classList.remove('open');
        });
        
        // Fechar modal
        document.getElementById('holoClose').addEventListener('click', () => {
            document.getElementById('holoModal').classList.remove('active');
        });
        
        // Fechar ao clicar fora do modal
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('holoModal');
            if (modal.classList.contains('active') && 
                !modal.contains(e.target) && 
                e.target.id !== 'holoClose') {
                modal.classList.remove('active');
            }
        });
        
        // Salvar estado antes de sair
        window.addEventListener('beforeunload', () => this.saveState());
    }

    setupMobileControls() {
        const board = document.getElementById('boardContainer');
        const vehicle = document.getElementById('playerVehicle');
        
        board.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.isDragging = true;
            this.touchStart = {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
                time: Date.now()
            };
            
            vehicle.classList.add('driving');
            this.universe.throttle = 20;
        });
        
        board.addEventListener('touchmove', (e) => {
            if (!this.isDragging || !this.touchStart) return;
            e.preventDefault();
            
            const touch = e.touches[0];
            const dx = touch.clientX - this.touchStart.x;
            const dy = touch.clientY - this.touchStart.y;
            
            // Calcular vetor de movimento
            const magnitude = Math.sqrt(dx*dx + dy*dy);
            const vector = {
                x: dx / (window.innerWidth * 0.5),
                y: dy / (window.innerHeight * 0.5)
            };
            
            // Atualizar throttle baseado na velocidade do gesto
            const timeDelta = Date.now() - this.touchStart.time;
            const speed = magnitude / Math.max(timeDelta, 1);
            this.universe.throttle = Math.min(100, speed * 2);
            
            // Atualizar movimento
            this.movement.update(this.universe.throttle, vector);
            
            this.touchStart = {
                x: touch.clientX,
                y: touch.clientY,
                time: Date.now()
            };
        });
        
        board.addEventListener('touchend', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            
            this.isDragging = false;
            this.touchStart = null;
            this.universe.throttle = 0;
            vehicle.classList.remove('driving');
        });
        
        // Controles de desktop com mouse
        board.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            
            this.isDragging = true;
            this.touchStart = {
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            };
            
            vehicle.classList.add('driving');
            this.universe.throttle = 30;
        });
        
        board.addEventListener('mousemove', (e) => {
            if (!this.isDragging || !this.touchStart) return;
            
            const dx = e.clientX - this.touchStart.x;
            const dy = e.clientY - this.touchStart.y;
            
            const vector = {
                x: dx / (window.innerWidth * 0.3),
                y: dy / (window.innerHeight * 0.3)
            };
            
            this.movement.update(this.universe.throttle, vector);
            
            this.touchStart = {
                x: e.clientX,
                y: e.clientY,
                time: Date.now()
            };
        });
        
        board.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.touchStart = null;
            this.universe.throttle = 0;
            vehicle.classList.remove('driving');
        });
        
        board.addEventListener('mouseleave', () => {
            if (this.isDragging) {
                this.isDragging = false;
                this.universe.throttle = 0;
                vehicle.classList.remove('driving');
            }
        });
    }

    gameLoop() {
        // Atualizar movimento se não estiver arrastando
        if (!this.isDragging && this.universe.throttle > 0) {
            this.movement.update(this.universe.throttle);
        }
        
        // Reduzir throttle gradualmente
        if (this.universe.throttle > 0 && !this.isDragging) {
            this.universe.throttle *= 0.95;
            if (this.universe.throttle < 1) this.universe.throttle = 0;
        }
        
        // Atualizar fase baseada no estado
        this.updatePhase();
        
        // Eventos aleatórios
        if (Date.now() - this.universe.lastEventTime > 10000 && Math.random() < 0.1) {
            this.triggerRandomEvent();
            this.universe.lastEventTime = Date.now();
        }
        
        // Verificar desbloqueios
        this.checkUnlocks();
        
        // Atualizar UI
        this.ui.update();
        
        // Próximo frame
        requestAnimationFrame(() => this.gameLoop());
    }

    updatePhase() {
        const oldPhase = this.universe.phase;
        let newPhase = oldPhase;
        
        if (this.universe.throttle > 10) {
            newPhase = 'explore';
        } else if (this.universe.lastOracleDraws.length > 0 && 
                  Date.now() - this.universe.lastOracleDraws[0].time < 5000) {
            newPhase = 'receive';
        } else if (this.isDragging) {
            newPhase = 'explore';
        } else {
            newPhase = 'choose';
        }
        
        if (newPhase !== oldPhase) {
            this.universe.phase = newPhase;
            const hints = {
                explore: "EXPLORE: Drag to navigate the quantum field",
                alter: "ALTER: Interact with deities and chakras",
                receive: "RECEIVE: Oracle revelations received",
                choose: "CHOOSE: Select your next action"
            };
            
            if (hints[newPhase]) {
                this.ui.showPhaseHint(hints[newPhase]);
            }
        }
    }

    triggerOracle() {
        if (this.universe.energy.quantum < 100) {
            this.ui.showTransmission("SYSTEM", "Insufficient quantum energy for oracle.");
            return;
        }
        
        this.universe.consumeEnergy(100, 'quantum');
        const cards = this.oracle.drawTriple();
        this.ui.showOracle(cards);
        
        this.ui.log(`Oracle engaged in ${this.universe.field} field.`);
    }

    drawTriple() {
        if (this.universe.energy.quantum < 50) {
            this.ui.showTransmission("SYSTEM", "Energy too low for triple draw.");
            return;
        }
        
        this.universe.consumeEnergy(50, 'quantum');
        const cards = this.oracle.drawTriple();
        
        // Mostrar na UI existente
        cards.forEach((card, i) => {
            const cardEl = document.querySelector(`.oracle-card[data-index="${i}"]`);
            if (cardEl) {
                this.ui.revealCard(cardEl, card);
            }
        });
    }

    closeOracle() {
        this.ui.closeOracle();
    }

    triggerRandomEvent() {
        const events = [
            () => {
                const god = this.oracle.decks.base[Math.floor(Math.random() * this.oracle.decks.base.length)];
                this.ui.showTransmission("QUANTUM ENTITY", god.meaning);
            },
            () => {
                this.universe.addEnergy(50, 'quantum');
                this.ui.createMicroFeedback(
                    document.getElementById('playerVehicle'),
                    "+50Ω",
                    '#00f3ff'
                );
                this.ui.log("Quantum energy surge detected.");
            },
            () => {
                const field = this.universe.field;
                if (field && this.universe.influence[field].level < 50) {
                    this.universe.addInfluence(field, 2);
                    this.ui.log(`Field resonance: ${field} influence increased.`);
                }
            }
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        randomEvent();
    }

    checkUnlocks() {
        const fields = ['norse', 'greek', 'egyptian', 'celtic'];
        fields.forEach(field => {
            const unlock = this.universe.addInfluence(field, 0);
            if (unlock) {
                this.ui.showUnlockEffect(field, unlock.threshold);
                
                // Desbloquear conteúdo
                switch(unlock.index) {
                    case 0: // Nível 5
                        this.ui.log(`${field.toUpperCase()} field accessible.`);
                        break;
                    case 1: // Nível 15
                        this.ui.showTransmission("SYSTEM", `Minor deities available in ${field}.`);
                        break;
                    case 2: // Nível 30
                        this.ui.showTransmission("SYSTEM", `Rituals unlocked in ${field}.`);
                        break;
                    case 3: // Nível 50
                        this.ui.showTransmission("ASCENSION", `${field.toUpperCase()} MASTERY ACHIEVED`);
                        this.universe.addEnergy(500, 'quantum');
                        break;
                }
            }
        });
    }

    togglePause() {
        const btn = document.getElementById('btnPause');
        const icon = btn.querySelector('i');
        
        if (this.universe.throttle === 0) {
            this.universe.throttle = 30;
            icon.className = 'fas fa-pause';
            this.ui.log("Navigation resumed.");
        } else {
            this.universe.throttle = 0;
            icon.className = 'fas fa-play';
            this.ui.log("Navigation paused.");
        }
    }

    saveState() {
        const state = {
            position: this.universe.position,
            energy: this.universe.energy,
            influence: this.universe.influence,
            history: this.universe.history.slice(-50) // Últimas 50 entradas
        };
        
        localStorage.setItem('nexus2126_state', JSON.stringify(state));
    }

    loadState() {
        try {
            const saved = localStorage.getItem('nexus2126_state');
            if (!saved) return;
            
            const state = JSON.parse(saved);
            
            if (state.position) {
                this.universe.position = state.position;
            }
            
            if (state.energy) {
                this.universe.energy = { ...this.universe.energy, ...state.energy };
            }
            
            if (state.influence) {
                Object.keys(state.influence).forEach(field => {
                    if (this.universe.influence[field]) {
                        this.universe.influence[field].level = state.influence[field].level || 0;
                        this.universe.influence[field].unlocked = state.influence[field].unlocked || [];
                    }
                });
            }
            
            if (state.history) {
                this.universe.history = state.history;
                this.ui.log("Previous session state restored.");
            }
        } catch (e) {
            console.warn("Failed to load saved state:", e);
        }
    }
}

// Inicializar o sistema
window.addEventListener('load', () => {
    window.nexus = new NexusCore();
});