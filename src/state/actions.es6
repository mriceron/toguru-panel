import 'whatwg-fetch'
import { setToggles, setToggle, dropToggle, setAuditLog, setConfig } from './store.es6'
import { parseJson } from './../utils.es6'

export const getTogglesList = () => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/togglestate')
    .then(parseJson)
    .then(setToggles)
    .then(dispatch)

export const getAuditLog = () => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/auditlog', {
    headers: withApiKeyHeader(getState())
  }).then(parseJson)
    .then(setAuditLog)
    .then(dispatch)

export const getToggle = (toggleId) => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/toggle/' + toggleId, {
    headers: withApiKeyHeader(getState())
  }).then(parseJson)
    .then(setToggle)
    .then(dispatch)

export const createToggle = toggle => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/toggle', {
    method: 'POST',
    headers: withApiKeyHeader(getState()),
    body: JSON.stringify({
      name: toggle.name,
      description: toggle.description,
      tags: toggle.tags
    })
  }).then(parseJson)
    .then(checkToguruResponse(response => Object.assign({}, toggle, {id: response.id})))
    .then(setToggle)
    .then(dispatch)

export const deleteToggle = toggleId => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/toggle/' + toggleId, {
    method: 'DELETE',
    headers: withApiKeyHeader(getState())
  }).then(parseJson)
    .then(checkToguruResponse(_ => dropToggle(toggleId)))
    .then(dispatch)

export const updateToggle = toggle => dispatch => {
  if(!toggle.activations[0].rollout || !toggle.activations[0].rollout.percentage || toggle.activations[0].rollout.percentage == 0) {
    delete toggle.activations[0].rollout
    return dispatch(disableToggleActivation(toggle)).then(dispatch(updateToggleActivation(toggle)))
  } else {
    return dispatch(updateToggleActivation(toggle))
  }
}

const updateToggleActivation = toggle => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/toggle/' + toggle.id + "/activations/0", {
    method: 'PUT',
    headers: withApiKeyHeader(getState()),
    body: JSON.stringify(toggle.activations[0])
  }).then(parseJson)
    .then(checkToguruResponse(_ => setToggle(toggle)))
    .then(dispatch)

const disableToggleActivation = toggle => (dispatch, getState) =>
fetch(apiUrl(getState) + '/toggle/' + toggle.id + "/activations/0", {
  method: 'DELETE',
  headers: withApiKeyHeader(getState())
}).then(parseJson)
  .then(checkToguruResponse(_ => setToggle(toggle)))
  .then(dispatch)

const checkToguruResponse = (onSuccess) => (response) => {
  if(response.status == "Ok") {
    return onSuccess(response)
  } else {
    throw response
  }
}
const withApiKeyHeader = state => {
  return { Authorization: "api-key " + state.apiKey }
}
const apiUrl = getState => getState().config.apiUrl
