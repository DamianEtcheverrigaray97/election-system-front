import { Routes } from '@angular/router';
import { TopCandidatesComponent } from './components/top-candidates/top-candidates.component';
import { VotesListComponent } from './components/votes-list/votes-list.component';
import { AddVoterComponent } from './components/add-voter/add-voter.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PublicVoteComponent } from './components/public-vote/public-vote.component';
import { AppLayoutComponent } from './layout/app.layout.component';

export const routes: Routes = [
    
    { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./components/auth/auth.module').then((m) => m.AuthModule) },
    { path: 'voting', component: PublicVoteComponent },
    {
        path: 'admin',
        component: AppLayoutComponent,
        children: [
            { path: 'candidates', component: TopCandidatesComponent, data: { breadcrumb: 'Candidatos Más Votados' } },
            { path: 'votes', component: VotesListComponent, data: { breadcrumb: 'Lista de Votos' } },
            { path: 'add-voter', component: AddVoterComponent, data: { breadcrumb: 'Agregar Votante' } },
            { path: 'change-password', component: ChangePasswordComponent, data: { breadcrumb: 'Modificar Contraseña' } },
        ]
    },
];
