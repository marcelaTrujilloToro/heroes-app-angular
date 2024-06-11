import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero';

@Pipe({
  name: 'heroImage',
})
export class HeroImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    if (!hero.id && !hero.alt_imag) {
      return 'no-image.png';
    }

    if (hero.alt_imag) return hero.alt_imag;

    return `heroes/${hero.id}.jpg`;
  }
}
