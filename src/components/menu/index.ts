import { GenerateCharacter } from '@townland-project/character-dom/src';
import { Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import { ICharacter } from '@townland-project/interfaces';
import { Assets } from '../../core/cache';
import { Character } from '../../core/character';
import { Event } from '../../core/eventer';

@Component({
    id: 'tl-character-custom-menu',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class MenuComponent extends ComponentHelper implements RenderOnInit {
    RenderOnInit(): void {
        Event.on('character:set', ()=> {
            this.SetLoad()
        })

        Event.on('menu:show', () => {
            this.Element.classList.add('show')
            this.SetView('main')
        })

        Event.on('menu:hide', () => {
            this.Element.classList.remove('show')
        })

        Event.on('menu:toggle', () => {
            this.Element.classList.toggle('show')
            if (this.Element.classList.contains('show')) this.SetView('main')
        })
    }

    ShowView(id: string) {
        this.Element.classList.remove('show')

        setTimeout(() => {
            this.SetView(id)
            this.Element.classList.add('show')
        }, 200);
    }

    SetView(id: string) {
        document.querySelector('tl-character-custom-menu div.menu-view:not(.hide)')?.classList.add('hide')
        document.querySelector(`tl-character-custom-menu div.menu-view#${id}`)?.classList.remove('hide')
    }

    async SetLoad() {
        let element = document.getElementById('load-items')!

        element.innerHTML = ''

        element.appendChild(
            await this.AddLoadItem('default', {
                username: '',
                dna: '',
                access: 'member',
                gender: Character.gender,
                dress: {
                    body: 'white-male-body',
                }
            }))
    }

    async AddLoadItem(name: string, character: ICharacter): Promise<HTMLDivElement> {
        let div = document.createElement('div')
        div.className = 'menu-item'

        div.onclick = () => {
            Character.dress = character.dress            
            Event.emit('character:change', Character)
        }

        div.appendChild(
            await GenerateCharacter(character, Assets.item)
        )

        let span = document.createElement('span')
        span.innerText = name
        div.appendChild(span)

        return div
    }
}
