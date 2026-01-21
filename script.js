/**
 * NEXUS 2126 - CORE ENGINE V4.0
 * Sistema completo com Tutorial, Missões e Cartas Expandidas
 */

class MissionSystem {
    constructor(universe) {
        this.universe = universe;
        this.activeMissions = [];
        this.completedMissions = [];
        this.initMissions();
    }
    
    initMissions() {
        this.missionTemplates = [
            {
                id: 'explorer',
                title: 'EXPLORADOR INICIANTE',
                description: 'Visite todos os 4 campos mitológicos',
                type: 'visit_fields',
                target: 4,
                reward: { quantum: 300, consciousness: 100 },
                icon: '🌍'
            },
            {
                id: 'oracle_initiate',
                title: 'INICIADO DO ORÁCULO',
                description: 'Consulte o oráculo 3 vezes',
                type: 'use_oracle',
                target: 3,
                reward: { quantum: 200, consciousness: 150 },
                icon: '🔮'
            },
            {
                id: 'norse_adept',
                title: 'ADEUTO NÓRDICO',
                description: 'Alcance nível 15 de influência nórdica',
                type: 'influence',
                field: 'norse',
                target: 15,
                reward: { quantum: 400, consciousness: 80 },
                icon: '⚡'
            },
            {
                id: 'entity_collector',
                title: 'COLETOR DE ENTIDADES',
                description: 'Interaja com 5 entidades diferentes',
                type: 'interact_entities',
                target: 5,
                reward: { quantum: 250, consciousness: 200 },
                icon: '✨'
            }
        ];
        
        this.loadProgress();
        
        if (this.activeMissions.length === 0) {
            this.activateMission('explorer');
            this.activateMission('oracle_initiate');
        }
    }
    
    activateMission(missionId) {
        const template = this.missionTemplates.find(m => m.id === missionId);
        if (!template) return;
        
        const mission = {
            ...template,
            progress: 0,
            isCompleted: false
        };
        
        this.activeMissions.push(mission);
        this.saveProgress();
        return mission;
    }
    
    updateProgress(type, data = {}) {
        let updated = false;
        
        this.activeMissions.forEach(mission => {
            if (mission.isCompleted) return;
            
            let progressChanged = false;
            
            switch(mission.type) {
                case 'visit_fields':
                    if (type === 'field_change') {
                        const uniqueFields = new Set();
                        this.universe.history.forEach(event => {
                            if (event.type === 'field_change') {
                                uniqueFields.add(event.field);
                            }
                        });
                        mission.progress = uniqueFields.size;
                        progressChanged = true;
                    }
                    break;
                    
                case 'use_oracle':
                    if (type === 'oracle_use') {
                        mission.progress++;
                        progressChanged = true;
                    }
                    break;
                    
                case 'influence':
                    if (type === 'influence_gain' && data.field === mission.field) {
                        mission.progress = this.universe.influence[mission.field].level;
                        progressChanged = true;
                    }
                    break;
                    
                case 'interact_entities':
                    if (type === 'entity_interact') {
                        mission.progress++;
                        progressChanged = true;
                    }
                    break;
            }
            
            if (progressChanged && mission.progress >= mission.target) {
                this.completeMission(mission);
                updated = true;
            }
        });
        
        if (updated) {
            this.saveProgress();
        }
    }
    
    completeMission(mission) {
        mission.isCompleted = true;
        mission.completedAt = Date.now();
        
        this.universe.addEnergy(mission.reward.quantum, 'quantum');
        this.universe.addEnergy(mission.reward.consciousness, 'consciousness');
        
        this.activeMissions = this.activeMissions.filter(m => m.id !== mission.id);
        this.completedMissions.push(mission);
        
        window.nexus.ui.showTransmission("MISSÃO", `"${mission.title}" completada! Recompensa recebida.`);
        window.nexus.ui.log(`Missão completada: ${mission.title}`);
        
        this.activateNextMission(mission);
    }
    
    activateNextMission(completedMission) {
        const nextMissions = {
            'explorer': 'norse_adept',
            'oracle_initiate': 'entity_collector'
        };
        
        const nextId = nextMissions[completedMission.id];
        if (nextId) {
            this.activateMission(nextId);
        }
    }
    
    saveProgress() {
        const progress = {
            active: this.activeMissions,
            completed: this.completedMissions
        };
        localStorage.setItem('nexus_missions', JSON.stringify(progress));
    }
    
