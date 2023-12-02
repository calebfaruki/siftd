import * as React from 'react';
import { SectionList, Text, TouchableOpacity, ScrollView, StyleSheet, View } from 'react-native';
import { useUser } from '../context/user';
import useUpdateSiftRating from '../hooks/useUpdateSiftRating';

const sections = [{
  title: 'Platforms',
  data: [
    'Microsoft',
    'Nintendo',
    'Sony',
    'PC',
    'Handheld',
    'Mobile',
    'VR/AR',
    'Retro'
  ]
}, {
  title: 'Content Types',
  data: [
    'Features',
    'Gameplay',
    'Guides',
    'Interviews',
    'Lists',
    'Opinion',
    'Previews',
    'Reviews',
    'Trailers'
  ]
}, {
  title: 'Topics',
  data: [
    'Culture',
    'Deals',
    'Early Access',
    'Esports',
    'Finance',
    'Indie',
    'Industry',
    'Japan',
    'Hardware'
  ]
}, {
  title: 'Genres',
  data: [
    'Action/Adventure',
    'Adventure',
    'Driving',
    'Fighting',
    'Free-to-Play',
    'Game Tool',
    'Kids',
    'MOBA',
    'Motion Control',
    'Music & Rhythm',
    'Platformer',
    'Puzzle',
    'RPG',
    'Shooter',
    'Sports',
    'Strategy',
  ]
}]

export default function SIFTRatingsScreen(props: SIFTRatingsScreenProps) {
  const { user } = useUser();
  const [ratings, setRatings] = React.useState<Record<string, number>>(user!.siftRatings);
  const { loading, error, updateRating } = useUpdateSiftRating();

  const handleRating = async (subject: string, rating: number) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [subject]: rating
    }));
    console.log(`Rated ${subject} as ${rating}`);
    await updateRating(subject, rating);
  };

  const RatingButton = ({ rating, subject }: { rating: number, subject: string }) => {
    const isSelected = ratings[subject] === undefined && rating === 0 || ratings[subject] === rating;
    return (
      <TouchableOpacity
        style={[styles.ratingButton, isSelected ? styles.activeButton : styles.inactiveButton]}
        onPress={() => handleRating(subject, rating)}
      >
        <Text style={styles.buttonText}>{rating}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <SectionList
        sections={sections}
        scrollEnabled={false}
        style={{ width: '100%' }}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{item}</Text>
            {[-2, -1, 0, 1, 2].map(rating => (
              <RatingButton key={rating} rating={rating} subject={item} />
            ))}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 100,
    marginHorizontal: 'auto',
  },
  sectionHeader: {
    flexDirection: 'row',
    padding: 6,
    marginTop: 5,
    backgroundColor: '#0072bb',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  sectionHeaderText: {
    color: 'white',
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  listItem: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  listItemText: {
    fontSize: 16,
    color: 'white',
    flexGrow: 1
  },
  ratingButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 5
  },
  activeButton: {
    backgroundColor: '#999',
  },
  inactiveButton: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});
