/* GENERAL

General: pokeAPI
Data: pokeAPI['data']

id: pokeAPI['data']['id']
Name: pokeAPI['data']['name']
Type: pokeAPI['data']['types'][0]['type']['name']
Image (front_default): pokeAPI['data']['sprites']['front_default']

Height: pokeAPI['data']['height']
Weight: pokeAPI['data']['weight']

baseEXP: pokeAPI['data']['base_experience']

Speed: pokeAPI['data']['stats'][0]['base_stat']
Special Defense: pokeAPI['data']['stats'][1]['base_stat']
Special Attack: pokeAPI['data']['stats'][2]['base_stat']
Defense: pokeAPI['data']['stats'][3]['base_stat']
Attack: pokeAPI['data']['stats'][4]['base_stat']
HP: pokeAPI['data']['stats'][5]['base_stat']

Abilities: pokeAPI['data']['abilities'][...Integer...]
Moves: pokeAPI['data']['moves'][...Integer...]
Encounter-data: pokeAPI['data']['location_area_encounters']

*/

/*  SPECIES DATA

const speciesURL = pokeAPI['data']['species']['url']
const speciesAPI = await axios.get(speciesURL) 


evolvedFrom: speciesAPI['data']['evolves_from_species']['name']

baseHappiness: speciesAPI['data']['base_happiness']
captureRate: speciesAPI['data']['capture_rate']
growthRate: speciesAPI['data']['growth_rate']

habitat: speciesAPI['data']['habitat']['name']

*/

/* FLAVOR TEXT LIST 

const flavorList = speciesAPI['data']['flavor_text_entries']
const flavorListEN = new Array()

for(const i = 0; i < flavorList.length; i++){
    if (flavorList[i]['language']['name'] == en) flavorListEN.push(lavorList[i]['flavor_text'])
}


flavorText: flavorListEN[...integer...]

*/


/* EVOLUTION CHAIN

const evolutionURL = speciesAPI['data']['evolution_chain']['url']
const evolutionAPI = await axios.get(evolutionURL)

stage1NAME: evolutionAPI['data']['chain']['species']['name']
stage2NAME: evolutionAPI['data']['chain']['evolves_to'][0]['species']['name']
stage3NAME: evolutionAPI['data']['chain']['evolves_to'][0]['evolves_to'][0]['species']['name']

stage1URL: evolutionAPI['data']['chain']['species']['url']
stage2URL: evolutionAPI['data']['chain']['evolves_to'][0]['species']['url']
stage3URL: evolutionAPI['data']['chain']['evolves_to'][0]['evolves_to'][0]['species']['url']

const stage1SPECIES = await axios.get(stage1URL)
const stage2SPECIES = await axios.get(stage2URL)
const stage3SPECIES = await axios.get(stage3URL)

const stage1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage1SPECIES['data']['id']}/`)
const stage2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage2SPECIES['data']['id']}/`)
const stage3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage3SPECIES['data']['id']}/`)

stage1NAME:  evolutionAPI['data']['chain']['species']['name']
stage1IMAGE: stage1['data']['sprites']['front_default']

stage2NAME:  evolutionAPI['data']['chain']['evolves_to'][0]['species']['name']
stage2IMAGE: stage2['data']['sprites']['front_default']

stage3NAME:  evolutionAPI['data']['chain']['evolves_to'][0]['evolves_to'][0]['species']['name']
stage3IMAGE: stage3['data']['sprites']['front_default']

*/


const input = document.getElementById('searchbar')
const button = document.getElementsByTagName('button')

const pokeBack = document.getElementById('display')

const type = document.getElementById('type')

function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

