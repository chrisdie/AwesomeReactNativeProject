/**
 * Created by cdi on 28.10.2017.
 */
import React from 'react';
import {Alert, AppRegistry, View, Switch, ListView, StyleSheet, Text, TouchableHighlight} from 'react-native';
import TaskRow from './TaskRow';
import PropTypes from 'prop-types';

export default class TaskList extends React.Component {


    constructor(props, context) {

        super(props, context);

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.todos)
        };


    }

    componentWillReceiveProps(nextProps) {
        const dataSource = this.state.dataSource.cloneWithRows(nextProps.todos);

        console.log("componentWillReceiveProps");
        this.setState({dataSource});


    }

    renderRow(todo) {
        return (
            <TaskRow todo={todo} onDone={this.props.onDone}/>
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Switch value={this.props.filter !== 'pending'}
                            onValueChange={this.props.onToggle}/>
                    <Text>
                        Showing {this.props.todos.length} {this.props.filter} todo(s)
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    key={this.props.todos}
                    renderRow={this.renderRow.bind(this)}
                />
                <TouchableHighlight style={styles.button}
                                    onPress={this.props.onAddStarted}
                >
                    <Text style={styles.buttonText}> Add one</Text>
                </TouchableHighlight>
            </View>
        );
    }


}

TaskList.propTypes = {
    onAddStarted: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggle: PropTypes.func.isRequired,
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        paddingTop: 40,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',

    },
    label: {
        fontSize: 20,
        fontWeight: '300'
    },
    button: {
        height: 60,
        borderColor: '#05A5D1',
        borderWidth: 2,
        backgroundColor: '#333',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600'

    }

});
