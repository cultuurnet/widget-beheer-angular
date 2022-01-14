import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Provides a pipe to mark html as safe.
 */
@Pipe({ name: 'safeHTML' })
export class SafeHTMLPipe implements PipeTransform {
  /**
   * SafeHtmlPipe constructor
   * @param sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Transform the html
   * @param html
   * @param exponent
   * @return {SafeHtml}
   */
  transform(html: string, exponent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
