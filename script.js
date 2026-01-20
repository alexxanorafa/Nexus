/**
 * NEXUS 2126 - CORE ENGINE V2.0
 * Integrando Logic-Base do Biblioteca.json com UI High-End
 */

class NexusCore {
    constructor() {
        // Estado do Sistema
        this.state = {
            pos: { x: 50, y: 50 }, // Posição 0-100
            targetPos: { x: 50, y: 50 },
            velocity: { x: 0, y: 0 },
            throttle: 0,
            energy: { 
                quantum: 1000, 
                maxQ: 2000, 
                consciousness: 200, 
                maxC: 1000 
            },
            mode: 'NAV', // NAV, DATA, RITUAL
            paused: false,
            godsFound: [],
            activeOracle: null
        };

        // DATABASE COMPLETA (Embedded para evitar CORS/Fetch errors localmente)
        this.db = {
            mythologies: [
                { id: "norse", name: "Nórdica", color: "#bc13fe", quadrant: {x:0, y:0, w:50, h:50} }, // Top Left
                { id: "greek", name: "Grega", color: "#0055ff", quadrant: {x:50, y:0, w:50, h:50} }, // Top Right
                { id: "egyptian", name: "Egípcia", color: "#ffd60a", quadrant: {x:0, y:50, w:50, h:50} }, // Bottom Left
                { id: "celtic", name: "Celta", color: "#00ffaa", quadrant: {x:50, y:50, w:50, h:50} } // Bottom Right
            ],
            gods: [
                { id: "odin", name: "Odin", myth: "norse", power: 9, cost: 300, desc: "Pai de todos e senhor da sabedoria." },
                { id: "thor", name: "Thor", myth: "norse", power: 8, cost: 250, desc: "Deus do trovão e força bruta." },
                { id: "frigg", name: "Frigg", myth: "norse", power: 7, cost: 200, desc: "Deusa do destino e intuição." },
                { id: "zeus", name: "Zeus", myth: "greek", power: 10, cost: 400, desc: "Rei dos deuses e senhor dos céus." },
                { id: "athena", name: "Atena", myth: "greek", power: 7, cost: 200, desc: "Sabedoria estratégica e guerra justa." },
                { id: "apollo", name: "Apolo", myth: "greek", power: 8, cost: 250, desc: "Luz, música e profecia." },
                { id: "ra", name: "Ra", myth: "egyptian", power: 9, cost: 300, desc: "Deus solar e criador primordial." },
                { id: "isis", name: "Isis", myth: "egyptian", power: 8, cost: 250, desc: "Magia, cura e maternidade." },
                { id: "osiris", name: "Osíris", myth: "egyptian", power: 7, cost: 200, desc: "Senhor da vida após a morte." },
                { id: "morrigan", name: "Morrígan", myth: "celtic", power: 7, cost: 200, desc: "Deusa da guerra e do destino." },
                { id: "dagda", name: "Dagda", myth: "celtic", power: 8, cost: 250, desc: "Senhor da terra e abundância." },
                { id: "brigid", name: "Brigid", myth: "celtic", power: 6, cost: 150, desc: "Cura, poesia e forja." }
            ],
            chakras: [
                { id: "root", name: "Raiz", color: "#ff0000", freq: 396 },
                { id: "sacral", name: "Sacral", color: "#ff5500", freq: 417 },
                { id: "solar", name: "Plexo", color: "#ffff00", freq: 528 },
                { id: "heart", name: "Coração", color: "#00ff00", freq: 639 },
                { id: "throat", name: "Garganta", color: "#0000ff", freq: 741 },
                { id: "third", name: "3º Olho", color: "#4b0082", freq: 852 },
                { id: "crown", name: "Coroa", color: "#9400d3", freq: 960 }
            ],
            oracles: [
                { name: "O Louco", meaning: "Novos começos, liberdade", effect: {q: 50, c: 10} },
                { name: "O Mago", meaning: "Poder, manifestação", effect: {q: 100, c: 20} },
                { name: "A Sacerdotisa", meaning: "Intuição, mistério", effect: {q: 20, c: 50} },
                { name: "A Imperatriz", meaning: "Fertilidade, abundância", effect: {q: 80, c: 30} },
                { name: "A Torre", meaning: "Mudança súbita, caos", effect: {q: -50, c: 40} },
                { name: "A Estrela", meaning: "Esperança, renovação", effect: {q: 60, c: 60} }
            ]
        };

        this.init();
    }

    init() {
        this.simulateBoot();
        this.setupBackground();
        this.renderBoard();
        this.setupControls();
        this.setupEcosystemMenu(); // Novo Menu
        this.gameLoop();
    }

