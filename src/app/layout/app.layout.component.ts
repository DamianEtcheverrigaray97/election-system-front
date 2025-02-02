import { Component, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppTopbarComponent } from './app-topbar/app-topbar.component';
import { AppBreadcrumbComponent } from './app-breadcrumb/app.breadcrumb.component';



@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html',
    imports: [
        RouterOutlet,
        AppTopbarComponent,
        AppBreadcrumbComponent
    ],
})
export class AppLayoutComponent implements OnDestroy {
    
    overlayMenuOpenSubscription: Subscription | null = null;
    menuOutsideClickListener: (() => void) | null = null;
    menuScrollListener: (() => void) | null = null;

    @ViewChild(AppTopbarComponent) appTopbar!: AppTopbarComponent;

    constructor(
        public renderer: Renderer2,
        public router: Router
    ) {

        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
            });
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(
                new RegExp(
                    '(^|\\b)' +
                        'blocked-scroll'.split(' ').join('|') +
                        '(\\b|$)',
                    'gi'
                ),
                ' '
            );
        }
    }

    hideMenu() {
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        if (this.menuScrollListener) {
            this.menuScrollListener();
            this.menuScrollListener = null;
        }
        this.unblockBodyScroll();
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }
}
