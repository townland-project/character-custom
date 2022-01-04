import { Caches } from '@townland-project/cache'
import { ICDNAssets, TCharacterDressKey } from '@townland-project/interfaces'
import { Character } from './character'

export let Assets: ICDNAssets = {
    size: 0,
    item: {}
}

export let Keys: string[] = []

export function CacheLoad(): Promise<void> {
    return new Promise((resolve) => {
        Caches.Character.OnOpen(async () => {
            try {
                let res = await Caches.Character.GetJson('https://cdn.townland.xyz/character.json')
                Assets = await res?.json()
                Keys = Object.keys(Assets.item)
                for (let key of Keys)
                    await Caches.Character.AddImage(Assets.item[key])

                resolve()
            } catch (error) {
                console.error('Failed to cache everything.');
            }
        })
    })
}

export function GetFirstAssetsOf(dress: TCharacterDressKey): string | undefined {
    return Keys.find((key) => {
        if (key.includes(`${Character.gender}:${dress}`)) {
            if (Character.gender == 'male')
                return !key.includes('female')
            return true
        }
        return false
    })
}

export function GetAssetOf(key: string): string {
    return Assets.item[key]
}


export function GetAssetKeyOf(dress: TCharacterDressKey, callback: GetAssetKeyOfCallback) {
    for (let key of Keys) {        
        if (key.includes(`${Character.gender}:${dress}`)) {
            if ((Character.gender == 'male' && !key.includes('female')) || Character.gender == 'female')
                callback(key)
        }
    }
}

export interface GetAssetKeyOfCallback {
    (key: string): void
}