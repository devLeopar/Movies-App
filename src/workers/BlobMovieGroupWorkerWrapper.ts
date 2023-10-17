import movieGroupWorker from "./movieGroupWorker";

const workerCode = `(${movieGroupWorker.toString()})();`;

const blob = new Blob([workerCode], { type: "application/javascript" });
export const workerScript = URL.createObjectURL(blob);

class BlobMovieGroupWorkerWrapper {
  #worker: Worker;

  constructor() {
    this.#worker = new Worker(workerScript);
  }

  postMessage(data: any) {
    this.#worker.postMessage(data);
  }

  terminate() {
    this.#worker.terminate();
  }
}

export default BlobMovieGroupWorkerWrapper;
