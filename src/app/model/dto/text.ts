// model > entity
import {AbstractDto} from './abstract-dto';
import {I18nText} from './i18n-text';

export class Text extends AbstractDto {

	id: number;

	key: string;

	values: I18nText[] = [];
}