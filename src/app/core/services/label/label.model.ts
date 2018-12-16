export interface LabelsResponse {
  labels: Label[];
}

export interface Label {
  id: String;
  type: String;
  name: String;
}
