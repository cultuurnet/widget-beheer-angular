import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private dragulaService: DragulaService) {
    dragulaService.setOptions('widget-container', {
      moves: function (el, container, handle) {
        return handle.className === 'handle';
      }
    });
  }

  title = 'app works!';
}
