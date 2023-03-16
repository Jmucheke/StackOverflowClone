import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-error-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-error-popup.component.html',
  styleUrls: ['./http-error-popup.component.css']
})
export class HttpErrorPopupComponent {
  @Input() code?: number;
  @Input() errorMessage?: string;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

}
