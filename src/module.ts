import { Module } from '@townland-project/dom'
import { MainComponent } from './components/main'

@Module({
    Component: [],
    Bootstrap: MainComponent
})
export class AppModule { }