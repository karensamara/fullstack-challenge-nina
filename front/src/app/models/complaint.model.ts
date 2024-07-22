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

export interface ComplaintTypesDto {
  GROPING: number;
  STALKING: number;
  UNWANTED_PHOTOS: number;
  UNWANTED_COMMENTS: number;
  THREATENING: number;
  FLASHING: number;
}

export interface ComplaintAtMomentDto {
  True: number;
  False: number;
}

export interface ComplaintGendersDto {
  CIS_MALE: number;
  CIS_FEMALE: number;
  TRANS_MALE: number;
  TRANS_FEMALE: number;
  OTHER: number;
}

export interface ComplaintAgeDto {
  '< 14': number;
  '14 - 18': number;
  '19 - 29': number;
  '30 - 39': number;
  '40 - 49': number;
  '50 - 59': number;
  '> 60': number;
}

export interface ComplaintMonthsDto {
  Jan: number;
  Fev: number;
  Mar: number;
  Abr: number;
  Mai: number;
  Jun: number;
  Jul: number;
  Ago: number;
  Set: number;
  Out: number;
  Nov: number;
  Dez: number;
}

export interface ComplaintNeighborhoodDto {
  name: string;
  count: number;
}
