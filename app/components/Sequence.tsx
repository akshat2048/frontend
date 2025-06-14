import { Paper, Title, Box } from '@mantine/core';
import { SequenceStep } from './SequenceStep';
import { useState } from 'react';

export function Sequence({ id }: { id: string }) {
  const [sequenceId] = useState(id);
  const [sequenceIds] = useState([1, 2, 3]);

  return (
    <Paper withBorder p="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Title order={4} mb="sm">Sequence</Title>
      <Box style={{ flex: 1, overflowY: 'auto', maxHeight: 400 }}>
        {sequenceIds.map(id => (
          <SequenceStep key={id} />
        ))}
      </Box>
    </Paper>
  );
} 