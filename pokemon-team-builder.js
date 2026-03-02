const pokemonCache = {};

let pokemonTeam = [];

const pokemonInput = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const pokemonDetails = document.getElementById('pokemonDetails');
const errorMessage = document.getElementById('errorMessage');
const addToTeamBtn = document.getElementById('addToTeamBtn');
const teamDisplay = document.getElementById('teamDisplay');

let currentPokemon = null;

searchBtn.addEventListener('click', searchPokemon);
pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchPokemon();
    }
});
addToTeamBtn.addEventListener('click', addToTeam);

async function searchPokemon() {
    const query = pokemonInput.value.trim().toLowerCase();
    
    if (!query) {
        showError('Please enter a Pokemon name or ID');
        return;
    }

    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    try {
        let pokemonData;
        if (pokemonCache[query]) {
            console.log('Loading from cache:', query);
            pokemonData = pokemonCache[query];
        } else {
            console.log('Fetching from API:', query);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            
            if (!response.ok) {
                throw new Error('Pokemon not found');
            }
            
            pokemonData = await response.json();
            pokemonCache[query] = pokemonData;
            pokemonCache[pokemonData.id] = pokemonData;
            pokemonCache[pokemonData.name] = pokemonData;
        }

        displayPokemon(pokemonData);
        currentPokemon = pokemonData;
        
    } catch (error) {
        showError('Pokemon not found. Please try again.');
        pokemonDetails.style.display = 'none';
        console.error('Error:', error);
    }
}

function displayPokemon(data) {
    pokemonDetails.style.display = 'block';

    const pokemonImage = document.getElementById('pokemonImage');
    pokemonImage.src = data.sprites.front_default || data.sprites.other['official-artwork'].front_default;
    pokemonImage.alt = data.name;

    document.getElementById('pokemonName').textContent = capitalizeFirst(data.name);
    document.getElementById('pokemonId').textContent = data.id;
    document.getElementById('pokemonType').textContent = data.types.map(t => capitalizeFirst(t.type.name)).join(', ');
    document.getElementById('pokemonHeight').textContent = `${data.height / 10} m`;
    document.getElementById('pokemonWeight').textContent = `${data.weight / 10} kg`;

    const pokemonAudio = document.getElementById('pokemonAudio');
    if (data.cries && data.cries.latest) {
        pokemonAudio.src = data.cries.latest;
    } else if (data.cries && data.cries.legacy) {
        pokemonAudio.src = data.cries.legacy;
    } else {
        pokemonAudio.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg`;
    }

    populateMoveDropdowns(data.moves);

    pokemonDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function populateMoveDropdowns(moves) {
    const moveSelects = [
        document.getElementById('move1'),
        document.getElementById('move2'),
        document.getElementById('move3'),
        document.getElementById('move4')
    ];

    moveSelects.forEach(select => {
        select.innerHTML = '<option value="">-- Select Move --</option>';
    });

    moves.forEach(moveData => {
        const moveName = capitalizeFirst(moveData.move.name.replace('-', ' '));
        
        moveSelects.forEach(select => {
            const option = document.createElement('option');
            option.value = moveData.move.name;
            option.textContent = moveName;
            select.appendChild(option);
        });
    });
}

function addToTeam() {
    if (!currentPokemon) {
        showError('No Pokemon selected');
        return;
    }

    const selectedMoves = [
        document.getElementById('move1').value,
        document.getElementById('move2').value,
        document.getElementById('move3').value,
        document.getElementById('move4').value
    ];

    const validMoves = selectedMoves.filter(move => move !== '');

    if (validMoves.length === 0) {
        showError('Please select at least one move');
        return;
    }

    if (pokemonTeam.length >= 6) {
        showError('Team is full! Maximum 6 Pokemon allowed.');
        return;
    }

    const alreadyInTeam = pokemonTeam.some(p => p.id === currentPokemon.id);
    if (alreadyInTeam) {
        showError('This Pokemon is already in your team!');
        return;
    }

    const teamMember = {
        id: currentPokemon.id,
        name: currentPokemon.name,
        image: currentPokemon.sprites.front_default || currentPokemon.sprites.other['official-artwork'].front_default,
        types: currentPokemon.types.map(t => t.type.name),
        moves: validMoves
    };

    pokemonTeam.push(teamMember);
    displayTeam();
    
    showSuccess(`${capitalizeFirst(currentPokemon.name)} added to team!`);
}

function displayTeam() {
    if (pokemonTeam.length === 0) {
        teamDisplay.innerHTML = '<p class="empty-team">No Pokemon added yet. Start building your team!</p>';
        return;
    }

    teamDisplay.innerHTML = '';

    pokemonTeam.forEach((pokemon, index) => {
        const teamCard = document.createElement('div');
        teamCard.className = 'team-card';
        
        teamCard.innerHTML = `
            <div class="team-card-header">
                <h3>${capitalizeFirst(pokemon.name)}</h3>
                <button class="remove-btn" onclick="removePokemon(${index})">Remove</button>
            </div>
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <p><strong>Types:</strong> ${pokemon.types.map(t => capitalizeFirst(t)).join(', ')}</p>
            <div class="team-moves">
                <strong>Moves:</strong>
                <ul>
                    ${pokemon.moves.map(move => `<li>${capitalizeFirst(move.replace('-', ' '))}</li>`).join('')}
                </ul>
            </div>
        `;

        teamDisplay.appendChild(teamCard);
    });
}

function removePokemon(index) {
    const pokemonName = pokemonTeam[index].name;
    pokemonTeam.splice(index, 1);
    displayTeam();
    showSuccess(`${capitalizeFirst(pokemonName)} removed from team.`);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.className = 'error-message';
}

function showSuccess(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.className = 'success-message';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
