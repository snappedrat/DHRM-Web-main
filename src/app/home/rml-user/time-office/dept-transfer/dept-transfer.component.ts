import {
  Component,
  ViewEncapsulation
} from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";

const material = [
  MatSidenav,
  MatTableModule
];

@Component({
  selector: 'app-dept',
  templateUrl: './dept-transfer.component.html',
  styleUrls: ['./dept-transfer.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class DeptTransferComponent {


}
