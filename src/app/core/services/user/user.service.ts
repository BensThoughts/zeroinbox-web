import {Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasicProfile, EmailProfile } from '../../state/user/user.model';

import { API_URL } from '../apiurl';

export interface BasicProfileResponse {
    status: string;
    status_message: string;
    data: {
      basic_profile: BasicProfile;
    }
  }
  
  export interface EmailProfileResponse {
    status: string;
    status_message: string;
    data: {
      email_profile: EmailProfile;
    }
  }

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }
    
  /**
   * [getBasicProfile description]
   * @return [description]
   */
  public getBasicProfile() {
    return this.httpClient.get<BasicProfileResponse>(API_URL + '/profile', {
      withCredentials: true
    });
  }
  
  /**
   * [getEmailProfile description]
   * @return [description]
   */
  public getEmailProfile() {
    return this.httpClient.get<EmailProfileResponse>(API_URL + '/email', {
      withCredentials: true
    });
  }
  
}