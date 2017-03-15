import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

export const Sidebar = connect(state => state.config)(({pageName, slackLink}) => (
  <div className="sidebar" data-color="blue" data-image="assets/img/sidebar-5.jpg">
    <div className="sidebar-wrapper">
          <div className="logo">
              <Link to={"/"} className="simple-text">
                  Toguru panel
              </Link>
          </div>

          <ul className="nav">
              <li className={pageName == 'toggles' ? "active" : ""}>
                  <Link to={"/"}>
                      <i className="pe-7s-note2"></i>
                      <p>Toggles</p>
                  </Link>
              </li>
              <li className={pageName == 'history' ? "active" : ""}>
                  <Link to={"/history"}>
                      <i className="pe-7s-news-paper"></i>
                      <p>History</p>
                  </Link>
              </li>
              <li className="active-pro">
                  <a href={slackLink}>
                      <i className="pe-7s-help2"></i>
                      <p>Contact in Slack</p>
                  </a>
              </li>
          </ul>
    </div>
  </div>
))

export const MobileSideBar = ({pageName}) => (
  <div className="extra-menu navbar-collapse">
     <ul className="nav navbar-nav toggled-navbar">
       <li className={pageName == 'toggles' ? "active" : ""}>
           <Link to={"/"}>
               <i className="pe-7s-note2"></i>
               <p>Toggles</p>
           </Link>
       </li>
       <li className={pageName == 'history' ? "active" : ""}>
           <Link to={"/history"}>
               <i className="pe-7s-news-paper"></i>
               <p>History</p>
           </Link>
       </li>
       <li className="active-pro">
           <a href="slack://channel?id=C2Z5P87PB&team=T02B63WEX">
               <i className="pe-7s-help2"></i>
               <p>Contact in Slack</p>
           </a>
       </li>
     </ul>
</div>
)
