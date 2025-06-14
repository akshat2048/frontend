export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'server';
  timestamp: number;
  isEditing: boolean;
  chatWorkspaceId: string;
  sequenceId?: string;
} 