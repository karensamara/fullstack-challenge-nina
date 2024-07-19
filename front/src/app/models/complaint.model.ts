export interface Complaint {
  id: string;
  neighborhood: string;
  date: Date;
  type: string;
}

export interface ComplaintDto {
  id: string;
  user_id: string;
  date: string;
  at_moment: boolean;
  type: string;
  neighborhood: string;
  situation: string;
  description: string;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_email: string;
  user_phone_number: string;
  user_birthdate: string;
  user_gender: string;
  user_ethnicity: string;
  user_created_at: string;
  user_updated_at: string;
}
