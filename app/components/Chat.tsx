import { useEffect, useState } from 'react';
import { Box, Paper, TextInput, Button, Stack, Text, Group, Flex, Title, Tabs } from '@mantine/core';
import { socket } from '../socket';
import type { Message } from '../constants/types';
import { v4 as uuidv4 } from 'uuid';
import { Sequence } from './Sequence';
import { useApi } from '../hooks/useApi';

interface ChatProps {
  chatId: string;
}

interface WorkspaceSequence {
  id: string;
  created_at: string;
  agent_context: string;
}

export function Chat({ chatId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sequences, setSequences] = useState<WorkspaceSequence[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const { callApi, error: apiError, loading } = useApi<WorkspaceSequence[]>();

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await callApi(`/workspace?chatId=${chatId}`, {
          method: 'GET'
        });
        setSequences(response);
        if (response.length > 0) {
          setActiveTab(response[0].id);
        }
      } catch (err) {
        console.error('Error fetching workspace:', err);
      }
    };

    fetchWorkspace();
  }, [chatId, callApi]);

  useEffect(() => {
    socket.connect();

    socket.on('message', (message: Message) => {
      if (message.chatWorkspaceId === chatId || message.chatWorkspaceId === "global") {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: uuidv4(),
      content: newMessage,
      sender: 'user',
      timestamp: Date.now(),
      isEditing: false,
      chatWorkspaceId: chatId
    };

    socket.emit('message', message);
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  if (apiError) {
    return (
      <Flex h="100vh" p="lg" justify="center" align="center">
        <Text color="red" size="xl">Failed to load workspace data</Text>
      </Flex>
    );
  }

  if (loading || sequences.length === 0) {
    return (
      <Flex h="100vh" p="lg" justify="center" align="center">
        <Text>Loading...</Text>
      </Flex>
    );
  }

  return (
    <Flex h="100vh" p="lg" gap="lg" style={{ boxSizing: 'border-box' }}>
      {/* Chat Section */}
      <Paper withBorder p="md" style={{ width: '33.33%', minWidth: 320, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Title order={2} mb="sm" style={{ fontWeight: 600, color: '#f44336' }}>Chat</Title>
        <Box style={{ borderTop: '4px solid #f44336', marginBottom: 16 }} />
        <Box style={{ flex: 1, overflowY: 'auto', border: '2px solid #222', padding: 8, marginBottom: 16 }}>
          <Stack>
            {messages.length === 0 && (
              <Text color="dimmed">No messages yet.</Text>
            )}
            {messages.map((message) => (
              <Group key={message.id} align="flex-start" justify={message.sender === 'user' ? 'flex-end' : 'flex-start'}>
                <Box
                  p="sm"
                  style={{
                    backgroundColor: message.sender === 'user' ? '#BBDEFB' : '#ECECEC',
                    borderRadius: 8,
                    maxWidth: '80%',
                  }}
                >
                  <Text size="sm">{message.content}</Text>
                </Box>
              </Group>
            ))}
          </Stack>
        </Box>
        <Group mt="auto" align="flex-end" style={{ border: '2px solid #222', padding: 8 }}>
          <TextInput
            style={{ flex: 1 }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </Group>
      </Paper>

      {/* Workspace Section */}
      <Paper withBorder p="md" style={{ width: '66.66%', minWidth: 400, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Title order={2} mb="sm" style={{ fontWeight: 600, color: '#f44336' }}>Workspace</Title>
        <Box style={{ borderTop: '4px solid #f44336', marginBottom: 16 }} />
        <Tabs
          value={activeTab}
          onChange={(val) => setActiveTab(val)}
          style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
        >
          <Tabs.List>
            {sequences.map((seq, idx) => (
              <Tabs.Tab key={seq.id} value={seq.id}>{`Sequence ${idx + 1}`}</Tabs.Tab>
            ))}
          </Tabs.List>
          {sequences.map((seq) => (
            <Tabs.Panel key={seq.id} value={seq.id} style={{ flex: 1, display: 'flex' }}>
              <Sequence id={seq.id} />
            </Tabs.Panel>
          ))}
        </Tabs>
      </Paper>
    </Flex>
  );
} 