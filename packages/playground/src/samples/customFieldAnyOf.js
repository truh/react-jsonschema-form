import React from "react";

export default {
  schema: {
    title: "Location",
    type: "object",
    anyOf: [
      {
        title: "City",
        properties: {
          city: {
            type: "string",
          },
        },
        required: ["city"],
      },
      {
        title: "Coordinates",
        properties: {
          lat: {
            type: "number",
          },
          lon: {
            type: "number",
          },
        },
        required: ["lat", "lon"],
      },
    ],
  },
  uiSchema: {
    "ui:field": ({ schema, idSchema: {$id}, formData, onChange, ...other }) => {
      console.log("ui:field", { schema, ...other });
      const changeHandlerFactory = fieldName => event => {
        console.log("changeHandler", fieldName, {event});
        onChange(
          formData
            ? {...formData, [fieldName]: event.target.value}
            : {[fieldName]: event.target.value}
        );
      }
      return (
        <>
          <h4>Location</h4>
          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                margin: "1rem",
              }}>
              <div className="form-group field field-string">
                <label className="control-label" htmlFor={`${$id}-city`}>
                  City
                </label>
                <input
                  className="form-control"
                  id={`${$id}-city`}
                  required=""
                  placeholder=""
                  type="text"
                  value={formData?.city || ""}
                  onChange={changeHandlerFactory("city")}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "50%",
                margin: "1rem",
              }}>
              <div className="form-group field field-string">
                <label className="control-label" htmlFor={`${$id}-lat`}>
                  Latitude
                </label>
                <input
                  className="form-control"
                  id={`${$id}-lat`}
                  type="number"
                  value={formData?.lat || 0}
                  onChange={changeHandlerFactory("lat")}
                />
              </div>
              <div className="form-group field field-string">
                <label className="control-label" htmlFor={`${$id}-lon`}>
                  Longitude
                </label>
                <input
                  className="form-control"
                  id={`${$id}-lon`}
                  type="number"
                  value={formData?.lon || 0}
                  onChange={changeHandlerFactory("lon")}
                />
              </div>
            </div>
          </div>
        </>
      );
    },
  },
  formData: {},
};
