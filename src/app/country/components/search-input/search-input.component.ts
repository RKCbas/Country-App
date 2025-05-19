import { ChangeDetectionStrategy, Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent { 

  placeholder = input<string>("Buscar");
  initialValue = input<string>('');
  search = output<string>();
  debounceTime = input<number>(300);

  inputValue = linkedSignal<string>(()=> this.initialValue() ?? '')

  debounceEffect = effect((onCleanup)=>{
    const value = this.inputValue();

    const timeout = setTimeout(() =>{
      this.search.emit(value)
    }, this.debounceTime())

    onCleanup(()=>{
      clearTimeout(timeout)
    }) 

  })

}
