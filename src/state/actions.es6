import 'whatwg-fetch'
import {setToggles, setToggle, dropToggle, setAuditLog, setConfig, showApiKeyAlert, disableToggle} from './store.es6'
import {parseJson, onUnauthorized} from './../utils.es6'

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
        .then(checkToguruResponse(resp => resp.id))
        .then(toggleId => dispatch(getToggle(toggleId)).then(_ => toggleId))
        .catch(openApiKeyAlertOnUnauthorized(dispatch, _ => createToggle(toggle)))

export const deleteToggle = toggleId => (dispatch, getState) =>
    fetch(apiUrl(getState) + '/toggle/' + toggleId, {
        method: 'DELETE',
        headers: withApiKeyHeader(getState())
    }).then(parseJson)
        .then(checkToguruResponse(_ => dropToggle(toggleId)))
        .then(dispatch)
        .catch(openApiKeyAlertOnUnauthorized(dispatch, _ => deleteToggle(toggleId)))

export const updateToggle = toggle => dispatch =>
    dispatch(updateToggleActivation(toggle))

const updateToggleActivation = toggle => (dispatch, getState) => {
    const body = {}
    body['attributes'] = toggle.attributes
    body['description'] = toggle.description
    body['tags'] = toggle.tags
    if (toggle.percentage !== 0) {
        body['rollout'] = { percentage: toggle.percentage }
    }

    return fetch(apiUrl(getState) + '/toggle/' + toggle.id, {
        method: 'PUT',
        headers: withApiKeyHeader(getState()),
        body: JSON.stringify(body)
    }).then(parseJson)
        .then(checkToguruResponse(_ => toggle))
        .then(_ => dispatch(getToggle(toggle.id)))
        .catch(openApiKeyAlertOnUnauthorized(dispatch, _ => updateToggleActivation(toggle)))
}

const disableToggleActivation = toggle => (dispatch, getState) =>
    fetch(apiUrl(getState) + '/toggle/' + toggle.id + "/activations/0", {
        method: 'DELETE',
        headers: withApiKeyHeader(getState())
    }).then(parseJson)
        .then(checkToguruResponse(_ => disableToggle(toggle.id)))
        .then(dispatch)
        .catch(openApiKeyAlertOnUnauthorized(dispatch, _ => disableToggleActivation(toggle)))

const openApiKeyAlertOnUnauthorized = (dispatch, action) => response =>
    onUnauthorized(_ => dispatch(showApiKeyAlert(action)))(response)

const checkToguruResponse = onSuccess => response => {
    if (response.status == "Ok") {
        return onSuccess(response)
    } else {
        throw response
    }
}

const withApiKeyHeader = state => ({Authorization: "api-key " + state.apiKey})
const apiUrl = getState => getState().config.apiUrl
