/* eslint-disable max-len */
/* eslint-disable no-case-declarations */
import axios from 'axios';
import {PopupSlotBizRes} from '../data/biz/home/popup.biz';
import {
  HomeBizRes,
  SearchBrandBannerBizRes,
  SearchBrandShortcutBizRes,
} from '../data/biz/home/response.biz';
import {ApiClient} from './api.client';
import {SearchKeywordRes} from '../data/biz/home/search-keyword.biz';

export class HomeClient extends ApiClient {
  private client = axios.create({
    baseURL: process.env.HOME_API_URL,
    timeout: Number(process.env.HOME_API_TIMEOUT),
  });

  async getHomeBizWithAppScreen(code: string) {
    const res = await this.client.get<HomeBizRes[]>(`/v1/home/${code}`);
    return res.data;
  }

  async getSearchBarTexts() {
    const res = await this.client.get<SearchKeywordRes[]>(
      '/v1/searchKeyword/avalList',
    );
    return res.data;
  }

  async getPopupSlogAll() {
    const res = await this.client.get<PopupSlotBizRes>(
      '/v1/mobile_popup/popup_slot/all',
    );
    return res.data;
  }

  async getSearchBrandBanners(brandCodes: number[]) {
    const response = await this.client.get<SearchBrandBannerBizRes[]>(
      `/v1/search_brand_banners?brandCodes=${brandCodes.join(',')}`,
      {
        validateStatus: status => {
          return status == 200 || status == 404;
        },
      },
    );

    return response.status == 404 ? [] : response.data;
  }

  async getSearchBrandShortcuts(keyword: string) {
    const response = await this.client.get<SearchBrandShortcutBizRes[]>(
      `/v1/search_brand_shortcuts?keyword=${encodeURIComponent(keyword)}`,
      {
        validateStatus: status => {
          return status == 200 || status == 404;
        },
      },
    );

    return response.status == 404 ? [] : response.data;
  }
}
