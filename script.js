/**
 * NEXUS 2126 - CORE ENGINE V5.0
 * Sistema completo com Tutorial, Missões, Cartas Expandidas e UPGRADE
 */

// Clear problematic saved states on load
try {
    localStorage.removeItem('nexus_upgrade_state');
    localStorage.removeItem('nexus_missions');
    localStorage.removeItem('nexus2126_state');
} catch (e) {
    console.log("Cleanup completed");
}

// ==================== SISTEMA DE UPGRADE ====================

class QuantumUpgradeSystem {
    constructor(nexus) {
        this.nexus = nexus;
        this.init();
    }

    init() {
        this.setupChakraSystem();
        this.setupMythologyExpansion();
        this.setupPortalNetwork();
        this.setupArtifactCollection();
        this.bindUpgradeEvents();
        this.loadUpgradeState();
        
        // Integrar com sistemas existentes
        this.integrateWithExistingSystems();
    }

    // ==================== SISTEMA DE CHAKRAS ====================
    setupChakraSystem() {
        this.chakras = {
            root: {
                name: "Muladhara",
                color: "#ff0000",
                frequency: 396,
                energy: 0,
                maxEnergy: 100,
                level: 1,
                unlocked: true,
                effects: {
                    quantumStability: 1.0,
                    influenceGain: 1.0,
                    oracleClarity: 1.0
                },
                description: "Chakra Raiz - Estabilidade e Fundamento"
            },
            sacral: {
                name: "Svadhisthana",
                color: "#ff5500",
                frequency: 417,
                energy: 0,
                maxEnergy: 100,
                level: 0,
                unlocked: false,
                effects: {
                    quantumStability: 1.2,
                    influenceGain: 1.3,
                    oracleClarity: 1.1
                },
                description: "Chakra Sacral - Criatividade e Fluxo"
            },
            solar: {
                name: "Manipura",
                color: "#ffff00",
                frequency: 528,
                energy: 0,
                maxEnergy: 100,
                level: 0,
                unlocked: false,
                effects: {
                    quantumStability: 1.4,
                    influenceGain: 1.5,
                    oracleClarity: 1.2
                },
                description: "Chakra do Plexo Solar - Poder e Vontade"
            },
            heart: {
                name: "Anahata",
                color: "#00ff00",
                frequency: 639,
                energy: 0,
                maxEnergy: 100,
                level: 0,
                unlocked: false,
                effects: {
                    quantumStability: 1.6,
                    influenceGain: 1.7,
                    oracleClarity: 1.3
                },
                description: "Chakra Cardíaco - Conexão e Harmonia"
            },
            throat: {
                name: "Vishuddha",
                color: "#0000ff",
                frequency: 741,
                energy: 0,
                maxEnergy: 100,
                level: 0,
                unlocked: false,
                effects: {
                    quantumStability: 1.8,
                    influenceGain: 1.9,
                    oracleClarity: 1.4
                },
                description: "Chakra Laríngeo - Expressão e Verdade"
            },
            third: {
                name: "Ajna",
                color: "#4b0082",
                frequency: 852,
                energy: 0,
                maxEnergy: 100,
                level: 0,
                unlocked: false,
                effects: {
                    quantumStability: 2.0,
                    influenceGain: 2.1,
                    oracleClarity: 1.5
                },
                description: "Chakra do Terceiro Olho - Intuição e Visão"
            },
            crown: {
                name: "Sahasrara",
                color: "#9400d3",
                frequency: 963,
                energy: 0,
                maxEnergy: 100,
                level: 0,
                unlocked: false,
                effects: {
                    quantumStability: 2.5,
                    influenceGain: 2.5,
                    oracleClarity: 2.0
                },
                description: "Chakra Coronário - Iluminação e União"
            }
        };

        this.activeChakra = 'root';
        this.chakraResonance = 0;
    }

    addChakraEnergy(chakra, amount) {
        if (!this.chakras[chakra] || !this.chakras[chakra].unlocked) return false;

        const oldEnergy = this.chakras[chakra].energy;
        this.chakras[chakra].energy += amount;

        // Level up
        if (this.chakras[chakra].energy >= this.chakras[chakra].maxEnergy) {
            this.chakras[chakra].level++;
            this.chakras[chakra].energy = 0;
            this.chakras[chakra].maxEnergy += 50;
            
            // Desbloquear próximo chakra
            if (chakra === 'root' && this.chakras[chakra].level >= 2) {
                this.unlockChakra('sacral');
            } else if (chakra === 'sacral' && this.chakras[chakra].level >= 3) {
                this.unlockChakra('solar');
            } else if (chakra === 'solar' && this.chakras[chakra].level >= 4) {
                this.unlockChakra('heart');
            } else if (chakra === 'heart' && this.chakras[chakra].level >= 5) {
                this.unlockChakra('throat');
            } else if (chakra === 'throat' && this.chakras[chakra].level >= 6) {
                this.unlockChakra('third');
            } else if (chakra === 'third' && this.chakras[chakra].level >= 7) {
                this.unlockChakra('crown');
            }

            this.nexus.ui.showTransmission("CHAKRA SYSTEM", 
                `${this.chakras[chakra].name} alcançou nível ${this.chakras[chakra].level}!`, 3000);
            return true;
        }

        return false;
    }

    unlockChakra(chakra) {
        if (this.chakras[chakra]) {
            this.chakras[chakra].unlocked = true;
            this.nexus.ui.log(`Chakra ${this.chakras[chakra].name} desbloqueado!`, 'success');
            
            // Criar efeito visual
            const effect = document.createElement('div');
            effect.className = 'chakra-unlock-effect';
            effect.style.color = this.chakras[chakra].color;
            effect.textContent = this.chakras[chakra].name;
            document.body.appendChild(effect);
            
            setTimeout(() => effect.remove(), 3000);
        }
    }

