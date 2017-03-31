import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from '../components/devTools';

import { arrayToObject } from './../utils.es6'

const SET_TOGGLES = 'SET_TOGGLES'
const SET_TOGGLE = 'SET_TOGGLE'
const SET_API_KEY = 'SET_API_KEY'
const DROP_TOGGLE = 'DROP_TOGGLE'
const SET_AUDIT_LOG = 'SET_AUDIT_LOG'
const SHOW_API_KEY_ALERT = 'SHOW_API_KEY_ALERT'
const HIDE_API_KEY_ALERT = 'HIDE_API_KEY_ALERT'

const API_KEY = 'API_KEY'

const defaultState = {
  config: config,
  toggles: {},
  auditLog: [],
  apiKey: localStorage.getItem(API_KEY),
  apiKeyAlert: {
    visible: false,
    failedAction: null
  }
}

const addToggleToState = (state, toggle) => {
  const toggleObj = {}
  toggleObj[toggle.id] = toggle

  return Object.assign({}, state, {toggles: Object.assign({}, state.toggles, toggleObj)})
}

const removeToggleFromState = (state, toggleId) => {
  const toggles = Object.assign({}, state.toggles)
  delete toggles[toggleId]

  return Object.assign({}, state, {toggles})
}

const reducer = (state = defaultState, action) => {
  switch(action.type) {
    case SET_TOGGLES:
      return Object.assign({}, state, {toggles: arrayToObject(action.toggles, "id")})
    case SET_TOGGLE:
      return addToggleToState(state, action.toggle)
    case DROP_TOGGLE:
      return removeToggleFromState(state, action.toggleId)
    case SET_API_KEY:
      localStorage.setItem(API_KEY, action.apiKey)
      return Object.assign({}, state, {apiKey: action.apiKey})
    case SET_AUDIT_LOG:
      return Object.assign({}, state, {auditLog: action.auditLog})
    case SHOW_API_KEY_ALERT:
      return Object.assign({}, state, {apiKeyAlert: {visible: true, failedAction: action.failedAction}})
    case HIDE_API_KEY_ALERT:
      return Object.assign({}, state, {apiKeyAlert: defaultState.apiKeyAlert})
    default:
      return state
  }
}

export const hideApiKeyAlert = () => ({type: HIDE_API_KEY_ALERT})
export const showApiKeyAlert = failedAction => ({type: SHOW_API_KEY_ALERT, failedAction})
export const setAuditLog = auditLog => ({type: SET_AUDIT_LOG, auditLog})
export const setApiKey = apiKey => ({type: SET_API_KEY, apiKey})
export const setToggles = toggles => ({type: SET_TOGGLES, toggles})
export const setToggle = toggle => ({type: SET_TOGGLE, toggle})
export const dropToggle = toggleId => ({type: DROP_TOGGLE, toggleId})

// Exclude devtools for production build
const enhancer = process.env !== 'production' ?
  compose(
    applyMiddleware(thunk),
    DevTools.instrument() // Enable Redux DevTools with the monitors you chose
  ) :
  compose(applyMiddleware(thunk))

export const store = createStore(reducer, defaultState, enhancer)
