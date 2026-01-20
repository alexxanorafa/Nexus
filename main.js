// === SISTEMA QUÂNTICO - TESE DE DOUTORAMENTO EM DESIGN MULTIMÉDIA ===

class QuantumMonopoly {
    constructor() {
        this.gameState = {
            player: {
                position: 0,
                eden: 0,
                quantum: 1000,
                turn: 1,
                consciousness: 100,
                chakras: {
                    root: { state: 'active', energy: 100 },
                    sacral: { state: 'active', energy: 100 },
                    solar: { state: 'active', energy: 100 },
                    heart: { state: 'active', energy: 100 },
                    throat: { state: 'active', energy: 100 },
                    'third-eye': { state: 'active', energy: 100 },
                    crown: { state: 'active', energy: 100 }
                },
                pantheon: {
                    odin: { power: 0, cards: [], temples: 0 },
                    zeus: { power: 0, cards: [], temples: 0 },
                    isis: { power: 0, cards: [], temples: 0 },
                    morrigan: { power: 0, cards: [], temples: 0 }
                },
                properties: [],
                activeCards: []
            },
            board: [
                { id: 0, name: 'Ponto Zero Quântico', type: 'singularity', mythology: 'quantum', value: '∞' },
                { id: 1, name: 'Valhalla', type: 'property', mythology: 'nordic', price: 200, owner: null },
                { id: 2, name: 'Monte Olimpo', type: 'property', mythology: 'greek', price: 300, owner: null },
                { id: 3, name: 'Vale do Nilo', type: 'property', mythology: 'egyptian', price: 250, owner: null },
                { id: 4, name: 'Avalon', type: 'property', mythology: 'celtic', price: 180, owner: null },
                { id: 5, name: 'Jardim do Karma', type: 'property', mythology: 'eastern', price: 220, owner: null },
                { id: 6, name: 'Circulo Xamânico', type: 'property', mythology: 'shamanic', price: 150, owner: null },
                { id: 7, name: 'Singularidade', type: 'event', mythology: 'quantum', effect: 'quantum_leap' },
                { id: 8, name: 'Arcano Maior', type: 'card', mythology: 'arcana', effect: 'draw_card' },
                { id: 9, name: 'Yggdrasil', type: 'property', mythology: 'nordic', price: 350, owner: null },
                { id: 10, name: 'Atena', type: 'property', mythology: 'greek', price: 280, owner: null },
                { id: 11, name: 'Anúbis', type: 'property', mythology: 'egyptian', price: 240, owner: null },
                { id: 12, name: 'Merlin', type: 'property', mythology: 'celtic', price: 320, owner: null },
                { id: 13, name: 'Zen', type: 'property', mythology: 'eastern', price: 190, owner: null },
                { id: 14, name: 'Totem', type: 'property', mythology: 'shamanic', price: 170, owner: null },
                { id: 15, name: 'Entrelaçamento', type: 'event', mythology: 'quantum', effect: 'quantum_entanglement' },
                { id: 16, name: 'Tarot', type: 'card', mythology: 'arcana', effect: 'draw_card' },
                { id: 17, name: 'Asgard', type: 'property', mythology: 'nordic', price: 400, owner: null },
                { id: 18, name: 'Poseidon', type: 'property', mythology: 'greek', price: 320, owner: null },
                { id: 19, name: 'Rá', type: 'property', mythology: 'egyptian', price: 290, owner: null },
                { id: 20, name: 'Druida', type: 'property', mythology: 'celtic', price: 210, owner: null },
                { id: 21, name: 'Dharma', type: 'property', mythology: 'eastern', price: 230, owner: null },
                { id: 22, name: 'Espírito', type: 'property', mythology: 'shamanic', price: 180, owner: null },
                { id: 23, name: 'Superposição', type: 'event', mythology: 'quantum', effect: 'quantum_superposition' },
                { id: 24, name: 'Runas', type: 'card', mythology: 'arcana', effect: 'draw_card' },
                { id: 25, name: 'Loki', type: 'property', mythology: 'nordic', price: 180, owner: null },
                { id: 26, name: 'Apolo', type: 'property', mythology: 'greek', price: 260, owner: null },
                { id: 27, name: 'Osíris', type: 'property', mythology: 'egyptian', price: 310, owner: null }
            ],
            cards: [
                { id: 1, name: 'O Louco', type: 'major', value: 5, quantum: 50, effect: 'extra_move', affinity: ['odin', 'zeus'] },
                { id: 2, name: 'A Morte', type: 'major', value: 8, quantum: 80, effect: 'reset_chakra', affinity: ['isis', 'morrigan'] },
                { id: 3, name: 'O Mago', type: 'major', value: 7, quantum: 70, effect: 'gain_quantum', affinity: ['odin', 'isis'] },
                { id: 4, name: 'A Imperatriz', type: 'major', value: 6, quantum: 60, effect: 'boost_eden', affinity: ['isis', 'morrigan'] },
                { id: 5, name: 'O Imperador', type: 'major', value: 9, quantum: 90, effect: 'gain_property', affinity: ['odin', 'zeus'] },
                { id: 6, name: 'Fehu', type: 'rune', value: 3, quantum: 30, effect: 'wealth', affinity: ['odin'] },
                { id: 7, name: 'Uruz', type: 'rune', value: 4, quantum: 40, effect: 'strength', affinity: ['zeus'] },
                { id: 8, name: 'Ansuz', type: 'rune', value: 5, quantum: 50, effect: 'wisdom', affinity: ['isis'] },
                { id: 9, name: 'Raido', type: 'rune', value: 4, quantum: 40, effect: 'journey', affinity: ['morrigan'] }
            ],
            events: [
                { id: 1, name: 'Salto Quântico', type: 'quantum_leap', effect: 'jump', value: 3 },
                { id: 2, name: 'Entrelaçamento', type: 'quantum_entanglement', effect: 'mirror', value: 2 },
                { id: 3, name: 'Superposição', type: 'quantum_superposition', effect: 'choice', value: 1 }
            ],
            diceHistory: [],
            isRolling: false,
            isModalOpen: false
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateUI();
        this.animateBackground();
        this.addLog('Sistema quântico inicializado. Realidade estabilizada.', 'system');
        this.addLog('Consciência principal sincronizada. Pronto para transcender.', 'system');
    }

    bindEvents() {
        // Dados
        document.getElementById('roll-button').addEventListener('click', () => this.rollDice());
        
        // Ações
        document.getElementById('acquire-btn').addEventListener('click', () => this.acquireProperty());
        document.getElementById('construct-btn').addEventListener('click', () => this.constructTemple());
        document.getElementById('transcend-btn').addEventListener('click', () => this.transcendChakra());
        
        // Chakras
        document.querySelectorAll('.chakra-point').forEach(chakra => {
            chakra.addEventListener('click', (e) => this.showChakraInfo(e.currentTarget.dataset.chakra));
        });
        
        // Deuses
        document.querySelectorAll('.deity-card').forEach(deity => {
            deity.addEventListener('click', (e) => this.showDeityInfo(e.currentTarget.dataset.god));
        });
        
        // Nós do tabuleiro
        document.querySelectorAll('.orbit-node').forEach(node => {
            node.addEventListener('click', (e) => this.showPositionInfo(parseInt(e.currentTarget.dataset.position)));
        });
        
        // Cartas
        document.querySelectorAll('.card-slot').forEach(slot => {
            slot.addEventListener('click', () => this.showCardModal());
        });
        
        // Fechar modais
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });
        
