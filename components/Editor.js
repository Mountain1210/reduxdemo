const React = require("react");
const {FormControl, ControlLabel, Button, FormGroup} = require("react-bootstrap");
const ReactDOM = require("react-dom");

// props {submit(value)}
const Editor = React.createClass({


    getInitialState() {
        return {
            text: ""
        }
    },

    submit() {

        let titleDOM = ReactDOM.findDOMNode(this.refs.title);
        let bodyDOM = ReactDOM.findDOMNode(this.refs.body);

        this.props.submit({ title: titleDOM.value, body: bodyDOM.value });
        titleDOM.value = "";
        bodyDOM.value = "";

    },

    render() {
        return <form>
            <FormGroup controlId="formControlsText">
                <ControlLabel>标题</ControlLabel>
                <FormControl type="text" ref="title"/>
            </FormGroup>
            <FormGroup controlId="formControlsText">
                <ControlLabel>内容</ControlLabel>
                <FormControl  componentClass="textarea" ref="body" />
            </FormGroup>
            <div>
                <Button onClick= {this.submit}> 添加 </Button>
            </div>
        </form>
    }


});

module.exports = Editor;


