// util
import {Utils} from './utils';
import {MESSAGES} from './static/messages';

export class AppUtils {

	public static readonly DEFAULT_LANGUAGE: string = 'EN';

	public static getHttpStatusMessage(status: number, ...params: any[]) {
		return AppUtils.getMessage('HTTP_STATUS_' + status, params);
	}

	public static getLanguage(): string {
		return AppUtils.DEFAULT_LANGUAGE;
	}

	public static getLocalization(): string {
		let result: string = MESSAGES.localization[AppUtils.getLanguage()];
		if (Utils.isEmptyObject(result)) {
			result = MESSAGES.localization[AppUtils.DEFAULT_LANGUAGE];
		}

		return result;
	}

	// detects the browser language and then returns i18n message value by key and replaces placeholders with params
	// default language is English = EN
	// the placeholder syntax is as follows: {0} {1} ... {n} where n is the number of params
	// example message with params: "this is a message {0} with {1} two parameters"
	public static getMessage(key: string, ...params: any[]): string {
		let value: string = MESSAGES.messages[key][AppUtils.getLanguage()];
		if (Utils.isBlank(value)) {
			value = MESSAGES.messages[key][AppUtils.DEFAULT_LANGUAGE];
		}

		for (let i: number = 0; i < params.length; i++) {
			value = value.replace('{' + i + '}', params[i]);
		}

		return value;
	}

	public static getStoredItem(paramName: string): string {
		return localStorage.getItem(paramName);
	}

	public static removeStoredItem(paramName: string): void {
		localStorage.removeItem(paramName);
	}

	public static storeItem(paramName: string, param: string): void {
		localStorage.setItem(paramName, param);
	}
}