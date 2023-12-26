import { ComponentFactoryResolver, Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { ModalComponent } from '../ui/modal/modal.component';
import { DOCUMENT } from '@angular/common';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalNotifier?: Subject<string>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
  ) { }

  open(content: TemplateRef<any>, options?: {size?: string, title?: string}) {
    const modalComponentFactory = this.resolver.resolveComponentFactory(ModalComponent);
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = modalComponentFactory.create(
      this.injector,
      [contentViewRef.rootNodes],
    );

    modalComponent.instance.size = options?.size;
    modalComponent.instance.title = options?.title;
    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal());

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);

    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  submitModal(): void {
    this.modalNotifier?.next('confirm');
    this.closeModal();
  }

  closeModal(): void {
    this.modalNotifier?.complete();
  }
}
