import {
  Directive,
  ViewContainerRef,
  ElementRef,
  inject,
  HostListener,
  ComponentRef,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { InputOptionsComponent } from '../components/input-options/input-options.component';
import { Subject, Subscription, debounce, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor } from '@angular/forms';
const options = [
  'happy',
  'sad',
  'excited',
  'anxious',
  'content',
  'frustrated',
  'joyful',
  'bored',
  'hopeful',
  'pensive',
  'ecstatic',
  'melancholy',
  'energetic',
  'weary',
  'amused',
  'angry',
  'calm',
  'confused',
  'elated',
  'disappointed',
  'grateful',
  'gloomy',
  'jubilant',
  'nervous',
  'serene',
  'fascinated',
  'discontent',
  'satisfied',
  'gleeful',
  'mournful',
  'peppy',
  'irate',
  'relaxed',
  'baffled',
  'thrilled',
  'regretful',
  'thankful',
  'dismal',
  'radiant',
  'impatient',
  'tranquil',
  'intrigued',
  'restless',
  'blissful',
  'blue',
  'zestful',
  'livid',
  'composed',
  'bewildered',
  'exhilarated',
  'disheartened',
  'appreciative',
  'downcast',
  'buoyant',
  'tense',
  'mellow',
  'jittery',
  'peaceful',
  'curious',
  'unhappy',
  'overjoyed',
  'displeased',
  'gratified',
  'forlorn',
  'eclectic',
  'patient',
  'dazed',
  'animated',
  'heartbroken',
  'upbeat',
  'defeated',
  'thankful',
  'crestfallen',
  'radiant',
  'bittersweet',
  'hopeless',
  'playful',
  'pained',
  'lively',
  'bemused',
  'enthusiastic',
  'devastated',
  'uplifted',
  'resentful',
  'apprehensive',
  'complacent',
  'rejuvenated',
  'dejected',
  'inspired',
  'guilty',
  'determined',
  'humbled',
  'disgruntled',
  'whimsical',
  'sorrowful',
];

@Directive({
  selector: '[appOptionsDirective]',
  standalone: true,
  host: {
    '(focus)': 'inputFocused($event)',
    '(blur)': 'inputBlured($event)',
    '(input)': 'inputInput($event)',
  },
})
export class OptionsDirectiveDirective
  implements OnDestroy, ControlValueAccessor
{
  vcr = inject(ViewContainerRef);
  elementRef = inject(ElementRef);
  inputOptionsRef?: ComponentRef<InputOptionsComponent>;
  selectedElement: string | null = null;
  inputValue$$ = new Subject<string>();
  private optionsSubscription: Subscription | null = null;
  destroy$$ = new Subject();
  onChange(val: any) {}
  onTouched() {}

  constructor() {
    this.inputValue$$
      .pipe(takeUntilDestroyed(), debounceTime(200))
      .subscribe((value) => this.populate(value));
  }

  writeValue(obj: any): void {
    obj.label && this.setInputNativeElementValue(obj.label);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {}

  ngOnDestroy(): void {
    this.destroy$$.next(null);
  }

  @HostBinding('style.position')
  position = 'relative';

  @HostListener('document:click', ['$event'])
  clicked(event: Event) {
    if (this.elementRef.nativeElement !== event.target) {
      this.inputOptionsRef?.destroy();
      this.optionsSubscription && this.optionsSubscription.unsubscribe();
      // this.inputOptionsRef?.instance?.select.unsubscribe();
    }
    if (!this.selectedElement) {
      this.setInputNativeElementValue('');
    }
  }

  inputFocused(event: Event) {
    this.createOptions();
  }

  inputBlured(event: Event) {
    this.onTouched();
  }

  inputInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.inputValue$$.next(value);
  }

  createOptions() {
    // this.inputOptionsRef?.destroy();
    this.vcr.clear();
    this.inputOptionsRef = this.vcr.createComponent(InputOptionsComponent);
    this.optionsSubscription = this.inputOptionsRef.instance.select.subscribe(
      (value) => {
        console.log('VALUe',value)
        this.selectedElement = value.label;
        this.writeValue(value);
      }
    );
  }
  destroyOptions() {
    this.inputOptionsRef?.destroy();
    
  }

  setInputNativeElementValue(value: string) {
    this.elementRef?.nativeElement?.value &&
      (this.elementRef.nativeElement.value = value);
  }

  populate(value: string = '') {
    this.inputOptionsRef?.setInput(
      'options',
      options
        .filter((o) => o.includes(value))
        .map((o) => ({ value: o, label: o }))
        .slice(0, 5)
    );
  }
}
