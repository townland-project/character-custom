import { Component, ComponentHelper, RenderOnInit } from '@townland-project/dom'
import { ICharacter, TCharacterDressKey } from '@townland-project/interfaces';
import { GetAssetOf, GetFirstAssetsOf } from '../../core/cache';
import { Event } from '../../core/eventer';

@Component({
    id: 'tl-character-custom-tabs',
    template: require('./component.htmlx'),
    style: require('./component.scssx')
})
export class TabsComponent extends ComponentHelper implements RenderOnInit {
    private loaded: boolean = false

    RenderOnInit(): void {
        Event.on('character:set', (character: ICharacter) => {
            if (this.loaded) return
            this.loaded = true
            this.LoadTabs(character).forEach(item => this.AddTab(item.id, item.title, item.image));
        })
    }

    AddTab(id: string, title: string, image: string): void {
        let div = document.createElement('div');

        div.className = 'tab'
        div.setAttribute('tab-id', id)
        div.title = title
        div.style.setProperty('--image', `url("${image}")`)
        div.onclick = () => {
            Event.emit('tab:change', id);
            (<HTMLDivElement>document.querySelector('tl-character-custom-tabs div.tab[tab-id].active'))?.classList.remove('active');
            (<HTMLDivElement>document.querySelector(`tl-character-custom-tabs div.tab[tab-id="${id}"]`)).classList.add('active')
        }

        this.Element.appendChild(div)
    }

    LoadTabs(character: ICharacter): Tab[] {
        let tabs: Tab[] = [
            {
                id: 'hair',
                title: 'Hair',
                image: GetAssetOf(
                    GetFirstAssetsOf('hair')!
                )
            },
            {
                id: 'eyes',
                title: 'Eyes',
                image: GetAssetOf(
                    GetFirstAssetsOf('eyes')!
                )
            },
            {
                id: 'mouth',
                title: 'Mouth',
                image: GetAssetOf(
                    GetFirstAssetsOf('mouth')!
                )
            },
            {
                id: 'tops',
                title: 'Tops',
                image: GetAssetOf(
                    GetFirstAssetsOf('tops')!
                )
            },
            {
                id: 'bottoms',
                title: 'Bottoms',
                image: GetAssetOf(
                    GetFirstAssetsOf('bottoms')!
                )
            },
            {
                id: 'shoes',
                title: 'Shoes',
                image: GetAssetOf(
                    GetFirstAssetsOf('shoes')!
                )
            },
            {
                id: 'accessories',
                title: 'Accessories',
                image: GetAssetOf(
                    GetFirstAssetsOf('accessories')!
                )
            }
        ]

        if (character.gender == 'male') {
            tabs.splice(3, 0, {
                id: 'beard',
                title: 'Beard',
                image: GetAssetOf(
                    GetFirstAssetsOf('beard')!
                )
            })
        }

        return tabs;
    }
}

interface Tab {
    id: TCharacterDressKey
    title: string
    image: string
}