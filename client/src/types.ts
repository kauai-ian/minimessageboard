export type User = {
  _id: string;
  username: string;
}

export type MessageType = {
  _id: string;
  author: User; // specify the type as User
  body: string;
  updatedAt: string;
};

export type SignupFormData = {
  username: string;
  password: string;
}

export type LoginFormData = {
  username: string;
  password: string;
};


