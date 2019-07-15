// General: pokeAPI
// Data: pokeAPI['data']

// Name: pokeAPI['data']['name']
// Type: pokeAPI['data']['types'][0]['type']['name']
// Image (front_default): pokeAPI['data']['sprites']['front_default']

// Speed: pokeAPI['data']['stats'][0]['base_stat']
// Special Defense: pokeAPI['data']['stats'][1]['base_stat']
// Special Attack: pokeAPI['data']['stats'][2]['base_stat']
// Defense: pokeAPI['data']['stats'][3]['base_stat']
// Attack: pokeAPI['data']['stats'][4]['base_stat']
// HP: pokeAPI['data']['stats'][5]['base_stat']

// Abilities: pokeAPI['data']['abilities'][...Integer...]
// Moves: pokeAPI['data']['moves'][...Integer...]
// Encounter-data: pokeAPI['data']['location_area_encounters']

/*  Evolved from
const speciesURL = pokeAPI['data']['species']['url']
const speciesAPI = await axios.get(speciesURL) 

const evolvedFrom = speciesAPI['data']['evolves_from_species']['name']
*/


const input = document.getElementsByTagName('input')
const button = document.getElementsByTagName('button')

async function pokeGET() {
    const pokeSearch = input[0].value
    const pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeSearch}/`)

    //console.log(pokeAPI['data'])

    const speciesURL = pokeAPI['data']['species']['url']
    const speciesAPI = await axios.get(speciesURL) 


    //console.log(speciesAPI['data']['evolves_from_species']['name'])
}

button[0].addEventListener('click', async function(e) {pokeGET()})