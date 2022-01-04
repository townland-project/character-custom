import { Eventer } from '@townland-project/eventer'

export const Event: Eventer<TEvent> = new Eventer()

export type TEvent = 'app:ready' |  'cache:loaded' | 'character:change' | 'character:set' | 'tab:change' | 'menu:show' | 'menu:hide' | 'menu:toggle';