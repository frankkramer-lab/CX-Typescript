import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ErrorsService } from 'src/app/services/errors.service';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss'],
})
export class ErrorListComponent implements OnInit {
  networkIdentifier: any;
  objectKeys = Object.keys;
  errors: any;
  @Output()
  errorLength = new EventEmitter();

  constructor(private errorService: ErrorsService) {}

  ngOnInit() {
    this.errorService.networkErrors$.subscribe((errors: any) => {
      this.errorLength.emit(errors?.length);
      const groupedErrors = this.groupBy(errors, 'aspectName', {
        omitKey: true,
      });
      this.errors = groupedErrors;
    });
  }

  sendErrorLocation(location: any) {
    this.errorService.setErrorLocation$(location);
  }

  private groupBy(data: any[], key: string, { omitKey = true }) {
    return data.reduce(
      (hash, { [key]: value, ...rest }) => ({
        ...hash,
        [value]: (hash[value] || []).concat(
          omitKey ? { ...rest } : { [key]: value, ...rest }
        ),
      }),
      {}
    );
  }
}
