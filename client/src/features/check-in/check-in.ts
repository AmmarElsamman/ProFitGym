import { afterNextRender, Component, ElementRef, inject, OnDestroy, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { finalize } from 'rxjs';
import QrScanner from 'qr-scanner';
import { AccessService } from '../../core/services/access-service';
import { AccessResult } from '../../types/access';

@Component({
  selector: 'app-check-in',
  imports: [FormsModule, DatePipe,],
  templateUrl: './check-in.html',
})
export class CheckIn implements OnDestroy {
  private accessService = inject(AccessService);
  private video = viewChild<ElementRef<HTMLVideoElement>>('video');
  private scanInput = viewChild<ElementRef<HTMLInputElement>>('scanInput');
  private scanner?: QrScanner;
  private resetTimer?: ReturnType<typeof setTimeout>;
  private lastCode = '';
  private lastCodeAt = 0;

  protected result = signal<AccessResult | null>(null);
  protected busy = signal(false);
  protected cameraOn = signal(false);
  protected code = '';

  constructor() {
    afterNextRender(() => this.focusInput());
  }

  protected submitTyped() {
    const value = this.code;
    this.code = '';
    this.handleScan(value);
  }

  protected async toggleCamera() {
    if (this.cameraOn()) {
      this.stopCamera();
      return;
    }
    const video = this.video()?.nativeElement;
    if (!video) return;

    this.scanner = new QrScanner(video, (r: { data: string; }) => this.handleScan(r.data), {
      returnDetailedScanResult: true,
      preferredCamera: 'environment',
      highlightScanRegion: true,
    });
    try {
      await this.scanner.start();
      this.cameraOn.set(true);
    } catch {
      this.show({ allowed: false, message: 'Camera not available. Check permission and use HTTPS or localhost.' });
      this.stopCamera();
    }
  }

  private stopCamera() {
    this.scanner?.destroy();
    this.scanner = undefined;
    this.cameraOn.set(false);
  }

  private handleScan(raw: string) {
    const code = raw.trim();
    if (!code || this.busy()) return;

    // The camera reads the same QR many times per second, so ignore repeats for 3 seconds
    const now = Date.now();
    if (code === this.lastCode && now - this.lastCodeAt < 3000) return;
    this.lastCode = code;
    this.lastCodeAt = now;

    this.busy.set(true);
    this.accessService
      .validate(code)
      .pipe(finalize(() => { this.busy.set(false); this.focusInput(); }))
      .subscribe({
        next: r =>
          this.show(r),
        error: () =>
          this.show({ allowed: false, message: 'Cannot reach the server.' }),
      });
  }

  private show(r: AccessResult) {
    this.result.set(r);
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.result.set(null), 4000);
  }

  private focusInput() {
    this.scanInput()?.nativeElement.focus();
  }

  ngOnDestroy() {
    clearTimeout(this.resetTimer);
    this.stopCamera();
  }
}