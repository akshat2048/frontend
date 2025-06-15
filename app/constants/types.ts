export type Workspace = {
  id: string; // UUID string
  username: string; // User.username
  created_at: string; // ISO date string
  name: string;
  agent_context: string;
  // Optionally, you can add:
  // user?: User;
  // sequences?: Sequence[];
};

export type Sequence = {
  id: string; // UUID string
  workspace_id: string; // Workspace.id
  agent_context: string;
  created_at: string; // ISO date string
  // Optionally, you can add:
  // workspace?: Workspace;
  // steps?: SequenceStep[];
};

export type SequenceStep = {
  id: string; // UUID string
  position: number;
  sequence_id: string; // Sequence.id
  content: string;
  agent_context: string;
  // Optionally, you can add:
  // sequence?: Sequence;
};

export type Message = {
  id: string; // UUID string
  content: string;
  sender: string;
  timestamp: number; // Unix timestamp (seconds or ms, check backend)
  isEditing: boolean;
  chatWorkspaceId: string;
};