import React, { createContext, useReducer, useContext, useMemo } from "react";
import ReactDOM from "react-dom";

const CustomContext = createContext(null);

class Store {
    static data = {};
    static updateData(name) {
        if (!Store.data[name]) {
            Store.data[name] = {
                counter: 0,
                message: `Test Message ${name}`
            };
        }
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT": {
            // const { d, nodeParams, results } = action.data;
            // const newVal = Store.createPrimaryValueData(d, nodeParams, results);
            // return {
            //   ...state,
            //   primaryValData: newVal
            // };
            return state;
        }
        default: {
            throw new Error("Unexpected action");
        }
    }
};

function App() {
    const data = [{ name: "1" }, { name: "2" }];
    return data.map(d => {
        Store.updateData(d.name);
        return <Comp key={d.name} name={d.name} />;
    });
}

function Comp({ name }) {
    return (
        <CustomProvider name={name}>
            <Counter />
            {useMemo(() => {
                return <Test />

            }, [])}
        </CustomProvider>
    );
}

function Test() {
    const [data] = useContext(CustomContext);
    console.log("Render Test")
    return <div> {"data.message"}</div >;

}

function Counter() {
    const [data] = useContext(CustomContext);

    return <div>Counter {data.counter}</div>;
}

function CustomProvider({ children, name }) {
    const contextValue = useReducer(reducer, Store.data[name]);
    return (
        <CustomContext.Provider value={contextValue}>
            {children}
        </CustomContext.Provider>
    );
}

const rootElement = document.getElementById("root");
setInterval(() => {
    ReactDOM.render(<App />, rootElement);
}, 3000);
