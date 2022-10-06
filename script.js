const inputNumber = document.getElementById("number");
const button = document.getElementById("consult-button");
const cardContainer = document.querySelector(".card-container");
const baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

const genericFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

const showPokemon = async () => {
    try {
        const valor = inputNumber.value.trim();
        const pokemon = await genericFetch(baseUrl + `${valor}/`);
    
        if(!valor.length) {
            alert("Por favor ingrese un valor");
            return;
        } else {
            showSuccess(inputNumber);
        };
        
        inputNumber.value = "";
        renderPokemon(pokemon);
    } catch (err) {
        showError(inputNumber,"No ingresó un Pokemon disponible");
        inputNumber.value = "";
        renderPokemon("");
        console.log(err)
    };
};

const showError = (input,message) => {
    const pizzasContainer = input.parentElement;
    const error = pizzasContainer.querySelector("small");
    error.textContent = message;
};

const showSuccess = (input) => {
    const pizzasContainer = input.parentElement;
    const error = pizzasContainer.querySelector("small");
    error.textContent = "";
};

const renderPokemon = (pokemon) => {
    if (pokemon.id) {
        cardContainer.innerHTML = `
        <img src="${pokemon.sprites.other.home.front_default}"/>
        <h2 class="poke poke-name">${pokemon.name.toUpperCase()}</h2>
        <div class="poke-info">
        <div class="poke poke-tipo">
        ${pokemon.types
            .map((tipo) => {
                return `<span class="poke__type">${tipo.type.name}</span>`;
            })
            .join("")}
            </div>
            <span class="poke-exp">EXP: ${pokemon.base_experience}</span>
            <p class="height">Height: ${pokemon.height / 10}m</p>
            <p class="weight">Weight: ${pokemon.weight / 10}Kg</p>
            <p class="poke poke-id">#${pokemon.id}</p>
        </div>`
    } else if (pokemon === "") {
        cardContainer.innerHTML = ``
    };
};

const init = () => {
    button.addEventListener("click", showPokemon);
};

init();