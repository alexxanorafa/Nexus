import { GameEngine } from './engine/engine.js';

async function loadJSON(path) {
  try {
    const response = await fetch(path);
    return await response.json();
  } catch (error) {
    console.error(`Erro ao carregar ${path}:`, error);
    return [];
  }
}

let data = {};
let player = {};
let game = {};

async function initGame() {
  data = {
    mitologias: await loadJSON('data/mitologias.json'),
    bairros: await loadJSON('data/bairros.json'),
    deuses: await loadJSON('data/deuses.json'),
    hierarquias: await loadJSON('data/hierarquias.json'),
    chakras: await loadJSON('data/chakras.json'),
    cartas: await loadJSON('data/cartas.json')
  };

  player = {
    position: 0,
    eden: 0,
    chakras: structuredClone(data.chakras),
    panteao: {}
  };

  data.deuses.forEach(d => {
    player.panteao[d.id] = {
      nome: d.nome || d.id,
      mitologia: d.mitologia,
      cartas: []
    };
  });

  game = new GameEngine(data, player);
  updateUI();
}

function updateUI() {
  document.getElementById('eden').textContent = player.eden;
  document.getElementById('pos').textContent = player.position;
  
  const alinhados = player.chakras.filter(c => c.estado === 'alinhado').length;
  document.getElementById('chakras').textContent = alinhados;
  
  updatePanteao();
}

function updatePanteao() {
  const deusesDiv = document.getElementById('deuses');
  deusesDiv.innerHTML = '';
  
  Object.entries(player.panteao).forEach(([deusId, info]) => {
    if (info.cartas.length > 0) {
      const div = document.createElement('div');
      div.className = 'deus-carta';
      
      const nome = data.deuses.find(d => d.id === deusId)?.nome || deusId;
      const mitologia = data.mitologias.find(m => m.id === info.mitologia)?.nome || info.mitologia;
      
      div.innerHTML = `
        <h4>${nome}</h4>
        <div>Mitologia: ${mitologia}</div>
        <div>Cartas: ${info.cartas.length}</div>
        <div class="cartas-lista">
          ${info.cartas.map(c => c.nome).join(', ')}
        </div>
      `;
      
      deusesDiv.appendChild(div);
    }
  });
}

document.getElementById('turn').onclick = () => {
  if (!game) return;
  
  const result = game.turn();
  updateUI();
  
  const log = document.getElementById('log');
  log.textContent = result + '\n' + log.textContent;
};

// Inicializar o jogo quando a página carrega
window.addEventListener('DOMContentLoaded', initGame);