import { Component, OnInit } from '@angular/core';
import { PlantcodeService } from '../../plantcode.service';

@Component({
  selector: 'app-choose-files',
  templateUrl: './choose-files.component.html',
  styleUrls: ['./choose-files.component.css']
})
export class ChooseFilesComponent implements OnInit {


	url: any;
	msg = "";
	ishr : any
	file: File|null = null; 

  constructor(private service: PlantcodeService) {
	this.ishr = localStorage.getItem('ishr')
	console.log(this.ishr)
   }

  ngOnInit(): void {
  }

	
	//selectFile(event) { //Angular 8
	selectFile(event: any) { //Angular 11, for stricter type
		// if(!event.target.files[0] || event.target.files[0].length == 0) {
		// 	this.msg = 'You must select an image';
		// 	return;
		// }
		
		// var mimeType = event.target.files[0].type;
		
		// if (mimeType.match(/image\/*/) == null) {
		// 	this.msg = "Only images are supported";
		// 	return;
		// }
		
		// var reader = new FileReader();
		// reader.readAsDataURL(event.target.files[0]);
		
		// reader.onload = (_event) => {
		// 	this.msg = "";
		// 	this.url = reader.result; 
		// }
	
	}

	onchange(event:any){
			this.file = event.target.files[0]
	}
	
	onupload(){
		this.service.fileupload(this.file)
	}
}
