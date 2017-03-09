import React from 'react'

import { connect } from 'react-redux'
import { setApiKey } from './../state/store.es6'

const withApiKey = state => {
  return { apiKey: state.apiKey }
}

export const ApiKeyModal =
  connect(withApiKey)(
    React.createClass({
      render() {
        return (
          <div className={"modal fade in" + (this.props.displayed ? " displayed" : "")} role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal" onClick={_ => this.props.onClose()}>&times;</button>
                  <h4 className="modal-title">Toguru API key</h4>
                </div>
                <div className="modal-body">
                  <p>Performing of advanced operations requires Toguru API key.<br/>You can obtain it from LastPass service.</p>
                  <input type="text" className="form-control" placeholder="Toguru API key" value={this.props.apiKey || ""} onChange={e => this.props.dispatch(setApiKey(e.target.value))}/>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={_ => this.props.onClose()}>Close</button>
                  <button type="button" className="btn btn-info" data-dismiss="modal" onClick={_ => {this.props.onClose(); this.props.onRetry()}}>Try again</button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    })
  )
