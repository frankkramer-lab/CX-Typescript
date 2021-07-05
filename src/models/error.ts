export interface ErrorMessage {
  aspectName: string;
  message: string;
  loc?: ErrorLocation[];
}

export interface ErrorLocation {
  key?: Position;
  keyEnd?: Position;
  value: Position;
  valueEnd: Position;
}

export interface Position {
  line: number;
  column: number;
  pos: number;
}
