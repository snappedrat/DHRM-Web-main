import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { threadId } from 'worker_threads';
import { PlantcodeService } from '../../plantcode.service';
import {HttpClient} from "@angular/common/http";
import {
    trigger,
    state,
    style,
    animate,
    transition,
  } from '@angular/animations';
  import { Timestamp } from 'rxjs';

@Component({
  selector: 'app-choose-files',
  templateUrl: './choose-files.component.html',
  styleUrls: ['./choose-files.component.css'],
  animations: [
	trigger('slowAnimate', [
	  transition(':enter', [style({opacity: '0'}), animate(500)]),
	  transition(':leave', [style({opacity: '1'}), animate(500, style({opacity: '0'}))]),
	])
  ]
})
export class ChooseFilesComponent implements OnInit {
	@Output() emit = new EventEmitter<any>()
	message = {'choose':false}
	
	uniqueId :any = {'mobile': this.active.snapshot.paramMap.get('mobile_no1'),
						'company': this.active.snapshot.paramMap.get('company')}

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
	state: boolean= false;
	state_: boolean= false;
	basicDetails: any;
	
  constructor(private service: PlantcodeService, private active : ActivatedRoute, private http: HttpClient) {
	this.ishr = sessionStorage.getItem('ishr')
	console.log('====================================');
	console.log(this.ishr)
	console.log('====================================');
  }

  ngOnInit(): void {
	this.service.getdatabasic(this.uniqueId)
	.subscribe({
		next: (response) => {console.log("apln no", response); this.basicDetails = response;
		this.rollno = this.basicDetails[0]?.apln_slno
	}
	})
		this.generate_link()
		this.generate_link_rml()

  }

getfiles(){
	this.service.getdatabasic(this.uniqueId)
	.subscribe({
		next: (response)=>{console.log('filenames : ', response);
	this.basicDetails = response;
	this.filenames = this.basicDetails},
		error:(err)=>{console.error(err)}
	})

}

generate_link(){

	this.service.getdatabasic(this.uniqueId)
	.subscribe({
		next: (response)=>{console.log('filenames : ', response);
	this.basicDetails = response;
	this.filenames = this.basicDetails;
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


	if(this.photo_file_name != null && this.aadharcard_file_name != null && this.marksheet_file_name != null)
	{
			this.flagged = false
			this.emit.emit(this.message)	
	}

},
		error:(err)=>{console.error(err)}
	})


}

func()
{
	this.state_ = true
	setTimeout(() => {
		this.state_ = false
	}, 2000);
}

generate_link_rml(){

	this.service.getdatabasic(this.uniqueId)
	.subscribe({
		next: (response)=>{console.log('filenames : ', response);
	this.basicDetails = response;
	this.filenames = this.basicDetails;

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
		
		this.state_ = true
		setTimeout(() => {
			this.state_ = false
		}, 2000);},
		error:(err)=>{console.error(err)}
	})

}


valid()
{
		setTimeout(() => {
	
				if(this.marksheet_file != null &&this.photo_file != null && this.aadharcard_file != null)
				{
					console.log("oeirherogerhgirueheriuerheriuhreiuh-940934504395348095")
					this.flagged = false
					this.emit.emit(this.message)
				}
		}, 50);

}

////////////////////////////////////////////////////////////////////////////

checking(event:any)
{
	this.resume_file = event.target.files[0]
	if(this.resume_file_name != null)
		this.resume_file_name = ''

if(this.resume_file!=null)
	this.resume_file= null
}

onResumeChange(event:any){
				this.resume_file = event.target.files[0]
				this.size = this.resume_file?.size
	
				var file_local = this.resume_file?.name.split('.')
				var new_ = file_local?.pop()
				console.log(new_)
				if(this.size > 2000000)
				{
					this.flag_for_size = true
					window.alert("File size should be less than 2MB")
				}
				else
				{
					if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
						window.alert("File is not of metioned type")
					else
						this.service.fileupload(this.resume_file,this.uniqueId.mobile,this.uniqueId.company, this.rollno +'_resume','1' )
				}
	}

onMarksheetChange(event:any){
		this.marksheet_file = event.target.files[0]
		this.size = this.marksheet_file?.size

		var file_local = this.marksheet_file?.name.split('.')
		var new_ = file_local?.pop()

		if(this.size > 1000000)
		{
			this.flag_for_size = true
			window.alert("File size should be less than 2MB") 
		}
		else
		{
			if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
				window.alert("File is not of metioned type")
			else
				this.service.fileupload(this.marksheet_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_marksheet','2' )
		}
}


onTransfercertificateChange(event:any){
	this.transfercertificate_file = event.target.files[0]
	this.size = this.transfercertificate_file?.size
	var file_local = this.transfercertificate_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.transfercertificate_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_tc','3' )
	}
	// this.urlforTc = this.url+this.filenames[0]?.other_files3

}


onAadharcardChange(event:any){
	this.aadharcard_file = event.target.files[0]
	this.size = this.aadharcard_file?.size

	var file_local = this.aadharcard_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.aadharcard_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_aadhar','4' )
	}
	// this.urlforaadhar = this.url+this.filenames[0]?.other_files4

}

