import { Module } from '@townland-project/dom'
import { MainComponent } from './components/main'
import { FooterComponent } from './components/footer';
import { HeaderComponent } from './components/header';
import { MenuComponent } from './components/menu';
import { TabsComponent } from './components/tabs';
import { TabsItemsComponent } from './components/tabs-items';
import { ViewComponent } from './components/view';

@Module({
    Component: [
        FooterComponent,
        HeaderComponent,
        MenuComponent,
        TabsComponent,
        TabsItemsComponent,
        ViewComponent
    ],
    Bootstrap: MainComponent
})
export class AppModule { }