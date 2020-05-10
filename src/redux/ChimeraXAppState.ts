import ChimeraXState from '@chimerax/common-web/lib/redux/ChimeraXState';
import { UserState } from './user';
import { LoginState } from './login';
import { AuthorizeState } from './authorize';
import { ClientState } from './client';

export default interface ChimeraXAppState extends ChimeraXState {
    user: UserState;
    login: LoginState;
    authorize: AuthorizeState;
    client: ClientState;
}
