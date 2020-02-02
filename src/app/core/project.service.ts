import { Injectable } from '@angular/core';
import { CoreModule } from './core.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Project } from '../models/project';
import { Constants } from '../constants';
import { UserProfile } from '../models/user-profile';
import { Milestone } from '../models/Milestone';
import { MilestoneStatus } from '../models/milestone-status';
import { UserPermission } from '../models/user-permission';
import { AuthService } from './auth.service';

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  // getProjects(): Observable<Project[]> {
  //   return this.http.get<Project[]>(Constants.apiRoot + 'Projects');
  // }

  getProjects(): Observable<Project[]> {
    return from(this.authService.getAccessToken().then(token => {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Project[]>(Constants.apiRoot + 'Projects', { headers: headers }).toPromise();
    }));
  }

  getProject(projectId: number): Observable<Project> {
    return this.http.get<Project>(Constants.apiRoot + 'Projects/' + projectId);
  }

  getProjectUsers(projectId: number): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(Constants.apiRoot + 'Projects/' + projectId + '/Users');
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(Constants.apiRoot + 'Projects', project);
  }

  deleteProject(project: Project): Observable<object> {
    return this.http.delete(Constants.apiRoot + 'Projects/' + project.id);
  }
  addUserPermission(userPermission: UserPermission) {
    return this.http.post(Constants.apiRoot + 'UserPermissions', userPermission);
  }

  removeUserPermission(userId: string, projectId: number) {
    return this.http.delete(`${Constants.apiRoot}UserPermissions/?userId=${userId}&projectId=${projectId}`);
  }

  updateUserPermission(userPermission) {
    return this.http.put(`${Constants.apiRoot}UserPermissions`, userPermission);
  }

  getMilestones(projectId: number): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(Constants.apiRoot + 'Milestone');
  }

  getMilestoneStatuses() {
    return this.http.get<MilestoneStatus[]>(`${Constants.apiRoot}Projects/MilestoneStatuses`);
  }

  addMilestone(milestone: Milestone) {
    return this.http.post(`${Constants.apiRoot}Projects/Milestones`, milestone);
  }

  deleteMilestone(id: number) {
    return this.http.delete(`${Constants.apiRoot}Projects/Milestones/${id}`);
  }

  updateMilestone(milestone: Milestone) {
    return this.http.put(`${Constants.apiRoot}Projects/Milestones/${milestone.id}`, milestone);
  }
}
