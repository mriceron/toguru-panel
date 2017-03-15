import React from 'react'
import { MobileSideBar } from './sidebar.es6'

export const MainPanel = ({children, pageName}) => (
  <div className="main-panel">
    <nav className="navbar navbar-default navbar-fixed">
        <div className="container-fluid">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse" onClick={toggleExtraMenu}>
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <span className="navbar-logo">Toguru panel</span>
            </div>
            <MobileSideBar pageName={pageName}/>
        </div>
    </nav>

    {children}
  </div>
)

const toggleExtraMenu = () =>
  document.querySelector(".extra-menu").classList.toggle('displayed')
