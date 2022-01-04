import { App } from '@townland-project/app'
import { Component } from '@townland-project/dom'
import { Event } from '../../core/eventer'

@Component({
    id: 'tl-character-custom-header',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class HeaderComponent {
    Close() {
        App.Event.emit('app:close')
    }

    MoreOptions() {
        Event.emit('menu:toggle')
    }
}
