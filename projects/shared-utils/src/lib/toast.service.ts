 import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';  

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title: string = 'Successfully') {
    this.toastr.success(message, title, { timeOut: 3000 });
  }

  error(message: string, title: string = 'Error') {
    this.toastr.error(message, title, { timeOut: 3000 });
  }

  warning(message: string, title: string = 'Warning') {
    this.toastr.warning(message, title, { timeOut: 3000 });
  }

  info(message: string, title: string = 'Info') {
    this.toastr.info(message, title, { timeOut: 3000 });
  }
}
