export interface Block {
  id: string;
  title: string;
  description: string;
  userId: string;
  timestamp: string;
  active: boolean;
  repeat: boolean;
}

export interface GetAllBlockResponse {
  success: boolean;
  message: string;
  blocks: Block[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UpdateBlockDTO {
  id: string;
  timestamp: Date;
  title: string;
  description: string;
  active: boolean;
  repeat: boolean;
  path: string;
}

export interface CreateBlockDTO {
  timestamp: Date;
  title: string;
  description: string;
  path: string;
}

export interface DeleteBlockDTO {
  path: string;
  id: string;
}
