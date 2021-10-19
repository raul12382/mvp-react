import "../index.css";
import data from "../components/Data";
import { useState, useEffect } from "react";
import { Button, Image } from "antd";
import {NavLink} from 'react-router-dom'
import {RightCircleOutlined, LeftCircleOutlined} from '@ant-design/icons'

export default function Homepage() {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndext = people.length - 1;
    if (index < 0) {
      setIndex(lastIndext);
    }
    if (index > lastIndext) {
      setIndex(0);
    }
  }, [index, people]);

  return (
    <>
    <h2 style={{color:'#00AFDC'}}>
      Bienvenido al MVP de TOC
    </h2>
    <label style={{paddingLeft:'10px', }}>
      Realiza la captura de tu cedula en unos simples pasos
    </label>
    <section className="section" >
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position = "nextSlide";
          if (personIndex === index) {
            position = "activeSlide";
          }
          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }

         
          return (
            <article
              className={position}
              style={{ justifyItems: "center"}}
              key={id}
            > 
              <p style={{backgroundColor:'gray', textAlign:'center'}}>{name}</p>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <Image src={image} alt={name} className="person-img" />
              {index == 2 ? 
              <div style={{padding:'7px'}}>
                  <NavLink to="/select_camera">
                  <Button>
                    Ir a capturar la cedula
                  </Button> 
                  </NavLink>
              </div> : <div></div>}
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
        < LeftCircleOutlined />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
        <RightCircleOutlined />
        </button>
      </div>
    </section>
    </>
  );
}
