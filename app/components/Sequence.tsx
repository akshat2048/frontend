import { Paper, Title, Box, Text } from '@mantine/core';

export function Sequence() {
  return (
    <Paper withBorder p="md" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Title order={4} mb="sm">Sequence</Title>
      <Box style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
        <Text color="dimmed">No sequence generated.</Text>
      </Box>
    </Paper>
  );
} 