import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject } from 'rxjs';

import { UserModel } from '../model/user.model';
import { DataService } from '../shared/data.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    isEdit;
    loading: boolean = true;
    saving: boolean = false;

    projectName: string;
    userModel$: Observable<UserModel[]>;
    userModel: UserModel[];
    user: UserModel;
    uid: string;
    usernameExists: boolean = false;

    userForm: FormGroup;

    dtOptions: any = {};
    dtTrigger: Subject<any> = new Subject();

    constructor(private dataService: DataService,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.projectName = this.dataService.getProjectName();
        this.getList();
    }

    getList() {
        this.userModel$ = this.dataService.getUserAll();
        this.userModel$
            .subscribe((data: UserModel[]) => {
                this.userModel = data;
                this.loading = false;

                this.dtTrigger.next();
            });
    }

    initialForm() {
        this.userForm = new FormGroup({
            'username': new FormControl(null, Validators.required),
            'name': new FormControl(null, Validators.required),
            'age': new FormControl(0),
            'email': new FormControl(null, [Validators.required, Validators.email]),
            'phone_number': new FormControl(null),
            'skill_sets': new FormControl(null),
            'hobbies': new FormControl(null),
        });
    }

    validateUsername(event) {
        console.log('validateUsername');
        this.usernameExists = false;
        if (event.target.value != null && event.target.value != '') {
            this.dataService.getUserExists(event.target.value)
                .subscribe((data) => {
                    this.usernameExists = data;
                });
        }
    }

    onCreate(template: TemplateRef<any>) {
        this.isEdit = false;
        this.initialForm();
        this.openModal(template);
    }

    onEdit(index, user, template: TemplateRef<any>) {
        this.isEdit = true;
        this.uid = user.uid;
        this.initialForm();
        this.userForm.setValue({
            'username': user.username,
            'name': user.name,
            'age': user.age,
            'email': user.email,
            'phone_number': user.phone_number,
            'skill_sets': user.skill_sets,
            'hobbies': user.hobbies,
        });
        this.openModal(template);
    }

    onSubmit() {
        this.saving = true;
        if (!this.userForm.valid) { this.saving = false; return; }

        if (!this.isEdit) {                     // create new
            this.create(this.userForm.value);
        } else if (this.isEdit) {                   // Edit
            this.update(this.userForm.value);
        }
    }

    getUser(user): UserModel {
        var uModel: UserModel = new UserModel();
        uModel.name = user.name;
        uModel.username = user.username;
        uModel.age = user.age;
        uModel.email = user.email;
        uModel.phone_number = user.phone_number;
        uModel.skill_sets = user.skill_sets;
        uModel.hobbies = user.hobbies;
        return uModel;
    }

    create(user) {
        const result: UserModel = this.getUser(user);

        this.dataService.store(result)
            .subscribe((data: UserModel[]) => {
                this.userModel = data;
                this.onCloseModal();
            });
    }

    update(user) {
        const result: UserModel = this.getUser(user);

        this.dataService.update(result, this.uid)
            .subscribe((data: UserModel[]) => {
                this.userModel = data;
                this.onCloseModal();
            });
    }

    onDelete(index, user, template: TemplateRef<any>) {
        this.user = user;
        this.openModalSm(template);
    }

    delete() {
        this.saving = true;
        this.dataService.delete(this.user.uid)
            .subscribe((data: UserModel[]) => {
                this.userModel = data;
                this.onCloseModal();
            });
    }

    onYes() {
        this.delete();
    }

    onNo() {
        this.closeModal();
    }

    onCloseModal() {
        this.reRenderDt();
        this.saving = false;
        this.user = null;
        this.closeModal();
    }

    ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
    }

    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;

    reRenderDt(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
        });
    }

    openModal(template: TemplateRef<any>) {
        const dialogCOnfig = new MatDialogConfig();
        dialogCOnfig.disableClose = true;
        dialogCOnfig.width = 'calc(100% - 100px)';

        this.dialog.open(template, dialogCOnfig);
    }

    openModalSm(template: TemplateRef<any>) {
        const dialogCOnfig = new MatDialogConfig();
        dialogCOnfig.disableClose = true;
        dialogCOnfig.width = 'calc(100% - 60px)';
        dialogCOnfig.maxWidth = '400px';
        dialogCOnfig.minWidth = '300px';
        this.dialog.open(template, dialogCOnfig);
    }

    closeModal() {
        this.dialog.closeAll();
    }
}