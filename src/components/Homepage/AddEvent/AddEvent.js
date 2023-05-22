import { useState } from "react";
import Styled from "styled-components";

import { getTimeBetweenDates } from "../../../util/date";

import DatePicker from "../../../UI/DatePicker/DatePicker";
import ColorPicker from "../../../UI/ColorPicker/ColorPicker";

const Container = Styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
`;

const CardHeader = Styled.div`
  color: #434d56;
  font-weight: 500;
  font-size: 1.4rem;
  padding: 14px 16px;
`;

const CardBody = Styled.div`
    margin: 0 0 10px 0;
    padding: 0 16px;
`;

const CardFooter = Styled.div`
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #eaedfa;
  padding: 14px 16px 14px 16px;
`;

const Warning = Styled.span`
  display: block;
  color: #f96353;
  font-size: 0.9rem;
`;

const Input = Styled.input`
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: 1rem;
  padding: 8px;
  border: 1px solid rgba(184, 192, 199, 0.6);
  border-radius: 4px;

  &:focus {
    border: 1px solid rgba(46, 72, 205, 0.6);
    outline: none;
  }
`;

const ButtonPrimary = Styled.button`
  padding: 8px 18px;
  border: none;
  background: rgb(12,28,63);
  background: linear-gradient(90deg, rgba(12,28,63,1) 10%, rgba(16,38,76,1) 39%, rgba(22,54,96,0.9808123933167017) 98%);
  color: #fff;
  border-radius: 5px;
  font-size: 0.88rem;
  font-weight: 500;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background: rgb(12,28,63);
    background: linear-gradient(90deg, rgba(12,28,63,0.92) 10%, rgba(16,38,76,0.86) 39%, rgba(22,54,96,0.82) 98%);
  }
`;

const ButtonGhost = Styled.button`
  padding: 8px 18px;
  border: none;
  background-color: transparent;
  border: 1px solid #acb7ec;
  color: #000;
  border-radius: 5px;
  font-size: 0.88rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background-color: #acb7ec;
  }
`;

const Label = Styled.label`
    color: #4f5a64;
    font-weight: 500;
    margin: 0 10px 0 0 ;
    padding: 0;
    font-size: 0.9rem;
`;

  const FormLayoutElement = Styled.div`
  margin: 10px 0;
`;

function AddEvent({ createEvent, closeModal }) {
  const defaultColor = { id: 1, value: 'rgba(249, 55, 28, 1)' };

  const [eventName, setEventName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [invalidDate, setInvalidDate] = useState(false);
  const [invalidName, setInvalidName] = useState(false);
  const [color, setColor] = useState(defaultColor);

  const handleEventNameOnChange = (e) => {
    setEventName(e.target.value);
  };

  const handleSelectedDate = (date) => {
    setSelectedDate(date);
  };

  const handleSelectedColor = (color) => {
    setColor(color);
  };

  const handleEventCreate = () => {
    const currentDate = Date.now();
    const eventTime = getTimeBetweenDates(currentDate, selectedDate);

    if (!eventTime) {
      setInvalidDate(true);
      setInvalidName(false);
      return;
    }

    if (eventName.length < 1) {
      setInvalidName(true);
      setInvalidDate(false);
      return;
    }

    createEvent(eventName, eventTime, selectedDate, color);
    setInvalidDate(false);
    setInvalidName(false);
    setEventName("");
    setSelectedDate("2023-05-21");
    setColor(defaultColor);

    closeModal();
  };

  return (
    <>
      <Container>
        <CardHeader>Create an Event</CardHeader>
        <CardBody>
          <FormLayoutElement>
            <Label>Title</Label>
            <Input
              type="text"
              value={eventName}
              onChange={handleEventNameOnChange}
              placeholder="Title"
            />
          </FormLayoutElement>
          <FormLayoutElement>
            <DatePicker
              date={selectedDate}
              handleSelectedDate={handleSelectedDate}
            />
            {invalidName ? <Warning>Empty Name Input!</Warning> : null}
            {invalidDate ? <Warning>Wrong Date!</Warning> : null}
          </FormLayoutElement>
          <FormLayoutElement>
            <ColorPicker color={color} setColor={handleSelectedColor} />
          </FormLayoutElement>
        </CardBody>
        <CardFooter>
          <ButtonGhost onClick={closeModal}>Cancel</ButtonGhost>
          <ButtonPrimary onClick={handleEventCreate}>Save</ButtonPrimary>
        </CardFooter>
      </Container>
    </>
  );
};

export default AddEvent;
