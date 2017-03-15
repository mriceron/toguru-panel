import React from 'react'

import { MobileSideBar, Sidebar } from './sidebar.es6'
import { MainPanel } from './mainPanel.es6'
import { Content } from './content.es6'
import { Wrapper } from './wrapper.es6'

export const Template = ({children, pageName}) => (
  <Wrapper>
    <Sidebar pageName={pageName}/>
    <MainPanel pageName={pageName}>
      <Content>
        {children}
      </Content>
    </MainPanel>
  </Wrapper>
)
