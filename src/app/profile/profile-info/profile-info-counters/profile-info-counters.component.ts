import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from '../../../services/interfaces/user.model';
import { CrudService } from '../../../services/crud/crud.service';
import {StorageService} from "../../../services/storage/storage.service";

@Component({
  selector: 'app-profile-info-counters',
  templateUrl: './profile-info-counters.component.html',
  styleUrls: ['./profile-info-counters.component.scss'],
})
export class ProfileInfoCountersComponent implements OnInit, OnChanges {
  @Input() user: User;

  public publicationsCounter: number;

  public signedCounter: number;

  public subsCounter: number;

  constructor(private crudService: CrudService, private storageService: StorageService) {}

  ngOnInit(): void {
    this.publicationsCounter = Object.keys(this.user.user_posts).length;
    this.subsCounter = Object.keys(this.user.user_subs).length;
    this.signedCounter = Object.keys(this.user.user_signed).length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.storageService.tag$.subscribe();
    this.publicationsCounter = Object.keys(this.user.user_posts).length;
    this.subsCounter = Object.keys(this.user.user_subs).length;
    this.signedCounter = Object.keys(this.user.user_signed).length;
  }
}
