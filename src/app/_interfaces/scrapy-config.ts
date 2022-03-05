export interface ScrapyConfig {
  request: ScrapyRequest,
  spider_name: string
}

interface ScrapyRequest {
  url: string,
  callback?: string,
  method?: string,
  meta?: any,
  body?: string,
  headers?: string,
  cookies?: any,
  encoding?: string,
  priority?: number,
  dont_filter?: boolean,
  errback?: string,
  flags?: string[],
  cb_kwargs?: any
}
