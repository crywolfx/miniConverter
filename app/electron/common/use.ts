import OpenFile from './openFile';

export default class Use {
  constructor() {
    this.init();
  }

  public init(): void {
    const openFile = new OpenFile();
    openFile.init();
  }
}
