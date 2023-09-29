import { ChangeDetectionStrategy, Component, Input,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
/**
 * @description this is a textinput that can be used only with reactive forms
 */
@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class TextInputComponent implements OnInit {
  
  passwordInput=false;
  @Input() control!: FormControl;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() hint!: string;
  @Input() errorMessage!: string;
  @Input() label!: string;
  @Input() type: 'text' | 'password' = 'text';
  
  
  get passwordVisibilityIcon() {
    return this.type==='password'?'visibility_off':'visibility';
  }
  
  ngOnInit(): void {
    this.passwordInput = this.type === 'password';
    
  }
}
