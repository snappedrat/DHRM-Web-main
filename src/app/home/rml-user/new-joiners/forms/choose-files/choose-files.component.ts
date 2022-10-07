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
	ishr : any;

	file: File|null = null;
	resume_file: File|null = null; 
	marksheet_file: File|null = null;
	transfercertificate_file: File|null = null;
	aadharcard_file: File|null = null;
	bankpassbook_file: File|null = null;
	photo_file: File|null = null;
	signature_file: File|null = null;

	appointmentorder_file: File|null = null;
	declaration_file: File|null = null;
	medicalfitness_file: File|null = null;
	formA4_file: File|null = null;
	form11_file: File|null = null;
	formh2_file: File|null = null;
	natx_file: File|null = null;
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


	onUpload(){

	}
	onChange(event:any){

	}
	

	onResumeChange(event:any){
			this.resume_file = event.target.files[0]
	}
	
	onResumeUpload(){}

	onMarksheetChange(event:any){
		this.marksheet_file = event.target.files[0]
}

onMarksheetUpload(){}

onTransfercertificateChange(event:any){
	this.transfercertificate_file = event.target.files[0]
}

onTransfercertificateUpload(){}

onAadharcardChange(event:any){
	this.aadharcard_file = event.target.files[0]
}

onAadharcardUpload(){}

onBankpassbookChange(event:any){
	this.bankpassbook_file = event.target.files[0]
}

onBankpassbookUpload(){}

onPhotoChange(event:any){
	this.photo_file = event.target.files[0]
}

onPhotoUpload(){}

onSignatureChange(event:any){
	this.signature_file = event.target.files[0]
}

onSignatureUpload(){}

onAppointmentorderChange(event:any){
	this.appointmentorder_file = event.target.files[0]
}

onAppointmentorderUpload(){}

onDeclarationChange(event:any){
	this.declaration_file = event.target.files[0]
}

onDeclarationUpload(){}

onMedicalfitnessChange(event:any){
	this.medicalfitness_file = event.target.files[0]
}

onMedicalfitnessUpload(){}

onForma4Change(event:any){
	this.formA4_file = event.target.files[0]
}

onForma4Upload(){}

onForm11Change(event:any){
	this.form11_file = event.target.files[0]
}

onForm11Upload(){}

onFormh2Change(event:any){
	this.formh2_file = event.target.files[0]
}

onFormh2Upload(){}


onNatxChange(event:any){
	this.natx_file = event.target.files[0]
}

onNatxUpload(){}





}
