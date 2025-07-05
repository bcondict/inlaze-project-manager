"use client";
import { type IProject } from "@/core/domain/projects/projects.domain";
import "./styles.css";
import "../auth/login/styles.css";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { ArrowsUpDownIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
// import { fetchHandler } from "@/lib/fetchHandler";

const Dashboard = () => {
  const [isDropdownOn, setDropdownOn] = useState(false);
  const [,] = useState(false);
  // const projectsUrl = `/api/v1/projects`;
  // const projects = await fetchHandler<IProject[]>({
  //   url: projectsUrl,
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  const projects: IProject[] = [
    {
      id: crypto.randomUUID(),
      name: "Project1",
      description: "this is a project",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const nothingFunction = (e) => {
    e.preentDefault();
  };

  return (
    <section className="parent relative flex justify-center h-full w-full mt-20">
      <section className="parent--content w-1/2 flex flex-col gap-8">
        <h1 className="content--title text-center text-2xl bg-white py-6">
          Projects
        </h1>
        {projects ? (
          <>
            <search className="flex w-full justify-between">
              <label className="form-field rounded-lg w-[75%]">
                <MagnifyingGlassIcon className="icon w-4" />
                <input className="form-field--input w-full" type="text" />
              </label>
              <button className="button-secondary self-end">New Project</button>
            </search>
            <article className="projects bg-[#edfaf8] px-4 py-2">
              <div className="mt-4 mb-6 mx-2 flex justify-between">
                <div></div>
                <button
                  className="dropdown"
                  onClick={() => setDropdownOn(!isDropdownOn)}
                >
                  {" "}
                  <p className="capitalize mr-1">sort</p>
                  <ArrowsUpDownIcon className="w-4" />
                  <div
                    className={`${isDropdownOn ? "displayed" : ""} dropdown-content`}
                  >
                    <button onClick={(e) => nothingFunction(e)}>Newest</button>
                    <button onClick={(e) => nothingFunction(e)}>Oldest</button>
                    <button onClick={(e) => nothingFunction(e)}>Name</button>
                  </div>
                </button>
              </div>
              {projects.map((project: IProject) => (
                <div
                  className="project-content flex gap-[1rem]"
                  key={project.id}
                >
                  <div className="w-1/6">{project.name}</div>
                  <div className="w-[75%]">{project.description}</div>
                  <div>
                    <EllipsisVerticalIcon className="icon w-5" />
                  </div>
                </div>
              ))}
            </article>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className="text-lg">there&apos;s no project created jet</div>
            <button className="button-secondary">Create one</button>
          </div>
        )}
      </section>
    </section>
  );
};

export default Dashboard;
