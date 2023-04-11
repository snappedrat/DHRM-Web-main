import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { appendFile } from 'fs';
import { report } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
// import { ProductModel } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

url:any = environment.path
url2:any = environment.path2

  constructor(private http: HttpClient) {}

  ars_login(form:any)
  {
    return this.http.post(this.url+'/ars-login', form)
  }
  traineeFormData(form:any)
  {
    return this.http.post(this.url+'/traineeformdata',form)
  }
  getHr(uniqueid: any)
  {
    return this.http.get(this.url+'/gethrappr?username='+uniqueid.username+'&user='+uniqueid.user,uniqueid)
  }
  getPlantCode(form:any)
  {
    return this.http.get(this.url+'/plantcodelist?company_name='+form.company_name)
  }
  getCompanyCode()
  {
    return this.http.get(this.url+'/companycodelist')
  }
  getAadhar()
  {
    return this.http.get(this.url+'/getaadhar')
  }
  checkAadhar(aadhar:any)
  {
    return this.http.get(this.url+'/checkAadhar?aadhar='+aadhar)
  }
  getDataForId(form:any)
  {
    return this.http.get(this.url+'/getdataforid?mobile='+form.mobile+'&company='+form.company)
  }
  getDataForPermId(form:any)
  {
    return this.http.get(this.url+'/getdataforpermid?apln_slno='+form.apln_slno)
  }
  filterForApproval(form:any)
  {
    return this.http.get(this.url+'/filterforapproval?status='+form.status+'&plantcode='+form.plantcode)
  }

  getdatabasic(uniqueId:any){
    return this.http.post(this.url+'/getdatabasic',uniqueId)
  
  }
  
  getdataqualifn(uniqueId:any){
    // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
    return this.http.post(this.url+'/getdataqualfn',uniqueId)
  
  }
  
  getdatafamily(uniqueId:any){
    // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
    return this.http.post(this.url+'/getdatafamily',uniqueId)
  
  }
  
  getdatacareer(uniqueId:any){
    // this.uniqueId.mobile = this.active.snapshot.paramMap.get('mobile');
    return this.http.post(this.url+'/getdatacareer',uniqueId)
  
  }
  ////////////////////////////////////////////////////////////////////////masters
  companyshow()
  {
    return this.http.get(this.url+'/companyshow')
  }
  companyadd(form:any)
  {
    return this.http.post(this.url+'/companyadd', form)
  }
  companyedit(form:any)
  {
    return this.http.post(this.url+'/companyedit', form)
  }
  companydel(form:any)
  {
    return this.http.post(this.url+'/companydel', form)
  }

  getplant()
  {
    return this.http.post(this.url+'/getplant', '')
  }
  deleteplant(form:any)
  {
    return this.http.post(this.url+'/deleteplant', form)
  }
  updateplant(form:any)
  {
    return this.http.post(this.url+'/updateplant', form)
  }
  addplant(form:any)
  {
    return this.http.post(this.url+'/addplant', form)
  }

  getbank()
  {
    return this.http.post(this.url+'/getbank', '')
  }
  deletebank(form:any)
  {
    return this.http.post(this.url+'/deletebank', form)
  }
  updatebank(form:any)
  {
    return this.http.post(this.url+'/updatebank', form)
  }
  addbank(form:any)
  {
    return this.http.post(this.url+'/addbank', form)
  }

  getdepartment()
  {
    return this.http.post(this.url+'/getdepartment', '')
  }
  deletedepartment(form:any)
  {
    return this.http.post(this.url+'/deletedepartment', form)
  }
  updatedepartment(form:any)
  {
    return this.http.post(this.url+'/updatedepartment', form)
  }
  adddepartment(form:any)
  {
    return this.http.post(this.url+'/adddepartment', form)
  }

  getdesignation()
  {
    return this.http.post(this.url+'/getdesignation', '')
  }
  deletedesignation(form:any)
  {
    return this.http.post(this.url+'/deletedesignation', form)
  }
  updatedesignation(form:any)
  {
    return this.http.post(this.url+'/updatedesignation', form)
  }
  adddesignation(form:any)
  {
    return this.http.post(this.url+'/adddesignation', form)
  }

  getline(form:any)
  {
    return this.http.post(this.url+'/getline', form)
  }
  deleteline(form:any)
  {
    return this.http.post(this.url+'/deleteline', form)
  }
  updateline(form:any)
  {
    return this.http.post(this.url+'/updateline', form)
  }
  addline(form:any)
  {
    return this.http.post(this.url+'/addline', form)
  }

  getoperation()
  {
    return this.http.post(this.url+'/getoperation', '')
  }
  deleteoperation(form:any)
  {
    return this.http.post(this.url+'/deleteoperation', form)
  }
  updateoperation(form:any)
  {
    return this.http.post(this.url+'/updateoperation', form)
  }
  addoperation(form:any)
  {
    return this.http.post(this.url+'/addoperation', form)
  }

  getemployee()
  {
    return this.http.post(this.url+'/getemployee', '')
  }
  deleteemployee(form:any)
  {
    return this.http.post(this.url+'/deleteemployee', form)
  }
  updateemployee(form:any)
  {
    return this.http.post(this.url+'/updateemployee', form)
  }
  addemployee(form:any)
  {
    return this.http.post(this.url+'/addemployee', form)
  }

  getshift()
  {
    return this.http.post(this.url+'/getshift', '')
  }
  deleteshift(form:any)
  {
    return this.http.post(this.url+'/deleteshift', form)
  }
  updateshift(form:any)
  {
    return this.http.post(this.url+'/updateshift', form)
  }
  addshift(form:any)
  {
    return this.http.post(this.url+'/addshift', form)
  }
  
  ////////////////////////////////////////////////////////////////////////masters

  plantcodelist(form:any)
  {
    return this.http.post(this.url+'/getplant',form)
  }
  companycodelist()
  {
    return this.http.get(this.url+'/companycodelist')
  }


  line_dept_design(form:any)
  {
    return this.http.get(this.url+'/getall?plantcode='+form.plantcode)
  }
  getLineName(form:any)
  {
    return this.http.post(this.url+'/getLineName',form)
    return this.http.post('localhost:3000/getLineName',form)
  }

  login(User_Name: string, Password: string) 
  {
    return this.http.post(this.url+'/logins', { User_Name, Password });
  }

  traineeLogin(formvalue:any)
  {
    return this.http.post(this.url+'/traineelogin',formvalue)
  }
  getModules(username:any)
  {
    return this.http.get(this.url+'/getModules?username='+username.username)
  }
  addmodule(formvalue:any)
  {
    return this.http.post(this.url+'/addmodule', formvalue)
  }
  updatemodule(formvalue:any)
  {
    return this.http.put(this.url+'/updatemodule', formvalue)
  }
  deletemodule(formvalue:any)
  {
    return this.http.put(this.url+'/deletemodule', formvalue)
  }
  getQuestions(form:any)
  {
    return this.http.get(this.url+'/getQuestions?module='+encodeURIComponent(form.module)+'&username='+form.username)
  }
  getQuestions_tnr(form:any)
  {
    return this.http.get(this.url+'/getQuestions_tnr?module='+encodeURIComponent(form.module)+'&plant_code='+form.plant_code)
  }
  getTest(form:any)
  {
    return this.http.get(this.url+'/getTest?username='+form.username+'&module='+encodeURIComponent(form.module))
  }
  Qualified(form:any)
  {
    return this.http.get(this.url+'/Qualified?username='+form.username+'&module='+encodeURIComponent(form.module))
  }
  pretest(formvalue:any)
  {
    return this.http.post(this.url+'/pretest',formvalue)
  }
  posttest(formvalue:any)
  {
    return this.http.post(this.url+'/posttest',formvalue)
  }
  questionbank(formvalue:any)
  {
    return this.http.post(this.url+'/questionbank',formvalue)
  }
  questionBankDelete(formvalue:any)
  {
    return this.http.post(this.url+'/questionBankDelete',formvalue)
  }
  questionbankupload(formvalue:any)
  {
    return this.http.post(this.url+'/questionbankupload',formvalue)
  }
  getTrainee()
  {
    return this.http.get(this.url+'/getTrainee?plantcode='+sessionStorage.getItem('plantcode'))
  }
  get_test_status(form:any)
  {
    return this.http.get(this.url+'/get_test_status?idno='+form.idno+'&module_name='+encodeURIComponent(form.module_name))
  }
  getOfflineModules()
  {
    return this.http.get(this.url+'/getOfflineModule?plantcode='+sessionStorage.getItem('plantcode') )
  }

  offlineUpload(formvalue:any)
  {
    return this.http.post(this.url+'/offlineUpload', formvalue)
  }
  testSummary(form:any)
  {
    return this.http.get(this.url+'/testSummary?start='+form.start+'&end='+form.end+'&plantcode='+form.plantcode)
  }
  traineeScorecard(formvalue:any)
  {
    return this.http.get(this.url+'/traineeScorecard?trainee_idno='+formvalue.trainee_idno)
  }
  traineeAnswers(form:any)
  {
    return this.http.get(this.url+'/traineeAnswers?idno='+form.idno+'&module='+form.module)
  }

  plantcode(form:any)
  {
    return this.http.post(this.url+'/plantcode', form)
  }

  evaluationdays(status:any)
  {
    return this.http.post(this.url+'/evaluationdays', status)
  }
  evaluationDueSupervisor(form:any)
  {
    return this.http.get(this.url+'/evaluationDueSupervisor?plantcode='+form.plant_code+'&dept_slno='+form.dept_slno)
  }
  eval_pending_approval(status:any)
  {
    return this.http.get(this.url+'/eval_pending_approval?status='+status.status+'&plantcode='+status.plantcode)
  }
  depttransfer(form:any)
  {
    return this.http.get(this.url+'/depttransfer?plantcode='+form.plantcode)
  }
  onboard(form:any)
  {
    return this.http.get(this.url+'/onboard?plantcode='+form.plantcode+'&select='+form.select)
  }
  relieve(form:any)
  {
    return this.http.post(this.url+'/relieve', form)
  }
  dept_line(form:any)
  {
    return this.http.post(this.url+'/dept-line', form)
  }
  dept_line_report(form:any)
  {
    return this.http.post(this.url+'/dept-line-report', form)
  }
  reporting(form:any)
  {
    return this.http.post(this.url+'/reporting', form)
  }
  getonboard(form:any)
  {
    return this.http.post(this.url+'/getonboard', form)
  }
  onboard_form(form:any)
  {
    return this.http.post(this.url+'/onboard_form', form)
  }
  getfiledrop(form:any)
  {
    return this.http.post(this.url+'/getfiledrop', form)
  }
  get_eval_form(form:any)
  {
    return this.http.post(this.url+'/get_eval_form', form)
  }
  eval_form(form:any)
  {
    return this.http.post(this.url+'/eval_form', form)
  }
  eval_form_sup(form:any)
  {
    return this.http.post(this.url+'/eval_form_sup', form)
  }
  get_eval_sup(form:any)
  {
    return this.http.post(this.url+'/get_eval_sup', form)
  }

  trainee_report(form:any)
  {
    return this.http.post(this.url+'/trainee-report', form)
  }
  test_summary(form:any)
  {
    return this.http.post(this.url+'/test-summary', form)
  }
  eval_due(form:any)
  {
    return this.http.post(this.url+'/evaluation-due-report', form)
  }
  people_planning(form:any)
  {
    return this.http.post(this.url+'/people_planning', form)
  }
  people_planning_save(form:any)
  {
    return this.http.post(this.url+'/people_planning_save', form)
  }
  people_planning_update(form:any)
  {
    return this.http.post(this.url+'/people_planning_update', form)
  }

  /////////////////////////////////////// PHASE - 3
  attendance(form:any)
  {
    return this.http.get(this.url2+'/attendance?emp_id='+form.emp_id+'&date='+form.date)
  }
  forgotpunch_details(form:any)
  {
    return this.http.get(this.url2+'/forgotPunchDetail?id='+form.id+'&date='+form.date)
  }
  forgot_punch(form:any)
  {
    return this.http.post(this.url2+'/forgot_punch', form)
  }
  coff_date(form:any)
  {
    return this.http.post(this.url2+'/coff_dates', form)
  }
  coff_details(form:any)
  {
    return this.http.get(this.url2+'/coff_details?emp_id='+form.emp_id+'&date='+form.date, form)
  }
  coff_date_validation(form:any)
  {
    return this.http.get(this.url2+'/coffDateValidation?emp_id='+form.emp_id+'&coffDate='+form.coff_date+'&date='+form.date, form)
  }
  emp_coff(form:any)
  {
    return this.http.post(this.url2+'/emp_coff', form)
  }
  ot_dates(form:any)
  {
    return this.http.post(this.url2+'/ot_dates', form)
  }
  ot_details(form:any)
  {
    return this.http.get(this.url2+'/ot_details?emp_id='+form.emp_id+'&date='+form.date, form)
  }
  get_machine_id(form:any)
  {
    return this.http.get(this.url2+'/ot_machine_id?id='+form.id, form)
  }
  ot_apply(form:any)
  {
    return this.http.post(this.url2+'/ot_apply', form)
  }
  shift_change_shifts(form:any)
  {
    return this.http.get(this.url2+'/shift_change_shifts?id='+form.id, form)
  }
  shift_change_reliever_name(form:any)
  {
    return this.http.get(this.url2+'/shift_change_reliever_name?id='+form.id, form)
  }
  shift_change(form:any)
  {
    return this.http.post(this.url2+'/shift_change', form) 
  }
  forgotPunchStatus(form:any)
  {
    return this.http.get(this.url2+'/forgotPunchStatus?empID='+form.empID+'&date='+form.date, form)
  }
  shiftChangeStatus(form:any)
  {
    return this.http.get(this.url2+'/shiftChangeStatus?empID='+form.empID+'&date='+form.date, form)
  }
  otStatus(form:any)
  {
    return this.http.get(this.url2+'/otStatus?empID='+form.empID+'&date='+form.date, form)
  }
  coffStatus(form:any)
  {
    return this.http.get(this.url2+'/coffStatus?empID='+form.empID+'&date='+form.date, form)
  }
  coffRequestDisplay(form:any)
  {
    return this.http.get(this.url2+'/coffRequestDisplay?executiveID='+form.id, form)
  }
  coffRequestStatus(form:any)
  {
    return this.http.post(this.url2+'/coffRequestStatus', form) 
  }
  otRequestDisplay(form:any)
  {
    return this.http.get(this.url2+'/otRequestDisplay?executiveID='+form.id, form)
  }
  otRequestStatus(form:any)
  {
    return this.http.post(this.url2+'/otRequestStatus', form) 
  }
  shiftChangeRequestDisplay(form:any)
  {
    return this.http.get(this.url2+'/shiftChangeRequestDisplay?executiveID='+form.id, form)
  }
  shiftChangeRequestStatus(form:any)
  {
    return this.http.post(this.url2+'/shiftChangeRequestStatus', form) 
  }
  forgotPunchRequestDisplay(form:any)
  {
    return this.http.get(this.url2+'/forgotPunchRequestDisplay?executiveID='+form.id, form)
  }
  forgotPunchRequestStatus(form:any)
  {
    return this.http.post(this.url2+'/forgotPunchRequestStatus', form) 
  }
  calendar(form:any)
  {
    return this.http.get(this.url2+'/calendar?id='+form.id+'&date='+form.date, form)
  }
  plantupload(form:any)
  {
    return this.http.post(this.url+'/plantupload', form) 
  }
  offline_test(form:any)
  {
    return this.http.post(this.url+'/offline_test_upload', form) 
  }
  skill_dev(form:any)
  {
    return this.http.post(this.url+'/skill_dev_upload', form) 
  }
  filedrop(form:any)
  {
    return this.http.post(this.url+'/filedrop', form) 
  }
  submitted_mail(form:any)
  {
    return this.http.post(this.url+'/submitted_mail', form) 
  }
  approved_mail(form:any)
  {
    return this.http.post(this.url+'/approved_mail', form) 
  }
  evaluation_mail(form:any)
  {
    return this.http.post(this.url+'/evaluation_mail', form) 
  }
}