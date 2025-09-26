
export type Feedback = {
  id: string;
  name: string;
  company: string;
  email: string;
  message: string;
  country?: string;
  rating?: number;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date | string;
};

export type Inquiry = {
  id: string;
  name: string;
  company: string;
  email: string;
  message: string;
  country?: string;
  phone?: string;
  inquireDepartment?: string;
  localAddress?: string;
  pinCode?: string;
  createdAt: Date | string;
}
