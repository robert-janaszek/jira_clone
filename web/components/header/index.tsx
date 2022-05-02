import { useMantineColorScheme, ActionIcon, Header, Group, Text, Input } from '@mantine/core';
import { Sun, MoonStars, Search } from 'tabler-icons-react';

export const AppHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return <Header height={50} p="xs">
    <Group position="apart">
      <Text>Jira Clone</Text>
      <Group>
        <Input
          icon={<Search />}
          placeholder="Search issues"
          size="xs"
        />
        <ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
          {colorScheme === 'dark' ? <Sun size={16} /> : <MoonStars size={16} />}
        </ActionIcon>
      </Group>
    </Group>
  </Header>;
}
