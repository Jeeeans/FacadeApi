/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import {ApiClient} from '../../common/api.client';

export class HomeClient extends ApiClient {
  private client = axios.create({
    baseURL: process.env.HOME_API_URL,
    timeout: Number(process.env.HOME_API_TIMEOUT),
  });

  async getHome() {
    const res = await this.client.get<HomeBizResponse[]>(`/v1/home/main`);
    return res.data;
  }
}
