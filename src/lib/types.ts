
export type Feedback = {
  id: string;
  name: string;
  company?: string;
  role?: string;
  message: string;
  rating: number;
  country?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date | string;
};
