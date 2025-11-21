import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if (localStorage.getItem('token')) {
    const modifiedReq = req.clone({
      setHeaders: {
        token: localStorage.getItem('token')! ,
      },
    });
    return next(modifiedReq);
  }
  return next(req);
};
