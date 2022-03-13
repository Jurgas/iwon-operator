import {ScrapyFacilityItem} from './scrapy-facility-item';

export interface ScrapyResponse {
  status: string,
  items: ScrapyFacilityItem[],
  items_dropped: ScrapyFacilityItem[],
  stats: ScrapyStats,
  spider_name: string
}

interface ScrapyStats {
  'downloader/request_bytes': number,
  'downloader/request_count': number,
  'downloader/request_method_count/GET': number,
  'downloader/response_bytes': number,
  'downloader/response_count': number,
  'downloader/response_status_count/200': number,
  'downloader/response_status_count/404': number,
  'dupefilter/filtered': number,
  'elapsed_time_seconds': number,
  'finish_reason': string,
  'finish_time': Date,
  'httpcompression/response_bytes': number,
  'httpcompression/response_count': number,
  'item_scraped_count': number,
  'log_count/DEBUG': number,
  'log_count/INFO': number,
  'memusage/max': number,
  'memusage/startup': number,
  'request_depth_max': number,
  'response_received_count': number,
  'robotstxt/request_count': number,
  'robotstxt/response_count': number,
  'robotstxt/response_status_count/404': number,
  'scheduler/dequeued': number,
  'scheduler/dequeued/memory': number,
  'scheduler/enqueued': number,
  'scheduler/enqueued/memory': number,
  'start_time': Date
}
