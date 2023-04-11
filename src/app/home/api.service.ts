import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.http.post(this.url+'/login/ars-login', form)
  }
  
  login(User_Name: string, Password: string) 
  {
    return this.http.post(this.url+'/login/emp-login', { User_Name, Password });
  }
  traineeLogin(formvalue:any)
  {
    return this.http.post(this.url+'/login/trainee-login',formvalue)
  }
  /////////////////////////////////////////////////////////////////////////////////////////

  traineeFormData(form:any)
  {
    return this.http.post(this.url+'/hrOperation/traineeformdata',form)
  }
  getHr(uniqueid: any)
  {
    return this.http.get(this.url+'/hrOperation/gethrappr?username='+uniqueid.username+'&user='+uniqueid.user,uniqueid)
  }
  getPlantCode(form:any)
  {
    return this.http.get(this.url+'/hrOperation/plantcodelist?company_name='+form.company_name)
  }
  getCompanyCode()
  {
    return this.http.get(this.url+'/hrOperation/companycodelist')
  }  
  getAadhar()
  {
    return this.http.get(this.url+'/hrOperation/getaadhar')
  }
  checkAadhar(aadhar:any)
  {
    return this.http.get(this.url+'/hrOperation/checkAadhar?aadhar='+aadhar)
  }
  getDataForId(form:any)
  {
    return this.http.get(this.url+'/hrOperation/getdataforid?mobile='+form.mobile+'&company='+form.company)
  }
  getDataForPermId(form:any)
  {
    return this.http.get(this.url+'/hrOperation/getdataforpermid?apln_slno='+form.apln_slno)
  }
  filterForApproval(form:any)
  {
    return this.http.get(this.url+'/hrOperation/filterforapproval?status='+form.status+'&plantcode='+form.plantcode)
  }

  getdatabasic(uniqueId:any){
    return this.http.post(this.url+'/hrOperation/getdatabasic',uniqueId)
  
  }
  
  getdataqualifn(uniqueId:any){
    return this.http.post(this.url+'/hrOperation/getdataqualfn',uniqueId)
  
  }
  
  getdatafamily(uniqueId:any){
    return this.http.post(this.url+'/hrOperation/getdatafamily',uniqueId)
  
  }
  
  getdatacareer(uniqueId:any){
    return this.http.post(this.url+'/hrOperation/getdatacareer',uniqueId)
  
  }
  ////////////////////////////////////////////////////////////////////////masters
  getLineName(form:any)
  {
    return this.http.get(this.url+`/master/getLineName?dept_slno=${form.dept_slno}`)
  }
  line_dept_design(form:any)
  {
    return this.http.get(this.url+'/master/getall?plantcode='+form.plantcode)
  }
  companyshow()
  {
    return this.http.get(this.url+'/master/companyshow')
  }
  companyadd(form:any)
  {
    return this.http.post(this.url+'/master/companyadd', form)
  }
  companyedit(form:any)
  {
    return this.http.put(this.url+'/master/companyedit', form)
  }
  companydel(form:any)
  {
    return this.http.put(this.url+'/master/companydel', form)
  }

  getplant()
  {
    return this.http.get(this.url+'/master/getplant')
  }
  deleteplant(form:any)
  {
    return this.http.put(this.url+'/master/deleteplant', form)
  }
  updateplant(form:any)
  {
    return this.http.put(this.url+'/master/updateplant', form)
  }
  addplant(form:any)
  {
    return this.http.post(this.url+'/master/addplant', form)
  }

  getbank()
  {
    return this.http.get(this.url+'/master/getbank')
  }
  deletebank(form:any)
  {
    return this.http.put(this.url+'/master/deletebank', form)
  }
  updatebank(form:any)
  {
    return this.http.put(this.url+'/master/updatebank', form)
  }
  addbank(form:any)
  {
    return this.http.post(this.url+'/master/addbank', form)
  }

  getdepartment()
  {
    return this.http.get(this.url+'/master/getdepartment')
  }
  deletedepartment(form:any)
  {
    return this.http.put(this.url+'/master/deletedepartment', form)
  }
  updatedepartment(form:any)
  {
    return this.http.put(this.url+'/master/updatedepartment', form)
  }
  adddepartment(form:any)
  {
    return this.http.post(this.url+'/master/adddepartment', form)
  }

  getdesignation()
  {
    return this.http.get(this.url+'/master/getdesignation')
  }
  deletedesignation(form:any)
  {
    return this.http.put(this.url+'/master/deletedesignation', form)
  }
  updatedesignation(form:any)
  {
    return this.http.put(this.url+'/master/updatedesignation', form)
  }
  adddesignation(form:any)
  {
    return this.http.post(this.url+'/master/adddesignation', form)
  }

  getline(form:any)
  {
    return this.http.post(this.url+'/master/getline', form)
  }
  deleteline(form:any)
  {
    return this.http.post(this.url+'/master/deleteline', form)
  }
  updateline(form:any)
  {
    return this.http.post(this.url+'/master/updateline', form)
  }
  addline(form:any)
  {
    return this.http.post(this.url+'/master/addline', form)
  }

  getoperation()
  {
    return this.http.get(this.url+'/master/getoperation')
  }
  deleteoperation(form:any)
  {
    return this.http.put(this.url+'/master/deleteoperation', form)
  }
  updateoperation(form:any)
  {
    return this.http.put(this.url+'/master/updateoperation', form)
  }
  addoperation(form:any)
  {
    return this.http.post(this.url+'/master/addoperation', form)
  }

  getemployee()
  {
    return this.http.get(this.url+'/master/getemployee')
  }
  deleteemployee(form:any)
  {
    return this.http.put(this.url+'/master/deleteemployee', form)
  }
  updateemployee(form:any)
  {
    return this.http.put(this.url+'/master/updateemployee', form)
  }
  addemployee(form:any)
  {
    return this.http.post(this.url+'/master/addemployee', form)
  }

  getshift()
  {
    return this.http.get(this.url+'/master/getshift')
  }
  deleteshift(form:any)
  {
    return this.http.put(this.url+'/master/deleteshift', form)
  }
  updateshift(form:any)
  {
    return this.http.put(this.url+'/master/updateshift', form)
  }
  addshift(form:any)
  {
    return this.http.post(this.url+'/master/addshift', form)
  }
  

  plantcodelist(form:any)
  {
    return this.http.get(this.url+'/master/getplant')
  }
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////masters

