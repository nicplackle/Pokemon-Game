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

const stage1 = await axios.get(stage1URL)
const stage2 = await axios.get(stage2URL)
const stage3 = await axios.get(stage3URL)

...


*/


const input = document.getElementsByTagName('input')
const button = document.getElementsByTagName('button')

async function pokeGET() {
    //  --    GENERAL   --  //
    const pokeSearch = input[0].value
    const pokeAPI = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeSearch}/`)

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
    const evolutionURL = speciesAPI['data']['evolution_chain']['url']
    const evolutionAPI = await axios.get(evolutionURL)

    console.log(evolutionAPI['data'])

    const stage1URL = evolutionAPI['data']['chain']['species']['url']
    const stage2URL = evolutionAPI['data']['chain']['evolves_to'][0]['species']['url']
    const stage3URL = evolutionAPI['data']['chain']['evolves_to'][0]['evolves_to'][0]['species']['url']

    const stage1 = await axios.get(stage1URL)
    const stage2 = await axios.get(stage2URL)
    const stage3 = await axios.get(stage3URL)

    //console.log(stage1['data'])
    //console.log(stage2['data'])
    //console.log(stage3['data'])

}

button[0].addEventListener('click', async function(e) {pokeGET()})