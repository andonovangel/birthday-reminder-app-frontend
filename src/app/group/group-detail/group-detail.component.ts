import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IGroup } from '../group';
import { GroupService } from '../group.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnDestroy {
  public pageTitle: string = 'Group Details'
  public group?: IGroup
  public groups: IGroup[] = []
  private getGroupsSub?: Subscription
  public errorMessage: string = ''

  constructor(
    private groupService: GroupService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'))

    this.getGroupsSub = this.groupService.getGroups().subscribe({
      next: groups => {
        this.groups = groups
        this.group = groups.find(x => x.id === id)
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
    this.getGroupsSub?.unsubscribe()
  }

  onBack(): void {
    this.router.navigate(['/groups/list'])
  }
}
