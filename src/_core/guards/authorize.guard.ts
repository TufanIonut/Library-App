import { CanActivateFn } from '@angular/router';

export const authorizeGuard: CanActivateFn = (route, state) => {
  var role = localStorage.getItem('role');


  if (role !== null && parseInt(role) === 0) {
    return true;
  }
  else {
    return false;
  }

};

export const authorizeUserGuard: CanActivateFn = (route, state) => {
  var role = localStorage.getItem('role');
  if (role !== null && parseInt(role) === 1 || role !== null && parseInt(role) === 0) {
    return true;
  }
  return false;
};
