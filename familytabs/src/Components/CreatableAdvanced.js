import React, { Component } from 'react';
import axios from 'axios'
import CreatableSelect from 'react-select/lib/Creatable';


export default class CreatableAdvanced extends Component{
    state = {
        isLoading: false,
      };


      makeOptions = options => options.map(option=> {console.log(option);return{ value:option.id, label: option[`${this.props.name}_name`]}})

  handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.props.setValue(newValue.value)
  };
  handleCreate = async (inputValue) => {
      const {name, familyID} = this.props
    this.setState({ isLoading: true });
    console.group('Option created');
    console.log('Wait a moment...', inputValue);
    let response = await axios.post(`${process.env.REACT_APP_API_URL}/${this.props.name}/create`, {[`${name}_name`]:inputValue, familyID})
    this.props.addOption(this.props.name, response.data[0])
    this.setState({isLoading:false})
  };

  render() {
    const {  options, value} = this.props;
    console.log(value)
    return (
      <CreatableSelect
        isClearable
        isDisabled={this.state.isLoading}
        isLoading={this.state.isLoading}
        onChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={this.makeOptions(options)}
        //value={value}
      />
    );
  }
}