    loadProgress() {
        try {
            const saved = localStorage.getItem('nexus_missions');
            if (saved) {
                const progress = JSON.parse(saved);
                this.activeMissions = progress.active || [];
                this.completedMissions = progress.completed || [];
            }
        } catch (e) {
            console.warn("Failed to load mission progress:", e);
        }
    }
    
    getMissionStatus() {
        return {
            active: this.activeMissions,
            completed: this.completedMissions,
            total: this.missionTemplates.length
        };
    }
}

class TutorialManager {
    constructor(nexus) {
        this.nexus = nexus;
        this.steps = [
            {
                title: "BEM-VINDO AO NEXUS",
                text: "Este é o cockpit de navegação quântica. Você pode explorar 4 campos mitológicos e consultar oráculos.",
                target: null,
                position: 'center'
            },
            {
                title: "NAVEGAÇÃO",
                text: "<strong>Arraste</strong> com o dedo ou mouse para mover sua nave. A velocidade é controlada pela distância do arrasto.",
                target: '#boardContainer',
                position: 'top'
            },
            {
                title: "ENTIDADES",
                text: "Clique em <strong>nós brilhantes</strong> para interagir com deuses e chakras. Eles concedem energia e influência.",
                target: '.entity-node',
                position: 'top',
                multiple: true
            },
            {
                title: "CAMPOS MITOLÓGICOS",
                text: "Cada quadrante representa uma mitologia. Navegue para ganhar influência em cada uma.",
                target: '.district-zone',
                position: 'center',
                multiple: true
            },
            {
                title: "PAINEL DE DADOS",
                text: "Aqui você monitora energia, influência e logs do sistema. Toque no ícone <i class='fas fa-chart-pie'></i> para abrir/fechar.",
                target: '#rightPanel',
                position: 'left'
            },
            {
                title: "ORÁCULO",
                text: "Use o oráculo para revelar cartas de destino. Cada carta afeta sua energia e consciência.",
                target: '#btnOraclePanel',
                position: 'left'
            },
            {
                title: "MENU DO ECOSSISTEMA",
                text: "Acesse outros projetos do Nexus através do menu no canto superior esquerdo.",
                target: '#menuIcon',
                position: 'right'
            },
            {
                title: "TUTORIAL CONCLUÍDO",
                text: "Agora você está pronto para explorar o Nexus. Lembre-se: o destino é fluido como o campo quântico.",
                target: null,
                position: 'center'
            }
        ];
        
        this.currentStep = 0;
        this.isActive = false;
        this.init();
    }
    
    init() {
        this.overlay = document.getElementById('tutorialOverlay');
        this.highlight = document.getElementById('tutorialHighlight');
        this.textEl = document.getElementById('tutorialText');
        this.stepEl = document.getElementById('tutorialStep');
        
        document.getElementById('tutorialPrev').addEventListener('click', () => this.prev());
        document.getElementById('tutorialNext').addEventListener('click', () => this.next());
        document.getElementById('tutorialSkip').addEventListener('click', () => this.complete());
        document.getElementById('tutorialReopen').addEventListener('click', () => this.start());
        
        if (!localStorage.getItem('nexus_tutorial_completed')) {
            setTimeout(() => this.start(), 1500);
        }
    }
    
    start() {
        this.isActive = true;
        this.currentStep = 0;
        this.overlay.classList.add('active');
        this.showStep(0);
        
        this.nexus.universe.throttle = 0;
        document.getElementById('playerVehicle').classList.remove('driving');
    }
    
    showStep(index) {
        if (index < 0 || index >= this.steps.length) return;
        
        this.currentStep = index;
        const step = this.steps[index];
        
        document.querySelector('.tutorial-header h3').innerHTML = `<i class="fas fa-graduation-cap"></i> ${step.title}`;
        this.textEl.innerHTML = step.text;
        this.stepEl.textContent = `${index + 1}/${this.steps.length}`;
        
        document.getElementById('tutorialPrev').style.display = index === 0 ? 'none' : 'flex';
        document.getElementById('tutorialNext').innerHTML = index === this.steps.length - 1 
            ? 'Começar Jornada <i class="fas fa-rocket"></i>' 
            : 'Próximo <i class="fas fa-arrow-right"></i>';
        
        if (step.target) {
            let targetElement;
            if (step.multiple) {
                const elements = document.querySelectorAll(step.target);
                targetElement = elements.length > 0 ? elements[0] : null;
            } else {
                targetElement = document.querySelector(step.target);
            }
            
            if (targetElement) {
                const rect = targetElement.getBoundingClientRect();
                this.highlight.style.width = `${rect.width + 20}px`;
                this.highlight.style.height = `${rect.height + 20}px`;
                this.highlight.style.left = `${rect.left - 10}px`;
                this.highlight.style.top = `${rect.top - 10}px`;
                this.highlight.style.display = 'block';
                
                this.positionModal(step.position, rect);
            } else {
                this.highlight.style.display = 'none';
                this.centerModal();
            }
        } else {
            this.highlight.style.display = 'none';
            this.centerModal();
        }
    }
    
