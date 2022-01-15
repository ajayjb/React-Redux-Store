console.clear();

// Action creater
createPolicy = (name, amount) => {
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  };
};

const createClaim = (name, claimAmount) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      claimAmount: claimAmount
    }
  };
};

// Reducers

const claimsHistory = (oldListClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    return [...oldListClaims, action.payload];
  } else {
    return oldListClaims;
  }
};

const accounting = (bagOfMoney = 100, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.claimAmount;
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount;
  }
  return bagOfMoney;
};

const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter((name) => {
      return name != action.payload.name;
    });
  }
  return listOfPolicies;
};

console.log(Redux);

const { createStore, combineReducers } = Redux;

const ourDepartment = combineReducers({
  claimsHistory: claimsHistory,
  accounting: accounting,
  policies: policies
});

const store = createStore(ourDepartment);

console.log(store.getState());

const action = createPolicy("Ajay J B", 500);

store.dispatch(action);

store.dispatch(createPolicy("Vijay J B", 1000));

store.dispatch(createClaim("Ajay J B", 69));

store.dispatch(createClaim("Loki", 700));

store.dispatch(deletePolicy("Ajay J B"));

console.log(store.getState());