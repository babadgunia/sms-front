export class Utils {

	private constructor() {}

	// handles application errors
	public static handleError(error: any): void {
		console.error(error);
	}

	public static decodeBase64(encoded: string): string {
		return window.atob(decodeURIComponent(encoded));
	}

	public static delay(millis: number): Promise<void> {
		return new Promise<void>(resolve => setTimeout(resolve, millis));
	}

	public static encodeBase64(plain: string): string {
		return window.btoa(plain);
	}

	public static getStringValue(object: any): string {
		if (!Utils.isNullOrUndefined(object)) {
			let objectType: string = typeof object;
			switch (objectType) {
				case "string": {
					return object;
				}
				case "number": {
					return object.toString();
				}
				case "object": {
					if (object instanceof Date) {
						return object.toLocaleString();
					}

					return object.toString();
				}
			}
		}

		return ""
	}

	public static deleteObjectFromList(list: any[], id: any): void {
		for (let i: number = 0; i < list.length; i++) {
			if (list[i].id === id) {
				list.splice(i, 1);

				return;
			}
		}
	}

	public static isBlank(string: string): boolean {
		return Utils.isNullOrUndefined(string) || string.trim().length === 0;
	}

	public static isEmpty<T>(list: T[]): boolean {
		return Utils.isNullOrUndefined(list) || list.length === 0;
	}

	public static isEmptyObject(object: any): boolean {
		return (Utils.isNullOrUndefined(object) || (Object.keys(object).length === 0));
	}

	public static isNull(object: any): boolean {
		return object === null;
	}

	public static isNullOrUndefined(object: any): boolean {
		return Utils.isNull(object) || Utils.isUndefined(object);
	}

	public static isUndefined(object: any): boolean {
		return object === undefined;
	}

	// get map example
	// public static getMap(): Observable<Map<string, Map<string, string>>> {
	// 	class JsonResponseResult {
	//
	// 		parameters: Map<string, Map<string, string>>;
	//
	// 		constructor(json: any) {
	// 			this.parameters = new Map<string, Map<string, string>>();
	// 			Object.keys(json).forEach(key => {
	// 				let params: Map<string, string> = new Map<string, string>();
	// 				Object.keys(json[key]).forEach(paramKey => {
	// 					params.set(paramKey, json[key][paramKey]);
	// 				});
	//
	// 				this.parameters.set(key, params);
	// 			});
	// 		}
	// 	}
	//
	// 	const url = `${this.apiUrl}/get`;
	//
	// 	return this.http.get(url, {headers: HeroService.getHeaders()}).map(response => new JsonResponseResult(response.json()).parameters);
	// }
}