async function pokeGET() {
    //  --    GENERAL   --  //
    const pokeSearch = input.value.toLowerCase()

    input.placeholder = 'Pokémon name or id' // Reset after mistake

    var pokeAPI
    try {
        pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeSearch}/`)
    } catch (TypeError) {
        input.value = ''
        input.placeholder = 'POKE NOT FOUND!'
    }
    
    //console.log(pokeAPI['data'])


    // --     SPECIES   --  //
    const speciesURL = pokeAPI['data']['species']['url']
    const speciesAPI = await axios.get(speciesURL) 

    //console.log(speciesAPI['data'])


    //  --  FLAVOR TEXT --  //
    const flavorList = speciesAPI['data']['flavor_text_entries']
    const flavorListEN = new Array()

    for(let i = 0; i < flavorList.length; i++){
        if (flavorList[i]['language']['name'] == 'en') flavorListEN.push(flavorList[i]['flavor_text'])
    }

    //console.log(flavorListEN[0]) 


    //  --   EVOLUTION  --  //

    try {
        const evolutionURL = speciesAPI['data']['evolution_chain']['url']
        const evolutionAPI = await axios.get(evolutionURL)
    
        //console.log(evolutionAPI['data'])
    
        const stage1URL = evolutionAPI['data']['chain']['species']['url']
        const stage2URL = evolutionAPI['data']['chain']['evolves_to'][0]['species']['url']
        const stage3URL = evolutionAPI['data']['chain']['evolves_to'][0]['evolves_to'][0]['species']['url']
    
        const stage1SPECIES = await axios.get(stage1URL)
        const stage2SPECIES = await axios.get(stage2URL)
        const stage3SPECIES = await axios.get(stage3URL)
    
        const stage1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage1SPECIES['data']['id']}/`)
        const stage2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage2SPECIES['data']['id']}/`)
        const stage3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${stage3SPECIES['data']['id']}/`)
    } catch (TypeError) {
        console.log('NO EVOLUTION TREE!')
    }



    // --     SOUNDS    --  //
    const sound = document.getElementById('sound')

    const name = pokeAPI['data']['name']

    let ID = pokeAPI['data']['id']
    if(parseInt(ID) >= 10 && parseInt(ID) < 100)  ID = '0' + ID
    if(parseInt(ID) < 10) ID = '00' + ID
 
    sound.src = `./sounds/${ID} - ${capitalize(name)}.wav`

    console.log(sound)





    // SLIDE 1 
    const pokeName = pokeAPI['data']['name']
    const pokeID = pokeAPI['data']['id']
    const pokeType = pokeAPI['data']['types'][0]['type']['name']
    const pokeImage = pokeAPI['data']['sprites']['front_default']
    const pokeText = flavorListEN[Math.floor(Math.random() * flavorListEN.length)]

    type.src = `./img/type/${pokeType}.png`

    switch(pokeType) {
        case 'dark':
            pokeBack.style.backgroundColor = '#9400D3'
            break
        case 'psychic':
            pokeBack.style.backgroundColor = '#800080'
            break	
        case 'fighting':
            pokeBack.style.backgroundColor = '#F5F5DC'
            break	
        case 'ground':
            pokeBack.style.backgroundColor = '#A52A2A'
            break	
        case 'electric':
            pokeBack.style.backgroundColor = '#FFFF66'
            break	
        case 'bug':
            pokeBack.style.backgroundColor = '#228B22'
            break
        case 'fire':
            pokeBack.style.backgroundColor = '#E86100'
            break	
        case 'ice':
            pokeBack.style.backgroundColor = '#ADD8E6'
            break	
        case 'water':
            pokeBack.style.backgroundColor = '#3399FF'
            break	
        case 'rock':
            pokeBack.style.backgroundColor = '#9400D3'
            break	
        case 'fairy':
            pokeBack.style.backgroundColor = '#FF00FF'
            break	
        case 'flying':
            pokeBack.style.backgroundColor = '#99FFFF'
            break	
        case 'poison':
            pokeBack.style.backgroundColor = '#9370DB'
            break	
        case 'normal':
            pokeBack.style.backgroundColor = '#CCFFCC'
            break	
        case 'ghost':
            pokeBack.style.backgroundColor = '#F8F7ED'
            break	
        case 'dragon':
            pokeBack.style.backgroundColor = '#FF6347'
            break	
        case 'grass':
            pokeBack.style.backgroundColor = '#008000'
            break	
        case 'steel':
            pokeBack.style.backgroundColor = '#C0C0C0'
            break
        default:
            console.log('TYPE NOT FOUND!')
    }


    // SLIDE 2
    const Speed = pokeAPI['data']['stats'][0]['base_stat']
    const Special_Defense = pokeAPI['data']['stats'][1]['base_stat']
    const Special_Attack = pokeAPI['data']['stats'][2]['base_stat']
    const Defense = pokeAPI['data']['stats'][3]['base_stat']
    const Attack =  pokeAPI['data']['stats'][4]['base_stat']
    const HP =  pokeAPI['data']['stats'][5]['base_stat']

    // ToDo stat int to bar

    // SLIDE 3
    const moves = new Array()
    for(let x = 0; x < 6; x++) {
        moves.push(pokeAPI['data']['moves'][x]['move']['name']) 
    }

    // SLIDE 4
    const stage1NAME = evolutionAPI['data']['chain']['species']['name']
    const stage1IMG = stage1['data']['sprites']['front_default']
    
    const stage2NAME = evolutionAPI['data']['chain']['evolves_to'][0]['species']['name']
    const stage2IMG = stage2['data']['sprites']['front_default']
    
    const stage3NAME = evolutionAPI['data']['chain']['evolves_to'][0]['evolves_to'][0]['species']['name']
    const stage3IMG = stage3['data']['sprites']['front_default']

}

button[0].addEventListener('click', function() {pokeGET()})