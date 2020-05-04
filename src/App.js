import React, { useEffect, useState } from "react";
import api from "./services/api";
// import Icon from "react-native-vector-icons/MaterialIcons";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleLikeRepository(id) {
    // console.log(`repositories/${id}/like`);
    const response = await api.post(`repositories/${id}/like`);
    //console.log(response.data);
    //setRepository(response.data);

    const respositorieIndex = repository.findIndex(
      (respositorie) => respositorie.id === id
    );

    const newRespositorie = [...repository];
    newRespositorie[respositorieIndex] = response.data;

    setRepository(newRespositorie);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.container}
          data={repository}
          keyExtractor={(repositorie) => repositorie.id}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.repositoryContainer}>
              <Text style={styles.repository}>{item.title}</Text>

              <View style={styles.techsContainer}>
                {item.techs.map((item, index) => (
                  <Text style={styles.tech} key={index}>
                    {item}
                  </Text>
                ))}
              </View>

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                  testID={`repository-likes-1`}
                >
                  {`${item.likes} curtidas`}
                </Text>
              </View>

              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => handleLikeRepository(item.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-1`}
                >
                  <Text style={styles.buttonLikeText}>Curtir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deslikeButton}
                  onPress={() => handleLikeRepository(item.id)}
                  // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-1`}
                >
                  {/* <Icon name="thumb-up" size={18} color="#999" /> */}
                  <Text style={styles.buttonDeslikeText}>Dislike</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },

  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
    flexWrap: "wrap",
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  btnContainer: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeButton: {
    marginTop: 10,
    flex: 1,
  },
  deslikeButton: {
    marginTop: 10,
    flex: 1,
  },
  buttonDeslikeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#FF6347",
    padding: 15,
    textAlign: "center",
  },
  buttonLikeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#017ef6",
    padding: 15,
    textAlign: "center",
  },
});
