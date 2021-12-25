import "./styles.scss"

import { App } from '@townland-project/app'

import { RenderModule } from '@townland-project/dom'
import { AppModule } from './module'

RenderModule(AppModule).then(module => document.getElementById('root')?.appendChild(module!))

App.Event.on('app:ready', () => {
    // App is ready
})