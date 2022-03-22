import { reactive } from "vue";

const store = reactive({
  currentPres: "",
  listPres: [""],
});

const setStateProp = (propName, newValue) => {
  store[propName] = newValue;
};
export default { state: store, setStateProp };
