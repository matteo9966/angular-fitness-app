import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  skip,
  takeUntil,
  filter,
} from 'rxjs';

/**
 * @description autocomplete rxjs operator, when source emits it debounces time for time ms, and uses selector to fetch the data
 * @param time the debounce time in ms
 * @param selector a function that returns an observable that emits the list of values
 * @returns
 */
export const autocomplete = (
  time: number = 200,
  selector: (value: any) => Observable<any>
) => {
  return (source$: Observable<string>) => {
    return source$.pipe(
      debounceTime(time),
      distinctUntilChanged(),
      filter((val) => !!val),
      switchMap((value) => {
        return selector(value).pipe(takeUntil(source$.pipe(skip(1))));
      })
    );
  };
};
