class MovieGroupWorkerWrapper {
  #worker: Worker;

  constructor(
    scriptURL: string | URL,
    onMessage: (event: MessageEvent) => void
  ) {
    this.#worker = new Worker(scriptURL);
    this.#worker.onmessage = onMessage;
  }

  postMessage(data: any) {
    this.#worker.postMessage(data);
  }

  terminate() {
    this.#worker.terminate();
  }
}

export default MovieGroupWorkerWrapper;
