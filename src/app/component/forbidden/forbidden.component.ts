// angular
import {Component, OnInit} from "@angular/core";
// component
import {AbstractComponent} from "../abstract-component";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";

@Component({
	selector: "app-forbidden",
	templateUrl: "./forbidden.component.html",
	styleUrls: ["./forbidden.component.css"]
})
export class ForbiddenComponent extends AbstractComponent implements OnInit {

	public constructor(confirmationService: ConfirmationService, messageService: MessageService, private router: Router) {
		super(confirmationService, messageService);
	}

	public ngOnInit(): void {}
}