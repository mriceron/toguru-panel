import 'whatwg-fetch'
import { setToggles } from './store.es6'
import config from './../config.json'
import { parseJson } from './../utils.es6'

export const getTogglesList = () => dispatch =>
  fetch(config.apiUrl + '/togglestate')
    .then(parseJson)
    .then(setToggles)
    .then(dispatch)
