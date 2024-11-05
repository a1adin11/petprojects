export interface IRequestRegister {
  fullName?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IResponseRegister {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IRequestPost {
  text: string;
  tags?: string[];
}

export interface IPostResolver {
  text: string;
  attachments: File[];
}

// export interface IRegisterInfo {

// }
