/* eslint-disable import/no-anonymous-default-export */
/** ----------------------------------------------------
 ** Form Examples
 * -----------------------------------------------------
 * Keep forms in this component to make easer organization
 */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postAPI } from "../services/post";
import { project } from "../services/get";
import "yup-phone";
import * as yup from "yup";
// Components
import Form from "./common/inputs";
import Button from "./common/button";
import sessions from "../services/sessions";
import { reset } from "../services/auth";
/** ----------------------------
 *# Contact form
 * -----------------------------
 */
const Contact = () => {
  // Schema for contact form
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Email not valid").required("Required"),
    phone: yup.lazy((value) => {
      if (value === "undefined" || value === "") return yup.string();
      else return yup.string().length(12, "Incorrect format");
    }),
    message: yup.string().max(1000),
  });

  // Form handling
  const { register, handleSubmit, errors, control } = useForm({
    resolver: yupResolver(schema),
  });

  // Handle form submit
  async function onSubmit(values) {
    console.log(values);
    const { data } = await postAPI("/contact/submit", values);
    console.log(data);
    data.success && toast.success("Submitted!");
    data.error && toast.error(data.error);
  }

  return (
    <form className="contact-us" onSubmit={handleSubmit(onSubmit)}>
      <Form.Input
        label="Name"
        name="name"
        required={true}
        register={register}
        error={errors.name?.message}
      />
      <Form.Input
        label="Email Address"
        name="email"
        required={true}
        register={register}
        error={errors.email?.message}
      />
      <Controller
        name="phone"
        defaultValue=""
        control={control}
        render={(props) => (
          <Form.Input
            type="phone"
            label="Phone Number"
            name="phone"
            fullWidth={true}
            onChange={(e) => props.onChange(e)}
            error={errors.phone?.message}
          />
        )}
      />
      <Form.Textarea
        label="Message"
        name="message"
        fullWidth={true}
        rows="3"
        register={register}
        error={errors.message?.message}
      />
      <Button
        text="Send message"
        className="btn btn-primary solid square"
        type="submit"
      />
    </form>
  );
};

/** ----------------------------
 *# Admin setup form
 * -----------------------------
 */
const Setup = () => {
  const [settings, updateSettings] = useState("");
  const [showOptions, toggleOptions] = useState(null);
  const [clear, setClear] = useState("false");

  // Schema for contact form
  const schema = yup.object().shape({
    contactEmail: yup.lazy((value) => {
      if (value === "undefined" || value === "") return yup.string();
      else return yup.string().email("Email not valid");
    }),
    contactPhone: yup.lazy((value) => {
      if (value === "undefined" || value === "") return yup.string();
      else return yup.string().length(12, "Incorrect format");
    }),
    messageTitle: yup.string(),
    messageText: yup.string(),
  });

  // Handle validation
  const { register, handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    handleSettings();
  }, [register]);

  // Setup settings
  const handleSettings = async () => {
    let config = sessions.get("project");
    config === null && (await project().then((data) => (config = data)));
    console.log(config);
    if (config) {
      // Set state
      updateSettings(config);
      toggleOptions(config.callsEnabled);
    }
  };

  // Handle form submit
  const onSubmit = async (values) => {
    console.log(values);
    let config = sessions.get("project");
    // Set empty values
    if (config !== null) {
      values.name = config.name;
      // Replace empty values
      Object.entries(values).forEach((entry) => {
        const [key, value] = entry;
        value === "" && (values[key] = config[key]);
      });
    }
    const { data } = await postAPI("/set/config", values);
    if (data.success) {
      reset();
      setClear("true");
      sessions.remove("project");
      handleSettings();
      setClear("false");
      toast.success(data.success);
    } else toast.success(data.error);
  };

  return (
    <>
      {settings && (
        <form className="setup" onSubmit={handleSubmit(onSubmit)}>
          <div className="container">
            <Form.Input
              type="email"
              label="Contact email"
              name="contactEmail"
              placeholder={settings.contactEmail}
              register={register}
              error={errors.contactEmail?.message}
            />
            <Controller
              name="contactPhone"
              defaultValue=""
              control={control}
              render={(props) => (
                <Form.Input
                  type="phone"
                  label="Contact phone"
                  name="contactPhone"
                  placeholder={settings.contactPhone}
                  clear={clear}
                  onChange={(e) => props.onChange(e)}
                  error={errors.contactPhone?.message}
                />
              )}
            />
            <Form.Input
              label="Alert message title"
              name="messageTitle"
              placeholder={settings.messageTitle}
              register={register}
              error={errors.messageTitle?.message}
            />
            <Form.Textarea
              label="Alert message"
              name="messageText"
              placeholder={settings.messageText}
              register={register}
              error={errors.messageText?.message}
            />
          </div>
          <div className="container">
            <Controller
              name="callsEnabled"
              defaultValue={showOptions}
              control={control}
              render={(props) => (
                <Form.Checkbox
                  label="Call for assistance"
                  name="callsEnabled"
                  blockView={true}
                  checked={showOptions}
                  onChange={() => toggleOptions(!showOptions)}
                />
              )}
            />
            {showOptions && (
              <>
                <h3>Call options</h3>
                <Controller
                  name="allowedBluetooth"
                  defaultValue={settings.allowedBluetooth}
                  control={control}
                  render={(props) => (
                    <Form.Checkbox
                      label="Use bluetooth"
                      name="allowedBluetooth"
                      fullWidth={true}
                      onChange={(e) => props.onChange(e)}
                      checked={settings.allowedBluetooth}
                    />
                  )}
                />
                <Controller
                  name="allowedEmail"
                  defaultValue={settings.allowedEmail}
                  control={control}
                  render={(props) => (
                    <Form.Checkbox
                      label="Use email"
                      name="allowedEmail"
                      fullWidth={true}
                      onChange={(e) => props.onChange(e)}
                      checked={settings.allowedEmail}
                    />
                  )}
                />
                <Controller
                  name="allowedText"
                  defaultValue={settings.allowedText}
                  control={control}
                  render={(props) => (
                    <Form.Checkbox
                      label="Use text messaging"
                      name="allowedText"
                      fullWidth={true}
                      onChange={(e) => props.onChange(e)}
                      checked={settings.allowedText}
                    />
                  )}
                />
              </>
            )}
          </div>
          <div className="container-full">
            <Button
              text="Update settings"
              className="btn secondary medium solid square"
              type="submit"
            />
          </div>
        </form>
      )}
    </>
  );
};

export default {
  Contact,
  Setup,
};
