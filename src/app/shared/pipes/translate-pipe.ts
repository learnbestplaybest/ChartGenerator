import { Observable, map } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';

import { LocalizationService } from '../services/localization.service'; // Chỉnh lại đường dẫn nếu cần

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform {
  constructor(private service: LocalizationService) {}

  transform(key: string, defaultValue?: string): Observable<string> {
    return this.service.get(key).pipe(
      map((translatedValue) => {
        if (translatedValue === key && defaultValue) {
          return defaultValue;
        }
        return translatedValue;
      })
    );
  }
}
