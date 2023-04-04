import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import axios from "axios";
import { styles } from "./style";

interface Tarefas {
  id: number;
  desc: string;
  termino: boolean;
}

export default function Principal() {
  const [tarefasList, setTarefasList] = useState<Tarefas[]>([]);
  const [TarefasDesc, setTarefasDesc] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:3001/tarefas");
      setTarefasList(response.data);
    }
    fetchData();
  }, []);

  async function handleAddTarefas() {
    if (TarefasDesc === "") return;
    const response = await axios.post("http://localhost:3001/tarefas", {
      desc: TarefasDesc,
    });
    setTarefasList([...tarefasList, response.data]);
    setTarefasDesc("");
  }

  async function handleToggleTarefasTermino(id: number) {
    const tarefasToUpdate = tarefasList.find((tarefas) => tarefas.id === id);
    if (!tarefasToUpdate) return;
    const response = await axios.patch(`http://localhost:3001/tarefas/${id}`, {
      desc: tarefasToUpdate.desc,
      termino: !tarefasToUpdate.termino,
    });
    const updatedTarefasList = tarefasList.map((tarefas) =>
      tarefas.id === response.data.id ? response.data : tarefas
    );
    setTarefasList(updatedTarefasList);
  }

  async function handleDeleteTarefas(id: number) {
    await axios.delete(`http://localhost:3001/tarefas/${id}`);
    const updatedTarefasList = tarefasList.filter(
      (tarefas) => tarefas.id !== id
    );
    setTarefasList(updatedTarefasList);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.desc}>lista fullstack</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="ex: cortar o cabelo..."
          value={TarefasDesc}
          onChangeText={(text) => setTarefasDesc(text)}
        />
        <TouchableOpacity onPress={handleAddTarefas}>
          <Text>adicionar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tarefasList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tarefasContainer}
            onPress={() => handleToggleTarefasTermino(item.id)}
          >
            <Text
              style={[
                styles.tarefasDesc,
                item.termino && styles.terminoTarefasDesc,
              ]}
            >
              {item.desc}
            </Text>
            <Text style={styles.tarefasStatus}>
              {item.termino ? "Teminada" : "Incompleta"}
            </Text>
            <TouchableOpacity onPress={() => handleDeleteTarefas(item.id)}>
              <Text>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
