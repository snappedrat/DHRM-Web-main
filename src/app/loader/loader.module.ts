import { NgModule ,} from "@angular/core";
import { LoaderComponent } from "./loader.component";
import { CommonModule } from "@angular/common";


@NgModule({
    imports:[CommonModule],
    exports:[LoaderComponent],
    declarations:[LoaderComponent]
})
export class LoadModule{}