    // ==================== EXPANSÃO DE MITOLOGIAS ====================
    setupMythologyExpansion() {
        this.expandedMythologies = {
            hindu: {
                name: "Hindu/Védica",
                color: "#ff6b6b",
                deities: [
                    { name: "Brahma", power: 9, element: "criação" },
                    { name: "Vishnu", power: 10, element: "preservação" },
                    { name: "Shiva", power: 10, element: "transformação" },
                    { name: "Lakshmi", power: 8, element: "prosperidade" },
                    { name: "Ganesha", power: 7, element: "sabedoria" }
                ],
                unlocked: false,
                level: 0,
                progress: 0
            },
            chinese: {
                name: "Chinesa",
                color: "#ffd166",
                deities: [
                    { name: "Yu Huang", power: 9, element: "céu" },
                    { name: "Guan Yin", power: 8, element: "misericórdia" },
                    { name: "Jade Emperor", power: 10, element: "imperial" },
                    { name: "Zhong Kui", power: 7, element: "exorcismo" },
                    { name: "Mazu", power: 6, element: "mar" }
                ],
                unlocked: false,
                level: 0,
                progress: 0
            },
            japanese: {
                name: "Japonesa",
                color: "#06d6a0",
                deities: [
                    { name: "Amaterasu", power: 10, element: "sol" },
                    { name: "Susanoo", power: 9, element: "tempestade" },
                    { name: "Tsukuyomi", power: 8, element: "lua" },
                    { name: "Inari", power: 7, element: "fertilidade" },
                    { name: "Benzaiten", power: 6, element: "artes" }
                ],
                unlocked: false,
                level: 0,
                progress: 0
            },
            aztec: {
                name: "Asteca",
                color: "#118ab2",
                deities: [
                    { name: "Quetzalcoatl", power: 10, element: "vento" },
                    { name: "Huitzilopochtli", power: 9, element: "guerra" },
                    { name: "Tezcatlipoca", power: 9, element: "escuridão" },
                    { name: "Tlaloc", power: 8, element: "chuva" },
                    { name: "Xipe Totec", power: 7, element: "renascimento" }
                ],
                unlocked: false,
                level: 0,
                progress: 0
            },
            mayan: {
                name: "Maia",
                color: "#073b4c",
                deities: [
                    { name: "Itzamna", power: 10, element: "criação" },
                    { name: "Kukulkan", power: 9, element: "serpente" },
                    { name: "Ix Chel", power: 8, element: "lua" },
                    { name: "Ah Puch", power: 7, element: "morte" },
                    { name: "Chaac", power: 8, element: "chuva" }
                ],
                unlocked: false,
                level: 0,
                progress: 0
            },
            polynesian: {
                name: "Polinésia",
                color: "#7209b7",
                deities: [
                    { name: "Maui", power: 8, element: "travessura" },
                    { name: "Pele", power: 9, element: "fogo" },
                    { name: "Kanaloa", power: 7, element: "oceano" },
                    { name: "Lono", power: 6, element: "fertilidade" },
                    { name: "Kū", power: 8, element: "guerra" }
                ],
                unlocked: false,
                level: 0,
                progress: 0
            },
            yoruba: {
                name: "Iorubá",
                color: "#f72585",
                deities: [
                    { name: "Obatalá", power: 10, element: "criação" },
                    { name: "Yemoja", power: 9, element: "mar" },
                    { name: "Shango", power: 9, element: "trovão" },
                    { name: "Ogun", power: 8, element: "ferro" },
                    { name: "Eshu", power: 7, element: "encruzilhada" }
                ],
                unlocked: false,
                level: 0,
                progress: 0
            },
            slavic: {
                name: "Eslava",
                color: "#4cc9f0",
                deities: [
                    { name: "Perun", power: 9, element: "trovão" },
                    { name: "Veles", power: 8, element: "submundo" },
                    { name: "Svarog", power: 9, element: "fogo" },
                    { name: "Mokosh", power: 7, element: "terra" },
                    { name: "Dazhbog", power: 7, element: "sol" }
                ],
                unlocked: false,
                level: 0,
                progress: 0
            }
        };
    }

    unlockMythology(mythology) {
        if (this.expandedMythologies[mythology]) {
            this.expandedMythologies[mythology].unlocked = true;
            
            // Adicionar novas entidades ao board
            this.addMythologyEntities(mythology);
            
            this.nexus.ui.showTransmission("MYTHOLOGY EXPANSION", 
                `${this.expandedMythologies[mythology].name} desbloqueada!`, 3500);
        }
    }

    addMythologyEntities(mythology) {
        const myth = this.expandedMythologies[mythology];
        const entityLayer = document.getElementById('entityLayer');
        
        myth.deities.forEach(deity => {
            // Posicionar aleatoriamente no quadrante apropriado
            const x = 10 + Math.random() * 80;
            const y = 10 + Math.random() * 80;
            
            const entity = document.createElement('div');
            entity.className = 'entity-node expanded-mythology';
            entity.style.left = `${x}%`;
            entity.style.top = `${y}%`;
            entity.style.color = myth.color;
            entity.style.border = `2px solid ${myth.color}`;
            entity.innerHTML = `<div class="entity-label">${deity.name}</div>`;
            
            entity.addEventListener('click', () => {
                this.nexus.ui.showHoloInfo({
                    name: deity.name,
                    desc: `${myth.name} - ${deity.element}`,
                    power: deity.power,
                    type: 'Deity',
                    mythology: mythology
                });
                
                // Ganhar influência na mitologia
                this.addMythologyProgress(mythology, 10);
                this.nexus.universe.addInfluence(mythology, 5);
            });
            
            entityLayer.appendChild(entity);
        });
    }

