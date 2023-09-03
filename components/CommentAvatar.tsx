import { View, Text, Image, StyleSheet } from "react-native";
import ensureHttps from "../utilities/ensureHttps";


function getBorderColor(contribution: number): string {
  if (contribution >= 10000) return 'lightblue';
  if (contribution >= 7500) return 'aqua';
  if (contribution >= 3000) return 'aqua';
  if (contribution >= 2000) return 'red';
  if (contribution >= 700) return 'purple';
  if (contribution >= 400) return 'gold';
  if (contribution >= 200) return 'darkgreen';
  if (contribution >= 100) return 'orange';
  return 'white';
}

export default function CommentAvatar({ author }: { author: IUser }) {
  const bigTipper = author.bigTipper && !author.social?.patreon?.amount && 400;
  const borderColor = getBorderColor(bigTipper || author.social?.patreon?.amount || 0);
  return (
    <>
      <View style={[styles.container, { borderColor }]}>
        <Image
          source={{ uri: ensureHttps(author.avatar) }}
          style={[styles.avatar, { borderColor }]}
        />
        <Text style={[styles.level, { backgroundColor: borderColor }]}>
          {author.xp.level}
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
    position: 'relative',
    width: 60,
    height: 60
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  level: {
    position: 'absolute',
    fontSize: 12,
    color: 'black',
    bottom: 0,
    right: 0,
    paddingLeft: 2,
    paddingTop: 2
  },
})