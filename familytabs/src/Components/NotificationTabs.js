import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';
import "react-tabs/style/react-tabs.css";


const StyledTabs = styled(Tabs)`
.react-tabs__tab-list {
  border: 2px solid red;
  display: flex;
  margin: 0 0 10px;
  padding-top: 15px;
}
`;


class NotificationTabs extends Component {
    render() {
        return (
        <StyledTabs>
            <Tabs>
            <TabList>
              <Tab>Pending</Tab>
              <Tab>Approved</Tab>
              <Tab>Declined</Tab>
            </TabList>
        
            <TabPanel>
              <h2>Any content 1</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
            <TabPanel>
              <h2>Any content 3</h2>
            </TabPanel>
          </Tabs>
          </StyledTabs>
        );
    }
};

export default NotificationTabs;
