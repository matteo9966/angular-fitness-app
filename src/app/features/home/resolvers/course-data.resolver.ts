import { ResolveFn } from '@angular/router';
import { IcourseData } from 'src/app/core/models/IcourseData.interface';
import { inject, INJECTOR, EnvironmentInjector } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';

const mockCourseData: IcourseData = {
  title: 'Extreme fat loss',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
  longDescription: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.

  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor.`,
  shortDescription:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Lorem ipsum dolor sit amet, consectetur adip.',
  difficultyLevel: 'beginner',
  extraDescriptions: [
    {
      icon: 'timer',
      description: 'from 25 to 45 minutes',
      title: 'Class duration',
    },
    { icon: 'group', description: 'from 5 to 15 people', title: 'Group title' },
  ],

  imageBg:
    'https://assets.website-files.com/55f33a0152c98c9a451281aa/5e34486bd4897db8c07c1284_person-holding-barbell-841130.jpg',
};

export const courseDataResolver: ResolveFn<IcourseData|null> = (route, state) => {
  const homeService = inject(HomeService);
  const courseId = route.paramMap.get('id');
  if(!courseId){
    return null
  }
  return homeService.getCourseById(courseId)
};

/* 

handle data error when resolving for some product info
@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Observable<Product>> {
  constructor(
      private service: ProductService,
      private router: Router,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product>{
    const productId = this.route.snapshot.paramMap.get('productId');

    this.service
      .getProduct(productId)
      .catch(errorResponse => this.handleError(errorResponse);
  }

  handleError(
    errorResponse: HTTPErrorResponse
  ) {
    switch (errorResponse.status) {
      case 404:
        this.router.navigate(['/not-found']);
        return Observable.of(null);
      case 403:
        this.router.navigate(['/unauthorized']);
        return Observable.of(null);
      default:
        this.router.navigate(['/error']);
        return Observable.of(null);
      }
    }
  }
}

*/
