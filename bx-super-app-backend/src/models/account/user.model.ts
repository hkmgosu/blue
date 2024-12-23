type UserAttributes = {
  phone?: string;
  profile_pic?: string;
};

export default class User {
  id: string;
  username: string;
  enabled: boolean;
  totp: boolean;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  attributes?: UserAttributes;
  email: string;
  notBefore: number;
  requiredActions: Array<string>;
  roles?: Array<string>;
}
