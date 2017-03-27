import React from 'react'

export const ActionButton =
  React.createClass({
    getInitialState() {
      return {
        status: WaitStatus
      }
    },
    onFailure(error) {
      this.setState({status: ErrorStatus})
      alert("Something goes wrong: " + JSON.stringify(error))
    },
    onClick(e) {
      e.preventDefault()
      this.setState({status: WorkingStatus})
      try {
        const result = this.props.onClick(e)
        if(isPromise(result)) {
          result
            .then(_ => this.setState({status: CompletedStatus}))
            .catch(this.onFailure)
        } else {
          this.setState({status: CompletedStatus})
        }
      } catch (error) {
        this.onFailure(error)
      }
    },
    getButtonText() {
      switch (this.state.status) {
        case CompletedStatus:
          return this.props.completedText || this.props.children
        case ErrorStatus:
          return this.props.errorText || "Try again"
        default:
          return this.props.children
      }
    },
    getButtonColorClass() {
      switch (this.state.status) {
        case WorkingStatus:
          return ""
        case ErrorStatus:
          return "btn-danger"
        case CompletedStatus:
          return "btn-success"
        default:
          return this.props.colorClass || "btn-info"
      }
    },
    render() {
      return (
        <button type="submit" className={this.props.className + " " + this.getButtonColorClass()} onClick={this.onClick}>{this.getButtonText()}</button>
      )
    }
  })

const isPromise = obj => obj && typeof obj.then == 'function'

const WaitStatus = "wait"
const WorkingStatus = "working"
const CompletedStatus = "completed"
const ErrorStatus = "error"
