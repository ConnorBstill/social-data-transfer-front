interface Response {
  data: any;
  msg: string;
  err: boolean;
}

interface MainResponseBuilderOptions {
  error?: any;
  log?: boolean;
}

export interface ResponseBuilderData<T> {
  data: T;
  msg: string;
  err: boolean;
  options?: MainResponseBuilderOptions;
}

class ResponseBuilderOptions {
  error: Error = null;
  log: boolean = false;

  constructor(options: MainResponseBuilderOptions) {
    this.error = options ? options.error : this.error;
    this.log = options ? options.log : this.log;
  }
}

export const ResponseBuilder = (
  data: any,
  msg: string = null,
  err: boolean = false,
  builderOptions?: MainResponseBuilderOptions,
): Response | any => {
  const options = new ResponseBuilderOptions(builderOptions);

  if (err) {
    if (options.log) {
      console.error('An error occurred', options.error);
    }

    if (options.error) {
      throw err;
    }
  }

  return JSON.stringify({
    data,
    msg,
    err,
  });
};

export default ResponseBuilder;
