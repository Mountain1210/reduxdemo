const React = require("react");
const Editor = require("./Editor");
const List = require("./List");
const redux = require("redux");
const {connect, Provider} = require("react-redux");
const ReactDOM = require("react-dom");
const navbar = require("./navbar");
const {Grid, Row, Col} = require("react-bootstrap");
const Login = require("./Login");
const thunk = require("redux-thunk").default;

// {
//     list,
//     logined: true/ false,
//     loginError
// }

function reducer(state, action) {
	console.log("APPPPPPPPPPPPPPPPPPPPPPPP");
	console.log(state);
    console.log("APPPPPPPPPPPPPPPPPPPPPPPP");
	if (typeof state === "undefined") return { list: [] }
    switch (action.type) {
        case "init":
            return action.payload;
        case "add":
            console.log(action.payload);
            let list = state.list.concat(action.payload);
            return Object.assign({}, state, { list });
        case "logined":
            if (action.error) {
                return Object.assign({}, state, { loginError: action.payload, logined: false });
            } else {
                return Object.assign({}, state, { loginError: null, logined: true });
            }
        case "logout":
            return Object.assign({}, state, { loginError: null, logined: false });

        default:
            return state;
    }
}

const store = redux.createStore(reducer, { list: [] }, redux.applyMiddleware(thunk));


//actions是写方法的地方，同时也是发送dispatch()的地方。

const actions = {

    init() {
        return function (dispatch) {
			
            fetch("data.json").then(function (res) {
                res.json().then(data => {
                    dispatch({
                        type: "init",
                        payload: data
                    });
                });
            })

        }
    },

    submit(value) {
        return {
            type: "add",
            payload: value
        }
    },
    login(info) {
		console.log(info);
        if (info.loginname === "leo" && info.password === "123") {
            return {
                type: "logined",
                payload: info
            }
        } else {
            return {
                type: "logined",
                error: true,
                payload: new Error("登录失败")

            }
        }

    },
    logout() {
        return {
            type: "logout"
        }
    }
}

let App = React.createClass({

    componentDidMount() {
        this.props.init();
    },


    render() {
        return <div>
            {navbar}

            <Grid>
                <Row className="show-grid">
                    <Col xs={12} md={8}>
                        <List list={this.props.list}/>
                    </Col>
                    <Col xs={6} md={4}>

                        {this.props.logined ? <div> 登录成功 ！<button onClick={this.props.logout}>退出登陆</button></div> : <Login loginError={this.props.loginError} login={this.props.login}/>}
                    </Col>
                </Row>
            </Grid>
            <Editor submit={this.props.submit}/>
        </div>
    }
});

App = connect(state => state, actions)(App)


ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.body);