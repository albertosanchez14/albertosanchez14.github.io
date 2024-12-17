import { useQuery } from "@tanstack/react-query";
import { ProjectType } from "../../utils/types";

const fetchProjects = async (limit: number): Promise<ProjectType[]> => {
  // Mock data
  const response = [
    {
      name: "oktopus-api",
      title: "Oktopus API",
      resume: "API to handle the storage of multiple Google Drive accounts",
      img: {
        id: "oktopus-api",
        src: "/oktopus_logo.svg",
        alt: "Oktopus API Pic",
      },
      technologies: [
        {
          id: "javascript",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
          alt: "JavaScript",
        },
        {
          id: "nodejs",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
          alt: "Node.js",
        },
        {
          id: "express",
          src: "/express.svg",
          alt: "Express",
        },
        {
          id: "mongodb",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
          alt: "MongoDB",
        },
        {
          id: "googlecloud",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
          alt: "Google Cloud",
        },
      ],
    },
    {
      name: "vhdl-to-java",
      title: "VHDL To Java Compiler",
      resume: "Compiler that translates VHDL code to Java code",
      img: {
        id: "vhdl_to_java_big",
        src: "/vhdl_to_java.png",
        alt: "VHDL Pic",
      },
      technologies: [
        {
          id: "java",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
          alt: "Java",
        },
      ],
    },
    {
      name: "shape-editing-web-app",
      title: "Shape Editing Web App",
      resume: "Web application to create and edit shapes",
      img: {
        id: "shape-editing-web-app",
        src: "/a3-screencap.png",
        alt: "ts+react",
      },
      technologies: [
        {
          id: "typescript",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
          alt: "TypeScript",
        },
        {
          id: "react",
          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
          alt: "React",
        },
      ],
    },
    {
      name: "coming-soon",
      title: "Coming Soon...",
      resume: "Stay tuned for more projects!",
      img: {
        id: "coming-soon",
        src: "/coming-soon.png",
        alt: "",
      },
      technologies: [],
    },
  ];
  // Simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 1));
  return response.slice(0, limit);
};

export const useProjects = (limit: number) => {
  return useQuery<ProjectType[], Error>({
    queryKey: ['projects', limit],
    queryFn: () => fetchProjects(limit),
  });
};
