import Scope from '../model/Scope';

const mapping = new Map<string, Scope>();

const profile: Scope = {
    name: 'Your Profile',
    description: 'Can access your profile, email and picture',
    authority: 'PROFILE',
};

const contact: Scope = {
    name: 'Contact data',
    description: 'Can access your phone number',
    authority: 'CONTACT',
};

mapping.set('profile', profile);
mapping.set('contact', contact);

export default function mapToScopes(scopes: string[]): Scope[] {
    const filter = (scope: string) => mapping.has(scope);
    const map = (scope: string) => mapping.get(scope)!!;
    return scopes.filter(filter).map(map);
}
