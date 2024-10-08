import React from 'react';

import { FlatList } from 'react-native';

import { useNavigation, type RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Container, PreviewItem, ScreenLayout, TextField } from '@/components';
import { GroupsScreens } from '@/config';
import { useGlobalStore } from '@/services';
import type { GroupStackNavigationType, GroupStackParamList } from '@/types';

interface Props {
  route: RouteProp<GroupStackParamList, typeof GroupsScreens.GroupsScreen>;
}

export const GroupsScreen: React.FC<Props> = () => {
  //TODO** rename Groups -> Rooms
  const { t } = useTranslation();
  const navigation = useNavigation<GroupStackNavigationType>();
  const groups = useGlobalStore((state) => state.groups);
  //Use getLatestRoomMessages() from sqllite.ts to load a list of all rooms and the latest message.
  //Should also be used when removing a room
  function onPress(topic: string, name: string) {
    navigation.navigate(GroupsScreens.GroupChatScreen, { name, topic });
  }

  return (
    <ScreenLayout>
      {groups.length === 0 && (
        <Container>
          <TextField size="large">{t('emptyAddressBook')}</TextField>
        </Container>
      )}
      <FlatList
        data={groups}
        keyExtractor={(item, i) => `${item.topic}-${i}`}
        renderItem={({ item }) => <PreviewItem {...item} onPress={onPress} />}
      />
    </ScreenLayout>
  );
};
