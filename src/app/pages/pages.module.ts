import { NgModule } from '@angular/core';
import { AddPageComponent } from "./components/add-page/add-page.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [
    AddPageComponent
  ],
  exports: [],
  providers: [],
  entryComponents: []
})

export class PagesModule {
}
