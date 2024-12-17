import { useQuery } from "@tanstack/react-query";
import { ProjectType } from "../../utils/types";

const fetchProjects = async (limit: number): Promise<ProjectType[]> => {
  // Mock data
  const response = [
    {
      name: "oktopus-api",
      title: "Oktopus API",
      resume: "API to handle the storage of multiple Google Drive accounts",
      description: "Oktopus API is a Node.js-based backend application designed to manage storage across multiple Google Drive accounts by leveraging the Google API. It leverages Express.js for routing, MongoDB for data storage, and various middleware for handling authentication, logging, and error management.",
      img: {
        id: "oktopus-api",
        src: "/oktopus_logo.svg",
        alt: "Oktopus API Pic",
      },
      features: [
        {
          title: "User Authentication",
          description:
            "Secure user login, logout, and token-based authentication using JWT.",
        },
        {
          title: "Google OAuth Integration",
          description:
            "Seamless integration with Google OAuth for user authentication and authorization.",
        },
        {
          title: "File Management",
          description: "Upload, download, and delete files from Google Drive.",
        },
        {
          title: "Storage Management",
          description: "Manage storage across multiple Google Drive accounts.",
        },
        {
          title: "Rate Limiting",
          description: "Prevents abuse of the login endpoint.",
        },
        {
          title: "Error Handling",
          description:
            "Centralized error handling and logging for improved debugging and monitoring.",
        },
        {
          title: "CORS Configuration",
          description:
            "Configurable CORS settings to control access from different origins.",
        },
      ],
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
      description: "fasdf",
      img: {
        id: "vhdl_to_java_big",
        src: "/vhdl_to_java.png",
        alt: "VHDL Pic",
      },
      features: [
        {
          title: "User Authentication",
          description:
            "Secure user login, logout, and token-based authentication using JWT.",
        },
      ],
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
      description: "fasdf",
      img: {
        id: "shape-editing-web-app",
        src: "/a3-screencap.png",
        alt: "ts+react",
      },
      features: [
        {
          title: "User Authentication",
          description:
            "Secure user login, logout, and token-based authentication using JWT.",
        },
      ],
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
      description: "",
      img: {
        id: "coming-soon",
        src: "/coming-soon.png",
        alt: "",
      },
      features: [],
      technologies: [],
    },
  ];
  // Simulate network delay
  // await new Promise((resolve) => setTimeout(resolve, 1));
  return response.slice(0, limit);
};

export const useProjects = (limit: number) => {
  return useQuery<ProjectType[], Error>({
    queryKey: ["projects", limit],
    queryFn: () => fetchProjects(limit),
  });
};
