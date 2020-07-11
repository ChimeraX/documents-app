import Profile from './Profile';
import Credentials from './Credentials';

type Registration = Profile & Credentials & { code?: string };

export default Registration;
