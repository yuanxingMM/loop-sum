"use client";
import styles from "./page.module.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Accordion from 'react-bootstrap/Accordion';

export default function Home() {
  const [number1, setnumber1] = useState(null);
  const [number2, setnumber2] = useState(null);
  const [result, setResult] = useState(null);
  const [legal, setLegal] = useState(true);
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    var str = items.length > 0 ? items[items.length - 1] + "+" : "";
    setItems([...items, str + item]);
  }

  const createItemStr = (number1, number2) => {
    return "(" + number1 + "+" + number2 + ")";
  }

  const checkInput = () => {
    const regex = /^-?\d+(\.\d+)?$/;
    return (number1 && regex.test(number1)) && (number2 && regex.test(number2));
  }

  const sum = () => {
    var legal = checkInput();
    setLegal(legal);
    if (!legal) {
      // alert("Change input and try again. The value entered must be an integer or decimal.");
    } else {
      alert("We will calculate the sum function");
      addItem(createItemStr(number1, number2));
      var thisResult = Number(number1) + Number(number2);
      setResult(thisResult + result);
    }
  }

  return (
    <>
      <div className={styles.page}>
        <main className={styles.main}>
          {(!legal) && (
            <Alert variant="danger" onClose={() => setLegal(true)} dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                Change input and try again. The value entered must be an integer or decimal.
              </p>
            </Alert>
          )}
          <Form.Floating className="mb-3">
            <Form.Control
              id="number1"
              type="text"
              placeholder="Please input a number1"
              onChange={event => setnumber1(event.target.value)}
            />
            <label htmlFor="floatingInputCustom">number1</label>
          </Form.Floating>

          <Form.Floating className="mb-3">
            <Form.Control
              id="number2"
              type="text"
              placeholder="Please input a number2"
              onChange={event => setnumber2(event.target.value)}
            />
            <label htmlFor="floatingInputCustom">number2</label>
          </Form.Floating>

          <Button variant="primary" onClick={() => { sum() }}>Sum</Button>{' '}
          {(items.length > 0) && <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>result = {result}</Accordion.Header>
              <Accordion.Body>
                {items.map((item, index) => (
                  <li style={{ listStyle: "none" }} key={index}>{item}</li>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>}
        </main>
      </div>
    </>
  );
}