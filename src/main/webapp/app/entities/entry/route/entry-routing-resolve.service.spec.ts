jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEntry, Entry } from '../entry.model';
import { EntryService } from '../service/entry.service';

import { EntryRoutingResolveService } from './entry-routing-resolve.service';

describe('Service Tests', () => {
  describe('Entry routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EntryRoutingResolveService;
    let service: EntryService;
    let resultEntry: IEntry | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EntryRoutingResolveService);
      service = TestBed.inject(EntryService);
      resultEntry = undefined;
    });

    describe('resolve', () => {
      it('should return IEntry returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEntry = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEntry).toEqual({ id: 123 });
      });

      it('should return new IEntry if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEntry = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEntry).toEqual(new Entry());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        spyOn(service, 'find').and.returnValue(of(new HttpResponse({ body: null })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEntry = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEntry).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
