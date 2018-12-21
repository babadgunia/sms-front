// angular > core
import {Component} from '@angular/core';
// angular > router
import {Router} from '@angular/router';
// component
import {AbstractComponent} from '../abstract-component';
// service
// util
import {AuthUtils} from '../../util/auth-utils';
import {Utils} from '../../util/utils';
// primeng > service
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {MessageService} from 'primeng/components/common/messageservice';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent extends AbstractComponent {

	public constructor(confirmationService: ConfirmationService, messageService: MessageService, private router: Router) {
		super(confirmationService, messageService);
	}

	public isLoggedIn(): boolean {
		return AuthUtils.isLoggedIn();
	}

	public logout(): void {
		AuthUtils.logout();

		this.router.navigate(['/login']).then((result: boolean) => {}, (error: any) => {
				Utils.handleError(error);
			}
		);
	}
}