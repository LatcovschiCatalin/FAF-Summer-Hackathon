import {Component, OnInit} from '@angular/core';
import {QueryParamsService} from "../../../services/query-params.service";
import {JobsService} from "../../../../server/jobs/jobs.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  columns = [
    {
      key: 'id',
      type: 'text',
      name: 'Id',
    },
    {
      key: 'title',
      name: 'Title',
      type: 'text',
    },
    {
      key: 'duration',
      type: 'text',
      name: 'Duration',
    },
    {
      key: 'image',
      type: 'text',
      name: 'image',
    },
    {
      key: 'students',
      type: 'number',
      name: 'Amount students',
    },
    {
      key: 'deadline',
      type: 'text',
      name: 'Deadline',
    },
    {
      key: 'payment',
      type: 'text',
      name: 'Payment',
    },
    {
      key: 'location',
      type: 'text',
      name: 'Location',
    },
    {
      key: 'description',
      type: 'text',
      name: 'Description',
    },
  ];
  actions: object[] = []

  constructor(
    public qpService: QueryParamsService,
    public service: JobsService
  ) {
    this.actions = [
      {
        key: 'edit',
        name: 'Edit'
      },
      {
        key: 'view',
        name: 'View'
      },
      {
        key: 'delete',
        name: 'Delete'
      },

    ]
  }

  ngOnInit() {
    this.qpService.deleteParam('id');
  }

}
