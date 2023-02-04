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

  line_dept_design(form:any)
  {
    return this.http.post(this.url+'/getall',form)
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
    return this.http.post(this.url+'/getModules', username)
  }
  getQuestions(formvalue:any)
  {
    return this.http.post(this.url+'/getQuestions',formvalue)
  }
  getQuestions_tnr(formvalue:any)
  {
    return this.http.post(this.url+'/getQuestions_tnr',formvalue)
  }
  getTest(formvalue:any)
  {
    return this.http.post(this.url+'/getTest',formvalue)
  }
  Qualified(formvalue:any)
  {
    return this.http.post(this.url+'/Qualified',formvalue)
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
  questionbankupload(formvalue:any)
  {
    return this.http.post(this.url+'/questionbankupload',formvalue)
  }
  getTrainee()
  {
    var plantcode = {'plantcode' : sessionStorage.getItem('plantcode')}
    return this.http.post(this.url+'/getTrainee', plantcode)
  }
  get_test_status(form:any)
  {
    return this.http.post(this.url+'/get_test_status', form)
  }
  getOfflineModules()
  {
      var plantcode = {'plantcode' : sessionStorage.getItem('plantcode')}
      return this.http.post(this.url+'/getOfflineModule', plantcode)
  }

  offlineUpload(formvalue:any)
  {
    return this.http.post(this.url+'/offlineUpload', formvalue)
  }
  addmodule(formvalue:any)
  {
    return this.http.post(this.url+'/addmodule', formvalue)
  }
  updatemodule(formvalue:any)
  {
    return this.http.post(this.url+'/updatemodule', formvalue)
  }
  deletemodule(formvalue:any)
  {
    return this.http.post(this.url+'/deletemodule', formvalue)
  }
  testSummary(formvalue:any)
  {
    return this.http.post(this.url+'/testSummary', formvalue)
  }
  traineeScorecard(formvalue:any)
  {
    return this.http.post(this.url+'/traineeScorecard', formvalue)
  }
  traineeAnswers(formvalue:any)
  {
    return this.http.post(this.url+'/traineeAnswers', formvalue)
  }

  plantcode(form:any)
  {
    return this.http.post(this.url+'/plantcode', form)
  }

  evaluationdays(status:any)
  {
    return this.http.post(this.url+'/evaluationdays', status)
  }
  depttransfer(form:any)
  {
    return this.http.post(this.url+'/depttransfer', form)
  }
  onboard(form:any)
  {
    return this.http.post(this.url+'/onboard', form)
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
  filedrop(form:any)
  {
    return this.http.post(this.url+'/filedrop', form)
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

  trainee_report()
  {
    return this.http.get(this.url+'/trainee-report')
  }
  test_summary()
  {
    return this.http.get(this.url+'/test-summary')
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
  

}