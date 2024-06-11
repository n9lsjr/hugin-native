import { useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useGlobalStore } from '@/services';
import { Styles } from '@/styles';
import { type MessagesStackNavigationType } from '@/types';
import { prettyPrintDate } from '@/utils';

import { Avatar, TextField } from './_elements';

interface Props {
  inverted: boolean;
  message: string;
  avatar: string;
  date: Date;
  name: string;
}

export const MessageItem: React.FC<Props> = ({
  inverted,
  message,
  avatar,
  date,
  name,
}) => {
  const navigation = useNavigation<MessagesStackNavigationType>();
  const [isPressed, setIsPressed] = useState(false);
  const theme = useGlobalStore((state) => state.theme);
  const dateString = prettyPrintDate(date);

  function handleLongPress() {
    setIsPressed(true);
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !inverted ? styles.container : styles.invertedContainer,
        {
          backgroundColor: isPressed ? theme.backgroundTertiary : 'transparent',
        },
      ]}
      onLongPress={handleLongPress}
      onPressOut={() => setIsPressed(false)}>
      {!inverted && (
        <>
          <View style={styles.user}>
            <Avatar base64={avatar} size={30} />
            <TextField size="small" style={styles.date}>
              {dateString}
            </TextField>
          </View>
          <View style={[styles.messageContainer]}>
            <View style={[styles.card, { backgroundColor: theme.tertiary }]}>
              <TextField size="small">{message}</TextField>
            </View>
          </View>
        </>
      )}
      {inverted && (
        <View>
          <TextField size="small" style={styles.date}>
            {dateString}
          </TextField>
          <View style={styles.invertedCard}>
            <View
              style={[
                styles.card,
                { backgroundColor: theme.backgroundTertiary },
              ]}>
              <TextField size="small">{message}</TextField>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    alignSelf: 'flex-start',
    borderRadius: Styles.borderRadius.small,
    padding: 12,
  },
  container: {
    marginLeft: 4,
    marginVertical: 4,
  },
  date: {
    alignSelf: 'flex-end',
    marginBottom: 6,
    marginLeft: 6,
  },
  invertedCard: {
    alignSelf: 'flex-end',
  },
  invertedContainer: {
    alignItems: 'flex-end',
    paddingLeft: 30,
  },
  messageContainer: {
    paddingRight: 30,
  },
  user: {
    flexDirection: 'row',
  },
});
