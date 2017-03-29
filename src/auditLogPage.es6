import React from 'react'

import { getAuditLog } from './state/actions.es6'
import { connect } from 'react-redux'
import { Template } from './components/template.es6'
import { Link } from 'react-router'
import { ApiKeyModal } from './components/apiKeyModal.es6'
import Moment from 'react-moment'

const AuditLogList = ({logs}) => (
  <div className="content table-responsive table-full-width">
      <table className="table table-hover table-striped toggles-table">
          <thead>
            <tr>
              <th>Toggle ID</th>
              <th>Event</th>
              <th>Delta</th>
              <th>Time</th>
              <th>User</th>
            </tr>
          </thead>
          <tbody>
              {logs.map(t => <AuditLogEntry log={t} key={t.id + "-" + t.meta.epoch}/>)}
          </tbody>
      </table>
  </div>
)

const AuditLogEntry = ({log}) => (
  <tr>
    <td>{log.id}</td>
    <td>{matchEvent(log.event)}</td>
    <td>
      <ul className="no-margin-bottom">
        {log.rollout ? <li>{"Rollout percentage set as: " + log.rollout.percentage + "%"}</li> : null}
        {log.attributes ? <li>{"Attributes set as: " + JSON.stringify(log.attributes)}</li> : null}
      </ul>
    </td>
    <td><Moment fromNow>{log.meta.epoch}</Moment></td>
    <td><code className="tag">{log.meta.user}</code></td>
  </tr>
)

const matchEvent = (event) => {
  switch (event) {
    case "toggle created":
      return <span className="badge rolled-out">Created</span>
    case "activation created":
      return <span className="badge not-rolling">Activation Created</span>
    case "activation updated":
      return <span className="badge not-rolling">Activation Updated</span>
    case "activation deleted":
      return <span className="badge not-rolling">Activation Deleted</span>
    case "toggle deleted":
      return <span className="badge rolling-out">Deleted</span>
    default:
      return event
  }
}

const isStringContainsQuery = (string, query) =>
  string.indexOf(query) != -1

const isStartsWith = (string, query) =>
  string.toLowerCase().startsWith(query)

const filterLogs = (query) => (log) => {
  if(!query) return true;
  return isStringContainsQuery(log.id, query) ||
         isStartsWith(log.meta.user, query)
}

export const AuditLogPage =
  connect(s => s)(
    React.createClass({
      getInitialState() {
        return {
          query: null
        }
      },
      componentDidMount() {
        this.props.dispatch(getAuditLog())
      },
      render() {
        return (
          <Template pageName='history'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="header">
                              <ul className="search-panel">
                                <li>
                                  <h4 className="title">History log</h4>
                                  <a className="black">We know everything about you, dude</a>
                                </li>
                                <li className="with-margin">
                                  <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Search query" onChange={query => this.setState({query: query.target.value.toLowerCase()})}/>
                                  </div>
                                </li>
                              </ul>
                            </div>
                            <AuditLogList logs={this.props.auditLog.filter(filterLogs(this.state.query))}/>
                        </div>
                    </div>
                </div>
            </div>
          </Template>
        )
      }
    })
  )
