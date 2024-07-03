import React from "react";

function FormInput({ name, labelText, type, status }) {
  return (
    <label className="form-control w-full  ">
      <div className="label">
        <span className="label-text capitalize">{labelText}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder="Type here"
        className={`input input-bordered ${status} w-full`}
      />
    </label>
  );
}

export default FormInput;
