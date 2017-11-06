import React from 'react';
import {AppRegistry, View, Text, TextInput, StyleSheet, TouchableHighlight} from 'react-native';
import PropTypes from 'prop-types';

export default class NewTodo extends React.Component {

    constructor(props, context) {

        super(props, context);

        this.state = {
            task: ''
        };
    }

    onChange(text) {
        this.task = text;
    }

    onAddPressed() {
        this.props.onAdd(this.task);
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input}
                           onChangeText={this.onChange.bind(this)}
                />
                <TouchableHighlight
                    onPress={this.onAddPressed.bind(this)}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={this.props.onCancel}
                    style={[styles.button, styles.cancleButton]}
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

NewTodo.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 150,
        backgroundColor: '#f7f7f7'
    },
    input: {
        borderWidth: 1,
        borderColor: '#d7d7d7',
        height: 50,
        marginRight: 10,
        marginLeft: 10,
        padding: 15,
        borderRadius: 3
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fafafa'
    },
    button: {
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#05a5d1',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancleButton: {
        backgroundColor: '#666'
    }
});