    addMythologyProgress(mythology, amount) {
        if (!this.expandedMythologies[mythology]) return;
        
        const myth = this.expandedMythologies[mythology];
        myth.progress += amount;
        
        if (myth.progress >= 100) {
            myth.level++;
            myth.progress = 0;
            
            // Recompensa por level up
            this.nexus.universe.addEnergy(200, 'quantum');
            this.nexus.universe.addEnergy(100, 'consciousness');
            
            this.nexus.ui.showTransmission(myth.name.toUpperCase(), 
                `Nível ${myth.level} alcançado!`, 3000);
        }
    }

    // ==================== PORTAL QUÂNTICO ====================
    setupPortalNetwork() {
        this.portals = {
            quantumTunnel: {
                name: "Tunelamento Quântico",
                unlocked: false,
                cost: 500,
                effect: "Teletransporte entre mitologias",
                position: { x: 50, y: 50 }
            },
            frequencyPortal: {
                name: "Portal de Frequência",
                unlocked: false,
                cost: 1000,
                effect: "Acesso a espectros dimensionais",
                position: { x: 20, y: 80 }
            },
            expansionPortal: {
                name: "Portal de Expansão",
                unlocked: false,
                cost: 2000,
                effect: "Expansão do campo quântico",
                position: { x: 80, y: 20 }
            },
            collapsePortal: {
                name: "Portal de Colapso",
                unlocked: false,
                cost: 5000,
                effect: "Colapso da função de onda",
                position: { x: 80, y: 80 }
            }
        };
    }

    unlockPortal(portalId) {
        if (this.portals[portalId] && !this.portals[portalId].unlocked) {
            if (this.nexus.universe.energy.quantum >= this.portals[portalId].cost) {
                this.nexus.universe.consumeEnergy(this.portals[portalId].cost, 'quantum');
                this.portals[portalId].unlocked = true;
                
                // Criar portal no board
                this.createPortalElement(portalId);
                
                this.nexus.ui.showTransmission("PORTAL SYSTEM", 
                    `${this.portals[portalId].name} ativado!`, 3000);
                return true;
            }
        }
        return false;
    }

    createPortalElement(portalId) {
        const portal = this.portals[portalId];
        const entityLayer = document.getElementById('entityLayer');
        
        const portalEl = document.createElement('div');
        portalEl.className = 'quantum-portal';
        portalEl.id = `portal-${portalId}`;
        portalEl.style.left = `${portal.position.x}%`;
        portalEl.style.top = `${portal.position.y}%`;
        portalEl.style.border = `3px solid var(--neon-cyan)`;
        portalEl.innerHTML = `
            <div class="portal-glow"></div>
            <div class="portal-label">${portal.name}</div>
        `;
        
        portalEl.addEventListener('click', () => {
            this.activatePortal(portalId);
        });
        
        entityLayer.appendChild(portalEl);
    }

    activatePortal(portalId) {
        const portal = this.portals[portalId];
        if (!portal.unlocked) return;
        
        this.nexus.ui.showTransmission("PORTAL ACTIVATION", 
            `Acessando ${portal.name}... ${portal.effect}`, 4000);
        
        // Efeitos específicos do portal
        switch(portalId) {
            case 'quantumTunnel':
                // Teletransporte aleatório
                this.nexus.universe.position.x = 10 + Math.random() * 80;
                this.nexus.universe.position.y = 10 + Math.random() * 80;
                this.nexus.ui.updatePosition();
                break;
                
            case 'frequencyPortal':
                // Boost de energia
                this.nexus.universe.addEnergy(300, 'quantum');
                this.nexus.universe.addEnergy(150, 'consciousness');
                break;
                
            case 'expansionPortal':
                // Expansão do campo
                document.body.classList.add('field-expanded');
                setTimeout(() => {
                    document.body.classList.remove('field-expanded');
                }, 10000);
                break;
                
            case 'collapsePortal':
                // Colapso quântico - revelação especial
                this.triggerQuantumCollapse();
                break;
        }
        
        // Consumir energia para ativação
        this.nexus.universe.consumeEnergy(100, 'quantum');
    }

    triggerQuantumCollapse() {
        // Revelação especial do oráculo
        const specialCards = [
            {
                name: "SINGULARIDADE",
                meaning: "O ponto de unificação de todas as possibilidades.",
                effect: { q: 500, c: 300 },
                symbol: "⚛️"
            },
            {
                name: "ENTRELAÇAMENTO QUÂNTICO",
                meaning: "Todas as coisas conectadas em nível fundamental.",
                effect: { q: 300, c: 500 },
                symbol: "🌀"
            },
            {
                name: "COLAPSO DA FUNÇÃO DE ONDA",
                meaning: "A possibilidade torna-se realidade.",
                effect: { q: 400, c: 400 },
                symbol: "✨"
            }
        ];
        
        const card = specialCards[Math.floor(Math.random() * specialCards.length)];
        this.nexus.ui.showTransmission("QUANTUM COLLAPSE", card.meaning, 4500);
        
        // Aplicar efeito
        this.nexus.universe.addEnergy(card.effect.q, 'quantum');
        this.nexus.universe.addEnergy(card.effect.c, 'consciousness');
    }

    // ==================== COLETA DE ARTEFATOS ====================
    setupArtifactCollection() {
        this.artifacts = {
            runes: { collected: 0, total: 24, unlocked: [] },
            shells: { collected: 0, total: 16, unlocked: [] },
            bones: { collected: 0, total: 12, unlocked: [] },
            wands: { collected: 0, total: 8, unlocked: [] },
            crystals: { collected: 0, total: 7, unlocked: [] },
            fragments: { collected: 0, total: 13, unlocked: [] },
            pieces: { collected: 0, total: 9, unlocked: [] }
        };
        
        this.artifactSpawns = [];
        this.lastArtifactSpawn = 0;
    }

