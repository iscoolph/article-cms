import { DataSource } from '@angular/cdk/table';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { DataQuery } from '../../interfaces/data-query.interface';
export type dataMapper = (data: any[]) => void;

export class TableDatasource<T> implements DataSource<T> {
  private defaultQueryParams: DataQuery = {
    page: 0,
    search: '',
    sortField: '',
    sortDir: '',
    items: 10
  };

  private _data = new BehaviorSubject<T[]>(null);
  private _loading = new BehaviorSubject<boolean>(false);
  private _count = new BehaviorSubject<number>(0);
  private _queryParameters = new BehaviorSubject<DataQuery>({});
  private tableDataCopy: any[];

  isLoading$ = this._loading.asObservable();
  data$ = this._data.asObservable();
  count$ = this._count.asObservable();

  constructor(
    private http: HttpClient,
    private dataEndPoint: string,
    private dataCountPoint: string,
    private _dataMapper: dataMapper
  ) {
    this.observeTable();
  }

  connect(): Observable<T[]> {
    return this._data.asObservable();
  }

  disconnect() {
    this._data.complete();
    this._loading.complete();
  }

  private observeTable() {
    this._queryParameters
      .asObservable()
      .pipe(
        tap(() => {
          this._loading.next(true);
        }),
        switchMap(_queryParams => {
          const queryParams = this.prepareParams(_queryParams);
          return this.http.get(this.dataEndPoint, {
            params: queryParams
          });
        }),
        tap((response: any) => {
          this._count.next(response.length);
        }),
        map((response: any) => {
          this.tableDataCopy = [...response.slice()];
          if (this._dataMapper && typeof this._dataMapper === 'function') {
            return this._dataMapper(response.slice());
          } else {
            return response;
          }
        }),
        tap(() => {
          this._loading.next(false)
        }),
        catchError((err) => {
          console.log(err);
          this._loading.next(false);
          return of(null);
        })
      )
      .subscribe((data: T[]) => {
        this._data.next(data);
      });
  }

  private prepareParams(params: DataQuery): HttpParams {
    let httpParams = new HttpParams();
    const _params = {
      ...params
    };

    for (const key in _params) {
      httpParams = httpParams.set(key, _params[key]);
    }
    return httpParams;
  }

  setQueryParams(params?: DataQuery) {
    this._queryParameters.next({
      ...this._queryParameters.value,
      ...params
    });
  }

  resetParams() {
    this._queryParameters.next({});
  }

  getRow(id: number) {
    return this.tableDataCopy.find(item => (item._id || item.id) == id);
  }
}
