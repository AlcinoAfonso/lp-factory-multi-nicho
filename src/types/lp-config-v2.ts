export interface SectionBase {
  type: string;
  id: string;
  [key: string]: any;
}

export interface MetadataV2 {
  title: string;
  description: string;
  favicon?: string;
}

export interface CreationInfo {
  data_criacao: string;
}

export interface LandingPageV2 {
  metadata: MetadataV2;
  sections: SectionBase[];
  creation_info?: CreationInfo;
}
