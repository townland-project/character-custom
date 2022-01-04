import { Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import { GenerateCharacter } from '@townland-project/character-dom/src'
import { ICharacter } from '@townland-project/interfaces'
import { Assets } from '../../core/cache'
import { Event } from '../../core/eventer'

@Component({
    id: 'tl-character-custom-view',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class ViewComponent extends ComponentHelper implements RenderOnInit {
    RenderOnInit(): void {
        Event.on('character:change', (character: ICharacter)=> this.SetCharacter(character))
    }

    async SetCharacter(character: ICharacter): Promise<void> {        
        this.Clear()
        this.Element.appendChild(
            await GenerateCharacter(character, Assets.item)
        )
    }

    Clear(): void {
        this.Element.innerHTML = ''
    }
}
