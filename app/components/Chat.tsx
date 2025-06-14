import { useEffect, useState } from 'react';
import { Box, Paper, TextInput, Button, Stack, Text, Group, Flex, Title } from '@mantine/core';
import { socket } from '../socket';
import type { ChatMessage } from '../constants/types';
import { v4 as uuidv4 } from 'uuid';

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    socket.connect();

    socket.on('message', (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: uuidv4(),
      content: newMessage,
      sender: 'user',
      timestamp: Date.now(),
      isEditing: false,
      chatWorkspaceId: 'default'
    };

    socket.emit('message', message);
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

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
        <Paper withBorder p="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Title order={4} mb="sm">Sequence</Title>
          <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
            <Text color="dimmed">No sequence generated.</Text>
          </Box>
        </Paper>
      </Paper>
    </Flex>
  );
} 