'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.state = {
            options: []
        };
        _this.handleRemoveAll = _this.handleRemoveAll.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOptions = _this.handleAddOptions.bind(_this);
        _this.handleDeleteOption = _this.handleDeleteOption.bind(_this);
        return _this;
    }

    _createClass(IndecisionApp, [{
        key: 'handleRemoveAll',
        value: function handleRemoveAll() {
            // this.setState(() => {
            //     return {
            //         options: []
            //     }
            // })
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'handlePick',
        value: function handlePick() {
            var random = Math.floor(Math.random() * this.state.options.length);
            var option = this.state.options[random];
            alert(option);
        }
    }, {
        key: 'handleAddOptions',
        value: function handleAddOptions(option) {

            if (!option) {
                return 'Enter a valid value to add in the options';
            } else if (this.state.options.indexOf(option) > -1) {
                return 'The option already exists';
            }

            // this.setState((prevState) => {
            //     return {
            //         options: prevState.options.concat([option])
            //     }
            // })
            this.setState(function (prevState) {
                return { options: prevState.options.concat([option]) };
            });
        }
    }, {
        key: 'handleDeleteOption',
        value: function handleDeleteOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var json = JSON.parse(localStorage.getItem('Options'));
            if (json) {
                this.setState(function () {
                    return {
                        options: json
                    };
                });
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevStat) {
            try {
                if (prevStat.options.length !== this.state.options.length) {
                    var json = JSON.stringify(this.state.options);
                    localStorage.setItem('Options', json);
                }
            } catch (e) {
                // do nothing
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {}
    }, {
        key: 'render',
        value: function render() {
            var subtitle = 'Put your life in hands of a computer';
            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, { options: this.state.options.length > 0, pickOption: this.handlePick }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleRemoveOptions: this.handleRemoveAll,
                    handleDeleteOption: this.handleDeleteOption
                }),
                React.createElement(AddOption, {
                    handleAddOptions: this.handleAddOptions
                })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: 'Indecision App'

    // class Header extends React.Component {
    //     render() {
    //         return (
    //             <div>
    //                 <h1>{this.props.title}</h1>
    //                 <h2>{this.props.subtitle}</h2>
    //             </div>
    //         )
    //     }
    // }

};var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { disabled: !props.options, onClick: props.pickOption },
            'What should I do?'
        )
    );
};

// class Action extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button disabled={!this.props.options} onClick={this.props.pickOption}>What should I do?</button>
//             </div>
//         )
//     }
// }


var Option = function Option(props) {

    return React.createElement(
        'div',
        null,
        props.optionText,
        React.createElement(
            'button',
            { onClick: function onClick(e) {
                    props.handleDeleteOption(props.optionText);
                } },
            'remove'
        )
    );
};

// class Option extends React.Component {

//     render() {
//         return (
//             <div>
//                 {this.props.optionText}
//             </div>
//         )
//     }
// }


var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleRemoveOptions },
            'Remove All'
        ),
        props.options.length > 0 ? props.options.map(function (option) {
            return React.createElement(Option, { key: option, optionText: option, handleDeleteOption: props.handleDeleteOption });
        }) : React.createElement(
            'p',
            null,
            'Please add some options to get started'
        )
    );
};

// class Options extends React.Component {

//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div>
//                 <button onClick={this.props.handleRemoveOptions}>Remove All</button>
//                 <p>Options are here</p>
//                 {
//                     this.props.options.map((option) =>
//                         <Option key={option} optionText={option} />
//                     )
//                 }
//             </div>
//         )
//     }
// }

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOptions = _this2.handleAddOptions.bind(_this2);
        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    _createClass(AddOption, [{
        key: 'handleAddOptions',
        value: function handleAddOptions(e) {
            e.preventDefault();
            var option = e.target.elements.option.value.trim();
            var error = this.props.handleAddOptions(option);

            // this.setState(() => {
            //     return {
            //         error: error
            //     }
            // })
            this.setState(function () {
                return { error: error };
            });
            if (!error) {
                e.target.elements.option.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error ? React.createElement(
                    'p',
                    null,
                    this.state.error
                ) : '',
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOptions },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Options'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

// stateless functional component
// const User = (props) =>{
//     return(
//         <div>
//         <p>User: {props.name}</p>
//         <p>Age: {props.age}</p>
//         </div>
//     )
// }


// const jsx = (
//     <div>
//         <Header />
//         <Action />
//         <Options />
//         <AddOption />
//     </div>
// );

// ReactDOM.render(jsx, document.getElementById('app'));

ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
