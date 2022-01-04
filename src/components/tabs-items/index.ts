import { Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import { TCharacterDressKey, CharacterDressKeys } from '@townland-project/interfaces';
import { GetAssetKeyOf, GetAssetOf } from '../../core/cache';
import { ChangeCharacterDress } from '../../core/character';
import { Event } from '../../core/eventer';

@Component({
    id: 'tl-character-custom-tabs-items',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class TabsItemsComponent extends ComponentHelper implements RenderOnInit {
    RenderOnInit(): void {
        Event.on('character:set', ()=> {            
            CharacterDressKeys.forEach(dress => this.AddColumn(dress));
        })

        Event.on('tab:change', id => {
            this.SetViewTo(id)
        })
    }

    AddColumn(dress: TCharacterDressKey): void {
        if (dress == 'body') return;

        let div = document.createElement('div')
        div.className = 'column'
        div.setAttribute('tab-id', dress)

        div.appendChild(this.AddNonItem(dress))

        GetAssetKeyOf(dress, (key) => {            
            let item = document.createElement('div')
            item.className = 'item'
            item.style.setProperty('--image', `url('${GetAssetOf(key)}')`)
            item.onclick = () => this.SelectItem(key)
            div.appendChild(item)
        })

        this.Element.appendChild(div)
    }


    AddNonItem(dress: TCharacterDressKey): HTMLDivElement {
        let item = document.createElement('div')
        item.className = 'item non'
        item.onclick = () => ChangeCharacterDress(dress, '')
        let span = document.createElement('span')
        span.className = 'material-icons'
        span.innerText = 'highlight_off'
        item.appendChild(span)
        return item
    }

    SelectItem(key: string): void {
        let [_, dress, ...value] = key.split(':')
        ChangeCharacterDress(dress as any, value.join(''))
    }

    SetViewTo(id: string): void {
        let element: HTMLDivElement = document.querySelector(`tl-character-custom-tabs-items div.column[tab-id="${id}"]`)!

        let height = element.getBoundingClientRect().height;

        (<HTMLDivElement>document.querySelector(`tl-character-custom-tabs-items`)).style.setProperty('--items-height', `${height}px`)

        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' })
        }, 200);
    }
}
