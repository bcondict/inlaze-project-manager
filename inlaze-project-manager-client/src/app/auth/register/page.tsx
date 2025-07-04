"use client";
import { useState } from "react";
import "./styles.css";
import router from "next/router";
import Image from "next/image";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondLastName, setSecondLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        middleName,
        lastName,
        setFirstName,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Register failed");
    }
  };
  return (
    <section className="container relative flex justify-center items-center">
      <section className="container--child">
        <form
          className="form flex flex-col items-center"
          onSubmit={handleLogin}
        >
          <Image
            src={"/user_icon_image.png"}
            alt={"user icon image"}
            width={150}
            height={150}
          />

          <label
            htmlFor="firstName"
            className="form--field field flex items-center"
          >
            <input
              className="field--input"
              id="firstName"
              type="text"
              value={firstName}
              placeholder="Firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>

          <label
            htmlFor="middleName"
            className="form--field field flex items-center"
          >
            <input
              className="field--input"
              id="middleName"
              type="text"
              value={middleName}
              placeholder="Middlename"
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </label>

          <label
            htmlFor="lastName"
            className="form--field field flex items-center"
          >
            <input
              className="field--input"
              id="lastName"
              type="text"
              value={lastName}
              placeholder="Lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>

          <label
            htmlFor="secondLastName"
            className="form--field field flex items-center"
          >
            <input
              className="field--input"
              id="secondLastName"
              type="text"
              value={secondLastName}
              placeholder="Second Lastname"
              onChange={(e) => setSecondLastName(e.target.value)}
            />
          </label>

          <label
            htmlFor="email"
            className="form--field field flex items-center"
          >
            <input
              className="field--input"
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label
            htmlFor="password"
            className="form--field field flex items-center"
          >
            <input
              id="password"
              className="field--input"
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="form--button">
            Login
          </button>

          <div className="form-text">
            <p>Already registered</p>
            <a href="./login" className="form-text--link">
              Login
            </a>
          </div>
        </form>
      </section>
    </section>
  );
};

export default RegisterPage;
