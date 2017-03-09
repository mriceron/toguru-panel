import 'whatwg-fetch'
import { setToggles, setToggle } from './store.es6'
import config from './../config.json'
import { parseJson } from './../utils.es6'

export const getTogglesList = () => dispatch =>
  fetch(config.apiUrl + '/togglestate')
    .then(parseJson)
    .then(setToggles)
    .then(dispatch)

export const getToggle = (toggleId) => (dispatch, getState) =>
  fetch(config.apiUrl + '/toggle/' + toggleId, {
    headers: withApiKeyHeader(getState())
  }).then(parseJson)
    .then(setToggle)
    .then(dispatch)

const withApiKeyHeader = state => {
  return { Authorization: "api-key " + state.apiKey }
}
