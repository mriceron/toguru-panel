import 'whatwg-fetch'
import { setToggles } from './store.es6'
import config from './../config.json'

export const getTogglesList = () => dispatch =>
  fetch(config.apiUrl + '/togglestate')
    .then(setToggles)
    .then(dispatch)
