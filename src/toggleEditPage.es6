import React from 'react'

import { withRouter } from 'react-router'
import { getToggle, createToggle, deleteToggle, updateToggle } from './state/actions.es6'
import { ApiKeyModal } from './components/apiKeyModal.es6'
import { Template } from './components/template.es6'
import { connect } from 'react-redux'
import { onUnauthorized } from './utils.es6'

const fromActivations = (toggle, block, defaultValue = {}) =>
  toggle && toggle.activations && toggle.activations[0] && toggle.activations[0][block] || defaultValue

const changeActivations = (activations, blockName, newValue) => {
  let newActivations = activations ? activations.slice() : []

  if(newActivations[0]) {
    newActivations[0][blockName] = newValue
  } else {
    const newActivation = {}
    newActivation[blockName] = newValue
    newActivations = [newActivation]
  }

  return newActivations
}

const jsonStringify = (maybeJson) => {
  if(typeof maybeJson == "object") {
    return JSON.stringify(maybeJson)
  } else {
    return maybeJson
  }
}

const validateToggle = toggle => {
  const errors = new Set()
  if(!toggle.name) errors.add("name")
  if(!toggle.description) errors.add("description")
  if(!toggle.tags) errors.add("tags")

  return errors
}

export const ToggleEditPage =
  withRouter(connect(state => state)(
    React.createClass({
      getInitialState() {
        return {
          toggleId: null,
          toggle: {},
          oldToggle: {},
          errors: new Set(),
          apiKeyModalDisplayed: false,
          onRetry: () => null
        }
      },
      componentDidMount() {
        if(this.props.match.params.toggleId) {
          this.initToggle(this.props.match.params.toggleId)
        }
      },
      componentWillReceiveProps(nextProps) {
        if(this.state.toggleId != nextProps.match.params.toggleId) {
          this.initToggle(nextProps.match.params.toggleId)
        }
      },
      initToggle(toggleId) {
        this.setState({toggleId: toggleId})
        if(toggleId)
          this.withRetry(() =>
            this.loadToggle(toggleId)
                .then(_ =>
                  this.setState({oldToggle: this.props.toggles[toggleId], toggle: this.props.toggles[toggleId]})
                )
          )
      },
      withRetry(action) {
        this.setState({onRetry: () => action()})
        action()
      },
      loadToggle(toggleId) {
        return this.props.dispatch(getToggle(toggleId))
            .catch(onUnauthorized(_ => this.setState({apiKeyModalDisplayed: true})))
      },
      changeToggle(fieldName, mapFunc = v => v) {
        return (e) => {
          const changedField = {}
          changedField[fieldName] = mapFunc(e.target.value)
          this.setState({toggle: Object.assign({}, this.state.toggle, changedField)})
        }
      },
      changeToggleActivation(activationName, mapFunc = v => v) {
        return (e) => {
          const newActivations = changeActivations(this.state.toggle.activations || [], activationName, mapFunc(e.target.value))
          this.setState({toggle: Object.assign({}, this.state.toggle, {activations: newActivations})})
        }
      },
      setError(field) {
        const errors = this.state.errors
        errors.add(field)
        this.setState({errors})
      },
      dropError(field) {
        const errors = this.state.errors
        errors.delete(field)
        this.setState({errors})
      },
      parseJson(field) {
        return (value) => {
          try {
            const parsedJson = JSON.parse(value)
            this.dropError(field)
            return parsedJson
          } catch(err) {
            this.setError(field)
            return value
          }
        }
      },
      parsePercentage(value) {
        if(value > 100 || value < 0) {
          this.setError("percentage")
        } else {
          this.dropError("percentage")
        }

        return {percentage: parseInt(value)}
      },
      checkRequired(field, value) {
        if(value != "") {
          this.dropError(field)
          return true
        } else {
          this.setError(field)
          return false
        }
      },
      checkMandatoryField() {
        return false
      },
      validateAndCreateToggle(e) {
        e.preventDefault()
        const errors = validateToggle(this.state.toggle)
        if(errors.size > 0) {
          this.setState({errors})
          return false
        }

        this.withRetry(() => this.createToggle())
      },
      createToggle() {
        this.props.dispatch(createToggle(this.state.toggle))
          .then(action => this.props.history.push('/edit/' + action.toggle.id))
          .catch(onUnauthorized(_ => this.setState({apiKeyModalDisplayed: true})))
      },
      deleteToggle() {
        this.props.dispatch(deleteToggle(this.state.toggle.id))
          .then(_ => this.props.history.push('/'))
          .catch(onUnauthorized(_ => this.setState({apiKeyModalDisplayed: true})))
      },
      deleteButtonClick(e) {
        e.preventDefault()
        this.withRetry(_ => this.deleteToggle())
      },
      updateToggle() {
        this.props.dispatch(updateToggle(this.state.toggle))
            .catch(onUnauthorized(_ => this.setState({apiKeyModalDisplayed: true})))
      },
      updateToggleClick(e) {
        e.preventDefault()
        this.withRetry(_ => this.updateToggle())
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
                              <h4 className="title">{this.state.toggleId ? "Edit Toggle" : "Create Toggle"}</h4>
                          </div>
                          <div className="content">
                              <form>
                                  <div className="row">
                                      <div className="col-md-5">
                                          <div className="form-group">
                                              <label className={this.state.errors.has("id") ? "error" : undefined}>Toggle ID</label>
                                              <input type="text" className="form-control" disabled placeholder="my-toggle-id" value={this.state.toggle && this.state.toggle.id || ""}/>
                                          </div>
                                      </div>
                                      <div className="col-md-4">
                                          <div className="form-group">
                                              <label className={this.state.errors.has("name") ? "error" : undefined}>Name</label>
                                              <input type="text" name="name" className="form-control" placeholder="Toggle name" disabled={this.state.toggleId ? "true" : undefined} value={this.state.toggle && this.state.toggle.name || ""} onChange={this.changeToggle("name")}/>
                                          </div>
                                      </div>
                                      <div className="col-md-3">
                                          <div className="form-group">
                                              <label className={this.state.errors.has("percentage") ? "error" : undefined}>Rollout percentage</label>
                                              <input type="number" name="activations.rollout.percentage" disabled={!this.state.toggleId ? "true" : undefined} className="form-control" placeholder="0" value={fromActivations(this.state.toggle, "rollout").percentage || undefined} onChange={this.changeToggleActivation("rollout", this.parsePercentage)}/>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-md-12">
                                          <div className="form-group">
                                              <label className={this.state.errors.has("description") ? "error" : undefined}>Description</label>
                                              <input type="text" name="description" className="form-control" placeholder="Description" disabled={this.state.toggleId ? "true" : undefined} value={this.state.toggle && this.state.toggle.description || ""} onChange={this.changeToggle("description")}/>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-md-12">
                                          <div className="form-group">
                                              <label className={this.state.errors.has("attributes") ? "error" : undefined}>Attributes JSON</label>
                                              <textarea rows="5" name="activations.attributes" className="form-control" disabled={!this.state.toggleId ? "true" : undefined} placeholder='{ "culture": [ "de-DE", "DE" ] }' value={jsonStringify(fromActivations(this.state.toggle, "attributes", null) || undefined)} onChange={this.changeToggleActivation("attributes", this.parseJson("attributes"))}/>
                                          </div>
                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-md-12">
                                          <div className="form-group">
                                              <label className={this.state.errors.has("tags") ? "error" : undefined}>Tags JSON</label>
                                              <textarea rows="5" name="tags" className="form-control" placeholder='{ "team": "Toguru team" }' disabled={this.state.toggleId ? "true" : undefined} value={jsonStringify(this.state.toggle && this.state.toggle.tags || undefined)} onChange={this.changeToggle("tags", this.parseJson("tags"))}/>
                                          </div>
                                      </div>
                                  </div>

                                  {this.state.toggleId ?
                                    <div>
                                      <button type="submit" className="btn btn-success btn-fill pull-right" onClick={this.updateToggleClick}>Update</button>
                                      <button type="submit" className="btn btn-danger btn-fill pull-right delete-toggle" onClick={this.deleteButtonClick}>Delete</button>
                                    </div> :
                                    <button type="submit" className="btn btn-success btn-fill pull-right" onClick={this.validateAndCreateToggle}>Create</button>
                                  }
                                  <div className="clearfix"></div>
                              </form>
                          </div>
                      </div>
                  </div>

                  {false && this.state.toggleId ?
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
                    </div> : undefined }

                </div>
            </div>
          </Template>
        )
      }
    })
  ))
