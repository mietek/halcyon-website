'use strict';

var React = require('react');


exports.StaticField = React.createClass({
  displayName: 'StaticField',
  getDefaultProps: function () {
    return {
      title: undefined
    };
  },
  render: function () {
    return (
      React.createElement('span', {
        id:        this.props.id,
        className: this.props.className || 'static-field'
      }, this.props.title));
  }
});


exports.BackgroundImage = React.createClass({
  displayName: 'BackgroundImage',
  getDefaultProps: function () {
    return {
      src: undefined
    };
  },
  getInitialState: function () {
    return {
      visible: false
    };
  },
  render: function () {
    var className = this.props.className || 'background-image';
    className += this.state.visible ? '' : ' hidden';
    return (
      React.createElement('img', {
        id:        this.props.id,
        className: className,
        src:       this.state.visible ? this.props.src : undefined
      }));
  }
});


exports.InputField = React.createClass({
  displayName: 'InputField',
  getDefaultProps: function () {
    return {
      enabled:     false,
      type:        undefined,
      placeholder: undefined,
      value:       undefined,
      onChange:    undefined
    };
  },
  change: function (event) {
    this.props.onChange(event.target.value);
  },
  render: function () {
    return (
      React.createElement('input', {
          id:           this.props.id,
          className:    this.props.className || 'input-field',
          disabled:     !this.props.enabled,
          type:         this.props.type || 'text',
          placeholder:  this.props.placeholder,
          value:        this.props.value,
          onChange:     this.change
        }));
  }
});


exports.InputWidget = React.createClass({
  displayName: 'InputWidget',
  getDefaultProps: function () {
    return {
      type:        undefined,
      placeholder: undefined,
      onChange:    undefined
    };
  },
  getInitialState: function () {
    return {
      enabled: false,
      value:   undefined
    };
  },
  render: function () {
    return (
      React.createElement('div', {
          className: 'flex'
        },
        React.createElement(exports.InputField, {
            id:          this.props.id,
            className:   this.props.className,
            enabled:     this.state.enabled,
            type:        this.props.type,
            placeholder: this.props.placeholder,
            value:       this.state.value,
            onChange:    this.props.onChange
          })));
  }
});


exports.PushButton = React.createClass({
  displayName: 'PushButton',
  getDefaultProps: function () {
    return {
      enabled: false,
      title:   undefined,
      onClick: undefined
    };
  },
  click: function (event) {
    event.preventDefault();
    this.props.onClick();
  },
  render: function () {
    var className = this.props.className || 'pill-button'; // TODO: Clean up CSS.
    className += this.props.enabled ? ' enabled' : ' disabled';
    return (
      React.createElement('a', {
          id:        this.props.id,
          className: className,
          href:      this.props.enabled && '',
          onClick:   this.props.enabled && this.click
        }, this.props.title));
  }
});


exports.MapItemWidget = React.createClass({
  displayName: 'MapItemWidget',
  getDefaultProps: function () {
    return {
      enabled:       false,
      required:      false,
      name:          undefined,
      value:         undefined,
      onChangeName:  undefined,
      onChangeValue: undefined,
      onRemove:      undefined
    };
  },
  render: function () {
    var className = 'input-field';
    className += this.props.required ? ' required' : '';
    return (
      React.createElement('div', {
          className: 'flex-item'
        },
        React.createElement(exports.InputField, {
            className:   className,
            enabled:     this.props.enabled && !this.props.required,
            placeholder: this.props.required ? 'required name' : 'name',
            value:       this.props.name,
            onChange:    this.props.onChangeName
          }),
        React.createElement(exports.InputField, {
            className:   className,
            enabled:     this.props.enabled,
            placeholder: this.props.required ? 'required value' : 'value',
            value:       this.props.value,
            onChange:    this.props.onChangeValue
          }),
        React.createElement(exports.PushButton, {
            className:   'map-button',
            enabled:     this.props.enabled && !this.props.required,
            title:       'Remove',
            onClick:     this.props.onRemove
          })));
  }
});


