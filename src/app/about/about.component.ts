import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";


@Component({
    selector: 'about',
    imports: [RouterOutlet],
    templateUrl: './about.component.html'
})

export class AboutComponent {
    title = 'about-junwell'
}