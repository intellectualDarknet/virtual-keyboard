class LoadService {
  async load(url: string): Promise<any> {
    const response: Response = await fetch(url);
    const result: any = await response.json();
    return result;
  }
}

export const loadService = new LoadService();
