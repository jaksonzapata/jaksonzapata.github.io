# Pokemon Team Builder - Usage Guide

## Overview
A simple Pokemon Team Builder application that uses the PokeAPI to fetch and display Pokemon data dynamically. Users can search for Pokemon, view their details, select moves, and build a team of up to 6 Pokemon.

## Features

### ✅ All Assignment Requirements Met:

1. **Pokemon Search**: Enter Pokemon name (e.g., "pikachu") or ID (e.g., "25")
2. **Fetch API Integration**: Uses `fetch()` to retrieve data from PokeAPI
3. **Dynamic Data Display**:
   - Pokemon image displayed
   - Pokemon cry (sound) with audio player
   - All available moves loaded into 4 dropdown menus
   - User can select up to 4 moves from dropdowns
4. **Add to Team**: Saves selected Pokemon with chosen moves
5. **Response Caching**: Caches API responses to minimize API calls

### Additional Features:

- **Team Display**: Shows all Pokemon in your team with their details
- **Team Management**: Remove Pokemon from team
- **Validation**: 
  - Maximum 6 Pokemon per team
  - Prevents duplicate Pokemon
  - Requires at least 1 move selection
- **Responsive Design**: Works on mobile and desktop
- **User-Friendly UI**: Modern, colorful design with smooth animations

## How to Use

1. **Open the Application**:
   - Open `pokemon-team-builder.html` in a web browser
   - Or use a local server: `python -m http.server 8000` and visit `http://localhost:8000/pokemon-team-builder.html`

2. **Search for Pokemon**:
   - Enter a Pokemon name (lowercase, e.g., "charizard") or ID (e.g., "6")
   - Click "Search Pokemon" or press Enter

3. **View Pokemon Details**:
   - See the Pokemon's image, type, height, weight
   - Play the Pokemon's cry using the audio player
   - View all available moves in the dropdowns

4. **Select Moves**:
   - Choose up to 4 moves from the dropdown menus
   - You must select at least 1 move to add to team

5. **Add to Team**:
   - Click "Add to Team" button
   - Pokemon appears in the "My Pokemon Team" section below
   - You can add up to 6 Pokemon

6. **Manage Team**:
   - View all team members in card format
   - Play each Pokemon's cry
   - Remove Pokemon using the "Remove" button

## Technical Implementation

### Caching System
- First API call stores response in `pokemonCache` object
- Subsequent searches check cache first before making API calls
- Caches by name, ID, and original query for flexibility
- Console logs indicate cache hits vs. API calls

### File Structure
- `pokemon-team-builder.html` - Main HTML structure
- `pokemon-team-builder.js` - All JavaScript logic and API integration
- `pokemon-team-builder.css` - Styling and responsive design

## Example Pokemon to Try
- pikachu (25)
- charizard (6)
- mewtwo (150)
- bulbasaur (1)
- eevee (133)
- dragonite (149)

## Notes
- No frameworks used - pure HTML, CSS, and JavaScript
- API responses are cached to minimize server load
- Audio format uses OGG files from PokeAPI
- Responsive design adapts to different screen sizes
