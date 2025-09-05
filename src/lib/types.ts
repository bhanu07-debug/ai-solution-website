
export type Feedback = {
  id: string;
  name: string;
  company?: string;
  email: string;
  message: string;
  rating: number;
  country?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date | string;
};
