import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { threadId } from 'worker_threads';
import { PlantcodeService } from '../../plantcode.service';
import {HttpClient} from "@angular/common/http";

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

	fileaa: any = ''
	resume_file_name: any = ''
	marksheet_file_name: any = ''
	transfercertificate_file_name: any = ''
	aadharcard_file_name: any = ''
	bankpassbook_file_name: any = ''
	photo_file_name: any = ''
	signature_file_name: any = ''

	appointmentorder_file_name: any = ''
	declaration_file_name: any = ''
	medicalfitness_file_name: any = ''
	formA4_file_name: any = ''
	form11_file_name: any = ''
	formh2_file_name: any = ''
	natx_file_name: any = ''
	

	filenames: any = []
	form: any
	flag:any = false
	size:any
	flag_for_size:any = false

	flagged:any = true
	rollno:any
	flagged_for_rml: any = true;
	
  constructor(private service: PlantcodeService, private active : ActivatedRoute, private http: HttpClient) {
	this.ishr = sessionStorage.getItem('ishr')
	console.log('====================================');
	console.log(this.ishr)
	console.log('====================================');
	if(this.ishr == 'true')
  	{
		this.flagged = false
		this.flagged_for_rml = false
  	}
  }

  ngOnInit(): void {
	this.service.getdatabasic(this.uniqueId)
	setTimeout(() => {
		this.rollno = this.service.basicdetails[0]?.apln_slno
	}, 1000);

	if(sessionStorage.getItem('ishr') == 'true')
	{
		this.generate_link()
		this.generate_link_rml()
	}

  }

getfiles(){
	this.service.getdatabasic(this.uniqueId)

	setTimeout(() => {
		this.filenames = this.service.basicdetails
		console.log("this.filenames : ",this.filenames)
		
	}, 1000);
}

generate_link(){
	this.getfiles()

	setTimeout(() => {
		this.resume_file_name = this.filenames[0]?.other_files1
		this.urlforResume = this.url+this.filenames[0]?.other_files1

		this.marksheet_file_name = this.filenames[0]?.other_files2
		this.urlforMark = this.url+this.filenames[0]?.other_files2
		
		this.transfercertificate_file_name = this.filenames[0]?.other_files3
		this.urlforTc = this.url+this.filenames[0]?.other_files3

		this.aadharcard_file_name = this.filenames[0]?.other_files4
		this.urlforaadhar = this.url+this.filenames[0]?.other_files4

		this.bankpassbook_file_name = this.filenames[0]?.other_files5
		this.urlforbankpass = this.url+this.filenames[0]?.other_files5

		this.photo_file_name = this.filenames[0]?.other_files6
		this.urlforphoto = this.url+this.filenames[0]?.other_files6

		this.signature_file_name = this.filenames[0]?.other_files7
		this.urlforSign = this.url+this.filenames[0]?.other_files7

	}, 1050);
}

generate_link_rml(){
	this.getfiles()
	setTimeout(() => {
		this.appointmentorder_file_name = this.filenames[0]?.other_files8
		this.url_appointmentorder_file = this.url+this.filenames[0]?.other_files8

		this.declaration_file_name = this.filenames[0]?.other_files9
		this.url_declaration_file = this.url+this.filenames[0]?.other_files9
		
		this.medicalfitness_file_name = this.filenames[0]?.other_files10
		this.url_medicalfitness_file = this.url+this.filenames[0]?.other_files10

		this.formA4_file_name = this.filenames[0]?.other_files11
		this.url_formA4_file = this.url+this.filenames[0]?.other_files11

		this.form11_file_name = this.filenames[0]?.other_files12
		this.url_form11_file = this.url+this.filenames[0]?.other_files12

		this.formh2_file_name = this.filenames[0]?.other_files13
		this.url_formh2_file = this.url+this.filenames[0]?.other_files13

		this.natx_file_name = this.filenames[0]?.other_files14
		this.url_natx_file = this.url+this.filenames[0]?.other_files14

	}, 1050);
}


valid()
{
		setTimeout(() => {
			if(this.resume_file != null && this.marksheet_file != null && this.transfercertificate_file != null && this.aadharcard_file != null && this.bankpassbook_file != null && this.photo_file != null && this.signature_file != null)
			this.flagged = false
		}, 50);

}

