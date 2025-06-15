import { Paper, Text, Group } from '@mantine/core';
import type { SequenceStep as SequenceStepType } from '../constants/types';

interface SequenceStepProps {
  step: SequenceStepType;
}

export function SequenceStep({ step }: SequenceStepProps) {
  return (
    <Paper withBorder p="md" style={{ minWidth: 300, minHeight: 80, marginBottom: 16 }}>
      <Group justify="space-between" mb="xs">
        <Text fw={500}>Step {step.position}</Text>
      </Group>
      <Text size="sm">{step.content}</Text>
    </Paper>
  );
} 