exports.MapWidget = React.createClass({
  displayName: 'MapWidget',
  getDefaultProps: function () {
    return {
      onChange: undefined
    };
  },
  getInitialState: function () {
    return {
      enabled: false,
      items:   undefined
    };
  },
  changeItemName: function (changedIndex, changedName) {
    var found = false;
    var changedItems = [];
    this.state.items.forEach(function (item, index) {
        if (index === changedIndex) {
          found = true;
          changedItems.push({
              required: item.required,
              name:     changedName,
              value:    item.value
            });
        } else {
          changedItems.push(item);
        }
      });
    if (found) {
      this.props.onChange(changedItems);
    }
  },
  changeItemValue: function (changedIndex, changedValue) {
    var found = false;
    var changedItems = [];
    this.state.items.forEach(function (item, index) {
        if (index === changedIndex) {
          found = true;
          changedItems.push({
              required: item.required,
              name:     item.name,
              value:    changedValue
            });
        } else {
          changedItems.push(item);
        }
      });
    if (found) {
      this.props.onChange(changedItems);
    }
  },
  removeItem: function (removedIndex) {
    var found = false;
    var changedItems = [];
    this.state.items.forEach(function (item, index) {
        if (index === removedIndex) {
          found = true;
        } else {
          changedItems.push(item);
        }
      });
    if (found) {
      this.props.onChange(changedItems.length ? changedItems : undefined);
    }
  },
  addItem: function () {
    var changedItems = [];
    if (this.state.items) {
      this.state.items.forEach(function (item) {
          changedItems.push(item);
        });
    }
    changedItems.push({});
    this.props.onChange(changedItems);
  },
  render: function () {
    return (
      React.createElement('div', null,
        this.state.items && this.state.items.map(function (item, index) {
            return (
              React.createElement(exports.MapItemWidget, {
                  key:           index,
                  enabled:       this.state.enabled,
                  required:      item.required,
                  name:          item.name,
                  value:         item.value,
                  onChangeName:  function (name) {
                    this.changeItemName(index, name);
                  }.bind(this),
                  onChangeValue: function (value) {
                    this.changeItemValue(index, value);
                  }.bind(this),
                  onRemove:      function () {
                    this.removeItem(index);
                  }.bind(this)
                }));
          }.bind(this)),
        React.createElement('div', {
            className: 'flex-item justify-end'
          },
          React.createElement(exports.PushButton, {
              className: 'map-button',
              enabled:   this.state.enabled,
              title:     'Add',
              onClick:   this.addItem
            }))));
  }
});


exports.LegendArea = React.createClass({
  displayName: 'LegendArea',
  getDefaultProps: function () {
    return {
      pre: false
    };
  },
  render: function () {
    var tag = this.props.pre ? 'pre' : 'div';
    var className = this.props.pre ? '' : 'pre-like';
    return (
      React.createElement(tag, {
          id:        this.props.id,
          className: className
        },
        this.props.pre ? React.createElement('code', null, this.props.children) : this.props.children));
  }
});


exports.BimodalPushButton = React.createClass({
  displayName: 'BimodalPushButton',
  getDefaultProps: function () {
    return {
      enabled:      false,
      mode:         false,
      trueTitle:    undefined,
      falseTitle:   undefined,
      onTrueClick:  undefined,
      onFalseClick: undefined
    };
  },
  click: function (event) {
    event.preventDefault();
    var onClick = this.props.mode ? this.props.onTrueClick : this.props.onFalseClick;
    onClick();
  },
  render: function () {
    var className = this.props.className || 'bimodal-button';
    className += this.props.enabled ? ' enabled' : ' disabled';
    className += this.props.mode ? ' true' : ' false';
    var title = this.props.mode ? this.props.trueTitle : this.props.falseTitle;
    return (
      React.createElement('a', {
          id:        this.props.id,
          className: className,
          href:      this.props.enabled && '',
          onClick:   this.props.enabled && this.click
        }, title));
  }
});


exports.RadioButton = React.createClass({
  displayName: 'RadioButton',
  getDefaultProps: function () {
    return {
      enabled:  false,
      selected: false,
      title:    undefined,
      onClick:  undefined
    };
  },
  click: function (event) {
    event.preventDefault();
    this.props.onClick();
  },
  render: function () {
    var className = this.props.className || 'radio-button';
    className += this.props.enabled ? ' enabled' : ' disabled';
    className += this.props.selected ? ' selected' : '';
    return (
      React.createElement('a', {
          id:        this.props.id,
          className: className,
          href:      this.props.enabled && '',
          onClick:   this.props.enabled && this.click
        }, this.props.title));
  }
});