valid_for_rml()
{
		setTimeout(() => {
			if(this.appointmentorder_file != null && this.declaration_file != null && this.medicalfitness_file != null && this.formA4_file != null && this.form11_file != null && this.natx_file != null && this.natx_file != null)
			this.flagged_for_rml = false
		}, 50);

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

			console.log(this.resume_file != null)
			this.resume_file = event.target.files[0]
			this.size = this.resume_file?.size
			if(this.size > 20000)
			{
				this.flag_for_size = true
				window.alert("File too big") 
			}
			else
				this.service.fileupload(this.resume_file,this.uniqueId.mobile, this.rollno +'_resume','1' )

	}

onMarksheetChange(event:any){
		this.marksheet_file = event.target.files[0]
		this.size = this.marksheet_file?.size
		if(this.size > 10000)
		{
			this.flag_for_size = true
			window.alert("File too big") 
		}
		else
		this.service.fileupload(this.marksheet_file,this.uniqueId.mobile,  this.rollno+'_marksheet','2' )

}


onTransfercertificateChange(event:any){
	this.transfercertificate_file = event.target.files[0]
	this.size = this.transfercertificate_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.transfercertificate_file,this.uniqueId.mobile,  this.rollno+'_tc','3' )

	// this.urlforTc = this.url+this.filenames[0]?.other_files3

}


onAadharcardChange(event:any){
	this.aadharcard_file = event.target.files[0]
	this.size = this.aadharcard_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.aadharcard_file,this.uniqueId.mobile,  this.rollno+'_aadhar','4' )

	// this.urlforaadhar = this.url+this.filenames[0]?.other_files4

}

onBankpassbookChange(event:any){
	this.bankpassbook_file = event.target.files[0]
	this.size = this.bankpassbook_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.bankpassbook_file,this.uniqueId.mobile,  this.rollno+'_passbook','5' )

	// this.urlforbankpass = this.url+this.filenames[0]?.other_files5

}


onPhotoChange(event:any){
	this.photo_file = event.target.files[0]
	this.size = this.photo_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.photo_file,this.uniqueId.mobile,  this.rollno+'_photo','6' )

	// this.urlforphoto = this.url+this.filenames[0]?.other_files6

}

onSignatureChange(event:any){
	this.signature_file = event.target.files[0]
	this.size = this.signature_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.signature_file,this.uniqueId.mobile,  this.rollno+'_sign','7' )

	// this.urlforSign = this.url+this.filenames[0]?.other_files7

}

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////

onAppointmentorderChange(event:any){
	this.appointmentorder_file = event.target.files[0]
	this.size = this.appointmentorder_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.appointmentorder_file,this.uniqueId.mobile,  this.rollno+'_appointmentorder_file','8' )

}

onDeclarationChange(event:any){
	this.declaration_file = event.target.files[0]
	this.size = this.declaration_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.declaration_file,this.uniqueId.mobile,  this.rollno+'_declaration_file','9' )

}

onMedicalfitnessChange(event:any){
	this.medicalfitness_file = event.target.files[0]
	this.size = this.medicalfitness_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.medicalfitness_file,this.uniqueId.mobile,  this.rollno+'_medicalfitness_file','10' )

}

onForma4Change(event:any){
	this.formA4_file = event.target.files[0]
	this.size = this.formA4_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.formA4_file,this.uniqueId.mobile,  this.rollno+'_formA4_file','11' )

}

onForm11Change(event:any){
	this.form11_file = event.target.files[0]
	this.size = this.form11_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.form11_file,this.uniqueId.mobile,  this.rollno+'_form11_file','12' )

}

onFormh2Change(event:any){
	this.formh2_file = event.target.files[0]
	this.size = this.formh2_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.formh2_file,this.uniqueId.mobile,  this.rollno+'_formh2_file','13' )

}

onNatxChange(event:any){
	this.natx_file = event.target.files[0]
	this.size = this.natx_file?.size

	if(this.size > 10000)
	{
		this.flag_for_size = true
		window.alert("File too big") 
	}
	else
	this.service.fileupload(this.natx_file,this.uniqueId.mobile,  this.rollno+'_natx_file','14' )

}

//////////////////////////////////////////////////////////////////

}
