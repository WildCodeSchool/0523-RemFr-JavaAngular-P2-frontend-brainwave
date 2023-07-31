import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
    nameFormGroup = this._formBuilder.group({
        nameCtrl: ['', Validators.required],
    });
    emailFormGroup = this._formBuilder.group({
        emailCtrl: ['', [Validators.compose([Validators.required, Validators.email])]],
    });
    textFormGroup = this._formBuilder.group({
        textCtrl: ['', Validators.required],
    });

    apiUrl = 'http://localhost:8080';

    constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}

    formMessage() {
        if (this.textFormGroup.valid) {
            this.http
                .post(
                    this.apiUrl + '/contact',
                    {
                        name: this.nameFormGroup.value.nameCtrl,
                        address: this.emailFormGroup.value.emailCtrl,
                        content: this.textFormGroup.value.textCtrl,
                    },
                    { responseType: 'text' }
                )
                .subscribe((response) => alert(response));
        }
    }
}
