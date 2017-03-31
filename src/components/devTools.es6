import * as React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor  from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

const devTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-j' defaultIsVisible={false}>
        <LogMonitor theme='solarized' />
    </DockMonitor>
)

export default devTools