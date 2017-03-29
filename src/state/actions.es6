import 'whatwg-fetch'
import { setToggles, setToggle, dropToggle, setAuditLog, setConfig, showApiKeyAlert } from './store.es6'
import { parseJson, onUnauthorized } from './../utils.es6'

export const getTogglesList = () => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/togglestate')
    .then(parseJson)
    .then(setToggles)
    .then(dispatch)
    .catch(openApiKeyAlertOnUnauthorized(dispatch, getTogglesList))

export const getAuditLog = () => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/auditlog', {
    headers: withApiKeyHeader(getState())
  }).then(parseJson)
    .then(setAuditLog)
    .then(dispatch)
    .catch(openApiKeyAlertOnUnauthorized(dispatch, getAuditLog))

export const getToggle = (toggleId) => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/toggle/' + toggleId, {
    headers: withApiKeyHeader(getState())
  }).then(parseJson)
    .then(setToggle)
    .then(dispatch)
    .catch(openApiKeyAlertOnUnauthorized(dispatch, _ => getToggle(toggleId)))

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
    .catch(openApiKeyAlertOnUnauthorized(dispatch, _ => createToggle(toggle)))

export const deleteToggle = toggleId => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/toggle/' + toggleId, {
    method: 'DELETE',
    headers: withApiKeyHeader(getState())
  }).then(parseJson)
    .then(checkToguruResponse(_ => dropToggle(toggleId)))
    .then(dispatch)
    .catch(openApiKeyAlertOnUnauthorized(dispatch, _ => deleteToggle(toggleId)))

export const updateToggle = toggle => dispatch => {
  if(toggle.activations.length > 0) {
    if(!toggle.activations[0].rollout || !toggle.activations[0].rollout.percentage || toggle.activations[0].rollout.percentage == 0) {
      delete toggle.activations[0].rollout
      return dispatch(disableToggleActivation(toggle)).then(dispatch(updateToggleActivation(toggle)))
    } else {
      return dispatch(updateToggleActivation(toggle))
    }
  } else {
    return Promise.resolve(null)
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
    .catch(openApiKeyAlertOnUnauthorized(dispatch, _ => updateToggleActivation(toggle)))

const disableToggleActivation = toggle => (dispatch, getState) =>
  fetch(apiUrl(getState) + '/toggle/' + toggle.id + "/activations/0", {
    method: 'DELETE',
    headers: withApiKeyHeader(getState())
  }).then(parseJson)
    .then(checkToguruResponse(_ => setToggle(toggle)))
    .then(dispatch)
    .catch(openApiKeyAlertOnUnauthorized(dispatch, _ => disableToggleActivation(toggle)))

const openApiKeyAlertOnUnauthorized = (dispatch, action) => response =>
  onUnauthorized(_ => dispatch(showApiKeyAlert(action)))(response)

const checkToguruResponse = onSuccess => response => {
  if(response.status == "Ok") {
    return onSuccess(response)
  } else {
    throw response
  }
}

const withApiKeyHeader = state => ({Authorization: "api-key " + state.apiKey})
const apiUrl = getState => getState().config.apiUrl
