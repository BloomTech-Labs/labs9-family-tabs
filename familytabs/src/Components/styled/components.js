import styled from "styled-components";

export const StyledFormWrapper = styled.div`
  height: 100%;
  z-index: 3000;
  width: 100vw;
  background: #00000080;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow:scroll ;
  form {
    width: 500px;
    background: #68659e;
    display: flex;
    flex-direction: column;
    overflow:auto ;
        h2 {
      font-family: "Merriweather", sans-serif;
      font-size: 32px;
      color: white;
      margin: 90px;
    }
    input {
      cursor: text;
      width: 400px;
      margin: 10px auto;
      padding: 0 20px;
      height: 35px;
      color: white;
      ::placeholder {
        color: whitesmoke;
        opacity: 0.6;
      }
      border-style: none;
      background-color: #68659e;
    }
    .participants-input {
      border-style: none;
      background-color: #68659e;
      width: 420px;
      margin: 10px auto;
      svg {
        color: white;
      }
      .css-xwjg1b,
      .css-12jo7m5 {
        background-color: inherit;
        color: inherit;
        margin: 0;
      }

      .css-1hwfws3 {
        /* event type location dropdown selected */
        max-width: 500px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: nowrap;
        cursor: text;
        .css-1g6gooi{
          color:white;
        }
      }
      .css-vj8t7z,
      .css-bl6clz,
      .css-2o5izw {
        /* event type location dropdown */
        border-style: inherit;
        background-color: inherit;
        width: 100%;
        height: 35px;
        color: white;
        padding: 0 20px;
        .css-xp4uvy {
          color: inherit;
        }
        .css-1492t68 {
          color: whitesmoke;
          opacity: 0.6;
        }
      }
    }
    .switchbox {
      width: 360px;
      margin: 8px auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: white;
    }
    .popper-end {
      .react-datepicker__month-container {
        display: none;
      }
      button {
        display: none;
      }
    }
    .button-box {
      width: 400px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      button {
        margin: 10px 0px 20px 10px;
        color: white;
        background: #68659e;
        border: 2px solid #ffffff;
        /* padding: 15px 50px 15px 50px; */
        min-width: 100px;
        height: 25px;
        margin-left: 5px;

        :hover {
          border-color: #3985ac;
          color: #3985ac;
          cursor: pointer;
        }
      }
    }
    svg{
      cursor:pointer;
    }
  }
`;

export const StyledFamilyForm = styled.form`
  width: 500px;
  margin: 0 auto;
  background: #68659e;
  display: flex;
  flex-direction: column;
  h2 {
    font-family: "Merriweather", sans-serif;
    font-size: 32px;
    color: white;
    margin: 30px;
  }
  input {
    background-color: #68659e;
    cursor: text;
    width: 400px;
    margin: 10px auto;
    padding: 0 20px;
    height: 35px;
    color: white;
    ::placeholder {
      color: whitesmoke;
      opacity: 0.6;
    }
  }
  .button-box {
    width: 400px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    button {
      margin: 10px 0px 20px 10px;
      color: white;
      background: #68659e;
      border: 2px solid #ffffff;
      /* padding: 15px 50px 15px 50px; */
      min-width: 100px;
      height: 25px;
      margin-left: 5px;

      :hover {
        border-color: #3985ac;
        color: #3985ac;
        cursor: pointer;
      }
    }
  }
`;
