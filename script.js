const statesList = document.querySelector('#states')
const citiesList = document.querySelector('#cities')

statesList.onchange = (evt) => {
    citiesList.hidden = true
    fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${evt.target.value}/municipios`)
    .then(res => res.json())
    .then(json => {
        citiesList.innerHTML = `<option disabled selected>Escolha uma cidade...</option>`
        json.sort((a, b) => a.nome > b.nome ? 1 : -1)
        for(const city of json)
            citiesList.innerHTML += `<option value=${city.id}>${city.nome}</option>`
            citiesList.hidden = false
    }).catch(err => {
        console.log(err);
    })

}

window.onload = function()
{
    citiesList.hidden = true
    citiesList.innerHTML = `<option selected>Escolha uma cidade...</option>`

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(json => {
        statesList.innerHTML = `<option disabled selected>Escolha um estado...</option>`
        json.sort((a, b) => a.nome > b.nome ? 1 : -1)
        for(const state of json)
            statesList.innerHTML += `<option value=${state.sigla}>${state.nome}</option>`
    })
}
