namespace __RspackModuleApi {
  interface Module {
    exports: any;
    id: ModuleId;
    filename: string;
    loaded: boolean;
    parent: NodeModule | null | undefined;
    children: NodeModule[];
    hot?: Hot | undefined;
  }
}

declare namespace NodeJS {
  interface Module extends __RspackModuleApi.Module {}
}
declare var process: NodeJS.Process;
