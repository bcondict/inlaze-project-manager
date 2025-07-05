"use client";
import { useState } from "react";
import "./styles.css";
import router from "next/router";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/20/solid";
import { LockClosedIcon } from "@heroicons/react/20/solid";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      alert("Login failed");
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
            htmlFor="email"
            className="form--field field rounded-2xl w-[20rem]"
          >
            <UserIcon className="icon w-5" />
            <input
              className="field--input"
              id="email"
              type="email"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label
            htmlFor="password"
            className="form--field field rounded-2xl w-[20rem]"
          >
            <LockClosedIcon className="icon w-5" />
            <input
              id="password"
              className="field--input"
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="button-primary">
            Login
          </button>

          <div className="form-text">
            <p>Not registered yet?</p>
            <a href="./register" className="form-text--link">
              register
            </a>
          </div>
        </form>
      </section>
    </section>
  );
};

export default LoginPage;
