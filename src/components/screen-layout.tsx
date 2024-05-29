import { StyleSheet, View } from 'react-native';

import { useGlobalStore } from '@/services';

interface Props {
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<Props> = ({ children }) => {
  const isArray = Array.isArray(children);
  const theme = useGlobalStore((state) => state.theme);
  const backgroundColor = theme.background;
  if (!children) {
    return null;
  }

  function itemMapper(item: React.ReactNode, index: number) {
    return (
      <View style={styles.divider} key={index}>
        {item}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {isArray && children.map(itemMapper)}
      {!isArray && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    padding: 12,
  },
  divider: {
    marginBottom: 12,
  },
});
