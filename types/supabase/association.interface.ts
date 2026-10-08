export type AssociationPosition =
  | "member"
  | "president"
  | "vicepresident"
  | "secretary"
  | "treasurer"
  | "vocal";

export interface Association {
  id: string;
  slug: string;
  name: string;
  tag: string;
  description?: string;
  logo_url?: string;
  website_url?: string;
}

export interface AssociationMembership {
  id: string;
  user_id: string;
  association_id: string;
  position: AssociationPosition;
  joined_at: string;
}
