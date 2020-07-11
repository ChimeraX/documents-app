import ChimeraXState from '@chimerax/common-web/lib/redux/ChimeraXState';
import { UserState } from './user';
import { LoginState } from './login';
import { AuthorizeState } from './authorize';
import { ClientState } from './client';
import { RegisterState } from './register';
import { FolderState } from './folder';

export default interface ChimeraXAppState extends ChimeraXState {
    user: UserState;
    login: LoginState;
    authorize: AuthorizeState;
    client: ClientState;
    register: RegisterState;
    folder: FolderState;
}
