import React from 'react'

import { getTogglesList } from './state/actions.es6'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Template } from './components/template.es6'

export const TogglesPage =
connect(state => state)(
  React.createClass({
    componentDidMount() {
      this.props.dispatch(getTogglesList())
    },
    render() {
      return (
        <Template pageName='toggles'>
          <div className="container-fluid">
              <div className="row">
                  <div className="col-md-12">
                      <div className="card">
                          <div className="header">
                              <div className="search-field">
                                <div className="form-group">
                                  <input type="text" className="form-control" placeholder="Search query"/>
                                </div>
                              </div>
                              <h4 className="title">Toggles list</h4>
                              <Link to={'/create'} className="category new_toggle">Add new toggle</Link>
                          </div>
                          <div className="content table-responsive table-full-width">
                              <table className="table table-hover table-striped toggles-table">
                                  <thead>
                                    <tr>
                                      <th>Toggle ID</th>
                                      <th>Rollout</th>
                                      <th>Tags</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                      <tr>
                                        <td><a href="#">oem-ncd-gallery-form-toggle</a></td>
                                        <td><code className="rolled-out">100%</code></td>
                                        <td><code className="tag">SMAUG</code></td>
                                      </tr>
                                      <tr>
                                        <td><a href="#">oem-ncd-variations-a-toggle</a></td>
                                        <td><code className="rolling-out">20%</code></td>
                                        <td><code className="tag">SMAUG</code></td>
                                      </tr>
                                      <tr>
                                        <td><a href="#">oem-ncd-variations-a-toggle-2</a></td>
                                        <td><code className="not-rolling">0%</code></td>
                                        <td><code className="tag">SMAUG</code></td>
                                      </tr>
                                  </tbody>
                              </table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </Template>
      )
    }
  })
)
