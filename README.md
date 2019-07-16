# Pokémon-Game

![Pokédex](https://media.giphy.com/media/OSvRsgnCeTE0U/giphy.gif)

## Mission

Create a Pokédex App using an API

## Objectives

- A typical AJAX flow: send asynchronous requests to a remote server and process the results
- Use JSON (JavaScript Object Notation) format
- DOM manipulation: changing the DOM based on results of AJAX-requests

## Required functionalities

* You can search a pokémon by name and by ID
* Of said pokémon you need to show:
    * The ID-number
    * An image (sprite)
    * At least 4 "moves"
    * The previous evolution, only if it exists, along with their name and image

_Bonus_ Make your web page look like a pokédex by adding a little CSS

## Live version

Test the live version of the App [here](https://nicplackle.github.io/Pokemon-Game/ "Published Pokédex Game")!!!

## Snippet of Javascript code we made (Wietse to be specific)

This is an added feature where you hear the signature sound the displayed Pokémon makes.

```javascript
sound = document.getElementById("sound")

const name = pokeAPI["data"]["name"]

id = pokeAPI["data"]["id"]

ID = id
if (parseInt(id) >= 10 && parseInt(id) < 100) ID = "0" + id
if (parseInt(id) < 10) ID = "00" + id

randomInt = Math.floor((Math.random() * 97) + 1)
if (randomInt < 10) randomInt = '0' + randomInt

if (name == 'pikachu') {
 sound.src = `./sounds/${ID} - ${capitalize(name)} (${randomInt}).wav`
} else {
 sound.src = `./sounds/${ID} - ${capitalize(name)}.wav`
}

console.log(sound)
```
## Screenshots
![alt-text](https://i.ibb.co/Jcf375w/Knipsel.jpg)
![alt-text](https://i.ibb.co/mtBJNWP/Knipsel.jpg)

## Credits

This App is made by 2 of my collegues (Wietse Gielen & Benny Ho) and me.

- Pokémon Buttons by GeneralGibby © Me
  Pokemon © Nintendo/Game Freak
- Arrow Icons taken from Unicode Character Table
