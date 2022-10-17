import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { threadId } from 'worker_threads';
@Component({
  selector: 'app-choose-files',
  templateUrl: './choose-files.component.html',
  styleUrls: ['./choose-files.component.css']
})
export class ChooseFilesComponent implements OnInit {


	uniqueId :any = {'mobile': this.active.snapshot.paramMap.get('mobile_no1') }

	url: any = 'http://localhost:3000/';

	urlforResume: any 
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
	filenames: any = []

  constructor(private service: PlantcodeService, private active : ActivatedRoute) {
	this.ishr = localStorage.getItem('ishr')
	console.log('====================================');
	console.log(this.ishr)
	console.log('====================================');
   }

  ngOnInit(): void {
	this.getfiles()

  }

  getfiles(){
	this.service.getdatabasic(this.uniqueId)

	setTimeout(() => {
		this.filenames = this.service.basicdetails
		console.log("this.filenames : ",this.filenames)
		
	}, 1000);
}

// getFilesForhr(){
// 	this.service.getdatabasic(this.uniqueId)

	// setTimeout(() => {
	// 	this.filenames = this.service.basicdetails
	// 	console.log("this.filenames : ",this.filenames)
	// 	if(this.filenames[0]?.other_files1 == 'undefined' || this.filenames[0]?.other_files2 == 'undefined' || this.filenames[0]?.other_files3 == 'undefined' || this.filenames[0]?.other_files4 == 'undefined' || this.filenames[0]?.other_files5 == 'undefined' || this.filenames[0]?.other_files6 == 'undefined' || this.filenames[0]?.other_files7 == 'undefined')
	// 	{
	// 		console.log('undefined values')
	// 	}
	// 	// else
	// 	// {
	// 	// this.urlforResume = this.url+this.filenames[0]?.other_files1
	// 	// this.urlforMark = this.url+this.filenames[0]?.other_files2
	// 	// this.urlforTc = this.url+this.filenames[0]?.other_files3
	// 	// this.urlforaadhar = this.url+this.filenames[0]?.other_files4
	// 	// this.urlforbankpass = this.url+this.filenames[0]?.other_files5
	// 	// this.urlforphoto = this.url+this.filenames[0]?.other_files6
	// 	// this.urlforSign = this.url+this.filenames[0]?.other_files7
	// 	// }
	// }, 500);
// }

////////////////////////////////////////////////////////////////////////////

	onResumeChange(event:any){

			this.resume_file = event.target.files[0]

				this.service.fileupload(this.resume_file,this.uniqueId.mobile, this.filenames[0]?.apln_slno+'_resume','1' )
				this.service.getdatabasic(this.uniqueId)
				this.filenames = this.service.basicdetails
				this.urlforResume = this.url+this.filenames[0]?.other_files1
				console.log('====================================');
				console.log(this.filenames[0]?.other_files1);
				console.log('====================================');

	}

onMarksheetChange(event:any){
		this.marksheet_file = event.target.files[0]
		this.service.fileupload(this.marksheet_file,this.uniqueId.mobile, this.filenames[0]?.apln_slno+'_marksheet','2' )
		this.service.getdatabasic(this.uniqueId)
		this.filenames = this.service.basicdetails
		this.urlforMark = this.url+this.filenames[0]?.other_files2
		console.log('====================================');
		console.log(this.urlforResume);
		console.log('====================================');
}

onMarksheetUpload(){
	
}

onTransfercertificateChange(event:any){
	this.transfercertificate_file = event.target.files[0]
	this.service.fileupload(this.transfercertificate_file,this.uniqueId.mobile, this.filenames[0]?.apln_slno+'_tc','3' )
	this.service.getdatabasic(this.uniqueId)
	this.filenames = this.service.basicdetails
	this.urlforTc = this.url+this.filenames[0]?.other_files3
	console.log('====================================');
	console.log(this.urlforTc);
	console.log('====================================');
}

onTransfercertificateUpload(){
	// this.service.fileupload(this.transfercertificate_file)
}

onAadharcardChange(event:any){
	this.aadharcard_file = event.target.files[0]
	this.service.fileupload(this.aadharcard_file,this.uniqueId.mobile, this.filenames[0]?.apln_slno+'_aadhar','4' )
	this.service.getdatabasic(this.uniqueId)
	this.filenames = this.service.basicdetails
	this.urlforaadhar = this.url+this.filenames[0]?.other_files4
	console.log('====================================');
	console.log(this.urlforaadhar);
	console.log('====================================');
}

onAadharcardUpload(){
	// this.service.fileupload(this.aadharcard_file)
}

onBankpassbookChange(event:any){
	this.bankpassbook_file = event.target.files[0]
	this.service.fileupload(this.bankpassbook_file,this.uniqueId.mobile, this.filenames[0]?.apln_slno+'_passbook','5' )
	this.service.getdatabasic(this.uniqueId)
	this.filenames = this.service.basicdetails
	this.urlforbankpass = this.url+this.filenames[0]?.other_files5
	console.log('====================================');
	console.log(this.urlforbankpass);
	console.log('====================================');
}

onBankpassbookUpload(){
	// this.service.fileupload(this.bankpassbook_file)
}

onPhotoChange(event:any){
	this.photo_file = event.target.files[0]
	this.service.fileupload(this.photo_file,this.uniqueId.mobile, this.filenames[0]?.apln_slno+'_photo','6' )
	this.service.getdatabasic(this.uniqueId)
	this.filenames = this.service.basicdetails
	this.urlforphoto = this.url+this.filenames[0]?.other_files6
	console.log('====================================');
	console.log(this.urlforphoto);
	console.log('====================================');
}

onPhotoUpload(){
	// this.service.fileupload(this.photo_file)
}

onSignatureChange(event:any){
	this.signature_file = event.target.files[0]
	this.service.fileupload(this.signature_file,this.uniqueId.mobile, this.filenames[0]?.apln_slno+'_sign','7' )
	this.service.getdatabasic(this.uniqueId)
	this.filenames = this.service.basicdetails
	this.urlforSign = this.url+this.filenames[0]?.other_files7
	console.log('====================================');
	console.log(this.urlforSign);
	console.log('====================================');
}

onSignatureUpload(){
	// this.service.fileupload(this.signature_file)
}




//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////


onAppointmentorderChange(event:any){
	this.appointmentorder_file = event.target.files[0]
}

onAppointmentorderUpload(){
	// this.service.fileupload(this.appointmentorder_file)
}

onDeclarationChange(event:any){
	this.declaration_file = event.target.files[0]
}

onDeclarationUpload(){
	// this.service.fileupload(this.declaration_file)
}

onMedicalfitnessChange(event:any){
	// this.medicalfitness_file = event.target.files[0]
}

onMedicalfitnessUpload(){
	// this.service.fileupload(this.medicalfitness_file)

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

//////////////////////////////////////////////////////////////////

}
