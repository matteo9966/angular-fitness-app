import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthenticationService } from './core/services/Authentication.service';
import { ConfigurationService } from './core/services/configuration.service';

// import { UserService } from './core/services/User.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthenticationService],
})
export class AppComponent {
  constructor(private configService: ConfigurationService) {
    this.configService.loadAllConfigurations(); //TODO: add a loading spinner till all the configs complete
  }
}