exports.LoadingDisplay = React.createClass({
  displayName: 'LoadingDisplay',
  getDefaultProps: function () {
    return {
      loadingMsg: 'Loading…'
    };
  },
  render: function () {
    return (
      React.createElement('div', {
          className: 'loading'
        },
        React.createElement('p', null,
          this.props.loadingMsg)));
  }
});


exports.ErrorDisplay = React.createClass({
  displayName: 'ErrorDisplay',
  getDefaultProps: function () {
    return {
      error:       undefined,
      errorMsg:    'Something went wrong.',
      noReloadMsg: false
    };
  },
  render: function () {
    if (!this.props.error) {
      return (
        React.createElement('div'));
    }
    return (
      React.createElement('div', {
          className: 'error'
        },
        React.createElement('p', null,
          this.props.errorMsg,
          this.props.noReloadMsg ? null :
            React.createElement('span', null,
              ' Please ',
              React.createElement('a', {
                  href: ''
                },
                'reload'),
              ' the page and try again.')),
          React.createElement('code', null,
            JSON.stringify({
                error: this.props.error
              }))));
  }
});


exports.DynamicDisplay = React.createClass({
  displayName: 'DynamicDisplay',
  getDefaultProps: function () {
    return {
      value:       undefined,
      loadingMsg:  undefined,
      error:       undefined,
      errorMsg:    undefined,
      noReloadMsg: false
    };
  },
  render: function () {
    return (
      React.createElement('div', null,
        (!this.props.value && !this.props.error) ? React.createElement(exports.LoadingDisplay, {
            loadingMsg:  this.props.loadingMsg
          }) : null,
        this.props.error ? React.createElement(exports.ErrorDisplay, {
            error:       this.props.error,
            errorMsg:    this.props.errorMsg,
            noReloadMsg: this.props.noReloadMsg
          }) : null));
  }
});


exports.AccountWidget = React.createClass({
  displayName: 'AccountWidget',
  getDefaultProps: function () {
    return {
      referralCode: undefined,
      noExtraMsg:   false,
      onConnect:    undefined,
      onForget:     undefined
    };
  },
  getInitialState: function () {
    return {
      enabled:      false,
      account:      undefined,
      accountError: undefined
    };
  },
  connect: function (event) {
    event.preventDefault();
    this.props.onConnect();
  },
  render: function () {
    // TODO: Refactor this.
    var account = this.state.account;
    var err     = this.state.accountError;
    var extraMsg;
    if (err === 'no_token') {
      account  = 'none';
      err      = null;
      extraMsg = React.createElement('div', {
          className: 'meta'
        },
        React.createElement('p', null,
          'Please ',
          React.createElement('a', {
              href: '',
              onClick: this.connect
            },
            'connect'),
          ' your DigitalOcean account to continue.'),
        React.createElement('p', null,
          'If you need to sign up for an account, you can use a ',
          React.createElement('a', {
              href: 'https://cloud.digitalocean.com/registrations/new?refcode=' + this.props.referralCode
            },
            'referral link'),
          ' to receive $10 credit from DigitalOcean and help the Halcyon project.'));
    }
    return (
      React.createElement('div', null,
        React.createElement('div', {
            className: 'flex'
          },
          React.createElement(exports.StaticField, {
              className: 'account-field' + (this.state.account ? '' : ' meta'),
              title:     this.state.account ? this.state.account : 'none'
            }),
          React.createElement(exports.BimodalPushButton, {
              className:    'account-button',
              enabled:      this.state.enabled,
              mode:         !!this.state.account,
              trueTitle:    'Forget',
              falseTitle:   'Connect',
              onTrueClick:  this.props.onForget,
              onFalseClick: this.props.onConnect
            })),
        React.createElement(exports.DynamicDisplay, {
          value:      account,
          loadingMsg: 'Loading account…',
          error:      err,
          errorMsg:   'Failed to load account.'
        }),
        this.props.noExtraMsg ? null : extraMsg));
  }
});
