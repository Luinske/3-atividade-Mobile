import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  desc: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  tarefasContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    width: 250,
    padding: 10,
    marginBottom: 10,
  },
  tarefasDesc: {
    flex: 1,
    marginRight: 10,
    textDecorationLine: "none",
  },
  terminoTarefasDesc: {
    textDecorationLine: "line-through",
  },
  tarefasStatus: {
    fontWeight: "bold",
    marginLeft: 10,
  },
});