    spawnArtifact() {
        const now = Date.now();
        if (now - this.lastArtifactSpawn < 30000) return; // Spawn a cada 30 segundos
        
        const artifactTypes = Object.keys(this.artifacts);
        const type = artifactTypes[Math.floor(Math.random() * artifactTypes.length)];
        
        // Verificar se já coletou todos
        if (this.artifacts[type].collected >= this.artifacts[type].total) return;
        
        const x = 5 + Math.random() * 90;
        const y = 5 + Math.random() * 90;
        
        const artifact = {
            type: type,
            x: x,
            y: y,
            element: document.createElement('div')
        };
        
        artifact.element.className = 'artifact-node';
        artifact.element.style.left = `${x}%`;
        artifact.element.style.top = `${y}%`;
        artifact.element.style.color = this.getArtifactColor(type);
        artifact.element.innerHTML = this.getArtifactSymbol(type);
        
        artifact.element.addEventListener('click', () => {
            this.collectArtifact(artifact);
        });
        
        document.getElementById('entityLayer').appendChild(artifact.element);
        this.artifactSpawns.push(artifact);
        
        this.lastArtifactSpawn = now;
        this.nexus.ui.log(`Artefato ${type} apareceu no campo quântico.`, 'info');
    }

    getArtifactColor(type) {
        const colors = {
            runes: '#00f3ff',
            shells: '#9d4edd',
            bones: '#ffd60a',
            wands: '#00ffaa',
            crystals: '#ff6b6b',
            fragments: '#7209b7',
            pieces: '#4cc9f0'
        };
        return colors[type] || '#ffffff';
    }

    getArtifactSymbol(type) {
        const symbols = {
            runes: 'ᚠ',
            shells: '🐚',
            bones: '🦴',
            wands: '⚕️',
            crystals: '💎',
            fragments: '🧩',
            pieces: '⚙️'
        };
        return `<div class="artifact-symbol">${symbols[type] || '?'}</div>`;
    }

    collectArtifact(artifact) {
        // Remover do DOM
        artifact.element.remove();
        
        // Remover da lista
        this.artifactSpawns = this.artifactSpawns.filter(a => a !== artifact);
        
        // Adicionar à coleção
        this.artifacts[artifact.type].collected++;
        
        // Recompensa
        const reward = 50 + Math.floor(Math.random() * 100);
        this.nexus.universe.addEnergy(reward, 'quantum');
        
        // Feedback visual
        this.nexus.ui.createMicroFeedback(
            artifact.element,
            `+${reward}Ω`,
            this.getArtifactColor(artifact.type)
        );
        
        this.nexus.ui.log(`Artefato ${artifact.type} coletado! Total: ${this.artifacts[artifact.type].collected}/${this.artifacts[artifact.type].total}`, 'success');
        
        // Verificar se completou a coleção
        if (this.artifacts[artifact.type].collected >= this.artifacts[artifact.type].total) {
            this.completeArtifactCollection(artifact.type);
        }
    }

    completeArtifactCollection(type) {
        this.nexus.ui.showTransmission("ARTIFACT SYSTEM", 
            `Coleção ${type} completa! Recompensa especial desbloqueada.`, 4000);
        
        // Recompensa especial
        this.nexus.universe.addEnergy(1000, 'quantum');
        this.nexus.universe.addEnergy(500, 'consciousness');
        
        // Desbloquear nova capacidade
        switch(type) {
            case 'runes':
                this.unlockSpecialReading('runic_circle');
                break;
            case 'crystals':
                this.unlockSpecialReading('crystal_grid');
                break;
            case 'fragments':
                this.unlockPortal('expansionPortal');
                break;
        }
    }

    unlockSpecialReading(type) {
        this.nexus.ui.log(`Leitura especial ${type} desbloqueada!`, 'oracle');
    }

