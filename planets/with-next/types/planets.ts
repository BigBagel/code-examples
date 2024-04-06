export type PlanetInfoSection = 'overview' | 'internal' | 'geology';
export type PlanetName = 'Mercury' | 'Venus' | 'Earth' | 'Mars' | 'Jupiter' | 'Saturn' | 'Neptune';

export type PlanetInfo = {
  content: string;
  source: string;
};

export type PlanetImages = {
  overview: string;
  structure: string;
  geology: string;
}

export type PlanetData = {
  name: PlanetName;
  overview: PlanetInfo;
  structure: PlanetInfo;
  geology: PlanetInfo;
  rotation: string;
  revolution: string;
  radius: string;
  temperature: string;
  images: PlanetImages;
  imageSize: number;
};

export type Planets = PlanetData[];
