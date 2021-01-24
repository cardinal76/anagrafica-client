import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Registry} from '../../../model/Registry';
import {DataAccessService} from '../../../service/DataAccessService';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngx-exercises-inputs',
  styleUrls: ['./exercises-inputs.component.scss'],
  templateUrl: './exercises-inputs.component.html',
  providers: [DataAccessService],
})
export class ExercisesInputsComponent implements OnInit, OnDestroy {
  registry: Registry;
  private subscriptions: Subscription[] = [];
  constructor(private dataAccessService: DataAccessService, private router: Router) {
  }

  ngOnInit(): void {
    this.registry = new Registry();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  submit() {
    this.subscriptions.push(
      this.dataAccessService.postGeneric(this.registry, 'insert')
        .subscribe(
          () => this.router.navigate(['/list']),
        ),
    );
  }
}
