// angular > core
import {OnInit} from '@angular/core';
// model > filter
import {AbstractFilter} from '../model/filter/abstract-filter';
// model > enum
import {LanguageType} from '../model/type/language-type.enum';
import {StatusType} from '../model/type/status-type.enum';
// util
import {AuthUtils} from '../util/auth-utils';
// primeng > model
import {LazyLoadEvent} from 'primeng/components/common/lazyloadevent';
import {SelectItem} from 'primeng/components/common/selectitem';
// primeng > service
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {MessageService} from 'primeng/components/common/messageservice';
// rxjs
import {isNumeric} from 'rxjs/internal-compatibility';
import {AppUtils} from '../util/app-utils';

export abstract class AbstractComponent implements OnInit {

	// search filter constants

	public readonly searchFilterClearButtonIcon: string = 'fa-minus';

	public readonly searchFilterSearchButtonIcon: string = 'fa-search';

	// search table general constants

	public readonly searchTableRows: number = 15;

	public readonly searchTablePageLinks: number = 3;

	// search table action column constants

	public readonly searchTableActionColumnClass: string = 'c-search-table-action-column';

	public readonly searchTableActionColumnButtonClass: string = 'c-full-width';

	public readonly searchTableActionColumnAddButtonIcon: string = 'fa-plus';

	public readonly searchTableActionColumnViewEditButtonWrapperClass: string = 'c-search-table-action-column-view-edit-button-wrapper';

	public readonly searchTableActionColumnViewButtonIcon: string = 'fa-envelope-open';

	public readonly searchTableActionColumnEditButtonIcon: string = 'fa-pencil';

	public readonly searchTableActionColumnDeleteButtonWrapperClass: string = 'c-search-table-action-column-delete-button-wrapper';

	public readonly searchTableActionColumnDeleteButtonIcon: string = 'fa-remove';

	// form dialog constants

	public readonly formDialogClass: string = 'c-form-dialog';

	public readonly formDialogContentStyle: object = {'overflow': 'visible'};

	public readonly formComponentClass: string = 'c-full-width';

	public readonly formSaveButtonIcon: string = 'fa-check';

	public readonly formCancelButtonIcon: string = 'fa-close';

	// confirm dialog constants

	public readonly confirmDialogIcon: string = 'fa-question-circle';

	// enum lists

	public readonly languageTypes: string[] = Object.keys(LanguageType).filter((key: string) => !isNumeric(key));

	public readonly statusTypes: string[] = Object.keys(StatusType).filter((key: string) => !isNumeric(key));

	// lists for dropdowns

	public readonly languages: SelectItem[] = [];

	public readonly statuses: SelectItem[] = [];

	public readonly texts: SelectItem[] = [];

	// table fields

	public tableTotalRecords: number = 0;

	public loading: boolean = true;

	// dialog fields

	public showDialog: boolean = false;

	public isAdd: boolean = false;

	public isEdit: boolean = false;

	public isView: boolean = false;

	public constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

	public ngOnInit(): void {
		// init languages for dropdown
		this.languages.push({label: null, value: null});

		this.languageTypes.forEach((language: string) => {
			this.languages.push({label: this.getMessage('LANGUAGE_TYPE_' + language), value: language});
		});

		// init statuses for dropdown
		this.statuses.push({label: null, value: null});

		this.statusTypes.forEach((status: string) => {
			this.statuses.push({label: this.getMessage('STATUS_TYPE_' + status), value: status});
		});

		// init texts for dropdown
		// this.texts.push({label: null, value: null});
		//
		// this.textService.getTextListForSelection().subscribe((texts: Text[]) => {
		// 	texts.forEach((text: Text) => {
		// 		this.texts.push({label: text.key, value: text});
		// 	});
		// }, (error: any) => this.handleError(error));
	}

	// check user permission
	public hasPermission(permission: string): boolean {
		return AuthUtils.hasPermission(permission);
	}

	// get i18n message
	public getMessage(key: string, ...params: any[]): string {
		return AppUtils.getMessage(key, params);
	}

	// adds error message to the growl component
	public showErrorMessage(message: string, ...params: any[]): void {
		this.messageService.add({severity: 'error', detail: this.getMessage(message, params)});
	}

	// handles component errors
	public handleError(error: any): void {
		console.error(error);
	}

	// initializes abstract filter paging fields
	public initPagingFilter(filter: AbstractFilter): void {
		filter.offset = 0;
		filter.numRows = this.searchTableRows;
	}

	// initializes abstract filter paging fields through a lazy load event
	public initLazyPagingFilter(filter: AbstractFilter, event: LazyLoadEvent): void {
		filter.offset = event.first;
		filter.numRows = event.rows;
	}

	// initializes confirm dialog
	public confirmAction(action: () => any): void {
		this.confirmationService.confirm({
			header: this.getMessage('CONFIRMATION'),
			message: this.getMessage('CONFIRM_ACTION_MESSAGE'),
			icon: this.confirmDialogIcon,
			accept: () => {
				action();
			}
		});
	}

	// updates form dialog states and shows it
	public updateDialogStates(isAdd: boolean, isEdit: boolean, isView: boolean): void {
		this.isAdd = isAdd;
		this.isEdit = isEdit;
		this.isView = isView;

		this.showDialog = true;
	}

	// hides form dialog
	public hideDialog(): void {
		this.showDialog = false;
	}
}