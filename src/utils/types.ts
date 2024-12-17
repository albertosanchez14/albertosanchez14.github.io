type ImageType = {
  id: string;
  src: string;
  alt: string;
};

export type ProjectType = {
  name: string;
  title: string;
  resume: string;
  img: ImageType;
  technologies: ImageType[];
};
