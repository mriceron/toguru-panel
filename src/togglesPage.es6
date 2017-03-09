import React from 'react'

import { getTogglesList } from './state/actions.es6'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Template } from './components/template.es6'

import { objectToArray } from './utils.es6'

const generateRolloutBlock = percentage => {
  switch (percentage) {
    case 100:
      return <code className="rolled-out">100%</code>
    case 0:
      return <code className="not-rolling">0%</code>
    case undefined:
      return <code className="not-rolling">0%</code>
    default:
      return <code className="rolling-out">{percentage + "%"}</code>
  }
}

const ToggleEntry = ({toggle}) => (
  <tr>
    <td><Link to={"edit/" + toggle.id}>{toggle.id}</Link></td>
    <td>{generateRolloutBlock(toggle.rolloutPercentage)}</td>
    <td>{objectToArray(toggle.tags).map(tag => <code className="tag" key={toggle.id + "-" + tag}>{tag}</code>)}</td>
  </tr>
)

const TogglesList = ({toggles}) => (
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
              {toggles.map(t => <ToggleEntry toggle={t} key={t.id}/>)}
          </tbody>
      </table>
  </div>
)

const isToggleIdContainsQuery = (id, query) =>
  id.indexOf(query) != -1

const isTogglePercentageContainsQuery = (percentage, query) => {
  if(!percentage) return false
  return (percentage + "%").startsWith(query)
}

const isToggleTagsContainsQuery = (tags, query) =>
  objectToArray(tags).map(t => t.toLowerCase().startsWith(query)).find(t => t == true) != undefined

const filterToggles = (query) => (toggle) => {
  if(!query) return true;
  return isToggleIdContainsQuery(toggle.id, query) ||
         isTogglePercentageContainsQuery(toggle.rolloutPercentage, query) ||
         isToggleTagsContainsQuery(toggle.tags, query)
}

const toTogglesList = state => {
  return {toggles: objectToArray(state.toggles)}
}

export const TogglesPage =
  connect(toTogglesList)(
    React.createClass({
      getInitialState() {
        return {
          query: null
        }
      },
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
                                    <input type="text" className="form-control" placeholder="Search query" onChange={query => this.setState({query: query.target.value.toLowerCase()})}/>
                                  </div>
                                </div>
                                <h4 className="title">Toggles list</h4>
                                <Link to={'/create'} className="category new_toggle">Add new toggle</Link>
                            </div>
                            <TogglesList toggles={this.props.toggles.filter(filterToggles(this.state.query))}/>
                        </div>
                    </div>
                </div>
            </div>
          </Template>
        )
      }
    })
  )
