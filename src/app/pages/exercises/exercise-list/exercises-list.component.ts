import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Registry} from '../../../model/Registry';
import {DataAccessService} from '../../../service/DataAccessService';
import {Subscription} from 'rxjs';

@Component({
  selector: 'ngx-exercises-inputs',
  styleUrls: ['./exercises-list.component.scss'],
  templateUrl: './exercises-list.component.html',
  providers: [DataAccessService],
})
export class ExercisesListComponent implements OnInit, OnDestroy {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Nome',
        type: 'string',
      },
      surname: {
        title: 'Cognome',
        type: 'string',
      },
    },
  };
  private subscriptions: Subscription[] =  [];
  public result: Registry[] =  [];

  constructor(private dataAccessService: DataAccessService) {
    this.subscriptions.push(
      this.dataAccessService.getGeneric<Registry>('findAll')
        .subscribe((response: any) => {
          this.result = response;
        }, (error: any) => {
          throw error;
        }),
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