/////////////////////////////////////////////////////////////////////////////////////////////////////////

  getModules(username:any)
  {
    return this.http.get(this.url+'/training/getModules?username='+username.username)
  }
  addmodule(formvalue:any)
  {
    return this.http.post(this.url+'/training/addmodule', formvalue)
  }
  updatemodule(formvalue:any)
  {
    return this.http.put(this.url+'/training/updatemodule', formvalue)
  }
  deletemodule(formvalue:any)
  {
    return this.http.put(this.url+'/training/deletemodule', formvalue)
  }
  getQuestions(form:any)
  {
    return this.http.get(this.url+'/training/getQuestions?module='+encodeURIComponent(form.module)+'&username='+form.username)
  }
  getQuestions_tnr(form:any)
  {
    return this.http.get(this.url+'/training/getQuestions_tnr?module='+encodeURIComponent(form.module)+'&plant_code='+form.plant_code)
  }
  getTest(form:any)
  {
    return this.http.get(this.url+'/training/getTest?username='+form.username+'&module='+encodeURIComponent(form.module))
  }
  Qualified(form:any)
  {
    return this.http.get(this.url+'/training/Qualified?username='+form.username+'&module='+encodeURIComponent(form.module))
  }
  pretest(formvalue:any)
  {
    return this.http.post(this.url+'/training/pretest',formvalue)
  }
  posttest(formvalue:any)
  {
    return this.http.post(this.url+'/training/posttest',formvalue)
  }
  questionbank(formvalue:any)
  {
    return this.http.post(this.url+'/training/questionbank',formvalue)
  }
  questionBankDelete(formvalue:any)
  {
    return this.http.post(this.url+'/training/questionBankDelete',formvalue)
  }
  getTrainee()
  {
    return this.http.get(this.url+'/training/getTrainee?plantcode='+sessionStorage.getItem('plantcode'))
  }
  get_test_status(form:any)
  {
    return this.http.get(this.url+'/training/get_test_status?idno='+form.idno+'&module_name='+encodeURIComponent(form.module_name))
  }
  getOfflineModules()
  {
    return this.http.get(this.url+'/training/getOfflineModule?plantcode='+sessionStorage.getItem('plantcode') )
  }

  offlineUpload(formvalue:any)
  {
    return this.http.post(this.url+'/training/offlineUpload', formvalue)
  }
  testSummary(form:any)
  {
    return this.http.get(this.url+'/training/testSummary?start='+form.start+'&end='+form.end+'&plantcode='+form.plantcode)
  }
  traineeScorecard(formvalue:any)
  {
    return this.http.get(this.url+'/training/traineeScorecard?trainee_idno='+formvalue.trainee_idno)
  }
  traineeAnswers(form:any)
  {
    return this.http.get(this.url+'/training/traineeAnswers?idno='+form.idno+'&module='+form.module)
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////


  depttransfer(form:any)
  {
    return this.http.get(this.url+'/hrOperation/depttransfer?plantcode='+form.plantcode)
  }
  onboard(form:any)
  {
    return this.http.get(this.url+'/hrOperation/onboard?plantcode='+form.plantcode+'&select='+form.select)
  }
  relieve(form:any)
  {
    return this.http.put(this.url+'/hrOperation/relieve', form)
  }
  dept_line(form:any)
  {
    return this.http.get(this.url+`/hrOperation/dept-line?line_code=${form.line_code}&dept_slno=${form.dept_slno}&apln_slno=${form.apln_slno}`)
  }
  dept_line_report(form:any)
  {
    return this.http.get(this.url+`/hrOperation/dept-line-report?plantcode=${form.plantcode}`)
  }
  transfer(form:any)
  {
    return this.http.put(this.url+'/hrOperation/transfer', form)
  }
  getonboard(form:any)
  {
    return this.http.get(this.url+`/hrOperation/getonboard?apln_slno=${form.apln_slno}&readonly=${form.readonly}`)
  }
  onboard_form(form:any)
  {
    return this.http.post(this.url+'/hrOperation/onboard_form', form)
  }
  getfiledrop(form:any)
  {
    return this.http.post(this.url+'/hrOperation/getfiledrop', form)
  }

  ////////////////////////////////////////////////////////////////////////////////////

  evaluationdays(status:any)
  {
    return this.http.post(this.url+'/skilldev/evaluationdays', status)
  }
  evaluationDueSupervisor(form:any)
  {
    return this.http.get(this.url+'/skilldev/evaluationDueSupervisor?plantcode='+form.plant_code+'&dept_slno='+form.dept_slno)
  }
  eval_pending_approval(status:any)
  {
    return this.http.get(this.url+'/skilldev/eval_pending_approval?status='+status.status+'&plantcode='+status.plantcode)
  }
  get_eval_form(form:any)
  {
    return this.http.get(this.url+`/skilldev/get_eval_form?apln_slno=${form.apln_slno}`)
  }
  eval_form(form:any)
  {
    return this.http.post(this.url+'/skilldev/eval_form', form)
  }
  eval_form_sup(form:any)
  {
    return this.http.put(this.url+'/skilldev/eval_form_sup', form)
  }
  get_eval_sup(form:any)
  {
    return this.http.get(this.url+`/skilldev/get_eval_sup?apln_slno=${form.apln_slno}`)
  }

  //////////////////////////////////////////////////////////////////////////////////

  trainee_report(form:any)
  {
    return this.http.post(this.url+`/report/trainee-report`, form)
  }
  test_summary(form:any)
  {
    return this.http.post(this.url+`/report/test-summary-report`,form)
  }
  eval_due(form:any)
  {
    return this.http.post(this.url+`/report/evaluation-due-report`, form)
  }

  //////////////////////////////////////////////////////////////////////////

  people_planning(form:any)
  {
    return this.http.get(this.url+`/peopleplanning/people_planning?plantcode=${form.plantcode}&year=${form.year}&month=${form.month}`)
  }
  people_planning_save(form:any)
  {
    return this.http.post(this.url+'/peopleplanning/people_planning_save', form)
  }
  people_planning_update(form:any)
  {
    return this.http.put(this.url+'/peopleplanning/people_planning_update', form)
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

  //////////////////////////////////////////////////////////////////////////////////

  plantupload(form:any)
  {
    return this.http.post(this.url+'/plantupload', form) 
  }
  offline_test(form:any)
  {
    return this.http.post(this.url+'/offline_test_upload', form) 
  }
  questionbankupload(formvalue:any)
  {
    return this.http.post(this.url+'/training/questionbankupload',formvalue)
  }
  skill_dev(form:any)
  {
    return this.http.post(this.url+'/skill_dev_upload', form) 
  }
  filedrop(form:any)
  {
    return this.http.post(this.url+'/filedrop', form) 
  }

  //////////////////////////////////////////////////////////////////////////////////

  submitted_mail(form:any)
  {
    return this.http.post(this.url+'/hrOperation/submitted_mail', form) 
  }
  approved_mail(form:any)
  {
    return this.http.post(this.url+'/hrOperation/approved_mail', form) 
  }
  evaluation_mail(form:any)
  {
    return this.http.post(this.url+'/hrOperation/evaluation_mail', form) 
  }
}