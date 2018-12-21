export enum TimeUnitType {

	SECOND,

	MINUTE,

	HOUR,

	DAY,

	WEEK
}

export interface DateRange {

	from: Date,

	to: Date
}

export class DateTimeUtils {

	public static readonly SECONDS_IN_MINUTE: number = 60;

	public static readonly MINUTES_IN_HOUR: number = 60;

	public static readonly HOURS_IN_DAY: number = 24;

	public static readonly MILLIS_IN_SECOND: number = 1000;

	public static readonly MILLIS_IN_MINUTE: number = DateTimeUtils.MILLIS_IN_SECOND * DateTimeUtils.SECONDS_IN_MINUTE;

	public static readonly MILLIS_IN_HOUR: number = DateTimeUtils.MILLIS_IN_MINUTE * DateTimeUtils.MINUTES_IN_HOUR;

	public static readonly MILLIS_IN_DAY: number = DateTimeUtils.MILLIS_IN_HOUR * DateTimeUtils.HOURS_IN_DAY;

	public static readonly DAYS_IN_WEEK: number = 7;

	public static addUnits(date: Date, amount: number, timeUnit: TimeUnitType): Date {
		let newDate = new Date(date);

		switch (timeUnit) {
			case TimeUnitType.WEEK: {
				newDate.setDate(newDate.getDate() + amount * DateTimeUtils.DAYS_IN_WEEK);

				break;
			}
			case TimeUnitType.DAY: {
				newDate.setDate(newDate.getDate() + amount);

				break;
			}
			case TimeUnitType.HOUR: {
				newDate.setHours(newDate.getHours() + amount);

				break;
			}
			case TimeUnitType.MINUTE: {
				newDate.setMinutes(newDate.getMinutes() + amount);

				break;
			}
			case TimeUnitType.SECOND: {
				newDate.setSeconds(newDate.getSeconds() + amount);

				break;
			}
		}

		return newDate;
	}
}