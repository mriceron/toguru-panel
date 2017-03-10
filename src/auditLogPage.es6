import React from 'react'

import { getAuditLog } from './state/actions.es6'
import { connect } from 'react-redux'
import { Template } from './components/template.es6'

const withAuditLog = state => state.auditLog

export const AuditLogPage =
  connect(s => s)(
    React.createClass({
      componentDidMount() {
        this.props.dispatch(getAuditLog())
      },
      render() {
        return (
          <Template pageName='history'>
            There will be a history ;)
          </Template>
        )
      }
    })
  )
