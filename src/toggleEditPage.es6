import React from 'react'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router'
import {getToggle, createToggle, deleteToggle, updateToggle, openApiKeyAlertOnUnauthorized} from './state/actions.es6'
import {Template} from './components/template.es6'
import {connect} from 'react-redux'
import {isStringAJson, parseJsonString} from './utils'

const getTogglePercentage = toggle =>
    toggle.activations[0] && toggle.activations[0].rollout && toggle.activations[0].rollout.percentage && parseInt(toggle.activations[0].rollout.percentage) || 0

const getToggleAttributes = toggle =>
    toggle.activations[0] && toggle.activations[0].attributes && JSON.stringify(toggle.activations[0].attributes) || ""

const defaultState = (isNewToggle) => ({
    id: "",
    name: "",
    description: "",
    percentage: 0,
    attributes: "",
    tags: "",
    errors: new Set(),
    isNewToggle
})

class ToggleEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = defaultState(props.isNewToggle)

        if(this.props.match.params.toggleId) {
            this.props.dispatch(getToggle(this.props.match.params.toggleId))
                .then(action => action.toggle)
                .then(toggle => this.fillState)
        }

        this.handleDeleteAction = this.handleDeleteAction.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    componentWillReceiveProps(newProps) {
        this.fillState(newProps.toggles[newProps.match.params.toggleId])
    }

    fillState(toggle) {
        console.log(toggle)
        if(toggle) {
            this.setState({
                id: toggle.id,
                name: toggle.name,
                description: toggle.description,
                percentage: getTogglePercentage(toggle),
                attributes: getToggleAttributes(toggle),
                tags: JSON.stringify(toggle.tags),
                isNewToggle: false,
            })
        } else {
            this.setState(defaultState(true))
        }
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked :
            (target.type === 'number' ? parseInt(target.value) : target.value)
        const name = target.name

        this.setState({
            [name]: value,
            saved: undefined
        })
    }

    handleDeleteAction(event) {
        event.preventDefault()
        this.props.dispatch(deleteToggle(this.state.id))
            .then(_ => this.props.history.push('/'))
    }

    checkForErrors() {
        const errors = new Set()
        if(this.state.id) {
            if(!Number.isInteger(this.state.percentage) || this.state.percentage < 0 || this.state.percentage > 100) errors.add("percentage")
            if(!isStringAJson(this.state.attributes) && this.state.attributes !== "") errors.add("attributes")
        } else {
            if(!this.state.name) errors.add("name")
            if(!this.state.description) errors.add("description")
            if(!isStringAJson(this.state.tags)) errors.add("tags")
        }

        return errors
    }

    handleFormSubmit(event) {
        event.preventDefault()
        const errors = this.checkForErrors()
        this.setState({errors})

        if(errors.size === 0 && !this.state.saved) {
            const toggle = Object.assign({}, this.state, {
                tags: parseJsonString(this.state.tags),
                attributes: parseJsonString(this.state.attributes)
            })

            if(this.state.id) {
                this.props.dispatch(updateToggle(toggle))
                    .then(_ => this.setState({saved: true}))
                    .catch(e => {
                        console.log(e)
                        switch(e.type){
                            case "ACTIVATION_ATTRIBUTES": {
                                this.setState({ 
                                    errors: new Set(["percentage", "attributes"])
                                })
                            }
                            break;
                            case "TAGS_DESC": {
                                this.setState({ 
                                    errors: new Set(["tags", "description"])
                                })
                            }
                            break;
                        }
                        openApiKeyAlertOnUnauthorized(this.props.dispatch, _ => updateToggleActivation(toggle))
                    })
                    .then(() => this.props.dispatch(getToggle(toggle.id)))
            } else {
                this.props.dispatch(createToggle(toggle))
                    .then(toggleId => this.props.history.push('/edit/' + toggleId))
            }
        }
    }

    render() {
        return (
            <Template pageName='toggles'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <div className="header">
                                    <h4 className="title">{this.state.id ? "Edit Toggle" : "Create Toggle"}</h4>
                                </div>
                                <div className="content">
                                    <form onSubmit={this.handleFormSubmit}>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label
                                                        className={this.state.errors.has("id") ? "error" : undefined}>Toggle
                                                        ID</label>
                                                    <input type="text" className="form-control" disabled
                                                           placeholder="my-toggle-id" value={this.state.id}/>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label
                                                        className={this.state.errors.has("name") ? "error" : undefined}>Name</label>
                                                    <input type="text" name="name" className="form-control"
                                                           placeholder="Toggle name"
                                                           disabled={this.state.id ? "true" : undefined}
                                                           value={this.state.name} onChange={this.handleInputChange}/>
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label
                                                        className={this.state.errors.has("percentage") ? "error" : undefined}>Rollout
                                                        percentage</label>
                                                    <input type="number" name="percentage"
                                                           disabled={!this.state.id ? "true" : undefined}
                                                           className="form-control" placeholder="0"
                                                           value={this.state.percentage}
                                                           onChange={this.handleInputChange}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label
                                                        className={this.state.errors.has("description") ? "error" : undefined}>Description</label>
                                                    <input type="text" name="description" className="form-control"
                                                           placeholder="Description"
                                                           value={this.state.description}
                                                           onChange={this.handleInputChange}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label
                                                        className={this.state.errors.has("attributes") ? "error" : undefined}>Attributes
                                                        JSON</label>
                                                    <textarea rows="5" name="attributes" className="form-control"
                                                              disabled={!this.state.id ? "true" : undefined}
                                                              placeholder='{ "culture": [ "de-DE", "DE" ] }'
                                                              value={this.state.attributes}
                                                              onChange={this.handleInputChange}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                    <label
                                                        className={this.state.errors.has("tags") ? "error" : undefined}>Tags
                                                        JSON</label>
                                                    <textarea rows="5" name="tags" className="form-control"
                                                              placeholder='{ "team": "Toguru team" }'
                                                              value={this.state.tags}
                                                              onChange={this.handleInputChange}/>
                                                </div>
                                            </div>
                                        </div>

                                        {this.state.saved ?
                                            <button type="submit" className="btn btn-fill pull-right btn-success">
                                                <Link to={"/"}>Saved!</Link>
                                            </button> :
                                            <button type="submit" className="btn btn-fill pull-right btn-info">Save</button>
                                        }

                                        <button type="submit" className="btn btn-fill pull-right btn-danger delete-toggle" onClick={this.handleDeleteAction}>Delete</button>
                                        <div className="clearfix"></div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {false && this.state.toggleId ? ActionsComponent : undefined }
                    </div>
                </div>
            </Template>
        )
    }
}

const ActionsComponent = () => {
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
}

export const ToggleEditPage =
    withRouter(connect(s => s)(ToggleEdit))
