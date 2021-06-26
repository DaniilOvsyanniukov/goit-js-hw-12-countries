import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import listOfcountries from './partials/countries.hbs';
import countryCard from './partials/countryCard.hbs';
import { info } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import * as Confirm from "@pnotify/confirm";
import "@pnotify/confirm/dist/PNotifyConfirm.css";


const refs = {
    inputValue: document.querySelector(`input[id="input-of-countries"]`),
    responseContainer: document.querySelector(`.response-container`),

}


refs.inputValue.addEventListener('input', _.debounce(showCountries, 500));

function showCountries(event) {
    fetch(`https://restcountries.eu/rest/v2/name/${event.target.value}`)
        .then(response => {
            return response.json();
        })
        .then(value => {
            responseVarification(value)
        })
        .catch(error => {
            console.log(error);
        })

}

function responseVarification(value) {
    refs.responseContainer.innerHTML = '';
    if (value.length > 1) {
        if (value.length <= 10) {
            refs.responseContainer.insertAdjacentHTML('beforeend', listOfcountries(value))
        } else {
            errorVarification()
        }

    } else {
        if (value.length === undefined) {
            errorSearch()
        } else {
            refs.responseContainer.insertAdjacentHTML('beforeend', countryCard(value[0]))            
        }
    }
}

function errorVarification() {
  info({
    text:
      "Too many matches found. Please enter a more specific query!",
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });
}

function errorSearch() {
  info({
    text:
      "Nothing found on this request!",
    modules: new Map([
      [
        Confirm,
        {
          confirm: true,
          buttons: [
            {
              text: "Ok",
              primary: true,
              click: notice => {
                notice.close();
              }
            }
          ]
        }
      ]
    ])
  });
}
