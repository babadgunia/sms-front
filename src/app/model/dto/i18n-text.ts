// model > entity
import {AbstractDto} from './abstract-dto';

export class I18nText extends AbstractDto {

	id: number;

	language: string;

	value: string;
}