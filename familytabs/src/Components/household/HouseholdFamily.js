import React from "react";
import styled from "styled-components";
import axios from "axios";
import HouseholdModal from "./HouseholdModal";

const Card = styled.div`
  border: 2px solid lightgrey;
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 2;
  background: #ffffff;
  font-family: "Roboto", sans-serif;
  margin: 28px;
`;

const Header = styled.div`
  /* border: 1px solid red; */
  font-family: "Fredoka One";
  color: black;
  font-size: 18px;
  width: 100%;
  height: 60px;
  justify-content: center;
  padding-top: 10px;
  display: flex;
`;

const Info = styled.div`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 10px;
`;

class HouseholdFamily extends React.Component {
  state = {
    family_name: "",
    userName: "",
    phone: "",
    email: "",
    isAdmin: false,
    showForm: false,
    notification:false
  };
  componentDidMount() {
    this.setState({ ...this.props.familydata, notification : this.props.familydata.textCheckbox });
  }

  handleNotificationChange=(notification) =>{
    this.setState({ notification });
  }

  handleAdminChange=(isAdmin) =>{
    this.setState({ isAdmin });
  }

  inputHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onInputChange = (inputValue, { action }) => {
    this.setState({ isAdmin: inputValue });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  memberEdit = async e => {
    e.preventDefault();
    const { userName, phone, email, isAdmin , notification} = this.state;
    const { familyID, id } = this.props.familydata;
    const newProfile = {
      userName,
      phone,
      email,
      isAdmin,
      textCheckbox: notification
    };

    try {
      console.log(newProfile);
      let res = await axios.put(
        `${process.env.REACT_APP_API_URL}/profile/edit/${id}`,
        newProfile
      );
      console.log(res);
      this.props.loadState(familyID);
      this.setState({ showForm: false });
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    let { family_name, userName, phone, email } = this.state;
    return (
      <div className="ParentHomepage">
        <Card>
          <Header>Family: {family_name}</Header>
          <Info>
            <p>Username: {userName}</p>
            <p>Phone: {phone}</p>
            <p>Email: {email}</p>
            <p>Admin: {this.props.familydata.isAdmin ? 'Yes':'No'}</p>
            <p>Notifications: {this.props.familydata.textCheckbox ? 'On':'Off'}</p>
          </Info>
          {this.props.profile.isAdmin ? (
            <button onClick={this.toggleForm}>Edit</button>
          ) : (
            ""
          )}
        </Card>

        {this.state.showForm ? (
          <HouseholdModal
            edit
            toggleForm={this.toggleForm}
            inputHandler={this.inputHandler}
            onInputChange={this.onInputChange}
            {...this.state}
            addOrEdit={this.memberEdit}
            handleNotificationChange={this.handleNotificationChange}
            handleAdminChange={this.handleAdminChange}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default HouseholdFamily;
