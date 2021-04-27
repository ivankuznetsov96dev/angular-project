export interface User {
  email: string;
  family_name?: string;
  given_name?: string;
  granted_scopes?: string;
  id?: string;
  locale?: string;
  name: string;
  picture: string;
  verified_email?: boolean;
  user_posts?: string[];
  user_subs?: {};
}
