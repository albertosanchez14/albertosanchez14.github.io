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
  img: ImageType;
  features: ProjectFeatureType[];
  technologies: ImageType[];
};
