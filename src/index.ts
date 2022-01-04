import "./styles.scss"

import { App } from '@townland-project/app'

import { RenderModule } from '@townland-project/dom'
import { AppModule } from './module'

import { CacheLoad } from './core/cache'
import { Event } from "./core/eventer"
import { SetCharacter } from "./core/character"

RenderModule(AppModule).then(module => document.getElementById('root')?.appendChild(module!))

CacheLoad()
    .then(() => {
        Event.emit('cache:loaded')

        // test mode
        if (window.location.hostname == "localhost") {
            SetCharacter({
                username: 'test',
                dna: '',
                access: 'member',
                gender: 'male',
                dress: {
                    'body': 'white-male-body'
                }
            })
        }
    })

App.Event.on('app:ready', () => {
    // App is ready
})

