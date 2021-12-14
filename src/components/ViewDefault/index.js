import React from 'react';
import { Col, Form } from 'react-bootstrap';
import { TextDefault } from './styles';

export const ViewDefault = ({ object, values }) => {
  const renderField = (field) => {
    switch (field.type) {
      case 'image':
        return (
          <Form.Text>
            <img
              width={50}
              height={50}
              src={object[field.key]}
              alt={field.label}
            />{' '}
          </Form.Text>
        );
      case 'link':
        return (
          <TextDefault>
            <a target="blank" href={object[field.key]}>
              {object[field.key]}
            </a>{' '}
          </TextDefault>
        );
      case 'texts':
        // console.log(field.key);
        return (object[field.key] || []).map((text, idx) => {
          return (
            <TextDefault
              clickable={field.clickable}
              onClick={field.clickable ? () => field.onClick(text) : undefined}
              key={text}
            >
              {text}
            </TextDefault>
          );
        });
      case 'objects':
        // console.log(field.key);
        return (object[field.key] || []).map((obj, idx) => {
          let auxObj = obj;
          field.object_keys.forEach((k) => {
            auxObj = auxObj[k];
          });
          const text = auxObj;
          return (
            <TextDefault
              clickable={field.clickable}
              onClick={field.clickable ? () => field.onClick(obj) : undefined}
              key={text}
            >
              {JSON.stringify(text)}
            </TextDefault>
          );
        });
      case 'links':
        return (object[field.key] || []).map((link, idx) => {
          return (
            <TextDefault key={link}>
              <a target="blank" href={link}>
                {link}
              </a>{' '}
            </TextDefault>
          );
        });
      case 'bool':
        return <TextDefault>{object[field.key] ? 'Sim' : 'Não'}</TextDefault>;
      default:
        return <TextDefault>{JSON.stringify(object[field.key])}</TextDefault>;
    }
  };

  return (
    <>
      <Form.Row>
        {values.map((field) => {
          return (
            <Form.Group as={Col} md="4" key={field.key}>
              <Form.Label>{field.label}</Form.Label>
              {renderField(field)}
            </Form.Group>
          );
        })}
      </Form.Row>
    </>
  );
};