    // ==================== INTERFACE DE UPGRADE ====================
    bindUpgradeEvents() {
        // Botão do upgrade
        document.getElementById('btnUpgrade').addEventListener('click', () => {
            this.showUpgradePanel();
        });
        
        // Fechar painel de upgrade
        document.getElementById('closeUpgradePanel').addEventListener('click', () => {
            document.getElementById('upgradePanel').classList.remove('active');
        });
        
        // Tabs do upgrade
        document.querySelectorAll('.upgrade-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.upgrade-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.upgrade-tab-content').forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                document.getElementById(`${tab.dataset.tab}-tab`).classList.add('active');
                this.updateUpgradeTab(tab.dataset.tab);
            });
        });
        
        // Atualização periódica
        setInterval(() => {
            this.updateSystems();
        }, 1000);
    }

    showUpgradePanel() {
        document.getElementById('upgradePanel').classList.add('active');
        this.updateUpgradeTab('chakras');
    }

    updateUpgradeTab(tab) {
        const content = document.getElementById(`${tab}-tab`);
        
        switch(tab) {
            case 'chakras':
                this.renderChakrasTab(content);
                break;
            case 'mythologies':
                this.renderMythologiesTab(content);
                break;
            case 'portals':
                this.renderPortalsTab(content);
                break;
            case 'artifacts':
                this.renderArtifactsTab(content);
                break;
        }
    }

    renderChakrasTab(container) {
        let html = '<div class="chakras-grid">';
        
        Object.entries(this.chakras).forEach(([key, chakra]) => {
            const percent = (chakra.energy / chakra.maxEnergy) * 100;
            const unlockedClass = chakra.unlocked ? 'unlocked' : 'locked';
            
            html += `
                <div class="chakra-card ${unlockedClass}" data-chakra="${key}">
                    <div class="chakra-header" style="color: ${chakra.color}">
                        <div class="chakra-symbol">●</div>
                        <div class="chakra-name">${chakra.name}</div>
                        <div class="chakra-level">Nível ${chakra.level}</div>
                    </div>
                    <div class="chakra-energy">
                        <div class="energy-bar">
                            <div class="energy-fill" style="width: ${percent}%; background: ${chakra.color}"></div>
                        </div>
                        <span class="energy-text">${chakra.energy}/${chakra.maxEnergy}</span>
                    </div>
                    <div class="chakra-description">${chakra.description}</div>
                    <div class="chakra-effects">
                        <div class="effect">Estabilidade: ×${chakra.effects.quantumStability}</div>
                        <div class="effect">Influência: ×${chakra.effects.influenceGain}</div>
                        <div class="effect">Oráculo: ×${chakra.effects.oracleClarity}</div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    renderMythologiesTab(container) {
        let html = '<div class="mythologies-grid">';
        
        // Mitologias base
        const baseMyths = ['norse', 'greek', 'egyptian', 'celtic'];
        baseMyths.forEach(key => {
            const myth = this.nexus.universe.influence[key];
            const level = myth ? myth.level : 0;
            
            html += `
                <div class="mythology-card unlocked">
                    <div class="mythology-header">
                        <div class="mythology-name">${key.toUpperCase()}</div>
                        <div class="mythology-level">Nível ${level}</div>
                    </div>
                    <div class="mythology-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(level * 2, 100)}%"></div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        // Mitologias expandidas
        Object.entries(this.expandedMythologies).forEach(([key, myth]) => {
            const unlockedClass = myth.unlocked ? 'unlocked' : 'locked';
            
            html += `
                <div class="mythology-card ${unlockedClass}">
                    <div class="mythology-header" style="color: ${myth.color}">
                        <div class="mythology-name">${myth.name}</div>
                        <div class="mythology-status">${myth.unlocked ? 'DESBLOQUEADA' : 'BLOQUEADA'}</div>
                    </div>
                    ${myth.unlocked ? `
                        <div class="mythology-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${myth.progress}%"></div>
                            </div>
                            <div class="mythology-level">Nível ${myth.level}</div>
                        </div>
                        <div class="deities-list">
                            ${myth.deities.map(d => `<span class="deity">${d.name}</span>`).join('')}
                        </div>
                    ` : `
                        <div class="mythology-requirement">
                            Requer: Nível 30 em mitologia base
                        </div>
                    `}
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    renderPortalsTab(container) {
        let html = '<div class="portals-grid">';
        
        Object.entries(this.portals).forEach(([key, portal]) => {
            const unlockedClass = portal.unlocked ? 'unlocked' : 'locked';
            
            html += `
                <div class="portal-card ${unlockedClass}">
                    <div class="portal-header">
                        <div class="portal-name">${portal.name}</div>
                        <div class="portal-status">${portal.unlocked ? 'ATIVO' : 'BLOQUEADO'}</div>
                    </div>
                    <div class="portal-info">
                        <div class="portal-cost">Custo: ${portal.cost}Ω</div>
                        <div class="portal-effect">${portal.effect}</div>
                    </div>
                    ${!portal.unlocked ? `
                        <button class="unlock-portal-btn" data-portal="${key}">
                            Desbloquear por ${portal.cost}Ω
                        </button>
                    ` : `
                        <div class="portal-activated">Portal ativo</div>
                    `}
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        // Adicionar eventos aos botões
        container.querySelectorAll('.unlock-portal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const portalId = e.target.dataset.portal;
                this.unlockPortal(portalId);
                this.renderPortalsTab(container);
            });
        });
    }

    renderArtifactsTab(container) {
        let html = '<div class="artifacts-grid">';
        
        Object.entries(this.artifacts).forEach(([key, artifact]) => {
            const percent = (artifact.collected / artifact.total) * 100;
            
            html += `
                <div class="artifact-card">
                    <div class="artifact-header">
                        <div class="artifact-name">${key.toUpperCase()}</div>
                        <div class="artifact-count">${artifact.collected}/${artifact.total}</div>
                    </div>
                    <div class="artifact-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percent}%"></div>
                        </div>
                    </div>
                    <div class="artifact-reward">
                        ${artifact.collected >= artifact.total ? 
                            '✅ Coleção completa!' : 
                            `Recompensa: ${this.getArtifactReward(key)}`
                        }
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
    }

    getArtifactReward(type) {
        const rewards = {
            runes: 'Leitura Rúnica Avançada',
            shells: 'Oráculo de Búzios Completo',
            bones: 'Tiragem Xamânica',
            wands: 'Ritual de Varinha',
            crystals: 'Grade de Cristais',
            fragments: 'Portal de Expansão',
            pieces: 'Componentes do Cockpit'
        };
        return rewards[type] || 'Recompensa especial';
    }

    // ==================== ATUALIZAÇÃO DO SISTEMA ====================
    updateSystems() {
        // Atualizar spawn de artefatos
        if (Math.random() < 0.01) { // 1% de chance por segundo
            this.spawnArtifact();
        }
        
        // Atualizar energia dos chakras baseado na atividade
        if (this.nexus.universe.throttle > 0) {
            this.addChakraEnergy(this.activeChakra, 0.1);
        }
        
        // Verificar desbloqueios de mitologias
        this.checkMythologyUnlocks();
    }

    checkMythologyUnlocks() {
        // Verificar se o jogador atingiu nível 30 em alguma mitologia base
        const baseMyths = ['norse', 'greek', 'egyptian', 'celtic'];
        baseMyths.forEach(myth => {
            if (this.nexus.universe.influence[myth].level >= 30) {
                // Desbloquear mitologias expandidas relacionadas
                if (myth === 'norse' && !this.expandedMythologies.slavic.unlocked) {
                    this.unlockMythology('slavic');
                } else if (myth === 'greek' && !this.expandedMythologies.hindu.unlocked) {
                    this.unlockMythology('hindu');
                }
            }
        });
    }

    // ==================== INTEGRAÇÃO COM SISTEMAS EXISTENTES ====================
    integrateWithExistingSystems() {
        // Save references to original methods
        const originalAddInfluence = this.nexus.universe.addInfluence.bind(this.nexus.universe);
        const originalDraw = this.nexus.oracle.draw.bind(this.nexus.oracle);
        
        // Override addInfluence
        this.nexus.universe.addInfluence = (field, amount = 1) => {
            // Call original function
            const result = originalAddInfluence(field, amount);
            
            // Add progress to expanded mythology if applicable
            if (this.expandedMythologies[field]) {
                this.addMythologyProgress(field, amount * 0.5);
            }
            
            return result;
        };
        
        // Override oracle draw
        this.nexus.oracle.draw = (field = null) => {
            const card = originalDraw(field);
            
            // Apply chakra modifiers
            if (this.chakras[this.activeChakra] && this.chakras[this.activeChakra].unlocked) {
                const chakra = this.chakras[this.activeChakra];
                card.effect.q *= chakra.effects.oracleClarity;
                card.effect.c *= chakra.effects.oracleClarity;
            }
            
            return card;
        };
    }

    // ==================== SALVAR/CARREGAR ESTADO ====================
    saveUpgradeState() {
        const state = {
            chakras: this.chakras,
            expandedMythologies: this.expandedMythologies,
            portals: this.portals,
            artifacts: this.artifacts,
            activeChakra: this.activeChakra,
            artifactSpawns: this.artifactSpawns.map(a => ({
                type: a.type,
                x: a.x,
                y: a.y
            }))
        };
        
        localStorage.setItem('nexus_upgrade_state', JSON.stringify(state));
    }

    loadUpgradeState() {
        try {
            const saved = localStorage.getItem('nexus_upgrade_state');
            if (saved) {
                const state = JSON.parse(saved);
                
                // Carregar estado dos chakras
                if (state.chakras) {
                    Object.keys(state.chakras).forEach(key => {
                        if (this.chakras[key]) {
                            this.chakras[key] = { ...this.chakras[key], ...state.chakras[key] };
                        }
                    });
                }
                
                // Carregar mitologias expandidas
                if (state.expandedMythologies) {
                    Object.keys(state.expandedMythologies).forEach(key => {
                        if (this.expandedMythologies[key]) {
                            this.expandedMythologies[key] = { 
                                ...this.expandedMythologies[key], 
                                ...state.expandedMythologies[key] 
                            };
                            
                            // Recriar entidades se desbloqueada
                            if (this.expandedMythologies[key].unlocked) {
                                this.addMythologyEntities(key);
                            }
                        }
                    });
                }
                
                // Carregar portais
                if (state.portals) {
                    Object.keys(state.portals).forEach(key => {
                        if (this.portals[key]) {
                            this.portals[key] = { ...this.portals[key], ...state.portals[key] };
                            
                            // Recriar portal se desbloqueado
                            if (this.portals[key].unlocked) {
                                this.createPortalElement(key);
                            }
                        }
                    });
                }
                
                // Carregar artefatos
                if (state.artifacts) {
                    this.artifacts = state.artifacts;
                }
                
                // Carregar chakra ativo
                if (state.activeChakra) {
                    this.activeChakra = state.activeChakra;
                }
                
                this.nexus.ui.log("Estado do upgrade carregado.", 'info');
            }
        } catch (e) {
            console.warn("Falha ao carregar estado do upgrade:", e);
        }
    }
}

// ==================== SISTEMA DE MISSÕES (ORIGINAL) ====================

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
                icon: '🧭'  // Bússola quântica
            },
            {
                id: 'oracle_initiate',
                title: 'INICIADO DO ORÁCULO',
                description: 'Consulte o oráculo 3 vezes',
                type: 'use_oracle',
                target: 3,
                reward: { quantum: 200, consciousness: 150 },
                icon: '⚛️'  // Átomo/símbolo quântico
            },
            {
                id: 'norse_adept',
                title: 'ADEUTO NÓRDICO',
                description: 'Alcance nível 15 de influência nórdica',
                type: 'influence',
                field: 'norse',
                target: 15,
                reward: { quantum: 400, consciousness: 80 },
                icon: 'ᛉ'  // Runa Algiz (proteção)
            },
            {
                id: 'entity_collector',
                title: 'COLETOR DE ENTIDADES',
                description: 'Interaja com 5 entidades diferentes',
                type: 'interact_entities',
                target: 5,
                reward: { quantum: 250, consciousness: 200 },
                icon: '𓆓'  // Símbolo egípcio (cobra)
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
        
        window.nexus.ui.showTransmission("MISSION", 
            `"${mission.title}" completada! Recompensa recebida.`, 4000);
        window.nexus.ui.log(`Missão completada: ${mission.title}`, 'mission');
        
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

// ==================== TUTORIAL MANAGER (ORIGINAL) ====================

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
        this.nexus.ui.log("Tutorial concluído. Boa jornada, viajante quântico!", 'success');
        this.nexus.ui.showTransmission("SYSTEM", "Sistemas de aprendizagem concluídos. O Nexus está à sua disposição.", 3000);
    }
}

// ==================== UNIVERSE STATE (ORIGINAL COM UPGRADE) ====================

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
        
        // Adicionar energia ao chakra ativo se houver upgrade
        if (window.nexus.upgrade) {
            window.nexus.upgrade.addChakraEnergy(window.nexus.upgrade.activeChakra, 0.01);
        }
        
        this.addInfluence(this.field, 0.01);
    }

    addInfluence(field, amount = 1) {
        if (!this.influence[field]) return null;
        
        const oldLevel = this.influence[field].level;
        this.influence[field].level += amount;
        
        // Check for threshold unlocks
        this.checkThresholdUnlocks(field, oldLevel);
        
        return null;
    }
    
    checkThresholdUnlocks(field, oldLevel) {
        for (const threshold of this.unlockThresholds) {
            if (oldLevel < threshold && this.influence[field].level >= threshold) {
                if (!this.influence[field].unlocked.includes(threshold)) {
                    this.influence[field].unlocked.push(threshold);
                    
                    // Notify UI
                    if (window.nexus && window.nexus.ui) {
                        window.nexus.ui.showUnlockEffect(field, threshold);
                        
                        switch(threshold) {
                            case 5:
                                window.nexus.ui.log(`${field.toUpperCase()} field accessible.`, 'info');
                                break;
                            case 15:
                                window.nexus.ui.showTransmission("SYSTEM", 
                                    `Minor deities available in ${field}.`, 3000);
                                break;
                            case 30:
                                window.nexus.ui.showTransmission("SYSTEM", 
                                    `Rituals unlocked in ${field}.`, 3000);
                                break;
                            case 50:
                                window.nexus.ui.showPriorityTransmission("ASCENSION", 
                                    `${field.toUpperCase()} MASTERY ACHIEVED`, 4000);
                                this.addEnergy(500, 'quantum');
                                break;
                        }
                    }
                }
            }
        }
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

// ==================== MOVEMENT ENGINE (ORIGINAL) ====================

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

// ==================== ORACLE ENGINE (SIMPLIFICADO) ====================

class OracleEngine {
    constructor(universe) {
        this.universe = universe;
        this.library = new OracleLibrary(); // Usa a nova biblioteca
    }

    draw(field = null) {
        const actualField = field || this.universe.field || 'base';
        
        // Evitar repetição recente
        const recentCards = this.universe.lastOracleDraws
            .filter(d => Date.now() - d.time < 30000)
            .map(d => d.card.id);
        
        // Pegar carta da biblioteca
        let card;
        let attempts = 0;
        
        do {
            card = this.library.getRandomCard(actualField);
            attempts++;
        } while (recentCards.includes(card.id) && attempts < 10);
        
        // Aplicar modificadores de campo
        const mod = this.universe.getFieldModifier(actualField);
        const adjustedEffect = {
            q: card.effect.q * mod.oracleWeight,
            c: card.effect.c * (actualField === 'base' ? 1 : 1.5)
        };
        
        // Salvar no histórico
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

    drawTriple() {
        const field = this.universe.field || 'base';
        return this.library.getMultipleCards(field, 3);
    }
}

// ==================== UI MANAGER (COM SISTEMA DE FILA) ====================

class UIManager {
    constructor(nexus) {
        this.nexus = nexus;
        this.universe = nexus.universe;
        this.microFeedbacks = [];
        this.currentOracleCards = [];
        this.revealedCards = [];
        this.transmissionQueue = [];
        this.isShowingTransmission = false;
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
                this.showPhaseHint(hints[newPhase]);
            }
        }
    }

    checkCriticalEnergy() {
        const critical = this.universe.energy.quantum < 100;
        if (critical && !document.body.classList.contains('critical-energy')) {
            document.body.classList.add('critical-energy');
            this.showPriorityTransmission('CRITICAL', 
                'Energia Quântica Crítica! Procure zona de recarga.', 5000);
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

    // ==================== SISTEMA DE TRANSMISSÃO COM FILA ====================
    showTransmission(source, message, duration = 5000) {
        // Adicionar à fila
        this.transmissionQueue.push({
            source: source,
            message: message,
            duration: duration,
            timestamp: Date.now()
        });
        
        // Processar fila se não estiver mostrando nada
        if (!this.isShowingTransmission) {
            this.processTransmissionQueue();
        }
    }

    processTransmissionQueue() {
        if (this.transmissionQueue.length === 0) {
            this.isShowingTransmission = false;
            return;
        }
        
        this.isShowingTransmission = true;
        
        // Pegar próxima mensagem
        const transmission = this.transmissionQueue.shift();
        
        const tx = document.getElementById('divineTransmission');
        const sourceNames = {
            SYSTEM: "VOZ DO SISTEMA",
            ODIN: "SUSSURRO DE ODIN",
            ZEUS: "ECO DO OLIMPO",
            RA: "SOL DE RÁ",
            MORRIGAN: "SOMBRA DA MORRÍGAN",
            CHAKRA: "SISTEMA DE CHAKRAS",
            PORTAL: "REDE DE PORTAL",
            ARTIFACT: "COLETOR DE ARTEFATOS",
            MISSION: "SISTEMA DE MISSÕES"
        };
        
        document.getElementById('txGodName').textContent = 
            sourceNames[transmission.source] || transmission.source;
        
        document.getElementById('txMessage').textContent = transmission.message;
        
        // Mostrar transmissão
        tx.classList.add('active');
        
        // Log no sistema
        const logMessages = [
            `Sinal recebido de ${transmission.source.toLowerCase()}`,
            `${transmission.source} comunica-se`,
            `Transmissão: ${transmission.source}`,
            `Mensagem entrelaçada`
        ];
        
        this.log(logMessages[Math.floor(Math.random() * logMessages.length)], 'info');
        
        // Configurar timeout para próxima mensagem
        setTimeout(() => {
            tx.classList.remove('active');
            
            // Pequeno delay entre mensagens
            setTimeout(() => {
                this.processTransmissionQueue();
            }, 500); // 500ms entre mensagens
        }, transmission.duration);
    }

    showPriorityTransmission(source, message, duration = 4000) {
        // Limpar fila atual
        this.clearTransmissionQueue();
        
        // Mostrar mensagem prioritária imediatamente
        const tx = document.getElementById('divineTransmission');
        
        const sourceNames = {
            SYSTEM: "VOZ DO SISTEMA",
            CRITICAL: "ALERTA CRÍTICO",
            ASCENSION: "ASCENSÃO",
            DANGER: "PERIGO"
        };
        
        document.getElementById('txGodName').textContent = 
            sourceNames[source] || source;
        
        document.getElementById('txMessage').textContent = message;
        
        // Adicionar classe de prioridade
        tx.classList.add('active', 'transmission-important');
        
        // Log
        this.log(`[PRIORIDADE] ${source}: ${message}`, 'warning');
        
        // Remover após duração
        setTimeout(() => {
            tx.classList.remove('active', 'transmission-important');
            // Retomar fila normal após 1 segundo
            setTimeout(() => {
                this.processTransmissionQueue();
            }, 1000);
        }, duration);
    }

    clearTransmissionQueue() {
        this.transmissionQueue = [];
        const tx = document.getElementById('divineTransmission');
        tx.classList.remove('active');
        this.isShowingTransmission = false;
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

    async revealCard(cardEl, card, index) {
        if (cardEl.classList.contains('flipped')) return;
        
        cardEl.classList.remove('unrevealed');
        cardEl.classList.add('flipped');
        
        // Usar biblioteca para animação se disponível
        if (window.nexus.oracle.library && window.nexus.oracle.library.revealCardWithAnimation) {
            await window.nexus.oracle.library.revealCardWithAnimation(cardEl, card);
        }
        
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
        
        this.log(`O oráculo revela: ${card.name}`, 'oracle');
        
        // Atualizar progresso da missão
        this.universe.missions.updateProgress('oracle_use');
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

    log(message, type = 'info') {
        const feed = document.getElementById('logFeed');
        const div = document.createElement('div');
        div.className = `log-entry log-${type}`;
        
        const now = new Date();
        const ts = `${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`;
        
        // Ícone baseado no tipo
        const icons = {
            info: '📡',
            warning: '⚠️',
            error: '🚨',
            success: '✅',
            mission: '🎯',
            oracle: '🔮'
        };
        
        div.innerHTML = `
            <span class="log-time">${ts}</span>
            <span class="log-icon">${icons[type] || '📝'}</span>
            <span class="log-message">${message}</span>
        `;
        
        feed.prepend(div);
        
        // Limitar a 20 entradas
        if (feed.children.length > 20) {
            feed.removeChild(feed.lastChild);
        }
        
        // Animação de entrada
        div.style.animation = 'logEntry 0.3s ease';
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
        
        this.showTransmission('SYSTEM', messages[threshold] || `Nível ${threshold} alcançado em ${field}`, 3000);
        
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

// ==================== NEXUS CORE (ORIGINAL COM UPGRADE) ====================

class NexusCore {
    constructor() {
        this.universe = new UniverseState();
        this.movement = new MovementEngine(this.universe);
        this.oracle = new OracleEngine(this.universe);
        this.ui = new UIManager(this);
        this.tutorial = new TutorialManager(this);
        this.upgrade = new QuantumUpgradeSystem(this); // SISTEMA DE UPGRADE
        
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
                        this.ui.log("System Online. Welcome to Nexus 2126.", 'info');
                        this.ui.showTransmission("SYSTEM", "Quantum field stable. Begin exploration.", 3000);
                        
                        // Verificar se há sistema de upgrade
                        if (this.upgrade) {
                            this.ui.log("Quantum Upgrade System initialized.", 'info');
                        }
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
        
        window.addEventListener('beforeunload', () => {
            this.saveState();
            if (this.upgrade) {
                this.upgrade.saveUpgradeState();
            }
        });
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
            this.ui.showTransmission("SYSTEM", "Insufficient quantum energy for oracle.", 2500);
            return;
        }
        
        this.universe.consumeEnergy(100, 'quantum');
        const cards = this.oracle.drawTriple();
        this.ui.showOracle(cards);
        
        this.ui.log(`Oracle engaged in ${this.universe.field} field.`, 'oracle');
    }

    drawTriple() {
        if (this.universe.energy.quantum < 50) {
            this.ui.showTransmission("SYSTEM", "Energy too low for triple draw.", 2500);
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
                const god = this.oracle.draw('base');
                this.ui.showTransmission("QUANTUM ENTITY", god.meaning, 3500);
            },
            () => {
                this.universe.addEnergy(50, 'quantum');
                this.ui.createMicroFeedback(
                    document.getElementById('playerVehicle'),
                    "+50Ω",
                    '#00f3ff'
                );
                this.ui.log("Quantum energy surge detected.", 'info');
            },
            () => {
                const field = this.universe.field;
                if (field && this.universe.influence[field].level < 50) {
                    this.universe.addInfluence(field, 2);
                    this.ui.log(`Field resonance: ${field} influence increased.`, 'info');
                }
            }
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        randomEvent();
    }

    togglePause() {
        const btn = document.getElementById('btnPause');
        const icon = btn.querySelector('i');
        
        if (this.universe.throttle === 0) {
            this.universe.throttle = 30;
            icon.className = 'fas fa-pause';
            this.ui.log("Navigation resumed.", 'info');
        } else {
            this.universe.throttle = 0;
            icon.className = 'fas fa-play';
            this.ui.log("Navigation paused.", 'info');
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
                this.ui.log("Previous session state restored.", 'info');
            }
        } catch (e) {
            console.warn("Failed to load saved state:", e);
        }
    }
}

// ==================== INICIALIZAÇÃO ====================

window.addEventListener('load', () => {
    window.nexus = new NexusCore();
});

// DEBUG: Verificar botões do oráculo
setTimeout(() => {
    const oracleBtn = document.getElementById('btnOraclePanel');
    const oracleMobileBtn = document.getElementById('btnOracleMobile');
    
    console.log('Botão Oracle (painel):', oracleBtn);
    console.log('Botão Oracle (mobile):', oracleMobileBtn);
    
    if (oracleBtn) {
        oracleBtn.addEventListener('click', () => {
            console.log('Botão oracle clicado!');
            console.log('Energia atual:', window.nexus?.universe?.energy?.quantum);
        });
    }
    
    if (oracleMobileBtn) {
        oracleMobileBtn.addEventListener('click', () => {
            console.log('Botão oracle mobile clicado!');
        });
    }
}, 2000);