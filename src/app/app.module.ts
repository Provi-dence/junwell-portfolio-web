import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { PortfolioComponent } from "./portfolio/portfolio.component";

@NgModule({

    exports: [
        
    ],

    declarations: [
        HomeComponent,
        AboutComponent,
        ContactComponent,
        PortfolioComponent
    ]
}) export class AppModule {}