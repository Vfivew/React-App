import axios from "axios";

class HistoryApi {
  private baseurl: string;

  constructor(baseurl: string) {
    this.baseurl = baseurl;
  }

  async getHistory() {
    const res = await axios.get(`${this.baseurl}/history-of-changes-task`);

    return res.data;
  }
}

export { HistoryApi};
