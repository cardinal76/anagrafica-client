import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Registry} from '../../../model/Registry';
import {DataAccessService} from '../../../service/DataAccessService';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-exercises-inputs',
  styleUrls: ['./exercises-inputs.component.scss'],
  templateUrl: './exercises-inputs.component.html',
  providers: [DataAccessService],
})
export class ExercisesInputsComponent implements OnInit, OnDestroy {
  @Input() registryForm: FormGroup;
  registry: Registry;
  private subscriptions: Subscription[] = [];
  constructor(private dataAccessService: DataAccessService, private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registryForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
    this.registry = new Registry();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  submit() {
    this.registry.name = this.registryForm.get('name').value;
    this.registry.surname = this.registryForm.get('surname').value;
    this.subscriptions.push(
      this.dataAccessService.postGeneric(this.registry, 'insert')
        .subscribe(
          () => this.router.navigate(['/list']),
        ),
    );
  }
}
