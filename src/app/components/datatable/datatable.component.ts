import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  ContentChild,
  TemplateRef,
  ViewChildren,
  QueryList
} from '@angular/core';
import { TableDatasource, dataMapper } from './table-datasource';
import { PageEvent, Sort, MatCheckbox } from '@angular/material';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';
import { DataQuery } from '../../interfaces/data-query.interface';

export interface TableDefinition {
  columnTitle: string;
  columnKey: string;
  hasCustomTemplate?: boolean;
}

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss']
})
export class DatatableComponent implements OnInit, OnDestroy {
  dataSource: TableDatasource<any[]>;

  @Input()
  dataSourceEndpoint: string;

  displayedColumns: string[];

  @Input()
  tblDefinition: TableDefinition[];

  @Input()
  dataMapper: dataMapper;

  @Output()
  rowClick = new EventEmitter();

  @ViewChild('searchInpt', { static: true })
  private searchInput: ElementRef;

  @ContentChild('dtCustomTemplate', { read: TemplateRef, static: true })
  dtCustomTemplate: TemplateRef<any>;

  showCheckbox: boolean;

  @Input()
  selectable: boolean;

  @ViewChildren('checkBoxs')
  checkBoxs: QueryList<MatCheckbox>;

  private searchSub: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.displayedColumns = this.tblDefinition.map(tblDef => {
      return tblDef.columnKey;
    });

    this.dataSource = new TableDatasource(
      this.http,
      this.dataSourceEndpoint,
      '',
      this.dataMapper
    );

    this.searchSub = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(
        debounceTime(500),
        tap((event: any) => {
          const query = event.target.value || '';
          console.info(this.dataSource);
          this.dataSource.setQueryParams({
            search: query.trim()
          });
        })
      )
      .subscribe();
  }

  selectRow(row: any) {
    if (!this.showCheckbox) {
      if ('_id' in row || 'id' in row) {
        const _row = this.dataSource.getRow(row._id || row.id);
        if ('__v' in _row) {
          delete _row.__v;
        }
        this.rowClick.emit(_row);
      } else {
        this.rowClick.emit(row);
      }
    }
  }

  onPageChange(event: PageEvent) {
    this.dataSource.setQueryParams({
      page: event.pageIndex * event.pageSize
    });
  }

  onSortChange(sort: Sort) {
    this.dataSource.setQueryParams({
      sortField: sort.active,
      sortDir: sort.direction.toUpperCase()
    });
  }

  reloadTable(dt?: DataQuery) {
    if (dt) {
      this.dataSource.setQueryParams({
        ...dt
      });
    } else {
      this.dataSource.resetParams();
    }
  }

  deepColParse(element: any, key: string) {
    const keyMap = key.split('.');
    let targetKey = element;
    for (let i = 0; i < keyMap.length; i++) {
      targetKey = keyMap[i] in targetKey ? targetKey[keyMap[i]] : '';
    }
    return targetKey;
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  toggleSelectors() {
    const cbKey = this.displayedColumns.findIndex(col => {
      return col === 'checkBoxCol';
    });

    if (cbKey > -1) {
      this.showCheckbox = false;
      this.displayedColumns.shift();
    } else {
      this.showCheckbox = true;
      this.displayedColumns.unshift('checkBoxCol');
    }
  }
}
