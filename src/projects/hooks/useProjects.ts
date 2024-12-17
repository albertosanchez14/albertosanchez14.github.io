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
      github_link: "https://github.com/albertosanchez14/oktopusAPI",
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
      description: "VHDL-to-Java is a tool, designed in ECE351 in the University of Waterlooto, to translate VHDL (VHSIC Hardware Description Language) descriptions into Java code for hardware simulation. This project bridges the gap between hardware description and object-oriented programming, enabling developers to simulate digital systems directly in Java.",
      github_link: "https://github.com/albertosanchez14/VHDL-to-Java",
      img: {
        id: "vhdl_to_java_big",
        src: "/vhdl_to_java.png",
        alt: "VHDL Pic",
      },
      features: [
        {
          title: "VHDL Parsing and AST Construction",
          description:
            "The repository includes a parser that converts VHDL descriptions into an Abstract Syntax Tree (AST). This process mirrors the Recursive Descent Parsing covered in the manual, where each grammar rule corresponds to a Java method for recursive tree construction.",
        },
        {
          title: "Desugaring and Elaboration",
          description: "Implements VHDL elaboration processes by simplifying and expanding VHDL constructs into canonical forms, as outlined in the Elaboration section of the manual. This includes inlining components and signal declarations."
        },
        {
          title: "Java Code Generation",
          description:
            "The system translates the elaborated AST into Java code, enabling simulation of hardware behavior using object-oriented programming constructs.",
        },
        {
          title: "Design Pattern Usage",
          description:
            "It leverages key software engineering principles, such as the Visitor Design Pattern for traversing ASTs and Template Method Design Pattern for reusable parsing and code generation workflows.",
        },
        {
          title: "Testing Framework",
          description:
            "The repository includes a set of test cases that verify the correctness of the VHDL to Java compiler. These test cases cover a variety of VHDL constructs, including entity declarations, signal assignments, and process statements.",
        },
        {
          title: "Technology Mapping",
          description:
            "Supports mapping VHDL constructs to corresponding Java components, effectively bridging the gap between hardware and software domains. This reflects the Graphviz and Circuit Mapping labs where AST representations are translated to usable outputs.",
        }
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
      description: "Web application created using Preact with TypeScript developed in the University of Waterloo. This web application allows users to manage and edit shapes. It features a left and right side layout, with the left side containing a toolbar, a shape list, and a status bar, while the right side displays details or messages based on the selected shape.",
      github_link: "https://github.com/albertosanchez14/shape-editing-web-app",
      img: {
        id: "shape-editing-web-app",
        src: "/a3-screencap.png",
        alt: "ts+react",
      },
      features: [
        {
          title: "Toolbar",
          description:
            "Contains buttons for adding, deleting, and clearing shapes, as well as a dropdown for selecting the shape to add.",
        },
        {
          title: "Shape List",
          description:
            "Initially contains 8 square shapes with random hues.",
        },
        {
          title: "Status Bar",
          description:
            "Displays the number of shapes in the list or the number of selected shapes, as well as a message when the list is full or when too many shapes are selected.",
        },
        {
          title: "Mouse Hover Effect",
          description:
            "Shapes in the list have a 4px light blue outline on hover.",
        },
        {
          title: "Selection",
          description:
            "Clicking on a shape selects it, indicated by a 1px blue outline. Clicking on a selected shape deselects it.",
        },
        {
          title: "Editing",
          description:
            "When a single shape is selected, the right side displays an editor for that shape. For squares, the editor allows editing of the hue value. For stars, the editor allows editing of hue, outer radius, and number of points. For bullseyes, the editor allows editing of hues for the rings. For cats, the editor allows editing of hue and look direction.",
        },
        {
          title: "Keyboard Interaction",
          description:
            "Holding the Shift key allows for multiple selection without deselecting others.",
        },
        {
          title: "Button Disabling",
          description:
            "Add button is disabled when there are 25 shapes, delete button is disabled when no shapes are selected, and clear button is disabled when there are no shapes.",
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
      github_link: "",
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
