import { Paper, Text, Group, TextInput, Button, ActionIcon, Tooltip } from '@mantine/core';
import { useState } from 'react';
import type { SequenceStep as SequenceStepType } from '../constants/types';
import { useApi } from '../hooks/useApi';
import { IconMail } from '@tabler/icons-react';

interface SequenceStepProps {
  step: SequenceStepType;
}

export function SequenceStep({ step }: SequenceStepProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(step.content);
  const { callApi } = useApi();

  const handleSave = async () => {
    try {
      callApi(`/sequence_step/${step.id}`, {
        method: 'PUT',
        body: JSON.stringify({ content: content.trim() })
      });

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating step:', error);
    }
  };

  return (
    <Paper withBorder p="md" style={{ minWidth: 300, minHeight: 80, marginBottom: 16 }}>
      <Group justify="space-between" mb="xs">
        <Group>
          <Text fw={500}>Step {step.position}</Text>
          <Tooltip label={step.agent_context}>
            <Text size="sm" c="dimmed">(Agent Context)</Text>
          </Tooltip>
          <ActionIcon 
            variant="subtle" 
            color="blue" 
            onClick={() => {
              const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(`Sequence Step ${step.position}`)}&body=${encodeURIComponent(content)}`;
              window.open(gmailUrl, '_blank');
            }}
            title="Open in Gmail"
          >
            <IconMail size={16} />
          </ActionIcon>
        </Group>
        <Button 
          variant="subtle" 
          size="xs" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </Group>
      {isEditing ? (
        <Group>
          <TextInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ flex: 1 }}
          />
          <Button size="xs" onClick={handleSave}>Save</Button>
        </Group>
      ) : (
        <Text size="sm">{content}</Text>
      )}
    </Paper>
  );
} 