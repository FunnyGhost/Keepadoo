import { of } from 'rxjs';

export const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
  navigateByUrl: jasmine.createSpy('navigateByUrl')
};

export class MockActivatedRoute {
  private valueToReturn: string;
  setNewReturn(value: string) {
    this.valueToReturn = value;
  }

  get paramMap() {
    const valueToReturn = this.valueToReturn;

    return of({
      get(key: string) {
        return valueToReturn;
      }
    });
  }
}

export const mockModalService = {
  openModal(component: any) {
    return of({});
  }
};
