/* eslint-disable import/no-anonymous-default-export */
/** ----------------------------------------------------
 ** Form components
 * -----------------------------------------------------
 * Works with react-hook-form
 *  - Wrap inside controller component for formatting inputs
 *    ex: zip-codes and phone-numbers
 * Import as component and reference specific functions
 *  EX:
 *    import Form from "../form-inputs";
 *    <Form.Input/>
 */
import React, { useState, useEffect } from "react";
import { formatPhoneNum, formatZipCode } from "../../services/utilities";

const Input = ({
  type = "text",
  label,
  name,
  placeholder,
  required,
  fullWidth,
  clear,
  onChange,
  register,
  error,
  ...rest
}) => {
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    clear && setValue("");
  }, [clear]);

  const handleChange = (e) => {
    const change = e.target.value;
    let newValue = "";
    switch (type) {
      case "phone":
        newValue = formatPhoneNum(change);
        setValue(newValue);
        break;
      case "zipcode":
        newValue = formatZipCode(change);
        setValue(newValue);
        break;
      default:
        newValue = change;
        setValue(newValue);
    }
    change !== "" ? setEmpty(false) : setEmpty(true);
    onChange && onChange(newValue);
  };

  return (
    <>
      <div
        className={
          "form-group" +
          (fullWidth ? " full-width" : "") +
          (error ? " error" : "") +
          (!empty ? " not-empty" : "")
        }
      >
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={register ? undefined : value}
          ref={register}
          onChange={(e) => handleChange(e)}
          placeholder={error ? error : placeholder}
          {...rest}
        />
        {error && !empty && <span className="error">{error}</span>}
      </div>
    </>
  );
};

const Textarea = ({
  label,
  name,
  small,
  placeholder,
  required,
  fullWidth,
  notEmpty,
  register,
  error,
  ...rest
}) => {
  const [empty, setEmpty] = useState(true);

  const handleChange = (e) => {
    e.target.value !== "" ? setEmpty(false) : setEmpty(true);
  };

  return (
    <>
      <div
        className={
          "form-group" +
          (fullWidth ? " full-width" : "") +
          (error ? " error" : "") +
          (!empty ? " not-empty" : "")
        }
      >
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
        {small && <small>{small}</small>}
        <textarea
          id={name}
          name={name}
          ref={register}
          {...rest}
          placeholder={error ? error : placeholder}
          onChange={(e) => handleChange(e)}
        />
        {error && !empty && <span className="error">{error}</span>}
      </div>
    </>
  );
};

const Select = ({
  label,
  name,
  values,
  selected,
  required,
  fullWidth,
  clear,
  register,
  onChange,
  error,
  override,
  ...rest
}) => {
  const [value, setValue] = useState(
    selected !== undefined ? selected : values[0].id
  );

  useEffect(() => {
    clear && setValue(undefined);
  }, [clear]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange && onChange(e);
  };

  return (
    <>
      <div
        className={
          "form-group" +
          (fullWidth ? " full-width" : "") +
          (error ? " error" : "")
        }
      >
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
        <select
          id={name}
          name={name}
          ref={register}
          value={value}
          {...rest}
          onChange={(e) => handleChange(e)}
          placeholder={error && error}
        >
          {values &&
            values.map((value) => (
              <option key={value.id} value={value.id}>
                {value.name}
              </option>
            ))}
        </select>
        {error && <span className="error">{error}</span>}
      </div>
    </>
  );
};

const Radio = ({
  label,
  name,
  values,
  selected,
  clear,
  required,
  fullWidth,
  register,
  error,
  ...rest
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    clear && setValue("");
  }, [clear]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={"form-group" + (error ? " error" : "")}>
      <label>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {typeof values === "object" ? (
        values.map((value) => (
          <div
            className={
              "inline-wrapper" +
              (fullWidth ? " full-width" : "") +
              (error ? " error" : "")
            }
            key={value.value}
          >
            <input
              type="radio"
              id={value.id}
              name={value.name}
              ref={register}
              value={value.value}
              {...rest}
              onChange={(e) => handleChange(e)}
              placeholder={error && error}
            />
            <label htmlFor={value.id}>{value.value}</label>
          </div>
        ))
      ) : (
        <div
          className={
            "inline-wrapper" +
            (fullWidth ? " full-width" : "") +
            (error ? " error" : "")
          }
        >
          <input
            id={name}
            name={name}
            ref={register}
            value={values}
            {...rest}
            onChange={(e) => handleChange(e)}
            placeholder={error && error}
          />
          <label htmlFor={name}>{label}</label>
          {error && <span className="error">{error}</span>}
        </div>
      )}
    </div>
  );
};

const RadioInline = ({
  label,
  name,
  values,
  selected,
  clear,
  required,
  fullWidth,
  register,
  error,
  ...rest
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    clear && setValue("");
  }, [clear]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={"form-group" + (error ? " error" : "")}>
      {/* <label>
        {label}
        {required && <span className="required"> *</span>}
      </label> */}
      {typeof values === "object" ? (
        values.map((value) => (
          <div
            className={"inline-wrapper" + (fullWidth ? " full-width" : "")}
            key={value.value}
          >
            <input
              type="radio"
              id={value.id}
              name={value.name}
              ref={register}
              value={value.value}
              {...rest}
              onChange={(e) => handleChange(e)}
            />
            <label htmlFor={value.id}>{value.value}</label>
          </div>
        ))
      ) : (
        <div
          className={
            "inline-wrapper" +
            (fullWidth ? " full-width" : "") +
            (error ? " error" : "")
          }
        >
          <input
            type="radio"
            id={name}
            name={name}
            ref={register}
            value={values}
            {...rest}
            onChange={(e) => handleChange(e)}
            placeholder={error && error}
          />
          <label htmlFor={name}>{label}</label>
          {error && <span className="error">{error}</span>}
        </div>
      )}
    </div>
  );
};

const Checkbox = ({
  label,
  name,
  required,
  fullWidth,
  blockView,
  checked,
  inline = true,
  onChange,
  clear,
  register,
  error,
  ...rest
}) => {
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    clear && setValue("");
  }, [clear]);

  const handleChange = (e) => {
    const change = e.target.checked;
    change !== "" ? setEmpty(false) : setEmpty(true);
    onChange && onChange(change);
  };

  return (
    <>
      <div
        className={
          "form-group" +
          (inline ? " inline" : "") +
          (blockView ? " block-checkbox" : "") +
          (fullWidth ? " full-width" : "") +
          (error ? " error" : "") +
          (!empty ? " not-empty" : "")
        }
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          value={register ? undefined : value}
          ref={register}
          defaultChecked={checked}
          onChange={(e) => handleChange(e)}
          {...rest}
        />
        <label htmlFor={name}>
          {label} {required && <span className="required">*</span>}
        </label>
        {error && !empty && <span className="error">{error}</span>}
      </div>
    </>
  );
};

export default { Input, Textarea, Select, Radio, RadioInline, Checkbox };