    positionModal(position, targetRect) {
        const modal = document.querySelector('.tutorial-content');
        const modalRect = modal.getBoundingClientRect();
        const padding = 20;
        
        switch(position) {
            case 'top':
                modal.style.left = `${targetRect.left + targetRect.width/2 - modalRect.width/2}px`;
                modal.style.top = `${targetRect.top - modalRect.height - padding}px`;
                break;
            case 'bottom':
                modal.style.left = `${targetRect.left + targetRect.width/2 - modalRect.width/2}px`;
                modal.style.top = `${targetRect.bottom + padding}px`;
                break;
            case 'left':
                modal.style.left = `${targetRect.left - modalRect.width - padding}px`;
                modal.style.top = `${targetRect.top + targetRect.height/2 - modalRect.height/2}px`;
                break;
            case 'right':
                modal.style.left = `${targetRect.right + padding}px`;
                modal.style.top = `${targetRect.top + targetRect.height/2 - modalRect.height/2}px`;
                break;
        }
        
        let left = parseInt(modal.style.left);
        let top = parseInt(modal.style.top);
        
        if (left < padding) modal.style.left = `${padding}px`;
        if (top < padding) modal.style.top = `${padding}px`;
        if (left + modalRect.width > window.innerWidth - padding) {
            modal.style.left = `${window.innerWidth - modalRect.width - padding}px`;
        }
        if (top + modalRect.height > window.innerHeight - padding) {
            modal.style.top = `${window.innerHeight - modalRect.height - padding}px`;
        }
    }
    
    centerModal() {
        const modal = document.querySelector('.tutorial-content');
        modal.style.left = '50%';
        modal.style.top = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
    }
    
    next() {
        if (this.currentStep < this.steps.length - 1) {
            this.showStep(this.currentStep + 1);
        } else {
            this.complete();
        }
    }
    
