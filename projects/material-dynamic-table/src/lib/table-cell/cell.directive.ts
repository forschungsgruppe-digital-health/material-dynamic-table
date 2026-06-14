import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[mdtCellHost]',
    standalone: false
})
export class CellDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}
}