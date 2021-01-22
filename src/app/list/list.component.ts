import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataAccessService} from '../service/DataAccessService';
import {Subscription} from 'rxjs';
import {Validators} from '@angular/forms';
import {Registry} from '../model/Registry';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] =  [];
  public result: Registry[] =  [];

  constructor(private dataAccessService: DataAccessService) {
    this.subscriptions.push(
      this.dataAccessService.getGeneric<Registry>('findAll')
        .subscribe((response: any) => {
          this.result = response;
        }, (error: any) => {
          throw error;
        })
    );

  }

    ngOnInit(): void {
    }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
