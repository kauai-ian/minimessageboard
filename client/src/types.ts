export type MessageType = {
  _id: string;
  user: string;
  title: string;
  text: string;
  timestamp: string;
};

export type SignupFormData = {
  username: string;
  password: string;
  confirmPassword: string;
}

export type LoginFormData = {
  username: string;
  password: string;
};
