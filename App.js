import React from 'react';
import {Alert, AppRegistry, View, StyleSheet, Text} from 'react-native';
import TaskList from "./TaskList";
import NewTodo from "./NewTodo";
import store from "./TodoStore";
import {
    StackNavigator, NavigationActions
} from 'react-navigation';
import PropTypes from 'prop-types';


class Home extends React.Component {
    static navigationOptions = {
        title: 'Welcome'
    };

    constructor(props, context) {
        super(props, context);

        //console.log(props);
        this.state = store.getState();

        store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    onAddStarted() {

        console.log("this.props.navigation", this.props.navigation);
        this.props.navigation.navigate('NewTodo');
    }

    onDone(todo) {
        console.log("done", todo.task);

        store.dispatch({
            type: 'DONE_TODO',
            todo,
        });
    }

    onToggle() {
        store.dispatch({
            type: 'TOGGLE_STATE'
        });
    }

    render() {


        return (
            <View style={{flex: 1}}>

                <TaskList
                    onAddStarted={this.onAddStarted.bind(this)}
                    filter={this.state.filter}
                    onDone={this.onDone.bind(this)}
                    onToggle={this.onToggle.bind(this)}
                    todos={this.state.todos}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 3,

        backgroundColor: 'steelblue',
    },
});


Home.propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};

class NewTodoScreen extends React.Component {

    static navigationOptions = {
        title: 'New Todo'
    };


    constructor(props, context) {
        super(props, context);
        this.state = props.screenProps;
    }

    onCancel() {
        //this.props.navigation.dispatch(NavigationActions.back());
        this.props.navigation.goBack();
    }

    onAdd(task) {

        //this.state.todos.push({task});
        //this.setState({todos: this.state.todos});

        store.dispatch({
            type: 'ADD_TODO',
            task,
        });
        this.props.navigation.dispatch(NavigationActions.back());
    }

    render() {
        return <NewTodo onAdd={this.onAdd.bind(this)}
                        onCancel={this.onCancel.bind(this)}
        />;
    }

}

NewTodoScreen.propTypes = {
    screenProps: PropTypes.object.isRequired,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        dispatch: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired,
    }).isRequired,
};

const SimpleApp = StackNavigator({
    Home: {screen: Home},
    NewTodo: {screen: NewTodoScreen},
}, {
    mode: 'modal',
    initialRouteName: 'Home'


});


export default class App extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            todos: [
                {
                    task: 'App2',
                },
                {
                    task: 'Learn React Native',
                },
                {
                    task: 'Test',
                },
                {
                    task: 'Test2',
                }
            ]
        };

    }

    render() {
        return <SimpleApp screenProps={this.state}/>;
    }

    onCancel() {
        console.log('test');
    }
}
