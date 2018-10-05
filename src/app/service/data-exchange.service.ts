// angular
import {Injectable} from "@angular/core";
// rxjs
import {Observable} from "rxjs/internal/Observable";
import {Subject} from "rxjs/internal/Subject";

// service for exchanging data between unrelated components
@Injectable()
export class DataExchangeService {

	private notificationSource: Subject<string> = new Subject<string>();

	public notification: Observable<string> = this.notificationSource.asObservable();

	public changeNotification(notification: string): void {
		this.notificationSource.next(notification);
	}
}