import { NgModule } from '@angular/core';
import { LayoutFactory } from "./factories/layout.factory";

@NgModule({
  providers: [LayoutFactory],
})

export class LayoutModule {}
