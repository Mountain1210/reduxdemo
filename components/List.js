const React = require("react");
const {PanelGroup, Panel} = require("react-bootstrap");

// props { list }
const List = React.createClass({
    render() {

        let list = this.props.list.map((item, index) => {
            return <Panel header={item.title} eventKey={index}>{item.body}</Panel>
        })

        return <PanelGroup defaultActiveKey="1" accordion>
            {list}
        </PanelGroup>
    }
});

module.exports = List;