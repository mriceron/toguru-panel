import React from 'react'

export const MainPanel = ({children}) => (
  <div className="main-panel">
    <nav className="navbar navbar-default navbar-fixed">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <span className="navbar-logo">Toguru panel</span>
            </div>
            <div className="collapse navbar-collapse">

            </div>
        </div>
    </nav>

    {children}
  </div>
)
