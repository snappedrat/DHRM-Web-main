import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantcodeService } from '../../plantcode.service';

@Component({
  selector: 'app-choose-files',
  templateUrl: './choose-files.component.html',
  styleUrls: ['./choose-files.component.css']
})
export class ChooseFilesComponent implements OnInit {


	uniqueId :any = {'mobile': this.active.snapshot.paramMap.get('mobile_no1') }

	url: any = 'http://localhost:3000/uploads/';

	urlforResume: any = this.url+''
	urlforMark: any
	urlforTc: any
	urlforaadhar: any
	urlforbankpass: any
	urlforphoto: any
	urlforSign: any

	url_appointmentorder_file: any
	url_declaration_file: any
	url_medicalfitness_file:any
	url_formA4_file:any
	url_form11_file:any
	url_formh2_file: any
	url_natx_file: any

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
	filenames: any;
  constructor(private service: PlantcodeService, private active : ActivatedRoute) {

	this.ishr = localStorage.getItem('ishr')
	console.log('====================================');
	console.log(this.ishr)
	console.log('====================================');
   }

  ngOnInit(): void {
	this.getfiles()
  }
	
//////////////////////////////////////////////////////////////////

	onResumeChange(event:any){
			this.resume_file = event.target.files[0]
	}
	
	onResumeUpload(){
		this.service.fileupload(this.resume_file)
	}

	onMarksheetChange(event:any){
		this.marksheet_file = event.target.files[0]
}

onMarksheetUpload(){
	this.service.fileupload(this.marksheet_file)
}

onTransfercertificateChange(event:any){
	this.transfercertificate_file = event.target.files[0]
}

onTransfercertificateUpload(){
	this.service.fileupload(this.transfercertificate_file)
}

onAadharcardChange(event:any){
	this.aadharcard_file = event.target.files[0]
}

onAadharcardUpload(){
	this.service.fileupload(this.aadharcard_file)
}

onBankpassbookChange(event:any){
	this.bankpassbook_file = event.target.files[0]
}

onBankpassbookUpload(){
	this.service.fileupload(this.bankpassbook_file)
}

onPhotoChange(event:any){
	this.photo_file = event.target.files[0]
}

onPhotoUpload(){
	this.service.fileupload(this.photo_file)
}

onSignatureChange(event:any){
	this.signature_file = event.target.files[0]
}

onSignatureUpload(){
	this.service.fileupload(this.signature_file)
}

getfiles(){
	this.service.getfiles(this.uniqueId)
	this.filenames = this.service.filenames
	setTimeout(() => {
		console.log('====================================');
		console.log("filessssss", this.service.filenames);
		console.log('====================================');
	}, 1000);
}

//////////////////////////////////////////////////////////////////

onAppointmentorderChange(event:any){
	this.appointmentorder_file = event.target.files[0]
}

onAppointmentorderUpload(){
	this.service.fileupload(this.appointmentorder_file)
}

onDeclarationChange(event:any){
	this.declaration_file = event.target.files[0]
}

onDeclarationUpload(){
	this.service.fileupload(this.declaration_file)
}

onMedicalfitnessChange(event:any){
	this.medicalfitness_file = event.target.files[0]
}

onMedicalfitnessUpload(){
	this.service.fileupload(this.medicalfitness_file)

}

onForma4Change(event:any){
	this.formA4_file = event.target.files[0]
}

onForma4Upload(){
}

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
