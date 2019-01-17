import request from 'utils/request';
import { postOption, formDataOption } from 'common/common';
//
export function login(params){
  return request('/api/v1/user/login', postOption(params));
}