    simulateBoot() {
        const loader = document.getElementById('loader');
        const bar = document.getElementById('bootBar');
        const log = document.getElementById('bootLog');
        let p = 0;

        const msgs = ["Initializing Quantum Core...", "Loading Mythological Database...", "Calibrating Oracles...", "Connecting to Nexus..."];

        const interval = setInterval(() => {
            p += Math.random() * 5;
            if (p > 100) p = 100;
            
            bar.style.width = p + "%";
            if (Math.random() > 0.8) log.innerText = msgs[Math.floor(Math.random() * msgs.length)];

            if (p === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loader.style.opacity = 0;
                    setTimeout(() => loader.style.display = 'none', 500);
                    this.log("System Online. Welcome to Nexus.");
                }, 500);
            }
        }, 30);
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

    renderBoard() {
        const districtLayer = document.getElementById('districtLayer');
        const entityLayer = document.getElementById('entityLayer');

        // 1. Render Districts (Background Zones)
        this.db.mythologies.forEach(myth => {
            const el = document.createElement('div');
            el.className = 'district-zone';
            el.style.left = myth.quadrant.x + '%';
            el.style.top = myth.quadrant.y + '%';
            el.style.width = myth.quadrant.w + '%';
            el.style.height = myth.quadrant.h + '%';
            el.style.color = myth.color; // CSS Variable usage
            el.innerHTML = `<div class="district-name" style="color:${myth.color}">${myth.name}</div>`;
            districtLayer.appendChild(el);
        });

        // 2. Render Gods (Nodes)
        // Distribuir deuses randomicamente dentro dos seus quadrantes
        this.db.gods.forEach(god => {
            const myth = this.db.mythologies.find(m => m.id === god.myth);
            const offsetX = 10 + Math.random() * 30; // Margem segura dentro do quadrante
            const offsetY = 10 + Math.random() * 30;
            
            god.x = myth.quadrant.x + offsetX;
            god.y = myth.quadrant.y + offsetY;

            const el = document.createElement('div');
            el.className = 'entity-node';
            el.style.left = god.x + '%';
            el.style.top = god.y + '%';
            el.style.color = myth.color;
            el.innerHTML = `<div class="entity-label">${god.name}</div>`;
            
            // Interaction
            el.addEventListener('click', () => this.showHoloInfo(god));
            
            entityLayer.appendChild(el);
        });

        // 3. Render Chakras (Spiral Center)
        this.db.chakras.forEach((chakra, index) => {
            const angle = (index / 7) * Math.PI * 2;
            const radius = 15; // Raio central
            const cx = 50 + Math.cos(angle) * radius;
            const cy = 50 + Math.sin(angle) * radius;

            const el = document.createElement('div');
            el.className = 'entity-node';
            el.style.left = cx + '%';
            el.style.top = cy + '%';
            el.style.color = chakra.color;
            el.style.border = '1px solid white';
            el.innerHTML = `<div class="entity-label">${chakra.name}</div>`;
            
            el.addEventListener('click', () => this.showHoloInfo({
                name: chakra.name,
                desc: `Frequência: ${chakra.freq}Hz. Centro energético vital.`,
                type: 'Chakra'
            }));

            entityLayer.appendChild(el);
        });
    }

    setupControls() {
        // Accelerator (Press & Hold Logic)
        const btnAccel = document.getElementById('btnAccel');
        const handleAccel = (active) => {
            if (this.state.paused) return;
            const target = active ? 100 : 0;
            
            // Animation loop for smooth throttle UI
            if (this.throttleAnim) clearInterval(this.throttleAnim);
            this.throttleAnim = setInterval(() => {
                const diff = target - this.state.throttle;
                if (Math.abs(diff) < 1) {
                    this.state.throttle = target;
                    clearInterval(this.throttleAnim);
                } else {
                    this.state.throttle += diff * 0.1;
                }
                this.updateThrottleUI();
            }, 16);
        };

        btnAccel.addEventListener('mousedown', () => handleAccel(true));
        btnAccel.addEventListener('mouseup', () => handleAccel(false));
        btnAccel.addEventListener('mouseleave', () => handleAccel(false));
        
        // Touch support
        btnAccel.addEventListener('touchstart', (e) => { e.preventDefault(); handleAccel(true); });
        btnAccel.addEventListener('touchend', (e) => { e.preventDefault(); handleAccel(false); });

        // Brake/Pause
        document.getElementById('btnBrake').addEventListener('click', () => {
            this.state.paused = !this.state.paused;
            const icon = document.getElementById('btnBrake').querySelector('i');
            icon.className = this.state.paused ? 'fas fa-play' : 'fas fa-pause';
            this.log(this.state.paused ? "System Paused." : "System Resumed.");
        });

        // Oracle
        document.getElementById('btnOracle').addEventListener('click', () => this.triggerOracle());

        // Modal Close
        document.getElementById('holoClose').addEventListener('click', () => {
            document.getElementById('holoModal').classList.remove('active');
        });
    }

    gameLoop() {
        if (!this.state.paused) {
            // Movement Logic
            if (this.state.throttle > 5) {
                // Mover em direção aleatória (simulação quântica) ou baseada num vetor se implementado
                // Aqui faremos um "drift" quântico
                const speed = (this.state.throttle / 100) * 0.2;
                
                // Brownian motion influenced by throttle
                this.state.pos.x += (Math.random() - 0.5) * speed;
                this.state.pos.y += (Math.random() - 0.5) * speed;

                // Boundaries
                if (this.state.pos.x < 0) this.state.pos.x = 100;
                if (this.state.pos.x > 100) this.state.pos.x = 0;
                if (this.state.pos.y < 0) this.state.pos.y = 100;
                if (this.state.pos.y > 100) this.state.pos.y = 0;

                // Consume Energy
                if (Math.random() > 0.9) {
                    this.state.energy.quantum -= 1;
                    this.updateUI();
                }
            }
            
            // Update Vehicle DOM
            const veh = document.getElementById('playerVehicle');
            veh.style.left = this.state.pos.x + '%';
            veh.style.top = this.state.pos.y + '%';
            
            // Update HUD POS
            const qX = this.state.pos.x < 50 ? 'L' : 'R';
            const qY = this.state.pos.y < 50 ? 'T' : 'B';
            document.getElementById('hudPos').innerText = `${qY}${qX}-${Math.floor(this.state.pos.x)}`;
        }

        requestAnimationFrame(() => this.gameLoop());
    }

    triggerOracle() {
        if (this.state.activeOracle) return;
        
        const btn = document.getElementById('btnOracle');
        const span = btn.querySelector('span');
        const icon = btn.querySelector('i');
        
        span.innerText = "COLLAPSING...";
        icon.className = "fas fa-spinner fa-spin";
        
        setTimeout(() => {
            const card = this.db.oracles[Math.floor(Math.random() * this.db.oracles.length)];
            this.state.activeOracle = card;
            
            // UI Update
            document.getElementById('activeOracleCard').innerHTML = `
                <div class="card-icon"><i class="fas fa-bolt"></i></div>
                <div>
                    <div class="card-name">${card.name}</div>
                    <div style="font-size:10px; color:#aaa">${card.meaning}</div>
                </div>
            `;
            
            // Apply Effects
            this.state.energy.quantum += card.effect.q;
            this.state.energy.consciousness += card.effect.c;
            this.log(`Oracle: ${card.name} drawn.`);
            
            this.updateUI();
            
            // Reset Button
            span.innerText = "ENGAGE ORACLE";
            icon.className = "fas fa-dice-d20";
            this.state.activeOracle = null;
        }, 1500);
    }

    showHoloInfo(data) {
        const modal = document.getElementById('holoModal');
        const title = document.getElementById('holoTitle');
        const content = document.getElementById('holoContent');
        const footer = document.getElementById('holoFooter');
        
        title.innerText = data.name.toUpperCase();
        
        let html = '';
        if (data.desc) html += `<p>${data.desc}</p>`;
        if (data.power) html += `<div style="color:var(--neon-cyan)">POWER LEVEL: ${data.power}</div>`;
        if (data.cost) html += `<div style="color:var(--neon-purple)">ENERGY COST: ${data.cost}Ω</div>`;
        
        content.innerHTML = html;
        footer.innerText = `ID: ${data.id || 'N/A'} // SYSTEM.REF`;
        
        modal.classList.add('active');
    }

    updateThrottleUI() {
        document.getElementById('throttleFill').style.width = this.state.throttle + '%';
        document.getElementById('throttleVal').innerText = Math.floor(this.state.throttle) + '%';
    }

    updateUI() {
        // Bars
        const qPct = (this.state.energy.quantum / this.state.energy.maxQ) * 100;
        document.getElementById('barQuantum').style.width = qPct + '%';
        document.getElementById('valQuantum').innerText = Math.floor(this.state.energy.quantum);

        const cPct = (this.state.energy.consciousness / this.state.energy.maxC) * 100;
        document.getElementById('barConsciousness').style.width = cPct + '%';
        document.getElementById('valConsciousness').innerText = Math.floor(this.state.energy.consciousness);
    }

    log(msg) {
        const feed = document.getElementById('logFeed');
        const div = document.createElement('div');
        div.className = 'log-entry';
        const ts = new Date().toLocaleTimeString('pt-BR', { hour12: false });
        div.innerHTML = `<span class="log-ts">[${ts}]</span> ${msg}`;
        feed.prepend(div);
        if (feed.children.length > 15) feed.lastChild.remove();
    }

    setupBackground() {
        const cvs = document.getElementById('quantumField');
        const ctx = cvs.getContext('2d');
        const resize = () => { cvs.width = window.innerWidth; cvs.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        resize();

        const parts = Array.from({length: 40}, () => ({
            x: Math.random() * cvs.width,
            y: Math.random() * cvs.height,
            s: Math.random() * 2,
            v: Math.random() * 0.5
        }));

        const draw = () => {
            ctx.clearRect(0,0,cvs.width,cvs.height);
            ctx.fillStyle = '#00f3ff';
            parts.forEach(p => {
                p.y -= p.v;
                if(p.y < 0) p.y = cvs.height;
                ctx.globalAlpha = Math.random() * 0.5;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.s, 0, Math.PI*2);
                ctx.fill();
            });
            requestAnimationFrame(draw);
        };
        draw();
    }
}

// Start System
window.onload = () => {
    window.nexus = new NexusCore();
};