onBankpassbookChange(event:any){
	this.bankpassbook_file = event.target.files[0]
	this.size = this.bankpassbook_file?.size

	var file_local = this.bankpassbook_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.bankpassbook_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_passbook','5' )
	}
	// this.urlforbankpass = this.url+this.filenames[0]?.other_files5

}


onPhotoChange(event:any){
	this.photo_file = event.target.files[0]
	this.size = this.photo_file?.size

	var file_local = this.photo_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'png'&& new_ != 'jpg' && new_!='jpeg')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.photo_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_photo','6' )
	}
	// this.urlforphoto = this.url+this.filenames[0]?.other_files6

}

onSignatureChange(event:any){
	this.signature_file = event.target.files[0]
	this.size = this.signature_file?.size

	var file_local = this.signature_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
	else
	this.service.fileupload(this.signature_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_sign','7' )
	}
	// this.urlforSign = this.url+this.filenames[0]?.other_files7

}

//////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////

onAppointmentorderChange(event:any){
	this.appointmentorder_file = event.target.files[0]
	this.size = this.appointmentorder_file?.size

	var file_local = this.appointmentorder_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.appointmentorder_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_appointmentorder_file','8' )
	}
}

onDeclarationChange(event:any){
	this.declaration_file = event.target.files[0]
	this.size = this.declaration_file?.size

	var file_local = this.declaration_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.declaration_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_declaration_file','9' )
	}	
}

onMedicalfitnessChange(event:any){
	this.medicalfitness_file = event.target.files[0]
	this.size = this.medicalfitness_file?.size

	var file_local = this.medicalfitness_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.medicalfitness_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_medicalfitness_file','10' )
	}
}

onForma4Change(event:any){
	this.formA4_file = event.target.files[0]
	this.size = this.formA4_file?.size

	var file_local = this.formA4_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.formA4_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_formA4_file','11' )
	}
}

onForm11Change(event:any){
	this.form11_file = event.target.files[0]
	this.size = this.form11_file?.size

	var file_local = this.marksheet_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.form11_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_form11_file','12' )
	}
}

onFormh2Change(event:any){
	this.formh2_file = event.target.files[0]
	this.size = this.formh2_file?.size

	var file_local = this.formh2_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.formh2_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_formh2_file','13' )
	}
}

onNatxChange(event:any){
	this.natx_file = event.target.files[0]
	this.size = this.natx_file?.size

	var file_local = this.natx_file?.name.split('.')
	var new_ = file_local?.pop()

	if(this.size > 1000000)
	{
		this.flag_for_size = true
		window.alert("File size should be less than 2MB") 
	}
	else
	{
		if(new_ != 'docx' && new_ != 'docs' && new_ != 'png'&& new_ != 'jpg' && new_!='jpeg'&& new_ != 'pdf')
			window.alert("File is not of metioned type")
		else
			this.service.fileupload(this.natx_file,this.uniqueId.mobile,this.uniqueId.company,  this.rollno+'_natx_file','14' )
	}
}

//////////////////////////////////////////////////////////////////

}
