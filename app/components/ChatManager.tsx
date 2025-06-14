import { useState } from 'react';
import { Button, Group, Tabs, Paper, TextInput } from '@mantine/core';
import { Chat } from './Chat';
import { v4 as uuidv4 } from 'uuid';

interface ChatTab {
  id: string;
  name: string;
}

export function ChatManager() {
  const [chats, setChats] = useState<ChatTab[]>([{ id: 'default', name: 'Chat 1' }]);
  const [activeChat, setActiveChat] = useState('default');
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const addNewChat = () => {
    const newId = uuidv4();
    setChats([...chats, { id: newId, name: `Chat ${chats.length + 1}` }]);
    setActiveChat(newId);
  };

  const handleDoubleClick = (chatId: string, currentName: string) => {
    setEditingTab(chatId);
    setEditValue(currentName);
  };

  const handleRename = (chatId: string) => {
    setChats(chats.map(chat => 
      chat.id === chatId ? { ...chat, name: editValue } : chat
    ));
    setEditingTab(null);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Group p="md" style={{ borderBottom: '1px solid #eee' }}>
        <Button onClick={addNewChat}>Add New Chat</Button>
      </Group>
      <Tabs 
        value={activeChat} 
        onChange={(val) => setActiveChat(val || 'default')} 
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        styles={{
          tab: {
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 500,
            '&[data-active]': {
              backgroundColor: '#f44336',
              color: 'white',
            },
            '&:hover': {
              backgroundColor: '#ffebee',
            },
          },
          list: {
            backgroundColor: '#f5f5f5',
            padding: '8px',
            borderBottom: '2px solid #e0e0e0',
          },
        }}
      >
        <Tabs.List>
          {chats.map((chat) => (
            <Tabs.Tab 
              key={chat.id} 
              value={chat.id}
              onDoubleClick={() => handleDoubleClick(chat.id, chat.name)}
            >
              {editingTab === chat.id ? (
                <TextInput
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleRename(chat.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRename(chat.id);
                    } else if (e.key === 'Escape') {
                      setEditingTab(null);
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  style={{ width: '120px' }}
                  autoFocus
                />
              ) : (
                chat.name
              )}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {chats.map((chat) => (
          <Tabs.Panel key={chat.id} value={chat.id} style={{ flex: 1 }}>
            <Chat chatId={chat.id} />
          </Tabs.Panel>
        ))}
      </Tabs>
    </div>
  );
} 