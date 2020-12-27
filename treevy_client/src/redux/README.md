# Redux
This redux implementation allows for the storing and manipulating of global states. The majority of the redux implementation is within this redux folder with few exceptions such as prop mapping.

## Definitions/Explainations
- reducer: A function which defines the changes to a particular state provided the previous state and an action. <b>All state changes should be immutable</b>
- action: A source of information provided to a reducer to act upon. By convention, an action will have a type and payload.
    - An action type will by convention `"domain/action"` for example, `"sidebar/resize"`.
    - The payload is the value provided to the reducer which is used to manipulate the current state.
- Middleware: A function which intercepts the action in transit to the reducer. It has access to the state and may be used to error check, handle malicious or malinformed action and or log information.
- store: An object which stores a given state.

### Graphical Representation:

<b>React</b> --Dispatches--> <b>Action</b> --Is intercepted by--> <b>Middleware</b> --Forwards to--> <b>Reducer</b> --Alters state of--> <b>Store</b> --Informs subscribed--> <b>Frontend</b>

<br />

## store.ts
Contains the creation of the store. The store takes in a series of reducers combined together. It also can take in a middleware function which can be defined by the user.

<br />

## reducers
A folder which contains all the reducers used by the application. Each specifies the initial state of what they are designed to manipulate. For example:
```Typescript
const initialState = { width: 0 };
```

Each reducer then takes in a state and action. The action being initialized to be the initial state if one is not provided. To decide what to do with each action, a conditional control flow is used to determine the right course of action depending on the action type. The example below uses switch conditions.

Notice that the state is changed in an immutable fashion. The state variable is overwritten (alteratively a new variable can be created) which uses the spread operator (...) to encapsulate the contents of the previous state. Then it overwrites the state values which the action aims to change - in this case: `width`.

Finally, the reducer is exported by default.
```Typescript
const sidebarReducer = (state = initialState, action: any) => {
    // Reducer actions
    switch(action.type) {
        case 'sidebar/resize':
            state = {
                ...state,
                width: action.payload,
            }
            break;
        default:
            break;
    };
    return state;
};

export default sidebarReducer;
```

<br />

## actions
A folder which contains all the actions used by the application. Each action is a function which has a hard coded type and provides the input parameter as a payload to the reducer. The return is a simple object containing type and payload. An example can be seen below.
<br />
```Typescript
export const setSize = (size: number) => {
    return {
        type: 'sidebar/resize',
        payload: size,
    };
}
```

<br />

## Using redux in a react component
The following example and comments detail how to set up redux for use in a componenet.
```Typescript
// Redux imports
import { setSize } from "path/to/sidebarActions.ts";
import { connect } from "react-redux";

class SomeComponent extends Component {...}

/** 
 * The items of the return object of this function are passed as a props to the component.
 * In this example, SomeComponent will be able to access sidebarReducer using: this.props.sidebarReducer
 */
mapStatesToProps = (state: any) => {    // Note that the state parameter is store.getState()
  const { sidebarReducer } = state; // Obtains the sidebarReducer from the store state
  // ^^ Same as: const sidebarReducer = state.sidebarReducer;
  return {
    sidebarReducer, // By ES6 Javscript, this is the same as: sidebarReducer: sidebarReducer,
  };
}

/**
 * Just as with mapStateToProps, the items of the return object of this function are passed as props to the component.
 * In this example, SomeComponent will be able to use the setSize function using: this.props.setSize(number)
 */
mapDispatchToProps = (state: any) => {  // Note that the state parameter is store.getState()
  return {
    setSize: (size: number) => {    // setSize here is defined as a function which takes in a number.
      dispatch(setSize(size));      // 'dispatch' is called which takes in a object that will be passed to all reducers - it is important therefore that reducers distinguish between actions by using an action type. In this case, the object provided to the dispatch function is returned by the setSize - a function which we defined inside the actions folder in a sidebarAction.ts file.
    },
  };
}

/**
 * Finally, to connect redux and pass the above written values as props to the component we export by default the return of the return of the 'connect' function from react-redux.
 * The first two values passed are the 'mapStatesToProps' and 'mapDispatchToProps' functions respectively. If one or the other is not required, for example no dispatch functions are required, than in place of the function 'null' can be passed.
 * Lastly, connect returns a function which takes in a component. In this case, we pass the 'SomeComponent' component which will have the provided states and dispatches mapped to its props. 
 */
export default connect(mapStatesToProps, mapDispatchToProps)(SomeComponent);
```