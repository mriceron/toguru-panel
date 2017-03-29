import React from 'react'

import { connect } from 'react-redux'
import { setApiKey, hideApiKeyAlert } from './../state/store.es6'

const withApiKey = state => ({apiKey: state.apiKey, isVisible: state.apiKeyAlert.visible, actionToRetry: state.apiKeyAlert.failedAction})
const hideApiKeyModal = (dispatch, retryAction) => () => {
  dispatch(hideApiKeyAlert())
  if(retryAction) {
    dispatch(retryAction())
  }
}

export const ApiKeyModal =
  connect(withApiKey)(
    ({apiKey, isVisible, actionToRetry, dispatch}) => (
      <div className={"modal fade in" + (isVisible ? " displayed" : "")} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" onClick={hideApiKeyModal(dispatch)}>&times;</button>
              <h4 className="modal-title">Toguru API key</h4>
            </div>
            <div className="modal-body">
              <p>Performing of advanced operations requires Toguru API key.<br/>You can obtain it from LastPass service.</p>
              <input type="text" className="form-control" placeholder="Toguru API key" value={apiKey || ""} onChange={e => dispatch(setApiKey(e.target.value))}/>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={hideApiKeyModal(dispatch)}>Close</button>
              <button type="button" className="btn btn-info" data-dismiss="modal" onClick={hideApiKeyModal(dispatch, actionToRetry)}>Try again</button>
            </div>
          </div>
        </div>
      </div>
    )
  )
