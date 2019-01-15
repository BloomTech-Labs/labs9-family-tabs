import React from 'react'

function HouseholdFamily(props) {
    
      return (
        <div className="ParentHomepage">
           <h2>Family Information</h2>
           <div>
             <p>Family: {props.familydata.family_name}</p>
             <p>Usernamae: {props.familydata.userName}</p>
             <p>Phone: {props.familydata.phone}</p>
             <p>Email: {props.familydata.email}</p>
             <p>Admin: {props.familydata.isAdmin}</p>
         </div>
        </div>
      );
  }
  
  export default HouseholdFamily;

