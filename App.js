import { useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [modalIsVisible, setMoadalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  // handle the visibilty of the modal
  function startAddGoalHandler() {
    setMoadalIsVisible(true);
  }
  function endAddGoalHandler() {
    setMoadalIsVisible(false);
  }

  // handle button when clicked
  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [...currentCourseGoals,
    {
      text: enteredGoalText,
      id: Math.random().toString(),
    }]);
    endAddGoalHandler();
  }

  // handle goal list deletion
  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    })
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container} >
        <Button title='Add New Goal' color='#a065ec' onPress={startAddGoalHandler} />
        <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler} />
        <View style={styles.goalsContainer}>
          <FlatList
            alwaysBounceVertical={false}
            data={courseGoals}
            renderItem={(itemData) => {
              return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler} />
            }}
            keyExtractor={(item, index) => { return item.id }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  goalsContainer: {
    flex: 7,
  }
});
