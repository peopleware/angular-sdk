import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { getFullRoutePath } from '@ppwcode/ng-router'
import { RouteMapRoutePipe } from '@ppwcode/ng-router'
import { ROUTE_MAP } from '../app.routes'

@Component({
    selector: 'ppw-route-map-demo',
    standalone: true,
    imports: [RouterLink, RouteMapRoutePipe],
    templateUrl: './route-map-demo.component.html',
    styleUrl: './route-map-demo.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteMapDemoComponent {
    readonly ROUTE_MAP = ROUTE_MAP
    readonly getFullRoutePath = getFullRoutePath
}