    prev() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }
    
    complete() {
        this.isActive = false;
        this.overlay.classList.remove('active');
        localStorage.setItem('nexus_tutorial_completed', 'true');
        this.nexus.ui.log("Tutorial concluído. Boa jornada, viajante quântico!");
        this.nexus.ui.showTransmission("SYSTEM", "Sistemas de aprendizagem concluídos. O Nexus está à sua disposição.");
    }
}

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
        this.phase = 'explore';
        
        this.unlockThresholds = [5, 15, 30, 50];
        
        this.fieldMods = {
            norse: { speed: 0.8, energyCost: 1.2, oracleWeight: 2, stability: 0.9 },
            greek: { speed: 1.5, energyCost: 0.8, oracleWeight: 1, stability: 0.6 },
            egyptian: { speed: 0.6, energyCost: 0.5, oracleWeight: 3, stability: 1.0 },
            celtic: { speed: 1.0, energyCost: 1.0, oracleWeight: 0.5, stability: 0.7 }
        };
        
        this.missions = new MissionSystem(this);
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
        
        this.addInfluence(this.field, 0.01);
    }

    addInfluence(field, amount = 1) {
        if (!this.influence[field]) return null;
        
        const oldLevel = this.influence[field].level;
        this.influence[field].level += amount;
        
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
        this.energy.entropy = Math.min(0.3, this.energy.entropy + 0.02);
        
        this.history.push({
            type: 'field_change',
            field: this.field,
            time: Date.now(),
            pos: { ...this.position }
        });
        
        this.missions.updateProgress('field_change', { field: this.field });
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
        
        if (touchVector) {
            vector = touchVector;
        } else {
            switch(field) {
                case 'norse':
                    const center = { x: 25, y: 25 };
                    const dx = center.x - this.universe.position.x;
                    const dy = center.y - this.universe.position.y;
                    const distance = Math.sqrt(dx*dx + dy*dy);
                    
                    const attraction = Math.max(0.01, 0.5 - distance/100);
                    vector.x = dx * attraction * 0.01;
                    vector.y = dy * attraction * 0.01;
                    
                    this.driftAngle += 0.02;
                    vector.x += Math.sin(this.driftAngle) * 0.03;
                    vector.y += Math.cos(this.driftAngle) * 0.03;
                    break;
                    
                case 'greek':
                    vector.x = (Math.random() - 0.5) * 0.3;
                    vector.y = (Math.random() - 0.5) * 0.3;
                    vector.x += 0.1;
                    break;
                    
                case 'egyptian':
                    this.driftAngle += 0.01;
                    vector.x = Math.sin(this.driftAngle) * 0.02;
                    vector.y = Math.cos(this.driftAngle) * 0.02;
                    break;
                    
                case 'celtic':
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
        
        const speed = (throttle / 100) * 0.25 * mod.speed;
        vector.x *= speed;
        vector.y *= speed;
        
        const smooth = 0.3;
        this.lastVector.x = this.lastVector.x * (1-smooth) + vector.x * smooth;
        this.lastVector.y = this.lastVector.y * (1-smooth) + vector.y * smooth;
        
        this.universe.updatePosition(
            this.universe.position.x + this.lastVector.x,
            this.universe.position.y + this.lastVector.y
        );
        
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
                    meaning: "O vazio antes do salto. A fé no desconhecido.",
                    effect: { q: 50, c: 10 },
                    symbol: "🌀"
                },
                { 
                    name: "O Mago", 
                    meaning: "O gesto que transforma pensamento em realidade.",
                    effect: { q: 100, c: 20 },
                    symbol: "✨"
                },
                { 
                    name: "A Sacerdotisa", 
                    meaning: "O silêncio entre os mundos. A sabedoria que não se fala.",
                    effect: { q: 20, c: 50 },
                    symbol: "🌙"
                },
                { 
                    name: "A Imperatriz", 
                    meaning: "A terra que recebe a semente. A abundância natural.",
                    effect: { q: 80, c: 30 },
                    symbol: "🌿"
                },
                { 
                    name: "A Torre", 
                    meaning: "O raio que derruba estruturas velhas.",
                    effect: { q: -50, c: 40 },
                    symbol: "⚡"
                },
                { 
                    name: "A Estrela", 
                    meaning: "A luz que atravessa a noite mais densa.",
                    effect: { q: 60, c: 60 },
                    symbol: "💫"
                },
                { 
                    name: "O Eremita", 
                    meaning: "A luz que se busca no interior. O silêncio que ensina.",
                    effect: { q: 40, c: 80 },
                    symbol: "🕯️"
                },
                { 
                    name: "A Roda da Fortuna", 
                    meaning: "O ciclo que gira sem cessar. A sorte que vem e vai.",
                    effect: { q: Math.random() > 0.5 ? 120 : -80, c: 30 },
                    symbol: "🔄"
                },
                { 
                    name: "A Força", 
                    meaning: "O poder que vem da compaixão. O domar sem quebrar.",
                    effect: { q: 70, c: 50 },
                    symbol: "🦁"
                },
                { 
                    name: "O Julgamento", 
                    meaning: "O chamado para renascer. O despertar após o sono.",
                    effect: { q: 60, c: 90 },
                    symbol: "⚖️"
                }
            ],
            norse: [
                { 
                    name: "Odin", 
                    meaning: "O sacrifício por visão total. A dor que abre portais.",
                    effect: { q: 150, c: -20 }, 
                    symbol: "👁️"
                },
                { 
                    name: "Thor", 
                    meaning: "O trovão que parte montanhas. A força bruta.",
                    effect: { q: 80, c: 10 }, 
                    symbol: "⚡"
                },
                { 
                    name: "Frigg", 
                    meaning: "O tear que tece destinos. O fio invisível.",
                    effect: { q: 30, c: 40 }, 
                    symbol: "🧵"
                },
                { 
                    name: "Loki", 
                    meaning: "O fogo que brinca com a ordem. O caos que desata nós.",
                    effect: { q: -100, c: 150 }, 
                    symbol: "🔥"
                },
                { 
                    name: "Freya", 
                    meaning: "O amor que transcende mundos. A beleza que é poder.",
                    effect: { q: 80, c: 70 }, 
                    symbol: "💖"
                }
            ],
            greek: [
                { 
                    name: "Zeus", 
                    meaning: "O raio que decide. O poder absoluto.",
                    effect: { q: 200, c: -30 }, 
                    symbol: "👑"
                },
                { 
                    name: "Atena", 
                    meaning: "A estratégia que vence sem lutar.",
                    effect: { q: 70, c: 50 }, 
                    symbol: "🦉"
                },
                { 
                    name: "Apolo", 
                    meaning: "A luz que revela e cura. A música que acalma.",
                    effect: { q: 90, c: 30 }, 
                    symbol: "☀️"
                },
                { 
                    name: "Hades", 
                    meaning: "O reino das sombras e riquezas. O que está abaixo sustenta o que está acima.",
                    effect: { q: 150, c: -50 }, 
                    symbol: "⚰️"
                },
                { 
                    name: "Afrodite", 
                    meaning: "A atração que move mundos. O desejo que é criação.",
                    effect: { q: 50, c: 100 }, 
                    symbol: "💘"
                }
            ],
            egyptian: [
                { 
                    name: "Ra", 
                    meaning: "O sol que nasce todas as manhãs.",
                    effect: { q: 120, c: 20 }, 
                    symbol: "🔥"
                },
                { 
                    name: "Isis", 
                    meaning: "A magia que reconstrói o quebrado.",
                    effect: { q: 40, c: 80 }, 
                    symbol: "𓆓"
                },
                { 
                    name: "Osíris", 
                    meaning: "A morte que é apenas porta.",
                    effect: { q: 60, c: 60 }, 
                    symbol: "☥"
                },
                { 
                    name: "Anúbis", 
                    meaning: "O guardião da passagem. O peso da verdade na balança.",
                    effect: { q: 90, c: 60 }, 
                    symbol: "🐺"
                },
                { 
                    name: "Hórus", 
                    meaning: "O olho que tudo vê. A justiça que vem das alturas.",
                    effect: { q: 110, c: 40 }, 
                    symbol: "👁️"
                }
            ],
            celtic: [
                { 
                    name: "Morrígan", 
                    meaning: "O corvo que anuncia o fim.",
                    effect: { q: -30, c: 70 }, 
                    symbol: "⚔️"
                },
                { 
                    name: "Dagda", 
                    meaning: "O caldeirão que nunca esvazia.",
                    effect: { q: 100, c: 10 }, 
                    symbol: "🍯"
                },
                { 
                    name: "Brigid", 
                    meaning: "O fogo que aquece e inspira.",
                    effect: { q: 50, c: 40 }, 
                    symbol: "🔥"
                },
                { 
                    name: "Cernunnos", 
                    meaning: "O senhor dos animais. A natureza selvagem que renasce.",
                    effect: { q: 70, c: 80 }, 
                    symbol: "🦌"
                },
                { 
                    name: "Epona", 
                    meaning: "A deusa cavalo que leva à terra prometida. A jornada é o destino.",
                    effect: { q: 60, c: 90 }, 
                    symbol: "🐎"
                }
            ]
        };
    }

    draw(field = null) {
        const actualField = field || this.universe.field || 'base';
        const deck = this.getDeckForField(actualField);
        
        const weightedDeck = deck.map(card => {
            let weight = 1;
            const recentDraws = this.universe.lastOracleDraws.filter(d => 
                d.card.name === card.name && Date.now() - d.time < 30000
            );
            weight /= (recentDraws.length + 1);
            return { card, weight };
        });
        
        const totalWeight = weightedDeck.reduce((sum, w) => sum + w.weight, 0);
        let random = Math.random() * totalWeight;
        
        for (const { card, weight } of weightedDeck) {
            if (random < weight) {
                const mod = this.universe.getFieldModifier(actualField);
                const adjustedEffect = {
                    q: card.effect.q * mod.oracleWeight,
                    c: card.effect.c * (actualField === 'base' ? 1 : 1.5)
                };
                
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
        this.currentOracleCards = [];
        this.revealedCards = [];
    }

    update() {
        this.updatePosition();
        this.updateEnergy();
        this.updateInfluence();
        this.updatePhase();
        this.checkCriticalEnergy();
        this.cleanMicroFeedbacks();
        this.updateMissions();
    }

    updatePosition() {
        const pos = this.universe.position;
        const vehicle = document.getElementById('playerVehicle');
        
        vehicle.style.left = `${pos.x}%`;
        vehicle.style.top = `${pos.y}%`;
        
        const qX = pos.x < 50 ? 'L' : 'R';
        const qY = pos.y < 50 ? 'T' : 'B';
        document.getElementById('hudPos').textContent = `${qY}${qX}-${Math.floor(pos.x)}`;
        
        const field = this.universe.field;
        if (field) {
            document.getElementById('fieldDisplay').textContent = `FIELD: ${field.toUpperCase()}`;
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

    updateMissions() {
        const missionsList = document.getElementById('missionsList');
        const missionCount = document.getElementById('missionCount');
        
        if (!missionsList) return;
        
        const status = this.universe.missions.getMissionStatus();
        missionCount.textContent = `${status.completed.length}/${status.total}`;
        
        let html = '';
        
        status.active.forEach(mission => {
            const progress = Math.min(100, (mission.progress / mission.target) * 100);
            
            html += `
                <div class="mission-item">
                    <div class="mission-header">
                        <span class="mission-icon">${mission.icon}</span>
                        <span class="mission-title">${mission.title}</span>
                        <span class="mission-progress">${mission.progress}/${mission.target}</span>
                    </div>
                    <div class="mission-description">${mission.description}</div>
                    <div class="mission-bar">
                        <div class="mission-fill" style="width: ${progress}%"></div>
                    </div>
                </div>
            `;
        });
        
        if (status.active.length === 0) {
            html += `
                <div class="mission-item completed">
                    <div class="mission-header">
                        <span class="mission-icon">🏆</span>
                        <span class="mission-title">TODAS MISSÕES COMPLETADAS</span>
                    </div>
                    <div class="mission-description">Continue explorando para novas missões em atualizações futuras.</div>
                </div>
            `;
        }
        
        missionsList.innerHTML = html;
    }

    showTransmission(source, message) {
        const tx = document.getElementById('divineTransmission');
        
        const sourceNames = {
            SYSTEM: "VOZ DO SISTEMA",
            ODIN: "SUSSURRO DE ODIN",
            ZEUS: "ECO DO OLIMPO",
            RA: "SOL DE RÁ",
            MORRIGAN: "SOMBRA DA MORRÍGAN"
        };
        
        document.getElementById('txGodName').textContent = 
            sourceNames[source] || source;
        
        document.getElementById('txMessage').textContent = message;
        
        tx.classList.add('active');
        
        const logMessages = [
            `Sinal recebido de ${source.toLowerCase()}`,
            `${source} comunica-se`,
            `Transmissão: ${source}`,
            `Mensagem entrelaçada`
        ];
        
        this.log(logMessages[Math.floor(Math.random() * logMessages.length)]);
        
        setTimeout(() => tx.classList.remove('active'), 5000);
    }

    showOracle(cards) {
        const overlay = document.getElementById('oracleDeckOverlay');
        const display = document.getElementById('cardDisplay');
        const field = this.universe.field || 'base';
        
        const fieldTitles = {
            norse: 'Sussurros das Nornas',
            greek: 'Ecos do Olimpo', 
            egyptian: 'Vozes das Pirâmides',
            celtic: 'Murmúrios dos Druidas',
            base: 'Oráculo Quântico'
        };
        
        document.getElementById('currentDeckTitle').textContent = 
            fieldTitles[field];
        
        const drawTypes = {
            norse: 'Três Fios do Destino',
            greek: 'Três Votos do Olimpo',
            egyptian: 'Três Selos do Nilo',
            celtic: 'Três Círculos de Sabedoria',
            base: 'Três Destinos Entrelaçados'
        };
        
        document.getElementById('drawTypeLabel').textContent = 
            drawTypes[field];
        
        display.innerHTML = '';
        this.currentOracleCards = [...cards];
        this.revealedCards = [];
        
        cards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'oracle-card unrevealed';
            cardEl.dataset.index = index;
            cardEl.dataset.cardName = card.name;
            
            cardEl.innerHTML = `
                <div class="card-front">
                    <div class="card-symbol">?</div>
                    <div class="card-hint">Toca para revelar</div>
                </div>
                <div class="card-back">
                    <div class="card-name">${card.name}</div>
                    <div class="card-meaning">${card.meaning}</div>
                </div>
            `;
            
            cardEl.addEventListener('click', () => this.revealCard(cardEl, card, index));
            display.appendChild(cardEl);
        });
        
        overlay.classList.add('active');
        document.body.classList.add('ritual-mode');
        
        const arrivalMessages = {
            norse: 'Os corvos de Odin trazem visões...',
            greek: 'O néctar do Olimpo revela-se...',
            egyptian: 'As areias do tempo movem-se...',
            celtic: 'O véu dos mundos afina-se...',
            base: 'O campo quântico colapsa...'
        };
        
        document.getElementById('destinyText').innerHTML = 
            `<div class="interpretation-title">${arrivalMessages[field]}</div>`;
    }

    revealCard(cardEl, card, index) {
        if (cardEl.classList.contains('flipped')) return;
        
        cardEl.classList.remove('unrevealed');
        cardEl.classList.add('flipped');
        
        const oldQ = this.universe.energy.quantum;
        const oldC = this.universe.energy.consciousness;
        
        this.universe.addEnergy(card.effect.q, 'quantum');
        this.universe.addEnergy(card.effect.c, 'consciousness');
        
        const deltaQ = this.universe.energy.quantum - oldQ;
        
        if (deltaQ > 0) {
            cardEl.style.borderColor = '#00ffaa';
            cardEl.style.boxShadow = '0 0 25px rgba(0, 255, 170, 0.4)';
        } else if (deltaQ < 0) {
            cardEl.style.borderColor = '#ff5555';
            cardEl.style.boxShadow = '0 0 25px rgba(255, 85, 85, 0.4)';
        } else {
            cardEl.style.borderColor = '#9d4edd';
            cardEl.style.boxShadow = '0 0 25px rgba(157, 78, 221, 0.4)';
        }
        
        this.revealedCards.push({
            card: card,
            index: index
        });
        
        this.updateInterpretation();
        
        const color = deltaQ > 0 ? '#00ffaa' : (deltaQ < 0 ? '#ff5555' : '#9d4edd');
        this.createMicroFeedback(cardEl, '⚡', color);
        
        const logMessages = [
            `O oráculo revela: ${card.name}`,
            `${card.name} manifesta-se`,
            `Visão: ${card.name}`,
            `Destino desvelado: ${card.name}`
        ];
        
        this.log(logMessages[Math.floor(Math.random() * logMessages.length)]);
    }

    updateInterpretation() {
        const interpretationEl = document.getElementById('destinyText');
        
        if (this.revealedCards.length === 0) {
            const field = this.universe.field || 'base';
            const arrivalMessages = {
                norse: 'Os corvos de Odin trazem visões...',
                greek: 'O néctar do Olimpo revela-se...',
                egyptian: 'As areias do tempo movem-se...',
                celtic: 'O véu dos mundos afina-se...',
                base: 'O campo quântico colapsa...'
            };
            
            interpretationEl.innerHTML = 
                `<div class="interpretation-title">${arrivalMessages[field]}</div>`;
            return;
        }
        
        let html = `<div class="interpretation-title">Cartas Reveladas:</div>`;
        
        this.revealedCards.forEach((revealed, idx) => {
            const card = revealed.card;
            const field = card.field || this.universe.field || 'base';
            
            const fieldColors = {
                norse: '#00f3ff',
                greek: '#9d4edd',
                egyptian: '#ffd60a',
                celtic: '#00ffaa',
                base: '#ffffff'
            };
            
            const color = fieldColors[field] || '#ffffff';
            
            html += `
                <div class="card-interpretation-item">
                    <div class="interpretation-header">
                        <span class="card-number">${idx + 1}</span>
                        <strong class="card-name" style="color: ${color}">${card.name}</strong>
                    </div>
                    <div class="interpretation-meaning">${card.meaning}</div>
                </div>
            `;
        });
        
        if (this.revealedCards.length === 3) {
            const totalQ = this.revealedCards.reduce((sum, r) => sum + r.card.effect.q, 0);
            const totalC = this.revealedCards.reduce((sum, r) => sum + r.card.effect.c, 0);
            
            const effectText = totalQ > 0 ? 
                `Energia Quântica aumentada.` : 
                totalQ < 0 ? `Energia Quântica drenada.` : `Equilíbrio mantido.`;
            
            html += `
                <div class="interpretation-summary">
                    <div class="summary-text">${effectText}</div>
                    <div class="summary-hint">O destino está selado. Continue sua jornada.</div>
                </div>
            `;
        }
        
        interpretationEl.innerHTML = html;
    }

    closeOracle() {
        document.getElementById('oracleDeckOverlay').classList.remove('active');
        document.body.classList.remove('ritual-mode');
        this.currentOracleCards = [];
        this.revealedCards = [];
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
        
        this.universe.missions.updateProgress('entity_interact');
    }

    log(message) {
        const feed = document.getElementById('logFeed');
        const div = document.createElement('div');
        div.className = 'log-entry';
        
        const now = new Date();
        const ts = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
        
        div.innerHTML = `<span class="log-time">${ts}</span> ${message}`;
        feed.prepend(div);
        
        if (feed.children.length > 12) {
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
        feedback.style.fontSize = '16px';
        
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
        
        const messages = {
            5: `Nível ${threshold}: ${field.toUpperCase()} acessível`,
            15: `Nível ${threshold}: Deuses menores disponíveis`,
            30: `Nível ${threshold}: Rituais desbloqueados`,
            50: `Nível ${threshold}: ASCENSÃO ${field.toUpperCase()}`
        };
        
        this.showTransmission('SYSTEM', messages[threshold] || `Nível ${threshold} alcançado em ${field}`);
        
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
        this.tutorial = new TutorialManager(this);
        
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
        
        document.addEventListener('click', (e) => {
            if (menu.classList.contains('active') && 
                !menu.contains(e.target) && 
                !icon.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    setupControls() {
        document.getElementById('btnOraclePanel').addEventListener('click', () => this.triggerOracle());
        document.getElementById('btnOracleMobile').addEventListener('click', () => this.triggerOracle());
        
        document.getElementById('btnPause').addEventListener('click', () => this.togglePause());
        
        document.getElementById('toggleDataPanel').addEventListener('click', () => {
            document.getElementById('rightPanel').classList.toggle('open');
        });
        
        document.getElementById('closeRightPanel').addEventListener('click', () => {
            document.getElementById('rightPanel').classList.remove('open');
        });
        
        document.getElementById('holoClose').addEventListener('click', () => {
            document.getElementById('holoModal').classList.remove('active');
        });
        
        document.addEventListener('click', (e) => {
            const modal = document.getElementById('holoModal');
            if (modal.classList.contains('active') && 
                !modal.contains(e.target) && 
                e.target.id !== 'holoClose') {
                modal.classList.remove('active');
            }
        });
        
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
            
            const magnitude = Math.sqrt(dx*dx + dy*dy);
            const vector = {
                x: dx / (window.innerWidth * 0.5),
                y: dy / (window.innerHeight * 0.5)
            };
            
            const timeDelta = Date.now() - this.touchStart.time;
            const speed = magnitude / Math.max(timeDelta, 1);
            this.universe.throttle = Math.min(100, speed * 2);
            
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
        if (!this.isDragging && this.universe.throttle > 0) {
            this.movement.update(this.universe.throttle);
        }
        
        if (this.universe.throttle > 0 && !this.isDragging) {
            this.universe.throttle *= 0.95;
            if (this.universe.throttle < 1) this.universe.throttle = 0;
        }
        
        this.updatePhase();
        
        if (Date.now() - this.universe.lastEventTime > 10000 && Math.random() < 0.1) {
            this.triggerRandomEvent();
            this.universe.lastEventTime = Date.now();
        }
        
        this.checkUnlocks();
        
        this.ui.update();
        
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
        this.universe.missions.updateProgress('oracle_use');
    }

    drawTriple() {
        if (this.universe.energy.quantum < 50) {
            this.ui.showTransmission("SYSTEM", "Energy too low for triple draw.");
            return;
        }
        
        this.universe.consumeEnergy(50, 'quantum');
        const cards = this.oracle.drawTriple();
        
        setTimeout(() => {
            cards.forEach((card, i) => {
                const cardEl = document.querySelector(`.oracle-card[data-index="${i}"]`);
                if (cardEl) {
                    setTimeout(() => {
                        this.ui.revealCard(cardEl, card, i);
                    }, i * 500);
                }
            });
        }, 500);
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
                
                switch(unlock.index) {
                    case 0:
                        this.ui.log(`${field.toUpperCase()} field accessible.`);
                        break;
                    case 1:
                        this.ui.showTransmission("SYSTEM", `Minor deities available in ${field}.`);
                        break;
                    case 2:
                        this.ui.showTransmission("SYSTEM", `Rituals unlocked in ${field}.`);
                        break;
                    case 3:
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
            history: this.universe.history.slice(-50)
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

window.addEventListener('load', () => {
    window.nexus = new NexusCore();
});