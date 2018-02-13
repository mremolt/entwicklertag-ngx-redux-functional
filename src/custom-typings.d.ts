interface NodeModule {
  hot: any;
}

interface System {
  import(request: string): Promise<any>;
}
var System: System;

declare module '*.json' {
  const value: any;
  export default value;
}
