// Types for the Projects
type ImageType = {
  id: string;
  src: string;
  alt: string;
};

type ProjectFeatureType = {
  title: string;
  description: string;
};

export type ProjectType = {
  name: string;
  title: string;
  resume: string;
  description: string;
  github_link: string;
  img: ImageType;
  features: ProjectFeatureType[];
  technologies: ImageType[];
};

// Types for the Blogs
export type BlogType = {
  id: string;
  name: string;
  title: string;
  date: string;
  resume: string;
  content: string[];
};