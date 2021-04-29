import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DesafioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [DesafioSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [DesafioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DesafioSharedModule {
  static forRoot() {
    return {
      ngModule: DesafioSharedModule
    };
  }
}
