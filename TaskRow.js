import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';


export default class TaskRow extends React.Component {

    constructor(props, context) {

        super(props, context);


        //this.state = {};
    }

    onDonePressed() {
        this.props.onDone(this.props.todo);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}> {this.props.todo.task}
                </Text>
                <TouchableHighlight style={styles.doneButton}
                                    onPress={this.onDonePressed.bind(this)}
                >
                    <Text style={styles.label}>Done</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

TaskRow.propTypes = {
    onDone: PropTypes.func.isRequired,
    todo: PropTypes.shape({
        task: PropTypes.string.isRequired,
    })
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E7E7E7',
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: '300'
    },
    doneButton: {
        borderRadius: 5,
        backgroundColor: '#eaeaea',
        padding: 5,
    }

});