        // Fechar modal ao clicar fora
        document.querySelectorAll('.position-modal, .card-modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModals();
            });
        });
    }

    async rollDice() {
        if (this.gameState.isRolling || this.gameState.isModalOpen) return;
        
        this.gameState.isRolling = true;
        const rollButton = document.getElementById('roll-button');
        rollButton.disabled = true;
        
        // Animar dados
        await this.animateDice();
        
        // Calcular movimento
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const total = die1 + die2;
        
        this.gameState.diceHistory.push({ die1, die2, total });
        
        // Mover jogador
        await this.movePlayer(total);
        
        // Processar posição
        await this.processPosition();
        
        // Atualizar UI
        this.updateUI();
        
        // Registrar
        this.addLog(`Dados quânticos: ${die1}⚡ + ${die2}🌀 = ${total}`, 'dice');
        this.addLog(`Movimento para: ${this.getCurrentPosition().name}`, 'move');
        
        this.gameState.isRolling = false;
        rollButton.disabled = false;
    }

    async animateDice() {
        const dice = [document.getElementById('die1'), document.getElementById('die2')];
        
        // Adicionar animação de rotação
        dice.forEach(die => {
            die.style.animation = 'none';
            void die.offsetWidth; // Trigger reflow
            die.style.animation = 'dice-roll 1s ease-out';
        });
        
        // Esperar animação
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mostrar resultado
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        
        dice[0].style.transform = `rotateX(${die1 * 360}deg) rotateY(${die2 * 360}deg)`;
        dice[1].style.transform = `rotateX(${die2 * 360}deg) rotateY(${die1 * 360}deg)`;
    }

    async movePlayer(steps) {
        const oldPos = this.gameState.player.position;
        const newPos = (oldPos + steps) % this.gameState.board.length;
        
        // Animar movimento do orbe
        const orb = document.getElementById('player-orb');
        const oldNode = document.querySelector(`.orbit-node[data-position="${oldPos}"]`);
        const newNode = document.querySelector(`.orbit-node[data-position="${newPos}"]`);
        
        if (oldNode && newNode) {
            const oldRect = oldNode.getBoundingClientRect();
            const newRect = newNode.getBoundingClientRect();
            
            // Animar trajetória curva
            orb.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
            orb.style.left = `${newRect.left + newRect.width / 2}px`;
            orb.style.top = `${newRect.top + newRect.height / 2}px`;
            
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        this.gameState.player.position = newPos;
    }

    async processPosition() {
        const position = this.getCurrentPosition();
        
        switch(position.type) {
            case 'property':
                if (!position.owner) {
                    this.enableAction('acquire');
                } else if (position.owner === 'player') {
                    this.enableAction('construct');
                }
                break;
                
            case 'card':
                await this.drawCard();
                break;
                
            case 'event':
                await this.triggerEvent();
                break;
                
            case 'singularity':
                // Bônus no início
                this.gameState.player.quantum += 200;
                this.addLog('Energia da singularidade: +200 Quantum', 'bonus');
                break;
        }
        
        // Mostrar info da posição
        this.showPositionModal();
    }

    async drawCard() {
        const card = this.gameState.cards[Math.floor(Math.random() * this.gameState.cards.length)];
        this.gameState.player.activeCards.push(card);
        
        // Aplicar efeito
        this.applyCardEffect(card);
        
        // Mostrar modal da carta
        this.showCardModal(card);
        
        // Atribuir a deus
        this.assignCardToPantheon(card);
    }

    applyCardEffect(card) {
        switch(card.effect) {
            case 'extra_move':
                this.gameState.player.quantum += card.quantum;
                this.addLog(`${card.name}: +${card.quantum} Quantum`, 'card');
                break;
                
            case 'reset_chakra':
                // Resetar um chakra bloqueado
                const blockedChakras = Object.entries(this.gameState.player.chakras)
                    .filter(([_, chakra]) => chakra.state === 'blocked');
                if (blockedChakras.length > 0) {
                    const [chakraName] = blockedChakras[0];
                    this.gameState.player.chakras[chakraName].state = 'active';
                    this.addLog(`${card.name}: Chakra ${chakraName} restaurado`, 'card');
                }
                break;
                
            case 'gain_quantum':
                this.gameState.player.quantum += card.quantum * 2;
                this.addLog(`${card.name}: +${card.quantum * 2} Quantum`, 'card');
                break;
                
            case 'boost_eden':
                this.gameState.player.eden += card.value;
                this.addLog(`${card.name}: +${card.value} Éden`, 'card');
                break;
        }
    }

    assignCardToPantheon(card) {
        // Encontrar deus com maior afinidade
        let bestMatch = null;
        let maxAffinity = 0;
        
        Object.entries(this.gameState.player.pantheon).forEach(([god, data]) => {
            const affinity = card.affinity?.includes(god) ? 1 : 0;
            if (affinity > maxAffinity) {
                maxAffinity = affinity;
                bestMatch = god;
            }
        });
        
        if (bestMatch) {
            this.gameState.player.pantheon[bestMatch].cards.push(card);
            this.gameState.player.pantheon[bestMatch].power += card.value;
            this.addLog(`${card.name} atribuído a ${bestMatch.toUpperCase()}`, 'pantheon');
        }
    }

    async triggerEvent() {
        const event = this.gameState.events[Math.floor(Math.random() * this.gameState.events.length)];
        
        switch(event.type) {
            case 'quantum_leap':
                // Salto para frente
                await this.movePlayer(event.value);
                this.addLog(`${event.name}: Salto quântico de ${event.value} posições`, 'event');
                break;
                
            case 'quantum_entanglement':
                // Espelhar último movimento
                if (this.gameState.diceHistory.length > 0) {
                    const lastRoll = this.gameState.diceHistory[this.gameState.diceHistory.length - 1];
                    await this.movePlayer(lastRoll.total);
                    this.addLog(`${event.name}: Entrelaçamento com movimento anterior`, 'event');
                }
                break;
                
            case 'quantum_superposition':
                // Escolher movimento
                this.gameState.player.quantum += 100;
                this.addLog(`${event.name}: +100 Quantum pela superposição`, 'event');
                break;
        }
    }

    acquireProperty() {
        const position = this.getCurrentPosition();
        if (position.type !== 'property' || position.owner || this.gameState.player.quantum < position.price) {
            return;
        }
        
        this.gameState.player.quantum -= position.price;
        position.owner = 'player';
        this.gameState.player.properties.push(position.id);
        
        // Adicionar bônus baseado na mitologia
        const mythology = position.mythology;
        let god = null;
        
        switch(mythology) {
            case 'nordic': god = 'odin'; break;
            case 'greek': god = 'zeus'; break;
            case 'egyptian': god = 'isis'; break;
            case 'celtic': god = 'morrigan'; break;
        }
        
        if (god) {
            this.gameState.player.pantheon[god].power += 10;
        }
        
        this.addLog(`Adquirido: ${position.name} por ${position.price} Quantum`, 'property');
        this.disableAction('acquire');
        this.updateUI();
    }

    constructTemple() {
        const position = this.getCurrentPosition();
        if (position.type !== 'property' || position.owner !== 'player' || this.gameState.player.quantum < 1000) {
            return;
        }
        
        this.gameState.player.quantum -= 1000;
        
        const mythology = position.mythology;
        let god = null;
        
        switch(mythology) {
            case 'nordic': god = 'odin'; break;
            case 'greek': god = 'zeus'; break;
            case 'egyptian': god = 'isis'; break;
            case 'celtic': god = 'morrigan'; break;
        }
        
        if (god) {
            this.gameState.player.pantheon[god].temples++;
            this.gameState.player.pantheon[god].power += 50;
            this.gameState.player.eden += 100;
        }
        
        this.addLog(`Templo erguido em ${position.name}! +100 Éden`, 'temple');
        this.disableAction('construct');
        this.updateUI();
    }

    transcendChakra() {
        // Transcender um chakra aleatório
        const chakras = Object.keys(this.gameState.player.chakras);
        const randomChakra = chakras[Math.floor(Math.random() * chakras.length)];
        
        if (this.gameState.player.quantum >= 500) {
            this.gameState.player.quantum -= 500;
            this.gameState.player.chakras[randomChakra].state = 'transcended';
            this.gameState.player.chakras[randomChakra].energy = 150;
            this.gameState.player.eden += 50;
            
            this.addLog(`Chakra ${randomChakra} transcendido! +50 Éden`, 'chakra');
            this.updateUI();
        }
    }

    enableAction(action) {
        const button = document.getElementById(`${action}-btn`);
        if (button) button.disabled = false;
    }

    disableAction(action) {
        const button = document.getElementById(`${action}-btn`);
        if (button) button.disabled = true;
    }

    getCurrentPosition() {
        return this.gameState.board[this.gameState.player.position];
    }

    showPositionModal() {
        const position = this.getCurrentPosition();
        const modal = document.getElementById('position-modal');
        const info = document.getElementById('position-info');
        
        let icon = '⚡';
        let description = '';
        let stats = '';
        
        switch(position.type) {
            case 'singularity':
                icon = '🌌';
                description = 'O ponto de origem da consciência quântica. Todas as realidades convergem aqui.';
                stats = '<div class="stat"><span>VALOR:</span><strong>∞</strong></div><div class="stat"><span>ENERGIA:</span><strong>100%</strong></div>';
                break;
                
            case 'property':
                icon = position.mythology === 'nordic' ? '⚔️' :
                       position.mythology === 'greek' ? '⚡' :
                       position.mythology === 'egyptian' ? '☥' :
                       position.mythology === 'celtic' ? 'ᚁ' : '✨';
                description = `Domínio ${position.mythology.toUpperCase()}. ${position.owner ? 'Propriedade consolidada.' : 'Disponível para aquisição.'}`;
                stats = `<div class="stat"><span>VALOR:</span><strong>${position.price}Q</strong></div><div class="stat"><span>DONO:</span><strong>${position.owner || 'NENHUM'}</strong></div>`;
                break;
                
            case 'card':
                icon = '🃏';
                description = 'Local de revelação arcana. Prepare-se para receber conhecimento quântico.';
                stats = '<div class="stat"><span>TIPO:</span><strong>ARCADO</strong></div><div class="stat"><span>REVELAÇÃO:</span><strong>EM BREVE</strong></div>';
                break;
                
            case 'event':
                icon = '🌀';
                description = 'Ponto de instabilidade quântica. O tecido da realidade se dobra aqui.';
                stats = '<div class="stat"><span>TIPO:</span><strong>EVENTO</strong></div><div class="stat"><span>PROBABILIDADE:</span><strong>86.4%</strong></div>';
                break;
        }
        
        info.innerHTML = `
            <div class="position-icon">${icon}</div>
            <div class="position-name">${position.name}</div>
            <div class="position-mythology">${position.mythology.toUpperCase()}</div>
            <div class="position-description">${description}</div>
            <div class="position-stats">${stats}</div>
        `;
        
        modal.style.display = 'flex';
        this.gameState.isModalOpen = true;
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }

    showCardModal(card = null) {
        const modal = document.getElementById('card-modal');
        const reveal = document.getElementById('card-reveal');
        
        if (card) {
            let icon = card.type === 'major' ? '🃏' : 'ᚱ';
            let effects = card.effect === 'extra_move' ? '<div class="effect"><i class="fas fa-arrows-up-down"></i> +2 MOVIMENTO</div>' :
                          card.effect === 'reset_chakra' ? '<div class="effect"><i class="fas fa-spa"></i> RESTAURAR CHAKRA</div>' :
                          '<div class="effect"><i class="fas fa-bolt"></i> ENERGIA QUÂNTICA</div>';
            
            reveal.innerHTML = `
                <div class="card-visual">
                    <div class="card-glow-large"></div>
                    <div class="card-symbol">${icon}</div>
                </div>
                <div class="card-details">
                    <div class="card-title">${card.name}</div>
                    <div class="card-type">${card.type === 'major' ? 'ARCADO MAIOR' : 'RUNA ANCESTRAL'}</div>
                    <div class="card-description">
                        ${this.getCardDescription(card)}
                    </div>
                    <div class="card-effects">
                        ${effects}
                        <div class="effect"><i class="fas fa-brain"></i> +${card.value} ÉDEN</div>
                    </div>
                </div>
            `;
        }
        
        modal.style.display = 'flex';
        this.gameState.isModalOpen = true;
        
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }

    getCardDescription(card) {
        const descriptions = {
            'O Louco': 'A consciência desperta para novas possibilidades. O campo quântico se expande.',
            'A Morte': 'Transformação inevitável. Velhas formas se dissolvem para o novo surgir.',
            'O Mago': 'Manifestação do potencial. A vontade molda a realidade.',
            'A Imperatriz': 'Fertilidade criativa. O universo se expande através da beleza.',
            'O Imperador': 'Estrutura e ordem. A consciência estabelece domínio.',
            'Fehu': 'Riqueza quântica. O fluxo energético se intensifica.',
            'Uruz': 'Força primordial. A essência vital se manifesta.',
            'Ansuz': 'Sabedoria ancestral. Os segredos do universo são revelados.',
            'Raido': 'Jornada cósmica. O caminho se abre através das dimensões.'
        };
        
        return descriptions[card.name] || 'Conhecimento arcano revelado. A consciência se expande.';
    }

    showChakraInfo(chakra) {
        const chakraData = this.gameState.player.chakras[chakra];
        const chakraNames = {
            root: 'Chakra Raiz',
            sacral: 'Chakra Sacro',
            solar: 'Chakra do Plexo Solar',
            heart: 'Chakra do Coração',
            throat: 'Chakra da Garganta',
            'third-eye': 'Chakra do Terceiro Olho',
            crown: 'Chakra Coronário'
        };
        
        this.addLog(`${chakraNames[chakra]}: ${chakraData.state.toUpperCase()} (${chakraData.energy}% energia)`, 'chakra');
    }

    showDeityInfo(god) {
        const deity = this.gameState.player.pantheon[god];
        const godNames = {
            odin: 'Odin - Pai de Todos',
            zeus: 'Zeus - Rei do Olimpo',
            isis: 'Ísis - Mãe Divina',
            morrigan: 'Morrígan - Rainha da Batalha'
        };
        
        this.addLog(`${godNames[god]}: Poder ${deity.power}, Templos ${deity.temples}, Cartas ${deity.cards.length}`, 'pantheon');
    }

    closeModals() {
        document.querySelectorAll('.position-modal, .card-modal').forEach(modal => {
            modal.style.opacity = '0';
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        });
        
        this.gameState.isModalOpen = false;
    }

    updateUI() {
        const player = this.gameState.player;
        
        // Atualizar valores
        document.getElementById('eden-value').textContent = player.eden;
        document.getElementById('quantum-value').textContent = player.quantum.toLocaleString();
        document.getElementById('turn-value').textContent = player.turn;
        
        // Atualizar barras
        document.getElementById('eden-bar').style.width = `${Math.min(player.eden / 10, 100)}%`;
        document.getElementById('quantum-bar').style.width = `${Math.min(player.quantum / 2000 * 100, 100)}%`;
        document.getElementById('turn-bar').style.width = `${Math.min(player.turn / 50 * 100, 100)}%`;
        
        // Atualizar poderes dos deuses
        document.getElementById('odin-power').textContent = player.pantheon.odin.power;
        document.getElementById('zeus-power').textContent = player.pantheon.zeus.power;
        document.getElementById('isis-power').textContent = player.pantheon.isis.power;
        document.getElementById('morrigan-power').textContent = player.pantheon.morrigan.power;
        
        // Atualizar slots de cartas
        const cardSlots = document.querySelectorAll('.card-slot');
        player.activeCards.forEach((card, index) => {
            if (cardSlots[index]) {
                const slot = cardSlots[index];
                const icon = card.type === 'major' ? '🃏' : 'ᚱ';
                slot.querySelector('.card-icon').textContent = icon;
                slot.querySelector('.card-name').textContent = card.name.substring(0, 8);
                slot.classList.add('active');
            }
        });
        
        // Atualizar chakras
        Object.entries(player.chakras).forEach(([chakra, data]) => {
            const point = document.querySelector(`.chakra-point.${chakra}`);
            if (point) {
                point.classList.remove('active', 'blocked', 'transcended');
                point.classList.add(data.state);
                
                const glow = point.querySelector('.chakra-glow');
                if (glow) {
                    glow.style.opacity = data.energy / 100;
                }
            }
        });
    }

    addLog(message, type = 'system') {
        const container = document.getElementById('log-container');
        const time = new Date();
        const timestamp = `[T=${this.gameState.player.turn}, ΔT=${time.getSeconds()}]`;
        
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.innerHTML = `
            <div class="log-time">${timestamp}</div>
            <div class="log-message">${message}</div>
        `;
        
        container.appendChild(entry);
        container.scrollTop = container.scrollHeight;
        
        // Limitar número de entradas
        while (container.children.length > 50) {
            container.removeChild(container.firstChild);
        }
    }

    animateBackground() {
        // Animar partículas
        const particles = document.querySelector('.quantum-particles');
        let angle = 0;
        
        function animate() {
            angle += 0.002;
            particles.style.transform = `rotate(${angle}rad)`;
            requestAnimationFrame(animate);
        }
        
        animate();
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.quantumGame = new QuantumMonopoly();
    
    // Adicionar efeitos sonoros (opcional)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    function playQuantumSound(frequency = 440, duration = 0.1) {
        try {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start();
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            // Silenciosamente ignorar erros de áudio
        }
    }
    
    // Efeitos sonoros para interações
    document.getElementById('roll-button').addEventListener('click', () => {
        playQuantumSound(523.25, 0.2);
        setTimeout(() => playQuantumSound(659.25, 0.2), 100);
        setTimeout(() => playQuantumSound(783.99, 0.2), 200);
    });
    
    document.querySelectorAll('.action-button').forEach(button => {
        button.addEventListener('click', () => {
            playQuantumSound(349.23, 0.1);
        });
    });
    
    document.querySelectorAll('.orbit-node').forEach(node => {
        node.addEventListener('click', () => {
            playQuantumSound(261.63, 0.05);
        });
    });
});

// Suporte PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker falhou:', error);
        });
    });
}

// Prevenir zoom em mobile
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) e.preventDefault();
}, { passive: false });

let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) e.preventDefault();
    lastTouchEnd = now;
}, false);

// Suporte a instalação PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Mostrar botão de instalação (opcional)
    setTimeout(() => {
        if (deferredPrompt && window.matchMedia('(display-mode: browser)').matches) {
            window.quantumGame?.addLog('Instale esta aplicação para experiência completa', 'system');
        }
    }, 5000);
});

// Detectar modo standalone (PWA instalada)
if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('Running in standalone mode');
}