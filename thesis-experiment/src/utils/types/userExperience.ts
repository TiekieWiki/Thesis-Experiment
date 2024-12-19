export interface UserExperienceQuestion {
  name: string;
  question: string;
  answer: number | null;
}

export interface UserExperience {
  userId: string;
  taskSet: string;
  meetRequirements: number;
  easeOfUse: number;
}
