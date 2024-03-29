import { useEffect, useState, Fragment } from "react";
import { createPortal } from "react-dom";

import Styled from "styled-components";

import { setAlpha } from "src/util/helpers";
import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from "src/util/localStorage";
import { EVENTS_KEY } from "src/constants/localStorageKeys";

import Counter from "src/UI/counter/Counter";
import EditEvent from "src/components/Homepage/editEvent/EditEvent";
import Modal from "src/UI/modal/Modal";

const CardWrapper = Styled.div`
    margin: 25px 20px;
    min-width: 300px;
    max-width: 340px;
    border-radius: 12px;
    background-color: #fff;
    border: 1px solid #eaedfa;

    box-shadow:
  0px 2px 6px -9px ${(props) => setAlpha(props.color, 0.28)},
  0px 2px 20px -9px ${(props) => setAlpha(props.color, 0.48)}
;

    @media only screen and (max-width: 768px) {
      margin: 25px 5% 0 5%;
    }

    @media only screen and (max-width: 480px) {
      margin: 25px 7px 0 7px;
    }
`;

const Timer = Styled.div`
    display: flex;
    justify-content: space-evenly;
    background-color: #f0f2f4;
    padding: 15px 10px;
`;

const CardDetails = Styled.div`
    text-align: center;
    margin: 16px 0;
`;

const StyledHeader = Styled.h2`
    color: #96a2ac;
    font-weight: 400;
    margin: 0;
`;

const EventName = Styled.h3`
    color: #7e8e9a;
    font-size: 1.1rem;
    padding: 0;
    margin: 0;
`;

const Date = Styled.span`
     color: #96a2ac;
     font-size: 0.8rem;
     display: block;
     padding: 0 0 15px 0;
`;

const ButtonGhost = Styled.button`
  padding: 8px 18px;
  border: none;
  background-color: transparent;
  border: 1px solid #d3d9de;
  color: #657581;
  border-radius: 5px;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #f0f2f4;
  }
`;

const CardFooter = Styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eaedfa;
  padding: 15px 20px;

`;

const SECOND = 1;
const MINUTE = 1;
const HOUR = 1;
const DAY = 1;
const INTERVAL_SPEED = 1000;

function Card({ event, deleteEvent, editEvent }) {
  const { key, id, title, displayDate, timer, color } = event;

  const [eventTimer, setEventTimer] = useState(timer);
  const [timerOver, setTimerOver] = useState(false);
  const [isEventEditModalOpen, setIsEventEditModalOpen] = useState(false);

  useEffect(() => {
    if (eventTimer !== timer) setEventTimer(timer);

    const updateTime = (time) => {
      if (timerOver) {
        return;
      }
      if (
        time.days === 0 &&
        time.hours === 0 &&
        time.minutes === 0 &&
        time.seconds === 0
      ) {
        setTimerOver(true);
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
      if (time.seconds === 0 && time.minutes !== 0) {
        return {
          ...time,
          seconds: 60,
          minutes: time.minutes - MINUTE,
        };
      } else if (time.seconds === 0 && time.minutes === 0 && time.hours !== 0) {
        return {
          ...time,
          minutes: 60,
          hours: time.hours - HOUR,
        };
      } else if (
        time.seconds === 0 &&
        time.minutes === 0 &&
        time.hours === 0 &&
        time.days !== 0
      ) {
        return {
          ...time,
          hours: 24,
          days: time.days - DAY,
        };
      } else if (time.seconds >= 0) {
        return {
          ...time,
          seconds: time.seconds - SECOND,
        };
      }
    };
      
    const intervalId = setInterval(() => 
      setEventTimer((prevState) => updateTime(prevState))
    , INTERVAL_SPEED);

    if (timerOver) clearInterval(intervalId); 

    return () => clearInterval(intervalId);
  }, [timer, timerOver]);

  const handleOnDelete = () => {
    deleteEvent(id);
    let savedEvents = loadFromLocalStorage(EVENTS_KEY);
    removeFromLocalStorage(EVENTS_KEY);
    saveToLocalStorage(EVENTS_KEY, savedEvents.filter(se => se.id !== id));
  }

  const handleOpenEventEditModal = () => 
    setIsEventEditModalOpen(true);
  
  const handleCloseEventEditModal = () => 
    setIsEventEditModalOpen(false);

  return (
    <Fragment key={key}>
      <CardWrapper color={color.value}>
        <Timer>
          <Counter value={eventTimer.days} name="days" color={color.value} />
          <Counter value={eventTimer.hours} name="hours" color={color.value} />
          <Counter value={eventTimer.minutes} name="minutes" color={color.value} />
          <Counter value={eventTimer.seconds} name="seconds" color={color.value} />
        </Timer>
        <CardDetails>
          <StyledHeader>Countdown to:</StyledHeader>
          <EventName>{title}</EventName>
          <Date>{displayDate}</Date>
        </CardDetails>
        <CardFooter>
          <ButtonGhost onClick={handleOpenEventEditModal}>Edit</ButtonGhost>
          <ButtonGhost onClick={handleOnDelete}>Delete</ButtonGhost>
        </CardFooter>
      </CardWrapper>
      {createPortal(
        <Modal
          isOpen={isEventEditModalOpen}>
           <EditEvent 
            closeModal={handleCloseEventEditModal} 
            editEvent={editEvent} 
            eventToEdit={event}
            isOpen={isEventEditModalOpen} />
        </Modal>,
        document.body
      )}
    </Fragment>
  );
};

export default Card;
