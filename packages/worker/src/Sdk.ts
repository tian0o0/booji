// export class Task {
//   private event: Event;
//   constructor(event: Event) {
//     this.event = event;
//   }
//   run(data: any) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("post", data.dsn, false);
//     xhr.send(JSON.stringify(data.event));
//   }
// }

class WorkerCtor {
  constructor() {
    self.onmessage = (e: any) => {
      // if (!this.dsn) {
      //   this.dsn = e.dsn;
      // }
      // this.queue.enqueue(new Task(e.event));
      this.run(e.data);
    };
  }
  run(data: any) {
    const xhr = new XMLHttpRequest();
    xhr.open("post", data.dsn, false);
    xhr.send(JSON.stringify(data.event));
  }
}

export const BoojiWorker = new WorkerCtor();
