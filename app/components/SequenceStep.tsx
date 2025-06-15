import { Paper, Text, Group, TextInput, Button } from '@mantine/core';
import { useState } from 'react';
import type { SequenceStep as SequenceStepType } from '../constants/types';
import { useApi } from '../hooks/useApi';

interface SequenceStepProps {
  step: SequenceStepType;
}

export function SequenceStep({ step }: SequenceStepProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(step.content);
  const { callApi } = useApi();

  const handleSave = async () => {
    try {
      const response = await callApi(`/sequence_step/${step.id}`, {
        method: 'PUT',
        body: JSON.stringify({ content })
      });

      if (!response.ok) {
        throw new Error('Failed to update step');
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating step:', error);
    }
  };

  return (
    <Paper withBorder p="md" style={{ minWidth: 300, minHeight: 80, marginBottom: 16 }}>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>Step {step.position}</Text>
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