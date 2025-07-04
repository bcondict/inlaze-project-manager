// "use client";
import { type IProject } from "@/core/domain/projects/projects.domain";
import "./styles.css";
import "../auth/login/styles.css";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
// import { fetchHandler } from "@/lib/fetchHandler";

const Dashboard = async () => {
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

  return (
    <section className="parent relative flex justify-center h-full w-full mt-20">
      <section className="parent--content w-1/2 flex flex-col gap-8">
        <h1 className="content--title text-center text-2xl bg-white py-6">
          Projects
        </h1>
        {projects ? (
          <>
            <label className="form-field rounded-lg">
              <MagnifyingGlassIcon className="icon w-4" />
              <input className="form-field--input w-full" type="text" />
            </label>
            <article className="projects bg-[#edfaf8] px-4 py-2">
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
