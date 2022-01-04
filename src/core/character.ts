import { ICharacter, TCharacterDressKey } from "@townland-project/interfaces"
import { Event } from "./eventer";

export let Character: ICharacter = {
    username: '',
    dna: '',
    access: 'member',
    gender: 'male',
    dress: {}
}

export function SetCharacter(character: ICharacter): void {
    if (!character) return;

    Character = character;

    Event.emit('character:set', character)
    Event.emit('character:change', character)
}

export function ChangeCharacterDress(key: TCharacterDressKey, value: string): void {
    Character.dress[key] = value

    Event.emit('character:change', Character)
}
