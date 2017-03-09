import React from 'react'

import { getToggle } from './state/actions.es6'
import { ApiKeyModal } from './components/apiKeyModal.es6'
import { Template } from './components/template.es6'
import { connect } from 'react-redux'

export const ToggleEditPage =
  connect(state => state)(
    React.createClass({
      getInitialState() {
        return {
          apiKeyModalDisplayed: false,
          onRetry: () => null
        }
      },
      componentDidMount() {
        this.setState({onRetry: () => this.loadToggle()})
        this.loadToggle()
      },
      loadToggle() {
        this.props.dispatch(getToggle(this.props.params.toggleId))
          .catch(_ => this.setState({apiKeyModalDisplayed: true}))
      },
      render() {
        return (
          <Template pageName='toggles'>
            <div className="container-fluid">
                <div className="row">
                  <div className="col-md-8">
                  <ApiKeyModal displayed={this.state.apiKeyModalDisplayed} onClose={() => this.setState({apiKeyModalDisplayed: false})} onRetry={this.state.onRetry}/>
                      <div className="card">
                          <div className="header">
                              <h4 className="title">{false ? "Edit Toggle" : "Create Toggle"}</h4>
                          </div>
                          <div className="content">
                              <form>
                                  <div className="row">
                                      <div className="col-md-5">
                                          <div className="form-group">
                                              <label>Toggle ID</label>
                                              {false ?
                                                <input type="text" name="id" className="form-control" disabled placeholder="Toggle ID"/> :
                                                <input type="text" name="id" className="form-control" placeholder="Toggle ID"/>
                                              }
                                          </div>
                                      </div>
                                      <div className="col-md-4">
                                          <div className="form-group">
                                              <label>Name</label>
                                              <input type="text" name="name" className="form-control" placeholder="Name"/>
                                          </div>
                                      </div>
                                      <div className="col-md-3">
                                          <div className="form-group">
                                              <label>Rollout percentage</label>
                                              <input type="number" name="activations.rollout.percentage" className="form-control" placeholder="Rollout percentage"/>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-md-12">
                                          <div className="form-group">
                                              <label>Description</label>
                                              <input type="text" name="description" className="form-control" placeholder="Description"/>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-md-12">
                                          <div className="form-group">
                                              <label>Attributes JSON</label>
                                              <textarea rows="5" name="activations.attributes" className="form-control" placeholder='{ "culture": [ "de-DE", "DE" ] }'/>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-md-12">
                                          <div className="form-group">
                                              <label>Tags JSON</label>
                                              <textarea rows="5" name="tags" className="form-control" placeholder='{ "team": "Toguru team" }'></textarea>
                                          </div>
                                      </div>
                                  </div>

                                  {false ?
                                    <button type="submit" className="btn btn-success btn-fill pull-right">Update</button> :
                                    <button type="submit" className="btn btn-success btn-fill pull-right">Create</button>
                                  }
                                  <button type="submit" className="btn btn-danger btn-fill pull-right delete-toggle">Delete</button>
                                  <div className="clearfix"></div>
                              </form>
                          </div>
                      </div>
                  </div>

                  <div className="col-md-4">
                    <div className="card">
                        <div className="header">
                            <h4 className="title">Actions</h4>
                        </div>
                        <div className="content">
                          <div className="row">
                              <div className="col-md-12">
                                  <div className="form-group">
                                      <label>Local override</label>
                                      <select className="form-control">
                                        <option>Do not override</option>
                                        <option>Always enabled</option>
                                        <option>Always disabled</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
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
