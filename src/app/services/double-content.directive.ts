import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";


@Directive({
  selector: '[doubleContent]'
})

export class DoubleContentDirective implements AfterViewInit{

  @Input() doubleContent: boolean = false;

  private elementDirective: ElementRef;
  public isContentWasDuplication: boolean = false;

  constructor(private  tml: TemplateRef<any>, private  vc: ViewContainerRef) {
   this.vc.createEmbeddedView(tml);
  }

  ngAfterViewInit(): void {
    if (this.doubleContent) {
      if (!this.isContentWasDuplication) {
        this.vc.insert(this.vc.createEmbeddedView(this.tml));
        this.isContentWasDuplication = true;
      }
    }
  }


}
